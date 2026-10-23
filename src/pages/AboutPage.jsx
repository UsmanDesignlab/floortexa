import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { sampleImages } from "../data/sampleImages";

const stats = [
  { value: "15+", label: "years fitting floors across London & Essex" },
  { value: "250+", label: "homeowners who trust Floortexa" },
  { value: "7", label: "flooring families from carpet to herringbone" },
  { value: "100%", label: "insured work with clear, honest quotes" },
];

const principles = [
  {
    num: "01",
    title: "Honesty over hype",
    copy: "Clear specs, real samples, and prices you can understand before a single plank is laid.",
  },
  {
    num: "02",
    title: "Every floor has a home",
    copy: "We match carpet, LVT, laminate, and wood to how you actually live — not just how a showroom looks.",
  },
  {
    num: "03",
    title: "Craft is the product",
    copy: "Substrate prep, neat thresholds, and tidy fitting protect beautiful floors for years.",
  },
  {
    num: "04",
    title: "Earn trust daily",
    copy: "Free measures, unhurried advice, and a team that treats your home with the same care as ours.",
  },
];

const stackCards = [
  {
    title: "Carpet & stair runners",
    copy: "Bespoke runners, rods, and full-room carpet fitted with care.",
  },
  {
    title: "LVT & vinyl",
    copy: "Waterproof wood-look planks for kitchens, halls, and busy rooms.",
  },
  {
    title: "Wood & laminate",
    copy: "Engineered oak, herringbone, and durable click systems.",
  },
];

export default function AboutPage() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (sampleImages.length < 2) return undefined;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % sampleImages.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="bg-canvas text-ink">
      {/* Hero — Synapse-style light intro */}
      <section className="relative overflow-hidden px-[5%] pt-32 pb-16 max-[640px]:px-[4%] sm:pt-36 sm:pb-20 lg:px-16">
        <div className="pointer-events-none absolute top-24 right-[8%] h-[320px] w-[320px] rounded-full bg-sand/80 blur-3xl" />
        <p className="mb-5 flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-brand-mid uppercase">
          <span className="h-px w-7 bg-brand" aria-hidden="true" />
          About Floortexa
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(40px,6.5vw,72px)] font-medium leading-[1.05] tracking-[-0.035em]">
          London&apos;s flooring specialists —
          <span className="text-brand-mid"> fitted with precision and care.</span>
        </h1>
        <div className="mt-8 max-w-2xl space-y-5 text-[16px] leading-[1.75] text-muted sm:text-[17px]">
          <p>
            Premium flooring installation across London and Essex — carpet, LVT, herringbone,
            laminate, and stair runners fitted with craft and honest advice.
          </p>
          <p>
            Floortexa Ltd was founded with a single purpose: to bring premium flooring to homes and
            businesses. Based in Dagenham, we&apos;ve spent over 15 years perfecting our craft —
            from hand-laid herringbone to precision-fitted stair runners.
          </p>
        </div>
      </section>

      {/* Stats cards strip */}
      <section className="px-[5%] pb-16 max-[640px]:px-[4%] lg:px-16">
        <div className="overflow-hidden rounded-[22px] border border-line bg-white">
          <div className="grid divide-y divide-line sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
            {stats.map((stat) => (
              <div key={stat.value} className="px-7 py-8 sm:px-8 sm:py-10">
                <p className="font-display text-[clamp(36px,4vw,48px)] font-medium leading-none tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + image */}
      <section className="grid items-center gap-10 px-[5%] py-10 max-[640px]:px-[4%] lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-16 lg:py-16">
        <div>
          <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-brand-mid uppercase">
            <span className="h-px w-7 bg-brand" aria-hidden="true" />
            Our story
          </p>
          <h2 className="max-w-xl font-display text-[clamp(30px,4vw,46px)] font-medium leading-[1.1] tracking-tight">
            Built on craft, trust, and attention to detail
          </h2>
          <div className="mt-6 space-y-4 text-[16px] leading-[1.75] text-muted">
            <p>
              Every project we take on is treated as if it were our own home. We survey, advise, and
              fit — giving you a clear, honest quote before a single plank is laid. No hidden costs,
              no shortcuts.
            </p>
            <p>
              From showroom samples to rooms that feel finished, Floortexa helps you compare
              materials in your own light, then supply and fit across London and Essex.
            </p>
          </div>
        </div>
        <div className="overflow-hidden rounded-md border border-line bg-sand shadow-[0_12px_30px_rgba(27,25,23,0.08)]">
          <img
            key={sampleImages[slide % sampleImages.length]}
            src={sampleImages[slide % sampleImages.length]}
            alt="Floortexa showroom and flooring samples"
            className="aspect-[4/3] h-full w-full object-cover [animation:heroFade_0.7s_ease_both]"
          />
        </div>
      </section>

      {/* How we work — 2x2 bordered grid */}
      <section className="px-[5%] py-16 max-[640px]:px-[4%] sm:py-20 lg:px-16">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-brand-mid uppercase">
          <span className="h-px w-7 bg-brand" aria-hidden="true" />
          How we work
        </p>
        <h2 className="mb-10 max-w-xl font-display text-[clamp(30px,4vw,46px)] font-medium leading-[1.1] tracking-tight">
          Four ideas we keep coming back to
        </h2>
        <div className="overflow-hidden rounded-[22px] border border-line bg-white">
          <div className="grid md:grid-cols-2">
            {principles.map((item, index) => (
              <article
                key={item.num}
                className={`px-7 py-9 sm:px-9 sm:py-11 ${
                  index % 2 === 0 ? "md:border-r md:border-line" : ""
                } ${index < 2 ? "border-b border-line" : ""}`}
              >
                <p className="text-[13px] font-bold tracking-[0.14em] text-brand-mid">{item.num}</p>
                <h3 className="mt-4 font-display text-[22px] font-semibold tracking-tight sm:text-[24px]">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stacked cards — cards behind, big CTA card on top */}
      <section className="relative px-[5%] pt-10 pb-24 max-[640px]:px-[4%] sm:pt-14 sm:pb-32 lg:px-16">
        <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-brand-mid uppercase">
          <span className="h-px w-7 bg-brand" aria-hidden="true" />
          What we fit
        </p>
        <h2 className="mb-10 max-w-xl font-display text-[clamp(30px,4vw,46px)] font-medium leading-[1.1] tracking-tight">
          Every floor, every finish
        </h2>

        {/* Back row of cards */}
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {stackCards.map((card, index) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-md border border-line bg-white shadow-[0_12px_30px_rgba(27,25,23,0.06)]"
            >
              <div className="aspect-[16/10] overflow-hidden bg-sand">
                <img
                  key={sampleImages[(slide + index) % sampleImages.length]}
                  src={sampleImages[(slide + index) % sampleImages.length]}
                  alt=""
                  className="h-full w-full object-cover [animation:heroFade_0.7s_ease_both]"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-[18px] font-semibold tracking-tight">{card.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{card.copy}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Overlapping front card */}
        <div className="relative z-[1] -mt-10 sm:-mt-14 md:-mt-16">
          <div className="mx-auto max-w-4xl rounded-lg border border-line bg-white px-7 py-10 shadow-[0_28px_60px_rgba(27,25,23,0.14)] sm:px-12 sm:py-12">
            <h2 className="max-w-2xl font-display text-[clamp(28px,4vw,44px)] font-medium leading-[1.12] tracking-tight">
              Ready to transform your floors?
            </h2>
            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
              Book a free home survey — we&apos;ll measure up, advise on materials, and give you a
              clear, itemised quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button as={Link} to="/contact" className="!rounded-md !px-6">
                Contact us
                <ArrowRight size={16} />
              </Button>
              <Button as={Link} to="/projects" variant="outline" className="!rounded-md !px-6">
                View projects
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
