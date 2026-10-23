import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Pill } from "../components/ui/Pill";
import { Button } from "../components/ui/Button";
import { photos } from "../data/content";

const values = [
  {
    title: "Material honesty",
    copy: "Clear specs, real samples, and finishes that photograph the way they live under your light.",
  },
  {
    title: "Install craft",
    copy: "Substrate prep, thresholds, and aftercare guidance that protect beautiful floors for years.",
  },
  {
    title: "Human pace",
    copy: "Private showroom walks, unhurried advice, and a team that respects how decisions actually happen at home.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-canvas">
      <section className="relative min-h-[70svh] overflow-hidden bg-ink text-white">
        <img src={photos.showroom} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/20" />
        <div className="relative z-[1] mx-auto flex min-h-[70svh] max-w-[1100px] flex-col justify-end px-[5%] pb-16 pt-36 max-[640px]:px-[4%]">
          <Pill light>ABOUT FLOORTEX</Pill>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(42px,7vw,72px)] font-medium leading-[1.05] tracking-tight">
            A flooring studio built around clarity, craft, and calm decisions.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            Floortex began with a simple problem: Essex homeowners needed honest flooring advice,
            samples that made sense in their own light, and fitters they could trust.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-10 px-[5%] py-20 md:grid-cols-[0.95fr_1.05fr] max-[640px]:px-[4%]">
        <div>
          <Pill>OUR STORY</Pill>
          <h2 className="mt-4 font-display text-[clamp(30px,4vw,44px)] font-medium tracking-tight">
            From showroom samples to rooms that feel finished.
          </h2>
        </div>
        <div className="space-y-5 text-[17px] leading-relaxed text-muted">
          <p>
            What started as a local flooring business grew into a complete Floortex experience —
            carpet, LVT, laminate, vinyl, and engineered wood with clear pricing and tidy fitting
            across Essex.
          </p>
          <p>
            Today we help homeowners and trade partners compare samples, book a free measure, and
            move from quote to fitted floor with fewer surprises.
          </p>
        </div>
      </section>

      <section className="bg-sand/50 px-[5%] py-20 max-[640px]:px-[4%]">
        <div className="mx-auto max-w-[1100px]">
          <Pill>WHAT WE BELIEVE</Pill>
          <h2 className="mt-4 mb-10 max-w-2xl font-display text-[clamp(30px,4vw,44px)] font-medium tracking-tight">
            Three principles that shape every Floortex visit.
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {values.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-white p-7">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] items-center gap-10 px-[5%] py-20 md:grid-cols-2 max-[640px]:px-[4%]">
        <img src={photos.villa} alt="Floortex interior" className="h-[420px] w-full rounded-2xl object-cover" />
        <div>
          <Pill>STUDIO PROMISE</Pill>
          <h2 className="mt-4 font-display text-[clamp(30px,4vw,44px)] font-medium tracking-tight">
            Built for real homes, not just mood boards.
          </h2>
          <ul className="mt-6 space-y-3">
            {[
              "Sample boards you can live with at home for a few days",
              "Clear guidance for carpet, LVT, laminate, vinyl, and wood",
              "Professional Essex fitters and aftercare that lasts",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-[15px] text-ink">
                <Check size={18} className="mt-0.5 shrink-0 text-brand" />
                {line}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as={Link} to="/contact">
              Schedule a showing
            </Button>
            <Button as={Link} to="/projects" variant="outline">
              View projects
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
