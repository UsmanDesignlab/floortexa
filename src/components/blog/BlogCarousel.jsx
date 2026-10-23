import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { mediaUrl } from "../../lib/api";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toUpperCase();
}

function FeaturedSlide({ blog }) {
  if (!blog) return null;
  return (
    <Link
      to={`/blogs/${blog.id}`}
      className="group grid overflow-hidden rounded-2xl border border-line bg-white md:grid-cols-2"
    >
      <div className="relative min-h-[260px] bg-sand sm:min-h-[320px] md:min-h-[380px]">
        {blog.cover_image ? (
          <img
            src={mediaUrl(blog.cover_image)}
            alt={blog.title}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="eager"
          />
        ) : null}
      </div>
      <div className="flex flex-col justify-center px-7 py-8 sm:px-10 sm:py-12 md:px-12">
        <p className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">
          {formatDate(blog.publish_date || blog.created_at)}
        </p>
        <h3 className="font-display text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.15] tracking-tight text-ink">
          {blog.title}
        </h3>
        {blog.summary ? (
          <p className="mt-4 line-clamp-3 text-[15px] leading-relaxed text-muted sm:text-base">
            {blog.summary}
          </p>
        ) : null}
      </div>
    </Link>
  );
}

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
      <span className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[#2f6f4e] transition group-hover:gap-2">
        Read post <ArrowUpRight size={15} />
      </span>
    </Link>
  );
}

export function BlogCarousel({ blogs, loading = false }) {
  const featuredSlides = blogs.slice(0, 3);
  const cardPosts = blogs.slice(0, 3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (featuredSlides.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % featuredSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [featuredSlides.length]);

  return (
    <section className={cn(reveal, "border-t border-line bg-canvas px-[5%] py-[90px] max-[640px]:px-[4%]")}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="m-0 max-w-xl text-[15px] leading-relaxed text-muted sm:text-[16px]">
          Practical advice on carpet, LVT, laminate, wood floors, and fitting.
        </p>
        <Link
          to="/blogs"
          className="text-[14px] font-semibold text-ink underline-offset-4 transition hover:underline"
        >
          View all blogs
        </Link>
      </div>

      {loading ? <p className="text-sm text-muted">Loading blogs…</p> : null}

      {!loading && blogs.length === 0 ? (
        <p className="rounded-md border border-line bg-white px-5 py-6 text-sm text-muted">
          No published blogs yet. In admin, open the blog and set Status to <strong>Published</strong>.
        </p>
      ) : null}

      {featuredSlides.length > 0 ? (
        <div className="relative">
          <FeaturedSlide blog={featuredSlides[active]} />
          {featuredSlides.length > 1 ? (
            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                {featuredSlides.map((blog, index) => (
                  <button
                    key={blog.id}
                    type="button"
                    aria-label={`Show blog ${index + 1}`}
                    onClick={() => setActive(index)}
                    className={
                      active === index
                        ? "h-2 w-7 rounded-full bg-ink"
                        : "h-2 w-2 rounded-full bg-line"
                    }
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous blog"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white"
                  onClick={() =>
                    setActive((current) => (current - 1 + featuredSlides.length) % featuredSlides.length)
                  }
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next blog"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white"
                  onClick={() => setActive((current) => (current + 1) % featuredSlides.length)}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {cardPosts.length > 0 ? (
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {cardPosts.map((blog) => (
            <PostCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
