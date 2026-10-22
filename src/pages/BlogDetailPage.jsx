import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { mediaUrl } from "../lib/api";
import { useResource } from "../hooks/useResource";
import { Pill } from "../components/ui/Pill";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const { item: blog, loading, error } = useResource("blogs", id);

  return (
    <main className="bg-canvas pb-20">
      <article className="mx-auto max-w-[820px] px-[5%] pt-32 max-[640px]:px-[4%]">
        <Link to="/blogs" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-brand">
          <ArrowLeft size={16} /> All blogs
        </Link>
        {loading ? <p className="text-sm text-muted">Loading article…</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {blog ? (
          <>
            <Pill>ARTICLE</Pill>
            <p className="mt-4 text-[11px] font-bold tracking-[0.12em] text-muted uppercase">
              {formatDate(blog.publish_date || blog.created_at)}
            </p>
            <h1 className="mt-3 font-display text-[clamp(36px,5vw,56px)] font-semibold leading-[1.1] tracking-tight text-ink">
              {blog.title}
            </h1>
            {blog.summary ? (
              <p className="mt-5 text-xl leading-relaxed text-muted">{blog.summary}</p>
            ) : null}
            {blog.cover_image ? (
              <img
                src={mediaUrl(blog.cover_image)}
                alt={blog.title}
                className="mt-10 h-[min(420px,50vw)] w-full rounded-2xl object-cover"
              />
            ) : null}
            <div
              className="prose-storefront mt-10 space-y-4 text-[17px] leading-[1.75] text-ink [&_a]:text-brand [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-2xl [&_li]:ml-5 [&_ol]:list-decimal [&_p]:text-muted [&_ul]:list-disc"
              dangerouslySetInnerHTML={{ __html: blog.content || "" }}
            />
          </>
        ) : null}
      </article>
    </main>
  );
}
