import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers, MapPin, Ruler } from "lucide-react";
import { mediaUrl } from "../../lib/api";
import { cn } from "../../lib/cn";

export function ProjectStackCard({ project }) {
  const image = project.after_image || project.before_image;
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={cn(
        "transition duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
      )}
    >
      <Link to={`/projects/${project.id}`} className="group block">
        <div className="relative overflow-hidden rounded-[22px] bg-white/5">
          <div className="aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
            {image ? (
              <img
                src={mediaUrl(image)}
                alt={project.title}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-white/10" />
            )}
          </div>
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md transition group-hover:border-white/40 group-hover:bg-black/65 sm:right-5 sm:bottom-5">
            Explore <ArrowUpRight size={15} />
          </span>
        </div>

        <div className="mt-6 px-0.5 sm:mt-7">
          <h2 className="font-display text-[clamp(26px,3.2vw,40px)] font-medium leading-[1.1] tracking-tight text-white">
            {project.title}
          </h2>
          <p className="mt-2.5 inline-flex items-center gap-1.5 text-[14px] text-white/55">
            <MapPin size={14} />
            {project.location || "London & Essex"}
          </p>
          <ul className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-white/70">
            {project.category_title ? (
              <li className="inline-flex items-center gap-2">
                <Layers size={14} className="opacity-70" />
                {project.category_title}
              </li>
            ) : null}
            <li className="inline-flex items-center gap-2">
              <Ruler size={14} className="opacity-70" />
              Supply &amp; fit
            </li>
          </ul>
        </div>
      </Link>
    </article>
  );
}
