import { AnimatedTitle } from "../components/ui/AnimatedTitle";
import { BlogCard } from "../components/blog/BlogCard";
import { useResourceList } from "../hooks/useResourceList";

export default function BlogsPage() {
  const { items, loading, error } = useResourceList("blogs", {
    limit: 50,
    sort: "created_at",
    direction: "desc",
  });

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <section className="px-[5%] pt-28 pb-12 max-[640px]:px-[4%] max-[640px]:pt-24 sm:pt-32 sm:pb-14 lg:px-16">
        <AnimatedTitle text="Our Journal" />
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
          Guides and studio notes on carpet, LVT, laminate, wood floors, and fitting across Essex.
        </p>
      </section>

      <section className="px-[5%] pb-24 max-[640px]:px-[4%] sm:pb-32 lg:px-16">
        {loading ? <p className="text-sm text-muted">Loading blogs…</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {!loading && !error && items.length === 0 ? (
          <p className="text-sm text-muted">No published blogs yet.</p>
        ) : null}

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-[30px]">
          {items.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
