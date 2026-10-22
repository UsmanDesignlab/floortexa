import { Pill } from "../components/ui/Pill";
import { BlogCard } from "../components/blog/BlogCard";
import { useResourceList } from "../hooks/useResourceList";

export default function BlogsPage() {
  const { items, loading, error } = useResourceList("blogs", {
    limit: 50,
    sort: "created_at",
    direction: "desc",
  });
  const [featured, ...rest] = items;

  return (
    <main className="bg-canvas px-[5%] pt-32 pb-20 max-[640px]:px-[4%]">
      <div className="mb-12 max-w-2xl">
        <Pill>BLOGS</Pill>
        <h1 className="mt-3.5 font-display text-[clamp(36px,5vw,56px)] font-medium tracking-tight">
          Floortex journal
        </h1>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">
          Guides and studio notes on materials, install craft, and living with beautiful floors.
        </p>
      </div>

      {loading ? <p className="text-sm text-muted">Loading blogs…</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {featured ? (
        <div className="mb-8">
          <BlogCard blog={featured} featured />
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </main>
  );
}
