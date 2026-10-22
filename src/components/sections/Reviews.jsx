import { useState } from "react";
import { SectionHead } from "../ui/SectionHead";
import { reviews } from "../../data/content";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function Reviews() {
  const [active, setActive] = useState(1);
  const review = reviews[active];

  return (
    <section id="stories" className={cn(reveal, "border-t border-line bg-canvas px-[5%] py-[90px] max-[640px]:px-[4%]")}>
      <SectionHead
        pill="COMMUNITY"
        title={
          <h2>
            Honest Feedback
            <br />
            From Valued Clients
          </h2>
        }
        description={
          <p>
            Real experiences from families and professionals who found their flooring sanctuary with
            Floortex.
          </p>
        }
      />

      <div className="mb-7 flex flex-wrap justify-center gap-3">
        {reviews.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={cn(
              "inline-flex items-center gap-2.5 rounded-full border border-transparent bg-white/55 py-2 pr-3.5 pl-2 text-[13px] font-semibold transition duration-300",
              active === index && "-translate-y-0.5 bg-brand text-white",
            )}
            onClick={() => setActive(index)}
            aria-label={`View review from ${item.name}`}
          >
            <img src={item.image} alt="" className="h-[34px] w-[34px] rounded-full object-cover" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <article
        key={active}
        className="mx-auto max-w-[860px] animate-[fadeUp_0.55s_ease_both] rounded-lg bg-white px-10 py-[42px] shadow-[0_24px_50px_rgba(0,0,0,0.05)] motion-reduce:animate-none max-[640px]:px-[22px] max-[640px]:py-7"
      >
        <h3 className="mb-4 font-display text-[clamp(26px,3vw,36px)] font-medium leading-[1.25] tracking-[-0.03em]">
          “{review.quote}”
        </h3>
        <p className="mb-7 text-base leading-[1.7] text-muted">{review.body}</p>
        <div className="flex items-center gap-3">
          <img src={review.image} alt="" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <strong className="block">{review.name}</strong>
            <span className="text-[13px] text-muted">{review.role}</span>
          </div>
          <span className="ml-auto tracking-wide text-brand-mid">★★★★★</span>
        </div>
      </article>
    </section>
  );
}
