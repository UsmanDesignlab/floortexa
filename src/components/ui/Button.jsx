import { cn } from "../../lib/cn";

const variants = {
  brand:
    "bg-brand text-white shadow-[0_12px_28px_rgba(255,107,0,0.22)] hover:bg-brand-deep",
  outline: "border border-line bg-transparent text-ink",
  inverse: "bg-white text-brand shadow-none hover:bg-[#f2f2ec]",
};

const sizes = {
  md: "rounded-xl px-5 py-3.5 text-[15px]",
  sm: "rounded-lg px-4 py-[11px] text-sm",
};

/**
 * Shared storefront button. Use this everywhere instead of one-off button styles.
 */
export function Button({
  as: Component = "button",
  variant = "brand",
  size = "md",
  full = false,
  className,
  children,
  type,
  ...props
}) {
  const resolvedType = Component === "button" ? (type ?? "button") : undefined;

  return (
    <Component
      type={resolvedType}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 border-0 font-semibold transition duration-300 hover:-translate-y-0.5",
        variants[variant] ?? variants.brand,
        sizes[size] ?? sizes.md,
        full && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
