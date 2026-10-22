/** Scroll-reveal state. The observer adds `is-visible` to `.section-reveal` and `.reveal-child`. */
export const reveal =
  "section-reveal opacity-0 translate-y-9 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

export const revealChild =
  "reveal-child opacity-0 translate-y-9 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none";

export const displayTitle =
  "my-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]";

export const sectionCopy = "mx-auto max-w-[560px] text-[17px] leading-[1.65] text-muted";
