import { useEffect, useRef, useState } from "react";
import { ProjectStackCard } from "../components/project/ProjectStackCard";
import { useResourceList } from "../hooks/useResourceList";

export default function ProjectsPage() {
  const { items, loading, error } = useResourceList("projects", {
    limit: 50,
    sort: "created_at",
    direction: "desc",
  });
  const [activeId, setActiveId] = useState(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!items.length) return undefined;
    setActiveId((current) => current || items[0]?.id);

    const nodes = listRef.current?.querySelectorAll("[data-project-id]");
    if (!nodes?.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target) {
          setActiveId(visible.target.getAttribute("data-project-id"));
        }
      },
      { threshold: [0.35, 0.55, 0.7], rootMargin: "-10% 0px -10% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [items]);

  return (
    <main className="bg-ink text-white">
      <section className="px-[5%] pt-32 pb-16 max-[640px]:px-[4%] max-[640px]:pt-28">
        <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-white/55 uppercase">
          Our Projects
        </p>
        <h1 className="max-w-4xl font-display text-[clamp(40px,7vw,72px)] font-medium leading-[1.02] tracking-[-0.04em]">
          Our Projects
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/65">
          Explore flooring transformations across Essex and London — carpet, LVT, laminate,
          herringbone, and stair runners fitted with care.
        </p>
      </section>

      {loading ? (
        <p className="px-[5%] pb-20 text-sm text-white/60">Loading projects…</p>
      ) : null}
      {error ? <p className="px-[5%] pb-20 text-sm text-red-300">{error}</p> : null}

      {!loading && !error && items.length === 0 ? (
        <p className="px-[5%] pb-20 text-sm text-white/60">
          No projects yet. Add completed installs in admin.
        </p>
      ) : null}

      <div ref={listRef} className="snap-y snap-mandatory">
        {items.map((project) => (
          <div key={project.id} data-project-id={project.id}>
            <ProjectStackCard project={project} active={activeId === project.id} />
          </div>
        ))}
      </div>
    </main>
  );
}
