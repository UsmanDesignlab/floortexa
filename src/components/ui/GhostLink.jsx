import { cn } from "../../lib/cn";

/** Text link used on dark and light surfaces. */
export function GhostLink({ href, light = false, className, children, ...props }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold",
        light ? "text-white" : "text-brand",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
