/**
 * Download all images from hscarpetsandflooring.co.uk into ./public/images
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = "https://hscarpetsandflooring.co.uk";
const OUT = path.join(__dirname, "public", "images");
const MAX_PAGES = 100;

fs.mkdirSync(OUT, { recursive: true });

const visitedPages = new Set();
const imageUrls = new Set();
const queue = [BASE];

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".avif", ".ico"]);
const SKIP = ["blank.gif", "data:image", "gravatar", "emoji", "wavatar", "1x1"];

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "*/*",
};

function cleanUrl(u) {
  if (!u) return "";
  u = String(u).trim().replace(/^['"]|['"]$/g, "");
  if (!u || u.startsWith("data:")) return "";
  try {
    return new URL(u, BASE).href.split("#")[0];
  } catch {
    return "";
  }
}

function sameSite(u) {
  try {
    const h = new URL(u).hostname.toLowerCase();
    return h.endsWith("hscarpetsandflooring.co.uk");
  } catch {
    return false;
  }
}

function looksLikeImage(u) {
  const low = u.toLowerCase();
  if (SKIP.some((s) => low.includes(s))) return false;
  let pathname;
  try {
    pathname = new URL(u).pathname.toLowerCase();
  } catch {
    return false;
  }
  const ext = path.extname(pathname);
  if (IMG_EXT.has(ext)) return true;
  if (pathname.includes("/wp-content/uploads/")) return true;
  return false;
}

function addImage(raw, base) {
  const u = cleanUrl(raw.startsWith("http") ? raw : new URL(raw, base).href);
  if (u && looksLikeImage(u)) imageUrls.add(u);
}

function extractFromSrcset(srcset, base) {
  for (const part of srcset.split(",")) {
    const url = part.trim().split(/\s+/)[0];
    if (url) addImage(url, base);
  }
}

function extractImages(html, pageUrl) {
  // img src / data-src / srcset
  const imgRe = /<img\b[^>]*>/gi;
  let m;
  while ((m = imgRe.exec(html))) {
    const tag = m[0];
    for (const attr of ["src", "data-src", "data-lazy-src", "data-original", "data-lazy", "data-url"]) {
      const am = tag.match(new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "i"));
      if (am) addImage(am[1], pageUrl);
    }
    for (const attr of ["srcset", "data-srcset", "data-lazy-srcset"]) {
      const am = tag.match(new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "i"));
      if (am) extractFromSrcset(am[1], pageUrl);
    }
  }

  // css url(...)
  const urlRe = /url\(\s*['"]?([^)'"]+)['"]?\s*\)/gi;
  while ((m = urlRe.exec(html))) addImage(m[1], pageUrl);

  // meta images
  const metaRe = /<meta[^>]+(?:property|name)\s*=\s*["'][^"']*image[^"']*["'][^>]*>/gi;
  while ((m = metaRe.exec(html))) {
    const cm = m[0].match(/content\s*=\s*["']([^"']+)["']/i);
    if (cm) addImage(cm[1], pageUrl);
  }

  // a href to images
  const aRe = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  while ((m = aRe.exec(html))) {
    const href = cleanUrl(new URL(m[1], pageUrl).href);
    if (href && looksLikeImage(href)) imageUrls.add(href);
  }
}

function extractLinks(html, pageUrl) {
  const links = [];
  const aRe = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = aRe.exec(html))) {
    const href = cleanUrl(new URL(m[1], pageUrl).href);
    if (!href || !sameSite(href)) continue;
    const p = new URL(href).pathname.toLowerCase();
    const ext = path.extname(p);
    if (IMG_EXT.has(ext)) continue;
    if (ext && ![".html", ".htm", ".php"].includes(ext)) continue;
    const norm = href.replace(/\/$/, "") || BASE;
    links.push(norm);
  }
  return links;
}

async function fetchText(url) {
  try {
    const res = await fetch(url, { headers, redirect: "follow" });
    if (!res.ok) {
      console.log(`  FAIL ${res.status} ${url}`);
      return null;
    }
    const ctype = res.headers.get("content-type") || "";
    if (!ctype.includes("text/html") && !ctype.includes("xml") && !ctype.includes("text/plain")) {
      return null;
    }
    return { text: await res.text(), ctype, url: res.url };
  } catch (e) {
    console.log(`  FAIL ${url}: ${e.message}`);
    return null;
  }
}

async function crawl() {
  while (queue.length && visitedPages.size < MAX_PAGES) {
    let url = queue.shift();
    url = url.replace(/\/$/, "") || BASE;
    if (visitedPages.has(url)) continue;
    visitedPages.add(url);
    console.log(`[${visitedPages.size}] Crawl: ${url}`);
    const got = await fetchText(url);
    if (!got) continue;
    extractImages(got.text, got.url || url);
    for (const link of extractLinks(got.text, got.url || url)) {
      if (!visitedPages.has(link) && !queue.includes(link)) queue.push(link);
    }
  }
}

async function loadSitemaps() {
  const sms = [
    `${BASE}/sitemap_index.xml`,
    `${BASE}/sitemap.xml`,
    `${BASE}/wp-sitemap.xml`,
    `${BASE}/wp-sitemap-posts-page-1.xml`,
    `${BASE}/wp-sitemap-posts-post-1.xml`,
  ];
  for (const sm of sms) {
    const got = await fetchText(sm);
    if (!got) continue;
    const locs = [...got.text.matchAll(/<loc>(.*?)<\/loc>/gi)].map((x) => x[1].trim());
    console.log(`Sitemap ${sm}: ${locs.length} locs`);
    for (const loc of locs) {
      if (looksLikeImage(loc)) {
        imageUrls.add(loc);
        continue;
      }
      if (sameSite(loc) && loc.includes(".xml")) {
        const sub = await fetchText(loc);
        if (sub) {
          for (const l of [...sub.text.matchAll(/<loc>(.*?)<\/loc>/gi)].map((x) => x[1].trim())) {
            if (looksLikeImage(l)) imageUrls.add(l);
            else if (sameSite(l) && !visitedPages.has(l.replace(/\/$/, ""))) {
              queue.push(l.replace(/\/$/, "") || BASE);
            }
          }
        }
      } else if (sameSite(loc) && !visitedPages.has(loc.replace(/\/$/, ""))) {
        queue.push(loc.replace(/\/$/, "") || BASE);
      }
    }
  }
  // crawl any newly queued from sitemap
  await crawl();
}

function filenameFor(url) {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(url).pathname);
  } catch {
    pathname = "/image.jpg";
  }
  let name = path.basename(pathname) || "image.jpg";
  let ext = path.extname(name).toLowerCase();
  let stem = path.basename(name, path.extname(name));
  if (!IMG_EXT.has(ext)) {
    ext = ".jpg";
    name = stem + ext;
  }
  let dest = path.join(OUT, name);
  if (fs.existsSync(dest)) {
    const h = crypto.createHash("md5").update(url).digest("hex").slice(0, 8);
    name = `${stem}_${h}${ext}`;
  }
  return name;
}

async function downloadOne(url) {
  const name = filenameFor(url);
  const dest = path.join(OUT, name);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return { name, status: "skip" };
  try {
    const res = await fetch(url, { headers, redirect: "follow" });
    if (!res.ok) return { name, status: `http${res.status}` };
    const ctype = res.headers.get("content-type") || "";
    if (ctype.includes("text/html")) return { name, status: "not-image" };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 50) return { name, status: "tiny" };
    fs.writeFileSync(dest, buf);
    return { name, status: "ok", size: buf.length };
  } catch (e) {
    return { name, status: `err:${e.message}` };
  }
}

async function poolMap(items, limit, fn) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

async function main() {
  console.log("Crawling site...");
  await crawl();
  console.log("Loading sitemaps...");
  await loadSitemaps();

  const urls = [...imageUrls].sort();
  console.log(`\nFound ${urls.length} image URLs. Downloading to ${OUT}...\n`);

  let ok = 0,
    skip = 0,
    fail = 0;
  await poolMap(urls, 8, async (url, idx) => {
    const r = await downloadOne(url);
    if (r.status === "ok") {
      ok++;
      console.log(`  [${idx + 1}/${urls.length}] OK  ${r.name} (${r.size}b)`);
    } else if (r.status === "skip") {
      skip++;
    } else {
      fail++;
      console.log(`  [${idx + 1}/${urls.length}] ${r.status}  ${url}`);
    }
  });

  const files = fs.readdirSync(OUT);
  console.log(`\nDone. downloaded=${ok} skipped=${skip} failed=${fail} files_in_im=${files.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
