import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ArrowUpRight, Layers, MapPin, Ruler } from "lucide-react";
import { Button } from "../components/ui/Button";
import { sampleImages } from "../data/sampleImages";
import { mediaUrl } from "../lib/api";
import { useResourceList } from "../hooks/useResourceList";

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

export default function AboutPage() {
  const { openContact } = useOutletContext();
  const [slide, setSlide] = useState(0);
  const { items: projects, loading: projectsLoading } = useResourceList("projects", {
    limit: 3,
    sort: "created_at",
    direction: "desc",
  });

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
        <div className="overflow-hidden rounded-lg border border-line bg-white">
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
        <div className="overflow-hidden rounded-lg border border-line bg-white">
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

      {/* Projects — same style as project detail "Other projects" */}
      <section className="border-t border-line px-[5%] py-16 max-[640px]:px-[4%] sm:py-24 lg:px-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] text-brand-mid uppercase">
              <span className="h-px w-7 bg-brand" aria-hidden="true" />
              Projects
            </p>
            <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight text-ink">
              Recent projects
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="button" onClick={openContact} className="!rounded-md !px-5 !py-2.5 !text-sm">
              Contact us
            </Button>
            <Button
              as={Link}
              to="/projects"
              variant="outline"
              className="!rounded-md !px-5 !py-2.5 !text-sm"
            >
              See all projects <ArrowUpRight size={15} />
            </Button>
          </div>
        </div>

        {projectsLoading ? <p className="text-sm text-muted">Loading projects…</p> : null}
        {!projectsLoading && projects.length === 0 ? (
          <p className="text-sm text-muted">No projects yet.</p>
        ) : null}

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {projects.map((item) => {
            const thumb = item.after_image || item.before_image;
            return (
              <Link key={item.id} to={`/projects/${item.id}`} className="group block">
                <div className="overflow-hidden rounded-xl bg-sand">
                  <div className="aspect-[16/11] overflow-hidden">
                    {thumb ? (
                      <img
                        src={mediaUrl(thumb)}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full w-full bg-line" />
                    )}
                  </div>
                </div>
                <h3 className="mt-5 font-display text-[20px] font-medium leading-snug tracking-tight text-ink sm:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted">
                  <MapPin size={13} />
                  {item.location || "London & Essex"}
                </p>
                <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-ink/70">
                  {item.category_title ? (
                    <li className="inline-flex items-center gap-1.5">
                      <Layers size={13} className="opacity-70" />
                      {item.category_title}
                    </li>
                  ) : null}
                  <li className="inline-flex items-center gap-1.5">
                    <Ruler size={13} className="opacity-70" />
                    Supply &amp; fit
                  </li>
                </ul>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
