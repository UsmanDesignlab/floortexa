import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
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
  const related = others.filter((item) => item.id !== id).slice(0, 4);

  return (
    <main className="bg-ink text-white">
      {loading ? <p className="px-[5%] pt-32 text-sm text-white/60">Loading project…</p> : null}
      {error ? <p className="px-[5%] pt-32 text-sm text-red-300">{error}</p> : null}

      {project ? (
        <>
          <section className="relative min-h-[100svh] overflow-hidden">
            {hero ? (
              <img
                src={mediaUrl(hero)}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-ink" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/35" />

            <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-[5%] py-28 max-[640px]:px-[4%]">
              <Link
                to="/projects"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
              >
                <ArrowLeft size={16} /> Back
              </Link>

              <div className="flex flex-wrap items-end justify-between gap-4 pb-4">
                <p className="inline-flex items-center gap-1.5 text-[14px] text-white/85">
                  <MapPin size={15} />
                  {project.location}
                </p>
                {project.category_title ? (
                  <span className="rounded-full border border-white/25 bg-black/35 px-4 py-1.5 text-xs font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-md">
                    {project.category_title}
                  </span>
                ) : null}
              </div>
            </div>
          </section>

          <section className="px-[5%] py-16 max-[640px]:px-[4%] sm:py-20">
            <h1 className="font-display text-[clamp(36px,6vw,64px)] font-medium leading-[1.05] tracking-[-0.04em]">
              {project.title}
            </h1>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[15px] text-white/60">
              <MapPin size={14} />
              {project.location}
            </p>

            <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              <div>
                <h2 className="font-display text-[clamp(28px,3vw,40px)] font-medium tracking-tight">
                  Overview
                </h2>
                <p className="mt-5 text-[16px] leading-[1.75] text-white/70">
                  {project.description}
                </p>
              </div>

              <dl className="divide-y divide-white/12 border-y border-white/12">
                {[
                  { label: "Location", value: project.location },
                  { label: "Flooring", value: project.category_title || "Bespoke finish" },
                  { label: "Scope", value: "Supply & professional fit" },
                  { label: "Finish", value: "Measured, prepared, installed" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-6 py-5 text-[15px]"
                  >
                    <dt className="text-white/55">{row.label}</dt>
                    <dd className="text-right font-medium text-white">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {(project.before_image || project.after_image) && (
            <section className="px-[5%] pb-16 max-[640px]:px-[4%] sm:pb-20">
              <h2 className="mb-8 font-display text-[clamp(28px,3vw,40px)] font-medium tracking-tight">
                Gallery
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {project.before_image ? (
                  <figure className="overflow-hidden rounded-2xl">
                    <img
                      src={mediaUrl(project.before_image)}
                      alt={`${project.title} before`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="mt-3 text-xs font-bold tracking-[0.12em] text-white/50 uppercase">
                      Before
                    </figcaption>
                  </figure>
                ) : null}
                {project.after_image ? (
                  <figure className="overflow-hidden rounded-2xl">
                    <img
                      src={mediaUrl(project.after_image)}
                      alt={`${project.title} after`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <figcaption className="mt-3 text-xs font-bold tracking-[0.12em] text-white/50 uppercase">
                      After
                    </figcaption>
                  </figure>
                ) : null}
              </div>
            </section>
          )}

          {related.length > 0 ? (
            <section className="border-t border-white/10 px-[5%] py-16 max-[640px]:px-[4%] sm:py-20">
              <h2 className="mb-8 font-display text-[clamp(28px,3vw,40px)] font-medium tracking-tight">
                Other projects
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {related.map((item) => {
                  const thumb = item.after_image || item.before_image;
                  return (
                    <Link
                      key={item.id}
                      to={`/projects/${item.id}`}
                      className="group relative min-h-[260px] overflow-hidden rounded-2xl bg-white/5"
                    >
                      {thumb ? (
                        <img
                          src={mediaUrl(thumb)}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                        <div>
                          <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                          <p className="mt-1 text-sm text-white/70">{item.location}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-white/90">
                          Explore <ArrowUpRight size={14} />
                        </span>
                      </div>
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
