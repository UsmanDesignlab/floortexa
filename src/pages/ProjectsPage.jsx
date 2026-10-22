import { Pill } from "../components/ui/Pill";
import { ProjectCard } from "../components/project/ProjectCard";
import { useResourceList } from "../hooks/useResourceList";

export default function ProjectsPage() {
  const { items, loading, error } = useResourceList("projects", {
    limit: 50,
    sort: "created_at",
    direction: "desc",
  });

  return (
    <main className="bg-canvas px-[5%] pt-32 pb-20 max-[640px]:px-[4%]">
      <div className="mb-10 max-w-2xl">
        <Pill>PROJECTS</Pill>
        <h1 className="mt-3.5 font-display text-[clamp(36px,5vw,56px)] font-medium tracking-tight">
          Completed flooring projects
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">
          Before-and-after installs with location, category, and project notes from the Floortex team.
        </p>
      </div>
      {loading ? <p className="text-sm text-muted">Loading projects…</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="grid gap-6">
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </main>
  );
}
