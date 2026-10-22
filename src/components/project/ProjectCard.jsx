import { mediaUrl } from "../../lib/api";

export function ProjectCard({ project }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_14px_34px_rgba(27,25,23,0.05)]">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative min-h-[240px] bg-sand">
          {project.before_image || project.after_image ? (
            <img
              src={mediaUrl(project.after_image || project.before_image)}
              alt={project.title}
              className="h-full w-full object-cover"
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
            <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.description}</p>
          ) : null}
          {(project.before_image || project.after_image) && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {project.before_image ? (
                <div>
                  <p className="mb-1.5 text-[10px] font-bold tracking-[0.12em] text-muted uppercase">Before</p>
                  <img
                    src={mediaUrl(project.before_image)}
                    alt={`${project.title} before`}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                </div>
              ) : null}
              {project.after_image ? (
                <div>
                  <p className="mb-1.5 text-[10px] font-bold tracking-[0.12em] text-muted uppercase">After</p>
                  <img
                    src={mediaUrl(project.after_image)}
                    alt={`${project.title} after`}
                    className="h-24 w-full rounded-lg object-cover"
                  />
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
