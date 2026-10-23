import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { mediaUrl } from "../../lib/api";
import { cn } from "../../lib/cn";

export function ProjectStackCard({ project, active = false }) {
  const image = project.after_image || project.before_image;

  return (
    <section className="relative h-[100svh] snap-start snap-always">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden bg-ink">
        {image ? (
          <img
            src={mediaUrl(image)}
            alt={project.title}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition duration-700 ease-out",
              active ? "scale-100 opacity-100" : "scale-105 opacity-80",
            )}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-ink" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/20" />

        <div className="relative z-[1] flex w-full flex-col justify-end gap-6 px-[5%] pb-10 pt-28 max-[640px]:px-[4%] sm:flex-row sm:items-end sm:justify-between sm:pb-14">
          <div className="max-w-xl text-white">
            <p className="mb-2 inline-flex items-center gap-1.5 text-[13px] text-white/75">
              <MapPin size={14} />
              {project.location || "Essex · London"}
            </p>
            <h2 className="font-display text-[clamp(28px,4.5vw,48px)] font-semibold leading-[1.08] tracking-tight">
              {project.title}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-white/80">
              {project.category_title ? <li>{project.category_title}</li> : null}
              <li>Supply &amp; fit</li>
              <li>Professional install</li>
            </ul>
          </div>

          <Link
            to={`/projects/${project.id}`}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/25 bg-black/45 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-black/60 sm:self-auto"
          >
            Explore <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
