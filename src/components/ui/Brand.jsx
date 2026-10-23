import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

/** Floortexa logo + wordmark used in the header and footer. */
export function Brand({ light = false, mono = false, className }) {
  return (
    <Link
      aria-label="Floortexa home"
      to="/"
      className={cn("inline-flex items-center gap-0.5 text-inherit", className)}
    >
      <img
        src="/logo.png?v=6"
        alt=""
        aria-hidden="true"
        className={cn(
          "h-9 w-auto object-contain object-left sm:h-10",
          light && "brightness-0 invert",
          mono && "opacity-100",
        )}
      />
      <span
        className={cn(
          "font-display text-[22px] font-bold leading-none tracking-[-0.03em]",
          light && "text-white",
        )}
      >
        Floortexa
      </span>
    </Link>
  );
}
