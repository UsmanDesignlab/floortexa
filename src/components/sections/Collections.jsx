import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BedDouble, Ruler } from "lucide-react";
import { Pill } from "../ui/Pill";
import { useResourceList } from "../../hooks/useResourceList";
import { mediaUrl } from "../../lib/api";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

function stripHtml(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapCategory(category, index) {
  const copy = stripHtml(category.description);
  return {
    id: category.id,
            tag: `CATEGORY ${String(index + 1).padStart(2, "0")}`,
    name: category.title || "Collection",
    price: "Ask showroom",
    copy: copy.slice(0, 140) || "Explore this Floortex material family in the catalog.",
    rooms: "Homes · Stairs · Essex",
    area: "Supply & fit",
    image: mediaUrl(category.image) || "/images/LVT-Flooring-Essex.jpg",
    note: "Includes free measure & fitting advice",
  };
}

export function Collections() {
  const { items, loading, error } = useResourceList("categories", {
    limit: 12,
    sort: "created_at",
    direction: "desc",
  });

  const collections = useMemo(() => items.map(mapCategory), [items]);
  const loopItems = useMemo(
    () => (collections.length > 1 ? [...collections, ...collections] : collections),
    [collections],
  );

  const scrollerRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (collections.length < 2) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const el = scrollerRef.current;
    if (!el) return undefined;

    let frame = 0;
    const speed = 0.45;

    const tick = () => {
      if (!paused && el) {
        el.scrollLeft += speed;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [collections.length, paused]);

  return (
    <section id="collections" className={cn(reveal, "border-t border-line bg-[#e8e8e8] pt-[72px] pb-12")}>
      <div className="mx-auto mb-10 max-w-[720px] px-[5%] text-center">
        <Pill className="bg-[#e4eee6] text-[#3f5c48]">CATEGORIES</Pill>
        <h2 className="my-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">
          Flooring
          <br />
          Categories
        </h2>
        <p className="mx-auto m-0 max-w-[560px] text-[17px] leading-[1.65] text-muted">
          Explore Floortex flooring from the catalog — carpet, LVT, laminate, vinyl, engineered wood,
          and bespoke stair runners.
        </p>
      </div>

      {loading ? <p className="mb-6 px-[5%] text-center text-sm text-muted">Loading collections…</p> : null}
      {error ? <p className="mb-6 px-[5%] text-center text-sm text-red-600">{error}</p> : null}
      {!loading && !error && collections.length === 0 ? (
        <p className="mb-6 px-[5%] text-center text-sm text-muted">No categories yet. Add some in admin.</p>
      ) : null}

      {collections.length > 0 ? (
        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto px-[5%] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Flooring categories"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          {loopItems.map((item, index) => (
            <Link
              key={`${item.id}-${index}`}
              to={`/categories/${item.id}`}
              className="group relative aspect-[3/4] w-[min(72vw,300px)] shrink-0 overflow-hidden rounded-md border border-black/[0.04] shadow-[0_8px_24px_rgba(28,28,24,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(28,28,24,0.1)] sm:w-[min(40vw,320px)]"
            >
              <img
                src={item.image}
                alt={item.name}
                loading={index < 4 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 z-[1] flex items-end p-4 sm:p-5">
                <div className="w-full rounded-md border border-white/20 bg-[rgba(22,20,18,0.48)] px-4 py-4 text-white backdrop-blur-[14px] backdrop-saturate-150">
                  <span className="text-[10px] font-bold tracking-[0.14em] text-white/65 uppercase">
                    {item.tag}
                  </span>
                  <h3 className="mt-1.5 mb-1 font-display text-[clamp(20px,3.2vw,26px)] font-semibold leading-[1.08] tracking-[-0.03em]">
                    {item.name}
                  </h3>
                  <div className="mb-2.5 border-b border-white/12 pb-2.5 text-[10px] font-semibold tracking-[0.1em] text-white/55 uppercase">
                    Starting base price · {item.price}
                  </div>
                  <p className="mb-3 line-clamp-2 text-[12px] leading-relaxed text-white/78">{item.copy}</p>

                  <div className="mb-3 grid grid-cols-2 gap-1.5">
                    <div className="rounded-md border border-white/15 bg-white/[0.06] p-2">
                      <small className="mb-0.5 block text-[9px] tracking-[0.1em] text-white/45">BEST FOR</small>
                      <strong className="inline-flex items-start gap-1 text-[10px] font-semibold leading-snug">
                        <BedDouble size={12} className="mt-0.5 shrink-0 opacity-75" />
                        <span>{item.rooms}</span>
                      </strong>
                    </div>
                    <div className="rounded-md border border-white/15 bg-white/[0.06] p-2">
                      <small className="mb-0.5 block text-[9px] tracking-[0.1em] text-white/45">FORMAT</small>
                      <strong className="inline-flex items-start gap-1 text-[10px] font-semibold leading-snug">
                        <Ruler size={12} className="mt-0.5 shrink-0 opacity-75" />
                        <span>{item.area}</span>
                      </strong>
                    </div>
                  </div>

                  <p className="mb-3 text-[11px] text-white/58">{item.note}</p>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-white">
                    View Specifications{" "}
                    <ArrowUpRight
                      size={13}
                      className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
