import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { mediaUrl } from "../../lib/api";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function BlogCard({ blog, featured = false }) {
  return (
    <Link
      to={`/blogs/${blog.id}`}
      className={
        featured
          ? "group grid overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_rgba(27,25,23,0.06)] md:grid-cols-[1.15fr_0.85fr]"
          : "group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(27,25,23,0.08)]"
      }
    >
      <div className={featured ? "min-h-[280px] bg-sand md:min-h-full" : "aspect-[16/10] bg-sand"}>
        {blog.cover_image ? (
          <img
            src={mediaUrl(blog.cover_image)}
            alt={blog.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className={featured ? "flex flex-col justify-center p-8 md:p-10" : "flex flex-1 flex-col p-6"}>
        <p className="mb-3 text-[11px] font-bold tracking-[0.12em] text-muted uppercase">
          {formatDate(blog.publish_date || blog.created_at)}
        </p>
        <h3
          className={
            featured
              ? "font-display text-[clamp(28px,3.5vw,40px)] font-semibold leading-[1.15] tracking-tight text-ink"
              : "font-display text-xl font-semibold leading-snug tracking-tight text-ink"
          }
        >
          {blog.title}
        </h3>
        {blog.summary ? (
          <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">{blog.summary}</p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Read article <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  );
}
