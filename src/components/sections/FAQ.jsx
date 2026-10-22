import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHead } from "../ui/SectionHead";
import { faqs } from "../../data/content";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={cn(reveal, "px-[5%] pt-[72px] pb-16 max-[640px]:px-[4%]")}>
      <SectionHead
        className="mb-[34px] max-w-[760px] [&_h2]:text-[clamp(34px,4vw,48px)] [&_p]:max-w-[620px]"
        pill="FREQUENTLY ASKED QUESTIONS"
        title={<h2>Everything You Need to Know</h2>}
        description={
          <p>
            Find answers to common questions about samples, install timelines, and material options.
          </p>
        }
      />
      <div className="mx-auto grid max-w-[980px] gap-2.5">
        {faqs.map((faq, index) => {
          const isOpen = open === index;
          return (
            <div
              key={faq.q}
              className={cn(
                "overflow-hidden rounded-lg border border-line bg-white transition duration-300",
                isOpen && "border-brand/35 bg-[#fff8f1]",
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-[18px] border-0 bg-transparent px-6 py-5 text-left text-base leading-snug font-semibold"
              >
                <span>{faq.q}</span>
                <ChevronDown size={20} className={cn("shrink-0 text-brand transition-transform duration-300", isOpen && "rotate-180")} />
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <p className={cn("m-0 overflow-hidden px-6 leading-[1.65] text-muted", isOpen && "pb-[22px]")}>
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
