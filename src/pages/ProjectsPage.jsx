import { ProjectStackCard } from "../components/project/ProjectStackCard";
import { useResourceList } from "../hooks/useResourceList";

export default function ProjectsPage() {
  const { items, loading, error } = useResourceList("projects", {
    limit: 50,
    sort: "created_at",
    direction: "desc",
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-[5%] pt-32 pb-14 max-[640px]:px-[4%] max-[640px]:pt-28 sm:pb-20">
        <h1 className="max-w-5xl font-display text-[clamp(42px,8vw,80px)] font-medium leading-[0.98] tracking-[-0.045em]">
          Our Projects
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/55 sm:text-[18px]">
          Explore flooring transformations across Essex and London — carpet, LVT, laminate,
          herringbone, and stair runners fitted with care.
        </p>
      </section>

      <section className="mx-auto max-w-[1180px] space-y-16 px-[5%] pb-24 max-[640px]:px-[4%] sm:space-y-24 sm:pb-32">
        {loading ? <p className="text-sm text-white/50">Loading projects…</p> : null}
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        {!loading && !error && items.length === 0 ? (
          <p className="text-sm text-white/50">No projects yet. Add completed installs in admin.</p>
        ) : null}

        {items.map((project) => (
          <ProjectStackCard key={project.id} project={project} />
        ))}
      </section>
    </main>
  );
}
