import { useMemo } from "react";
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
    tag: `COLLECTION ${String(index + 1).padStart(2, "0")}`,
    name: category.title || "Collection",
    price: "Ask showroom",
    copy: copy.slice(0, 140) || "Explore this Floortex material family in the catalog.",
    rooms: "Residences · Showroom",
    area: "Full collection",
    image: mediaUrl(category.image) || "/images/LVT-Flooring-Essex.jpg",
    note: "Includes sample guidance & install advice",
  };
}

export function Collections() {
  const { items, loading, error } = useResourceList("categories", {
    limit: 6,
    sort: "created_at",
    direction: "desc",
  });

  const collections = useMemo(() => items.map(mapCategory), [items]);

  return (
    <section id="collections" className={cn(reveal, "border-t border-line bg-[#f5f3ef] pt-[72px] pb-12")}>
      <div className="mx-auto mb-10 max-w-[720px] px-[5%] text-center">
        <Pill className="bg-[#e4eee6] text-[#3f5c48]">RESIDENCES · ARCHITECTURAL PORTFOLIO</Pill>
        <h2 className="my-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">
          Residential Flooring
          <br />
          Collections
        </h2>
        <p className="mx-auto m-0 max-w-[560px] text-[17px] leading-[1.65] text-muted">
          Scroll to explore distinctive Floortex finishes from the catalog — marble, porcelain, oak,
          herringbone, stone, and more.
        </p>
      </div>

      {loading ? <p className="mb-6 px-[5%] text-center text-sm text-muted">Loading collections…</p> : null}
      {error ? <p className="mb-6 px-[5%] text-center text-sm text-red-600">{error}</p> : null}
      {!loading && !error && collections.length === 0 ? (
        <p className="mb-6 px-[5%] text-center text-sm text-muted">No categories yet. Add some in admin.</p>
      ) : null}

      {collections.length > 0 ? (
        <div
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[5%] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Residential flooring collections"
        >
          {collections.map((item) => (
            <Link
              key={item.id}
              to={`/categories/${item.id}`}
              className="group relative aspect-[4/5] w-[min(78vw,400px)] shrink-0 snap-center overflow-hidden rounded-[22px] border border-black/[0.04] shadow-[0_8px_24px_rgba(28,28,24,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(28,28,24,0.1)] sm:aspect-[3/4] sm:w-[min(68vw,440px)]"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 z-[1] flex items-center justify-center p-5 sm:p-6">
                <div className="w-full max-w-[280px] rounded-2xl border border-white/20 bg-[rgba(22,20,18,0.48)] px-5 py-5 text-white backdrop-blur-[14px] backdrop-saturate-150 sm:max-w-[300px] sm:px-5 sm:py-6">
                  <span className="text-[10px] font-bold tracking-[0.14em] text-white/65 uppercase">
                    {item.tag}
                  </span>
                  <h3 className="mt-2 mb-1.5 font-display text-[clamp(24px,3.8vw,32px)] font-semibold leading-[1.08] tracking-[-0.03em]">
                    {item.name}
                  </h3>
                  <div className="mb-3 border-b border-white/12 pb-3 text-[10px] font-semibold tracking-[0.1em] text-white/55 uppercase">
                    Starting base price · {item.price}
                  </div>
                  <p className="mb-4 line-clamp-3 text-[13px] leading-relaxed text-white/78">{item.copy}</p>

                  <div className="mb-3.5 grid grid-cols-2 gap-2">
                    <div className="rounded-lg border border-white/15 bg-white/[0.06] p-2.5">
                      <small className="mb-1 block text-[9px] tracking-[0.1em] text-white/45">BEST FOR</small>
                      <strong className="inline-flex items-start gap-1 text-[11px] font-semibold leading-snug">
                        <BedDouble size={13} className="mt-0.5 shrink-0 opacity-75" />
                        <span>{item.rooms}</span>
                      </strong>
                    </div>
                    <div className="rounded-lg border border-white/15 bg-white/[0.06] p-2.5">
                      <small className="mb-1 block text-[9px] tracking-[0.1em] text-white/45">FORMAT</small>
                      <strong className="inline-flex items-start gap-1 text-[11px] font-semibold leading-snug">
                        <Ruler size={13} className="mt-0.5 shrink-0 opacity-75" />
                        <span>{item.area}</span>
                      </strong>
                    </div>
                  </div>

                  <p className="mb-4 text-[12px] text-white/58">{item.note}</p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white">
                    View Specifications <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
          <div className="w-[2vw] shrink-0" aria-hidden />
        </div>
      ) : null}
    </section>
  );
}
