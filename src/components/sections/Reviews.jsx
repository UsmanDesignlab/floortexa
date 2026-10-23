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

      <div className="mb-7 flex flex-wrap justify-center gap-3" role="tablist" aria-label="Client reviews">
        {reviews.map((item, index) => {
          const isActive = active === index;
          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2.5 rounded-full border py-2 pr-4 pl-2 text-[13px] font-semibold text-ink transition duration-300",
                isActive
                  ? "-translate-y-0.5 border-brand bg-brand text-white shadow-[0_8px_20px_rgba(27,25,23,0.2)]"
                  : "border-line bg-sand text-ink hover:border-brand/40 hover:bg-white",
              )}
              onClick={() => setActive(index)}
              aria-label={`View review from ${item.name}`}
            >
              <img
                src={item.image}
                alt=""
                className="h-[34px] w-[34px] rounded-full border border-black/10 object-cover"
              />
              <span className={isActive ? "text-white" : "text-ink"}>{item.name}</span>
            </button>
          );
        })}
      </div>

      <article
        key={active}
        role="tabpanel"
        className="mx-auto max-w-[860px] animate-[fadeUp_0.55s_ease_both] rounded-lg border border-line bg-white px-10 py-[42px] shadow-[0_24px_50px_rgba(0,0,0,0.05)] motion-reduce:animate-none max-[640px]:px-[22px] max-[640px]:py-7"
      >
        <h3 className="mb-4 font-display text-[clamp(26px,3vw,36px)] font-medium leading-[1.25] tracking-[-0.03em] text-ink">
          “{review.quote}”
        </h3>
        <p className="mb-7 text-base leading-[1.7] text-[#4a4642]">{review.body}</p>
        <div className="flex items-center gap-3">
          <img
            src={review.image}
            alt=""
            className="h-12 w-12 rounded-full border border-line object-cover"
          />
          <div>
            <strong className="block text-ink">{review.name}</strong>
            <span className="text-[13px] font-medium text-[#4a4642]">{review.role}</span>
          </div>
          <span className="ml-auto tracking-wide text-ink" aria-label="5 out of 5 stars">
            ★★★★★
          </span>
        </div>
      </article>
    </section>
  );
}
