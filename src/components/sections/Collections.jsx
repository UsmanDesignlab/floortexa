import { ArrowUpRight, BedDouble, Ruler } from "lucide-react";
import { GhostLink } from "../ui/GhostLink";
import { Pill } from "../ui/Pill";
import { collections } from "../../data/content";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function Collections() {
  return (
    <section id="collections">
      <div className={cn(reveal, "mx-auto max-w-[760px] px-[5%] pt-20 pb-7 text-center")}>
        <Pill>RESIDENCES · ARCHITECTURAL PORTFOLIO</Pill>
        <h2 className="my-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">
          Residential Flooring Collections
        </h2>
        <p className="mx-auto m-0 max-w-[560px] text-[17px] leading-[1.65] text-muted">
          Scroll to explore six distinctive Floortex finishes — marble, porcelain, oak, herringbone,
          stone, and commercial tile.
        </p>
      </div>

      {collections.map((item, index) => (
        <article
          key={item.name}
          className={cn(
            reveal,
            "sticky top-0 flex min-h-svh items-center justify-end overflow-hidden max-[980px]:justify-center",
          )}
          style={{ zIndex: index + 1 }}
        >
          <img src={item.image} alt={item.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover brightness-[0.72]" />
          <div className="relative z-[1] mr-[7%] w-[min(480px,90%)] rounded-xl border border-white/15 bg-[rgba(27,25,23,0.64)] px-8 py-[34px] text-white shadow-[0_30px_60px_rgba(0,0,0,0.25)] backdrop-blur-[18px] backdrop-saturate-150 max-[980px]:mx-[5%] max-[980px]:mr-0">
            <span className="text-[11px] font-bold tracking-[0.14em] text-white/70">{item.tag}</span>
            <h3 className="mt-2.5 mb-2 font-display text-[clamp(36px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.04em]">
              {item.name}
            </h3>
            <div className="mb-3.5 border-b border-white/15 pb-3.5 text-xs font-semibold tracking-[0.08em] text-white/70">
              STARTING BASE PRICE · {item.price}
            </div>
            <p className="mb-[18px] text-[15px] leading-relaxed text-white/80">{item.copy}</p>
            <div className="mb-3.5 grid grid-cols-2 gap-2.5 max-[640px]:grid-cols-1">
              <div className="rounded-lg border border-white/20 p-3">
                <small className="mb-1.5 block text-[10px] tracking-[0.1em] text-white/55">BEST FOR</small>
                <strong className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
                  <BedDouble size={15} /> {item.rooms}
                </strong>
              </div>
              <div className="rounded-lg border border-white/20 p-3">
                <small className="mb-1.5 block text-[10px] tracking-[0.1em] text-white/55">FORMAT</small>
                <strong className="inline-flex items-center gap-1.5 text-[13px] font-semibold">
                  <Ruler size={15} /> {item.area}
                </strong>
              </div>
            </div>
            <p className="mb-4 text-[13px] text-white/70">{item.note}</p>
            <GhostLink href="#contact" light>
              View Specifications <ArrowUpRight size={14} />
            </GhostLink>
          </div>
        </article>
      ))}
    </section>
  );
}
