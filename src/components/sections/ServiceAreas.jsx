import { SectionHead } from "../ui/SectionHead";
import { photos, serviceAreas } from "../../data/content";
import { reveal, revealChild } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function ServiceAreas() {
  return (
    <section id="areas" className={cn(reveal, "border-t border-line bg-canvas px-[5%] py-[72px] max-[640px]:px-[4%]")}>
      <SectionHead
        pill="LOCATION"
        title={<h2>Serving homes across Essex</h2>}
        description={
          <p>
            Showroom samples, free home measures, and professional fitting — carpet, LVT, laminate,
            vinyl, and wood floors across Essex.
          </p>
        }
      />
      <div className="grid grid-cols-[1.05fr_0.95fr] items-stretch gap-[22px] max-[980px]:grid-cols-1">
        <div className={cn(revealChild, "relative min-h-[600px] overflow-hidden rounded-lg max-[640px]:min-h-[400px]")}>
          <img src={photos.showroom} alt="Floortex pavilion" className="h-full w-full object-cover" />
          <div className="pointer-events-none absolute inset-x-0 top-[35%] bottom-0 bg-gradient-to-b from-transparent to-[rgba(27,25,23,0.76)]" />
          <div className="absolute right-8 bottom-[30px] left-8 z-[1] text-white max-[640px]:right-5 max-[640px]:bottom-5 max-[640px]:left-5">
            <span className="mb-[9px] block text-[11px] font-bold tracking-[0.14em] text-white/75">
              VISIT OUR SHOWROOM
            </span>
            <strong className="mb-1.5 block font-display text-[clamp(28px,3vw,42px)] font-semibold tracking-[-0.04em]">
              Floortex Essex
            </strong>
            <p className="m-0 text-sm text-white/85">Carpet · LVT · Wood · Daily 10 AM – 6 PM</p>
          </div>
        </div>
        <div className="grid grid-rows-6 overflow-hidden rounded-lg border border-line bg-white">
          {serviceAreas.map((area, index) => (
            <article
              key={area.name}
              className={cn(
                revealChild,
                "grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-[15px] border-b border-line px-[22px] py-[18px] transition-colors last:border-b-0 hover:bg-sand",
                "max-[640px]:grid-cols-[28px_minmax(0,1fr)_auto] max-[640px]:gap-2.5 max-[640px]:px-3.5 max-[640px]:py-4",
              )}
            >
              <span className="text-xs font-bold tracking-[0.08em] text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="mb-1 font-display text-lg font-semibold">{area.name}</h4>
                <p className="m-0 text-sm text-muted">{area.detail}</p>
              </div>
              <div className="text-right">
                <strong className="block text-sm text-brand">{area.time}</strong>
                <span className="text-xs text-muted">{area.miles}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
