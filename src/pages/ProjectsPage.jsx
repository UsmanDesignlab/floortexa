import { useEffect, useState } from "react";
import { ProjectStackCard } from "../components/project/ProjectStackCard";
import { useResourceList } from "../hooks/useResourceList";
import { cn } from "../lib/cn";

function AnimatedTitle({ text }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <h1 className="max-w-5xl font-display text-[clamp(42px,6.5vw,72px)] font-medium leading-[0.98] tracking-[-0.03em]">
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={cn(
            "inline-block transition-[opacity,filter,transform] duration-500 ease-out",
            ready ? "translate-y-0 opacity-100 blur-0" : "translate-y-2 opacity-0 blur-[6px]",
          )}
          style={{ transitionDelay: `${80 + i * 45}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}

export default function ProjectsPage() {
  const { items, loading, error } = useResourceList("projects", {
    limit: 50,
    sort: "created_at",
    direction: "desc",
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-[5%] pt-28 pb-12 max-[640px]:px-[4%] max-[640px]:pt-24 sm:pt-32 sm:pb-14 lg:px-16">
        <AnimatedTitle text="Our Projects" />
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-white/55 sm:text-[17px]">
          Explore flooring transformations across Essex and London — carpet, LVT, laminate,
          herringbone, and stair runners fitted with care.
        </p>
      </section>

      <section className="px-[5%] pb-24 max-[640px]:px-[4%] sm:pb-32 lg:px-16">
        {loading ? <p className="text-sm text-white/50">Loading projects…</p> : null}
        {error ? <p className="text-sm text-red-300">{error}</p> : null}
        {!loading && !error && items.length === 0 ? (
          <p className="text-sm text-white/50">No projects yet. Add completed installs in admin.</p>
        ) : null}

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-[30px]">
          {items.map((project, index) => (
            <ProjectStackCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
