import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionHead } from "../ui/SectionHead";
import { ProductDrawer } from "../product/ProductDrawer";
import { useResourceList } from "../../hooks/useResourceList";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { mediaUrl } from "../../lib/api";
import { reveal, revealChild } from "../../lib/classes";
import { cn } from "../../lib/cn";

const DESKTOP_POSITIONS = [
  { x: 12.5, y: 17 },
  { x: 37.5, y: 17 },
  { x: 62.5, y: 17 },
  { x: 87.5, y: 17 },
  { x: 12.5, y: 50 },
  { x: 37.5, y: 50 },
  { x: 62.5, y: 50 },
  { x: 87.5, y: 50 },
  { x: 25, y: 83 },
  { x: 50, y: 83 },
  { x: 75, y: 83 },
];

const MOBILE_POSITIONS = [
  { x: 27, y: 9 },
  { x: 73, y: 9 },
  { x: 27, y: 25.4 },
  { x: 73, y: 25.4 },
  { x: 27, y: 41.8 },
  { x: 73, y: 41.8 },
  { x: 27, y: 58.2 },
  { x: 73, y: 58.2 },
  { x: 27, y: 74.6 },
  { x: 73, y: 74.6 },
  { x: 50, y: 91 },
];

const STATUS_CYCLE = ["available", "reserved", "available", "sold", "available"];

const statusChip = {
  available: "bg-[#28231f]",
  reserved: "bg-brand",
  sold: "bg-[#626a65]",
};

const statusBadge = {
  available: "bg-brand-soft text-brand",
  reserved: "bg-[#fff0df] text-[#a94317]",
  sold: "bg-[#ececec] text-[#666]",
};

const statusLabel = {
  available: "available",
  reserved: "popular",
  sold: "limited",
};

function padIndex(index) {
  return String(index + 1).padStart(2, "0");
}

function mapProduct(product, index) {
  const status = STATUS_CYCLE[index % STATUS_CYCLE.length];
  const blurb = String(product.description || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    id: product.id,
    code: padIndex(index),
    name: product.title || "Product",
    status,
    type: product.category_title || "Popular finish",
    summary: blurb.slice(0, 160) || "Open this product for full details and showroom guidance.",
    image: mediaUrl(product.image) || "/images/LVT-Flooring-Essex.jpg",
    includes: ["Sample kit ready", "Transparent specs", "Install guidance"],
  };
}

function pickPositions(all, count) {
  if (count <= 0) return [];
  if (count >= all.length) return all.slice(0, count);
  if (count === 1) return [{ x: 50, y: 50 }];
  const step = (all.length - 1) / (count - 1);
  return Array.from({ length: count }, (_, i) => all[Math.round(i * step)]);
}

export function FinishExplorer() {
  const { items, loading, error } = useResourceList("products", {
    is_popular: "true",
    limit: 11,
    sort: "created_at",
    direction: "desc",
  });
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [drawerId, setDrawerId] = useState(null);
  const mobile = useMediaQuery("(max-width: 640px)");

  const zones = useMemo(() => items.map(mapProduct), [items]);

  useEffect(() => {
    if (active >= zones.length) setActive(0);
  }, [active, zones.length]);

  const positions = pickPositions(mobile ? MOBILE_POSITIONS : DESKTOP_POSITIONS, zones.length);
  const finish = zones[active] || null;

  return (
    <section id="popular" className={cn(reveal, "border-t border-line bg-canvas px-[3%] py-12 max-[640px]:px-[4%]")}>
      <SectionHead
        pill="POPULAR PRODUCTS"
        title={<h2>Finishes homeowners ask for most</h2>}
        description={
          <p>
            Select any finish on the material map below to inspect details, surface, and room fit —
            then open the full product view.
          </p>
        }
      />

      {loading ? <p className="mb-6 text-center text-sm text-muted">Loading popular products…</p> : null}
      {error ? <p className="mb-6 text-center text-sm text-red-600">{error}</p> : null}
      {!loading && !error && zones.length === 0 ? (
        <p className="mb-6 text-center text-sm text-muted">
          No popular products yet. Mark products as popular in admin.
        </p>
      ) : null}

      {zones.length > 0 && finish ? (
        <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(300px,0.72fr)] items-stretch gap-4 max-[980px]:grid-cols-1">
          <div className="rounded-lg border border-[rgba(27,25,23,0.08)] bg-white p-4 shadow-[0_18px_50px_rgba(27,25,23,0.06)]">
            <div className="mb-[18px] flex flex-wrap items-center gap-x-[18px] gap-y-3.5 text-[13px] text-muted">
              <strong className="w-full text-base font-bold text-ink">Explore the finish plan</strong>
              <span>
                <i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#28231f]" /> Available
              </span>
              <span>
                <i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-brand-mid" /> Popular
              </span>
              <span>
                <i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-[#9aa3a0]" /> Limited
              </span>
              <span className="ml-auto font-semibold text-ink">{zones.length} material zones</span>
            </div>

            <div className="relative min-h-[780px] overflow-hidden rounded-md bg-[#f0e5db] max-[640px]:min-h-[1120px]">
              <div
                className="absolute inset-0 origin-center bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(70,43,27,0.08))] transition-transform duration-300"
                style={{ transform: `scale(${zoom})` }}
              >
                {zones.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "absolute flex h-[29%] w-[23%] -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-between overflow-hidden rounded-md border-2 border-white/95 p-[13px] text-left text-white shadow-[0_6px_16px_rgba(22,34,27,0.14)] transition duration-200",
                      "hover:z-[2] hover:scale-[1.015] hover:border-white hover:shadow-[0_12px_28px_rgba(22,34,27,0.25),0_0_0_3px_#ff6b00]",
                      active === index &&
                        "z-[2] scale-[1.015] border-white shadow-[0_12px_28px_rgba(22,34,27,0.25),0_0_0_3px_#ff6b00]",
                      "max-[640px]:h-[14%] max-[640px]:w-[43%] max-[640px]:p-2.5",
                    )}
                    style={{
                      left: `${positions[index].x}%`,
                      top: `${positions[index].y}%`,
                      backgroundImage: `linear-gradient(180deg, rgba(27, 25, 23, 0.02) 24%, rgba(27, 25, 23, 0.82) 100%), url("${item.image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => setActive(index)}
                    aria-label={`${item.code} ${item.name}`}
                  >
                    <span className="rounded-full bg-[rgba(12,25,19,0.7)] px-2 py-1 text-[10px] font-bold tracking-[0.06em] text-white uppercase backdrop-blur-sm">
                      {item.code}
                    </span>
                    <span className="block">
                      <strong className="block text-[clamp(12px,1.2vw,16px)] [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] max-[980px]:text-sm">
                        {item.name}
                      </strong>
                      <small className="mt-0.5 block text-[10px] text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
                        {item.type}
                      </small>
                    </span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-[10px] font-bold tracking-[0.06em] text-white uppercase",
                        statusChip[item.status],
                      )}
                    >
                      {statusLabel[item.status]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="absolute bottom-3.5 left-3.5 grid gap-1.5">
                <button
                  type="button"
                  aria-label="Zoom in"
                  className="grid h-[38px] w-[38px] place-items-center rounded-xl border-0 bg-white shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
                  onClick={() => setZoom((value) => Math.min(1.4, value + 0.1))}
                >
                  <ZoomIn size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Zoom out"
                  className="grid h-[38px] w-[38px] place-items-center rounded-xl border-0 bg-white shadow-[0_8px_18px_rgba(0,0,0,0.08)]"
                  onClick={() => setZoom((value) => Math.max(0.85, value - 0.1))}
                >
                  <ZoomOut size={16} />
                </button>
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-4 text-[13px] text-muted max-[640px]:flex-col">
              <p className="m-0">Select a material zone to see product details and open the full view.</p>
              <span>
                {zones.length} popular {zones.length === 1 ? "product" : "products"} · sample kits ready
              </span>
            </div>
          </div>

          <aside
            className={cn(
              revealChild,
              "relative flex flex-col rounded-lg border border-[rgba(27,25,23,0.08)] bg-white p-[22px] shadow-[0_18px_50px_rgba(27,25,23,0.06)]",
            )}
          >
            <div className="mb-[18px]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold tracking-[0.14em] text-brand">
                  PRODUCT {finish.code}
                </span>
                <span
                  className={cn(
                    "rounded-full px-[9px] py-1 text-[11px] font-bold tracking-[0.08em] uppercase",
                    statusBadge[finish.status],
                  )}
                >
                  {statusLabel[finish.status]}
                </span>
              </div>
              <h3 className="mb-[5px] font-display text-[clamp(30px,3vw,42px)] font-semibold leading-[1.08] tracking-[-0.04em]">
                {finish.name}
              </h3>
              <p className="m-0 text-sm leading-normal text-muted">{finish.type}</p>
            </div>
            <div className="relative mb-5 overflow-hidden rounded-md">
              <img
                src={finish.image}
                alt={finish.name}
                className="block h-[clamp(220px,19vw,300px)] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setDrawerId(finish.id)}
                className="absolute right-3 bottom-3 inline-flex cursor-pointer items-center gap-[7px] rounded-lg border-0 bg-white/95 px-[13px] py-2.5 text-[13px] font-bold text-brand shadow-[0_5px_18px_rgba(0,0,0,0.12)]"
              >
                View details <ArrowUpRight size={16} />
              </button>
            </div>
            <dl className="m-0 grid grid-cols-1 gap-2.5">
              <div className="flex min-w-0 flex-col gap-[5px] rounded-md bg-sand px-3 py-[11px] text-sm">
                <dt className="text-xs text-muted">Overview</dt>
                <dd className="m-0 leading-snug font-semibold">{finish.summary}</dd>
              </div>
            </dl>
            <div className="my-[18px] rounded-md border border-line p-4">
              <span className="mb-3 block text-xs font-bold text-brand">Included with this finish</span>
              <ul className="m-0 grid list-none gap-2.5 p-0">
                {finish.includes.map((line) => (
                  <li key={line} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="shrink-0 text-brand" /> {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto grid gap-2.5">
              <Button type="button" full onClick={() => setDrawerId(finish.id)}>
                Open {finish.name}
              </Button>
              <Button as={Link} to="/contact" variant="outline" full>
                Ask about this finish
              </Button>
            </div>
          </aside>
        </div>
      ) : null}

      <ProductDrawer
        productId={drawerId}
        open={Boolean(drawerId)}
        onClose={() => setDrawerId(null)}
      />
    </section>
  );
}
