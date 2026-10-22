import { Pill } from "../components/ui/Pill";
import { CategoryCard } from "../components/category/CategoryCard";
import { useResourceList } from "../hooks/useResourceList";

export default function CategoriesPage() {
  const { items, loading, error } = useResourceList("categories", {
    limit: 50,
    sort: "title",
    direction: "asc",
  });

  return (
    <main className="bg-canvas px-[5%] pt-32 pb-20 max-[640px]:px-[4%]">
      <div className="mb-10 max-w-2xl">
        <Pill>CATEGORIES</Pill>
        <h1 className="mt-3.5 font-display text-[clamp(36px,5vw,56px)] font-medium tracking-tight">
          All flooring categories
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">
          Choose a category to browse every product assigned to it.
        </p>
      </div>
      {loading ? <p className="text-sm text-muted">Loading categories…</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </main>
  );
}
