import { AnimatedTitle } from "../components/ui/AnimatedTitle";
import { CategoryCard } from "../components/category/CategoryCard";
import { useResourceList } from "../hooks/useResourceList";

export default function CategoriesPage() {
  const { items, loading, error } = useResourceList("categories", {
    limit: 50,
    sort: "title",
    direction: "asc",
  });

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <section className="px-[5%] pt-28 pb-12 max-[640px]:px-[4%] max-[640px]:pt-24 sm:pt-32 sm:pb-14 lg:px-16">
        <AnimatedTitle text="Our Categories" />
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
          Choose a flooring category to browse every product — carpet, LVT, laminate, vinyl, and
          engineered wood.
        </p>
      </section>

      <section className="px-[5%] pb-24 max-[640px]:px-[4%] sm:pb-32 lg:px-16">
        {loading ? <p className="text-sm text-muted">Loading categories…</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {!loading && !error && items.length === 0 ? (
          <p className="text-sm text-muted">No categories yet. Add them in admin.</p>
        ) : null}

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-[30px]">
          {items.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
