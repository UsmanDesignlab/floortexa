import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

/** Floortex wordmark used in the header and footer. */
export function Brand({ light = false, className }) {
  return (
    <Link
      aria-label="Floortex home"
      to="/"
      className={cn("inline-flex items-center gap-2.5 text-inherit", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-[34px] w-[34px] place-items-center rounded-[10px] bg-brand font-display text-[15px] font-bold leading-none text-white",
          light && "border border-white/55 bg-white/20",
        )}
      >
        f.
      </span>
      <span className="font-display text-xl font-bold leading-none tracking-[-0.03em]">Floortex</span>
    </Link>
  );
}
