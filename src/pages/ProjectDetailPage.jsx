import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Layers, MapPin, Ruler, Sparkles } from "lucide-react";
import { mediaUrl } from "../lib/api";
import { useResource } from "../hooks/useResource";
import { useResourceList } from "../hooks/useResourceList";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { item: project, loading, error } = useResource("projects", id);
  const { items: others } = useResourceList("projects", {
    limit: 8,
    sort: "created_at",
    direction: "desc",
  });

  const hero = project?.after_image || project?.before_image;
  const related = others.filter((item) => item.id !== id).slice(0, 3);

  return (
    <main className="bg-black text-white">
      {loading ? <p className="px-[5%] pt-32 text-sm text-white/50">Loading project…</p> : null}
      {error ? <p className="px-[5%] pt-32 text-sm text-red-300">{error}</p> : null}

      {project ? (
        <>
          {/* Hero — Nuvarsa style */}
          <section className="relative min-h-[100svh] overflow-hidden">
            {hero ? (
              <img
                src={mediaUrl(hero)}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-black" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />

            <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-[5%] py-28 max-[640px]:px-[4%]">
              <Link
                to="/projects"
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
              >
                <ArrowLeft size={16} /> Back
              </Link>

              <div className="pb-2">
                <p className="inline-flex items-center gap-1.5 text-[14px] text-white/85">
                  <MapPin size={15} />
                  {project.location}
                </p>
              </div>
            </div>
          </section>

          {/* Title + overview */}
          <section className="px-[5%] py-16 max-[640px]:px-[4%] sm:py-20">
            <h1 className="max-w-4xl font-display text-[clamp(36px,6.5vw,68px)] font-medium leading-[1.02] tracking-[-0.04em]">
              {project.title}
            </h1>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[15px] text-white/50">
              <MapPin size={14} />
              {project.location}
            </p>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight">
                  Overview
                </h2>
                <p className="mt-5 whitespace-pre-wrap text-[16px] leading-[1.8] text-white/60">
                  {project.description}
                </p>
              </div>

              <dl className="divide-y divide-white/10 border-y border-white/10 self-start">
                {[
                  { icon: MapPin, label: "Location", value: project.location },
                  {
                    icon: Layers,
                    label: "Flooring",
                    value: project.category_title || "Bespoke finish",
                  },
                  { icon: Ruler, label: "Scope", value: "Supply & professional fit" },
                  { icon: Sparkles, label: "Finish", value: "Measured, prepared, installed" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-6 py-5 text-[15px]"
                  >
                    <dt className="inline-flex items-center gap-2.5 text-white/50">
                      <row.icon size={16} className="opacity-70" />
                      {row.label}
                    </dt>
                    <dd className="text-right font-medium text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* Gallery */}
          {(project.before_image || project.after_image) && (
            <section className="px-[5%] pb-16 max-[640px]:px-[4%] sm:pb-24">
              <h2 className="mb-8 font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight">
                Gallery
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {project.before_image ? (
                  <figure>
                    <div className="overflow-hidden rounded-[20px]">
                      <img
                        src={mediaUrl(project.before_image)}
                        alt={`${project.title} before`}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 text-xs font-semibold tracking-[0.12em] text-white/40 uppercase">
                      Before
                    </figcaption>
                  </figure>
                ) : null}
                {project.after_image ? (
                  <figure>
                    <div className="overflow-hidden rounded-[20px]">
                      <img
                        src={mediaUrl(project.after_image)}
                        alt={`${project.title} after`}
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    <figcaption className="mt-3 text-xs font-semibold tracking-[0.12em] text-white/40 uppercase">
                      After
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </section>
          )}

          {/* Other projects — Nuvarsa style */}
          {related.length > 0 ? (
            <section className="border-t border-white/10 px-[5%] py-16 max-[640px]:px-[4%] sm:py-24">
              <h2 className="mb-10 font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight">
                Other projects
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {related.map((item) => {
                  const thumb = item.after_image || item.before_image;
                  return (
                    <Link key={item.id} to={`/projects/${item.id}`} className="group block">
                      <div className="overflow-hidden rounded-[18px] bg-white/5">
                        <div className="aspect-[16/11] overflow-hidden">
                          {thumb ? (
                            <img
                              src={mediaUrl(thumb)}
                              alt={item.title}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full bg-white/10" />
                          )}
                        </div>
                      </div>
                      <h3 className="mt-5 font-display text-[20px] font-medium leading-snug tracking-tight text-white sm:text-[22px]">
                        {item.title}
                      </h3>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-white/50">
                        <MapPin size={13} />
                        {item.location}
                      </p>
                      <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-white/65">
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
          ) : null}
        </>
      ) : null}
    </main>
  );
}
