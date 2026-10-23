import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Layers } from "lucide-react";
import { mediaUrl } from "../../lib/api";
import { cn } from "../../lib/cn";

export function CategoryCard({ category, index = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      style={{ transitionDelay: visible ? `${Math.min(index % 3, 2) * 90}ms` : "0ms" }}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <Link to={`/categories/${category.id}`} className="group flex flex-col gap-6">
        <div className="aspect-[3/2] w-full overflow-hidden rounded-xl bg-sand">
          {category.image ? (
            <img
              src={mediaUrl(category.image)}
              alt={category.title}
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-line" />
          )}
        </div>

        <div className="flex flex-col gap-2.5">
          <h2 className="font-display text-[clamp(20px,1.7vw,24px)] font-medium leading-[1.25] tracking-tight text-ink">
            {category.title}
          </h2>
          {category.description ? (
            <p className="line-clamp-2 text-[14px] leading-relaxed text-muted">{category.description}</p>
          ) : (
            <p className="inline-flex items-center gap-1.5 text-[14px] text-muted">
              <Layers size={14} className="shrink-0 opacity-80" />
              Flooring category
            </p>
          )}
          <ul className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink/70">
            <li className="inline-flex items-center gap-2">
              <ArrowUpRight size={14} className="opacity-70" />
              Browse products
            </li>
          </ul>
        </div>
      </Link>
    </article>
  );
}
