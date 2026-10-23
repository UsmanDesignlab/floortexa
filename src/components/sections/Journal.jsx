import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionHead } from "../ui/SectionHead";
import { journal } from "../../data/content";
import { reveal, revealChild } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function Journal() {
  return (
    <section id="journal" className={cn(reveal, "px-[5%] py-[90px] max-[640px]:px-[4%]")}>
      <SectionHead
        split
        pill="JOURNAL"
        title={<h2>Latest Flooring Journal</h2>}
        description={
          <p>Practical advice on carpet, LVT, laminate, wood floors, and fitting from Floortex.</p>
        }
        action={
          <Button as="a" href="#contact" variant="outline">
            More Articles
          </Button>
        }
      />
      <div className="grid grid-cols-3 gap-[18px] max-[980px]:grid-cols-1">
        {journal.map((post) => (
          <a
            href="#contact"
            className={cn(
              revealChild,
              "flex flex-col overflow-hidden rounded-lg border border-line bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_rgba(0,0,0,0.08)]",
            )}
            key={post.title}
          >
            <img src={post.image} alt="" loading="lazy" className="h-[210px] w-full object-cover" />
            <div className="flex flex-1 flex-col p-[22px]">
              <span className="mb-2.5 text-[11px] font-bold tracking-[0.08em] text-muted">
                {post.category} · {post.date} · {post.read}
              </span>
              <h3 className="mb-2.5 font-display text-[22px] leading-[1.25] tracking-[-0.025em]">{post.title}</h3>
              <p className="mb-[18px] flex-1 text-sm leading-[1.55] text-muted">{post.excerpt}</p>
              <em className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand not-italic">
                Read Article <ArrowUpRight size={14} />
              </em>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
