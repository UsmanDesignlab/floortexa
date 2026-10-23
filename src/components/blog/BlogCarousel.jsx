import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Pill } from "../ui/Pill";
import { mediaUrl } from "../../lib/api";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

function PostCard({ blog }) {
  return (
    <Link to={`/blogs/${blog.id}`} className="group flex flex-col">
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-sand">
        {blog.cover_image ? (
          <img
            src={mediaUrl(blog.cover_image)}
            alt={blog.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-[18px] font-semibold leading-snug tracking-tight text-ink sm:text-[20px]">
        {blog.title}
      </h3>
      <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink transition group-hover:gap-2">
        Read post <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}

export function BlogCarousel({ blogs, loading = false }) {
  const cardPosts = blogs.slice(0, 3);

  return (
    <section className={cn(reveal, "border-t border-line bg-canvas px-[5%] py-[90px] max-[640px]:px-[4%]")}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <Pill>JOURNAL</Pill>
          <h2 className="mt-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">
            Latest from the studio
          </h2>
          <p className="mt-3 m-0 text-[15px] leading-relaxed text-muted sm:text-[17px]">
            Practical advice on carpet, LVT, laminate, wood floors, and fitting.
          </p>
        </div>
        <Link
          to="/blogs"
          className="text-[14px] font-semibold text-ink underline-offset-4 transition hover:underline"
        >
          View all blogs
        </Link>
      </div>

      {loading ? <p className="text-sm text-muted">Loading blogs…</p> : null}

      {!loading && cardPosts.length === 0 ? (
        <p className="rounded-md border border-line bg-white px-5 py-6 text-sm text-muted">
          No published blogs yet. In admin, open the blog and set Status to <strong>Published</strong>.
        </p>
      ) : null}

      {cardPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {cardPosts.map((blog) => (
            <PostCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
