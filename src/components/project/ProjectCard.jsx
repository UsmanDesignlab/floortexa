import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { mediaUrl } from "../../lib/api";

export function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-[0_14px_34px_rgba(27,25,23,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(27,25,23,0.08)]"
    >
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative min-h-[240px] bg-sand">
          {project.before_image || project.after_image ? (
            <img
              src={mediaUrl(project.after_image || project.before_image)}
              alt={project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          ) : null}
        </div>
        <div className="flex flex-col justify-center p-6 md:p-8">
          {project.category_title ? (
            <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-brand uppercase">
              {project.category_title}
            </p>
          ) : null}
          <h3 className="font-display text-[28px] font-semibold tracking-tight text-ink">{project.title}</h3>
          {project.location ? (
            <p className="mt-2 text-sm font-semibold text-muted">{project.location}</p>
          ) : null}
          {project.description ? (
            <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-muted">{project.description}</p>
          ) : null}
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
            Explore <ArrowUpRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}
