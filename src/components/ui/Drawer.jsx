import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

export function Drawer({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close drawer"
        className="absolute inset-0 border-0 bg-ink/45 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside
        className={cn(
          "absolute inset-y-0 right-0 flex w-full flex-col bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.18)]",
          wide ? "max-w-[560px]" : "max-w-[440px]",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-md border border-line bg-white text-muted hover:bg-sand"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
      </aside>
    </div>
  );
}
