import { Star } from "lucide-react";
import { Pill } from "../ui/Pill";
import { photos, collections, reviews } from "../../data/content";
import { reveal, revealChild } from "../../lib/classes";
import { cn } from "../../lib/cn";

const materialCards = [
  {
    title: "Carpet & Stair Runners",
    copy: "Bespoke runners, rods, and full-room carpet fitted across Essex homes.",
    tag: "Fitted",
  },
  {
    title: "LVT & Vinyl Flooring",
    copy: "Waterproof wood-look planks for kitchens, baths, and busy family spaces.",
    tag: "Practical",
  },
  {
    title: "Laminate & Engineered Wood",
    copy: "Warm oak tones and durable click systems with clear aftercare guidance.",
    tag: "Natural",
  },
];

export function Features() {
  const collectionCount = collections.length;
  const reviewScore = "4.9";
  const homeownerCount = "250+";

  return (
    <section id="about" className={cn(reveal, "px-[5%] pt-10 pb-[90px] max-[640px]:px-[4%]")}>
      <div className="mb-[42px] max-w-[780px]">
        <Pill>FEATURES</Pill>
        <h2 className="my-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">
          Designed for beauty,
          <br />
          clarity, and daily life.
        </h2>
        <p className="m-0 max-w-[560px] text-[17px] leading-[1.65] text-muted">
          Floortex supplies and fits carpet, LVT, laminate, and engineered wood across Essex —
          with honest samples, clear specs, and tidy installation from measure to finish.
        </p>
      </div>

      <div className="grid grid-cols-[1.2fr_0.9fr_0.9fr] gap-[18px] max-[1100px]:grid-cols-2 max-[980px]:grid-cols-1">
        <article
          className={cn(
            revealChild,
            "row-span-2 flex min-h-[560px] flex-col overflow-hidden rounded-lg border border-line bg-white p-0 text-ink shadow-[0_18px_40px_rgba(28,28,24,0.04)]",
            "max-[1100px]:col-span-2 max-[1100px]:row-auto max-[1100px]:min-h-[480px] max-[980px]:col-auto",
          )}
        >
          <div className="px-8 pt-8 pb-[18px]">
            <h3 className="mb-3 font-display text-[clamp(26px,2.6vw,34px)] font-semibold leading-[1.15] tracking-[-0.03em]">
              From sample board to fitted floor
            </h3>
            <p className="m-0 leading-relaxed text-muted">
              Compare real materials in your light, book a free home measure, then let our Essex
              fitters handle supply, prep, and a clean finish — stair runners included.
            </p>
          </div>
          <img
            src={photos.feature}
            alt="Floortex flooring samples and showroom materials"
            className="mt-auto min-h-[320px] w-full flex-1 object-cover object-center"
          />
        </article>

        <article className={cn(revealChild, "rounded-lg bg-sand p-7 shadow-[0_18px_40px_rgba(28,28,24,0.04)]")}>
          <h3 className="mb-2.5 font-display text-2xl font-semibold leading-[1.2] tracking-[-0.03em]">
            {collectionCount} curated flooring collections
          </h3>
          <p className="m-0 text-[15px] leading-[1.55] text-muted">
            Carpet, LVT, laminate, vinyl, engineered wood, and stair runners — each with clear
            pricing, sample options, and professional fitting notes.
          </p>
          <div className="mt-7 border-t border-black/8 pt-[18px]">
            <strong className="block font-display text-[56px] leading-none font-medium tracking-[-0.04em]">
              98%
            </strong>
            <span className="text-sm text-muted">Clients who would recommend Floortex</span>
          </div>
        </article>

        <article className={cn(revealChild, "rounded-lg bg-white p-7 shadow-[0_18px_40px_rgba(28,28,24,0.04)]")}>
          <span className="mb-2.5 block text-[11px] font-bold tracking-[0.14em] text-muted">TRUSTED BY</span>
          <h4 className="mb-2.5 font-display text-2xl font-semibold leading-[1.2] tracking-[-0.03em]">
            {homeownerCount} Essex homeowners
          </h4>
          <div className="my-4 flex">
            {[photos.person1, photos.person2, photos.person3, photos.person4].map((src, index) => (
              <img
                key={src}
                src={src}
                alt=""
                className={cn(
                  "h-[38px] w-[38px] rounded-full border-2 border-white object-cover",
                  index > 0 && "-ml-2.5",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-brand-mid">
            <Star size={14} fill="currentColor" />
            <span>
              {reviewScore} · Based on {reviews.length}+ recent homeowner reviews
            </span>
          </div>
        </article>

        {materialCards.map(({ title, copy, tag }) => (
          <article
            key={title}
            className={cn(
              revealChild,
              "flex min-h-[180px] flex-col rounded-lg bg-white p-7 shadow-[0_18px_40px_rgba(28,28,24,0.04)]",
            )}
          >
            <h4 className="mb-2.5 font-display text-2xl font-semibold leading-[1.2] tracking-[-0.03em]">
              {title}
            </h4>
            <p className="m-0 text-[15px] leading-[1.55] text-muted">{copy}</p>
            <strong className="mt-auto pt-[18px] text-xs tracking-[0.1em] text-brand uppercase">{tag}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
