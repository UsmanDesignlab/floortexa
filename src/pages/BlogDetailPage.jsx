import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, Sparkles } from "lucide-react";
import { mediaUrl } from "../lib/api";
import { useResource } from "../hooks/useResource";
import { useResourceList } from "../hooks/useResourceList";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", { month: "long", day: "numeric", year: "numeric" });
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const { item: blog, loading, error } = useResource("blogs", id);
  const { items: others } = useResourceList("blogs", {
    limit: 8,
    sort: "created_at",
    direction: "desc",
  });

  const hero = blog?.cover_image;
  const related = others.filter((item) => item.id !== id).slice(0, 3);
  const dateLabel = formatDate(blog?.publish_date || blog?.created_at);

  return (
    <main className="bg-canvas text-ink">
      {loading ? <p className="px-[5%] pt-32 text-sm text-muted">Loading article…</p> : null}
      {error ? <p className="px-[5%] pt-32 text-sm text-red-600">{error}</p> : null}

      {blog ? (
        <>
          <div className="relative z-[1] shadow-[0_24px_50px_rgba(0,0,0,0.22)]">
            <section className="relative min-h-[100svh] overflow-hidden">
              {hero ? (
                <img
                  src={mediaUrl(hero)}
                  alt={blog.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-sand" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />

              <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-[5%] py-28 max-[640px]:px-[4%]">
                <Link
                  to="/blogs"
                  className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
                >
                  <ArrowLeft size={16} /> Back
                </Link>

                <div className="pb-2">
                  {dateLabel ? (
                    <p className="inline-flex items-center gap-1.5 text-[14px] text-white/90">
                      <Calendar size={15} />
                      {dateLabel}
                    </p>
                  ) : null}
                </div>
              </div>
            </section>
          </div>

          <section className="px-[5%] py-16 max-[640px]:px-[4%] sm:py-20">
            <h1 className="max-w-4xl font-display text-[clamp(36px,6.5vw,68px)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">
              {blog.title}
            </h1>
            {dateLabel ? (
              <p className="mt-3 inline-flex items-center gap-1.5 text-[15px] text-muted">
                <Calendar size={14} />
                {dateLabel}
              </p>
            ) : null}

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight text-ink">
                  Overview
                </h2>
                <p className="mt-5 whitespace-pre-wrap text-[16px] leading-[1.8] text-muted">
                  {blog.summary || "Practical flooring advice from the Floortex studio."}
                </p>
              </div>

              <dl className="divide-y divide-line border-y border-line self-start">
                {[
                  { icon: Calendar, label: "Published", value: dateLabel || "—" },
                  { icon: FileText, label: "Type", value: "Journal article" },
                  { icon: Sparkles, label: "Focus", value: "Materials & fitting" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-6 py-5 text-[15px]"
                  >
                    <dt className="inline-flex items-center gap-2.5 text-muted">
                      <row.icon size={16} className="opacity-70" />
                      {row.label}
                    </dt>
                    <dd className="text-right font-medium text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {blog.content ? (
            <section className="px-[5%] pb-16 max-[640px]:px-[4%] sm:pb-24">
              <h2 className="mb-8 font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight text-ink">
                Article
              </h2>
              <div
                className="max-w-3xl space-y-4 text-[17px] leading-[1.75] text-ink [&_a]:text-brand [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-2xl [&_li]:ml-5 [&_ol]:list-decimal [&_p]:text-muted [&_ul]:list-disc"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </section>
          ) : null}

          {related.length > 0 ? (
            <section className="border-t border-line px-[5%] py-16 max-[640px]:px-[4%] sm:py-24">
              <h2 className="mb-10 font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight text-ink">
                Other articles
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {related.map((item) => (
                  <Link key={item.id} to={`/blogs/${item.id}`} className="group block">
                    <div className="overflow-hidden rounded-xl bg-sand">
                      <div className="aspect-[16/11] overflow-hidden">
                        {item.cover_image ? (
                          <img
                            src={mediaUrl(item.cover_image)}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-line" />
                        )}
                      </div>
                    </div>
                    <h3 className="mt-5 font-display text-[20px] font-medium leading-snug tracking-tight text-ink sm:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted">
                      <Calendar size={13} />
                      {formatDate(item.publish_date || item.created_at)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
