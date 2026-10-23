import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

const EXIT_MS = 420;

export function Drawer({ open, onClose, title, children, wide = false }) {
  const [mounted, setMounted] = useState(open);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }

    setEntered(false);
    const timer = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!mounted) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, onClose]);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[200]">
      <button
        type="button"
        aria-label="Close drawer"
        className={cn(
          "absolute inset-0 border-0 bg-ink/45 backdrop-blur-[2px] transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          entered ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex h-full w-full max-w-full flex-col bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.18)]",
          "transition-transform duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
          entered ? "translate-x-0" : "translate-x-full",
          "sm:max-w-[480px]",
          wide && "sm:max-w-[min(720px,92vw)]",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-md border border-line bg-white text-muted hover:bg-sand"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">{children}</div>
      </aside>
    </div>,
    document.body,
  );
}
