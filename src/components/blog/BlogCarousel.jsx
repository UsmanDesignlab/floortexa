import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";

export function BlogCarousel({ blogs }) {
  const slides = blogs.slice(0, 3);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!slides.length) return null;

  return (
    <section className="border-t border-line bg-canvas px-[5%] py-[90px] max-[640px]:px-[4%]">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-xl">
          <Pill>JOURNAL</Pill>
          <h2 className="mt-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">
            Latest from the studio
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-muted">
            Perspectives on marble, tile, timber, and install craft.
          </p>
        </div>
        <Button as={Link} to="/blogs" variant="outline">
          View all blogs
        </Button>
      </div>

      <div className="relative">
        <BlogCard blog={slides[active]} featured />
        {slides.length > 1 ? (
          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((blog, index) => (
                <button
                  key={blog.id}
                  type="button"
                  aria-label={`Show blog ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={
                    active === index
                      ? "h-2.5 w-8 rounded-full bg-brand"
                      : "h-2.5 w-2.5 rounded-full bg-line"
                  }
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous blog"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white"
                onClick={() => setActive((current) => (current - 1 + slides.length) % slides.length)}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Next blog"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white"
                onClick={() => setActive((current) => (current + 1) % slides.length)}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
