import { cn } from "../../lib/cn";

/** Section eyebrow chip used across the storefront. */
export function Pill({ light = false, className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-[7px] text-[11px] font-bold tracking-[0.12em]",
        light ? "bg-white/15 text-white" : "bg-brand-soft text-brand",
        className,
      )}
    >
      {children}
    </span>
  );
}
