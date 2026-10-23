import { useEffect, useMemo, useRef, useState } from "react";
import { Mail, Search, X } from "lucide-react";
import { Button } from "../ui/Button";
import { submitContact } from "../../lib/api";
import { useResourceList } from "../../hooks/useResourceList";
import { cn } from "../../lib/cn";

const fieldClass =
  "w-full min-w-0 rounded-md border border-line bg-white px-3.5 py-3 font-normal text-ink outline-offset-2 placeholder:text-muted/70 focus:outline-2 focus:outline-brand";

function RequiredMark() {
  return <span className="text-red-600"> *</span>;
}

export function ContactDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const [categoryQuery, setCategoryQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);

  const { items: categories } = useResourceList(
    "categories",
    { limit: 50, sort: "title", direction: "asc" },
    open,
  );

  const filteredCategories = useMemo(() => {
    const q = categoryQuery.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((item) => String(item.title || "").toLowerCase().includes(q));
  }, [categories, categoryQuery]);

  const selectedCategory = categories.find((item) => item.id === categoryId);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setError("");
      setOk(false);
      setCategoryQuery("");
      setCategoryId("");
      setCategoryOpen(false);
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    setBusy(true);
    setError("");
    setOk(false);
    try {
      await submitContact({
        full_name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        category_id: categoryId || null,
        details: String(form.get("details") || "").trim() || "Contact enquiry",
        website: "",
      });
      setOk(true);
      formEl.reset();
      setCategoryQuery("");
      setCategoryId("");
    } catch (err) {
      setError(err.message || "Unable to send your message");
    } finally {
      setBusy(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto h-fit max-h-[calc(100dvh-32px)] w-[min(760px,calc(100%-32px))] overflow-y-auto rounded-[10px] border-0 bg-canvas p-0 text-ink shadow-[0_30px_90px_rgba(27,25,23,0.3)] [scrollbar-width:none] backdrop:bg-[rgba(27,25,23,0.7)] backdrop:backdrop-blur-[5px] [&::-webkit-scrollbar]:hidden"
      aria-labelledby="contact-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="relative p-[clamp(20px,3vw,28px)]">
        <button
          type="button"
          className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-md border border-line bg-white"
          aria-label="Close contact dialog"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <span className="text-[11px] font-bold tracking-[0.14em] text-brand">CONTACT</span>
        <h2
          id="contact-dialog-title"
          className="my-2 max-w-[510px] font-display text-[clamp(28px,3vw,36px)] font-semibold leading-[1.08] tracking-[-0.04em]"
        >
          Contact us
        </h2>
        <p className="mb-5 max-w-[510px] text-sm leading-normal text-muted">
          Tell us about your space. We&apos;ll get back with samples, advice, and next steps.
        </p>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-[13px] font-bold text-ink">
              <span>
                Full Name
                <RequiredMark />
              </span>
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your full name"
                className={fieldClass}
              />
            </label>

            <label className="grid gap-1.5 text-[13px] font-bold text-ink">
              <span>
                Email Address
                <RequiredMark />
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={fieldClass}
              />
            </label>

            <label className="grid gap-1.5 text-[13px] font-bold text-ink">
              <span>
                Phone Number
                <RequiredMark />
              </span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="(555) 000-0000"
                className={fieldClass}
              />
            </label>

            <div className="relative grid gap-1.5 text-[13px] font-bold text-ink">
              <span>Category</span>
              <div className="relative">
                <Search
                  size={16}
                  className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
                />
                <input
                  type="text"
                  value={
                    categoryOpen || !selectedCategory
                      ? categoryQuery
                      : String(selectedCategory.title || "")
                  }
                  onChange={(event) => {
                    setCategoryQuery(event.target.value);
                    setCategoryId("");
                    setCategoryOpen(true);
                  }}
                  onFocus={() => setCategoryOpen(true)}
                  onBlur={() => {
                    window.setTimeout(() => setCategoryOpen(false), 120);
                  }}
                  placeholder="Search category..."
                  className={cn(fieldClass, "pl-10")}
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-expanded={categoryOpen}
                />
              </div>
              {categoryOpen ? (
                <ul className="absolute top-[calc(100%+4px)] right-0 left-0 z-20 max-h-48 overflow-auto rounded-md border border-line bg-white py-1 shadow-[0_16px_40px_rgba(27,25,23,0.12)]">
                  {filteredCategories.length === 0 ? (
                    <li className="px-3.5 py-2.5 text-[13px] font-normal text-muted">
                      No categories found
                    </li>
                  ) : (
                    filteredCategories.map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="w-full px-3.5 py-2.5 text-left text-[13px] font-normal text-ink hover:bg-sand"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            setCategoryId(item.id);
                            setCategoryQuery(String(item.title || ""));
                            setCategoryOpen(false);
                          }}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              ) : null}
            </div>
          </div>

          <label className="grid gap-1.5 text-[13px] font-bold text-ink">
            <span>
              Details
              <RequiredMark />
            </span>
            <textarea
              name="details"
              rows={5}
              required
              placeholder="Tell us about your rooms, materials, or questions"
              className={`${fieldClass} min-h-[120px] resize-y`}
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {ok ? (
            <p className="text-sm font-semibold text-ink">Message sent. We&apos;ll be in touch soon.</p>
          ) : null}

          <Button type="submit" full className="rounded-md" disabled={busy}>
            <Mail size={17} /> {busy ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </dialog>
  );
}
