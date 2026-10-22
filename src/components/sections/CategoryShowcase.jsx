import { Link } from "react-router-dom";
import { Pill } from "../ui/Pill";
import { Button } from "../ui/Button";
import { CategoryCard } from "../category/CategoryCard";
import { useResourceList } from "../../hooks/useResourceList";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function CategoryShowcase() {
  const { items, loading, error } = useResourceList("categories", {
    limit: 6,
    sort: "created_at",
    direction: "desc",
  });

  return (
    <section id="categories" className={cn(reveal, "border-t border-line bg-canvas px-[5%] py-[90px] max-[640px]:px-[4%]")}>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <Pill>CATEGORIES</Pill>
          <h2 className="mt-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">
            Explore by material family
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted">
            Large-format category cards — one after another — with imagery from the Floortex catalog.
          </p>
        </div>
        <Button as={Link} to="/categories" variant="outline">
          View all categories
        </Button>
      </div>

      {loading ? <p className="text-sm text-muted">Loading categories…</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {/* Stacked cards: one above the next (full-width on mobile, 1 col always) */}
      <div className="mx-auto flex max-w-4xl flex-col gap-5">
        {items.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
