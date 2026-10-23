import { useEffect, useRef, useState } from "react";
import { Mail, X } from "lucide-react";
import { Button } from "../ui/Button";
import { submitContact } from "../../lib/api";

const fieldClass =
  "w-full min-w-0 rounded-md border border-line bg-white px-3 py-2.5 font-normal text-ink outline-offset-2 focus:outline-2 focus:outline-brand";

export function ContactDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setError("");
      setOk(false);
      dialog.showModal();
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError("");
    setOk(false);
    try {
      await submitContact({
        full_name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || "Not provided"),
        category_id: null,
        details: [
          form.get("date") ? `Preferred date: ${form.get("date")}` : null,
          form.get("time") ? `Preferred time: ${form.get("time")}` : null,
          form.get("details") || null,
        ]
          .filter(Boolean)
          .join("\n") || "Contact enquiry",
        website: "",
      });
      setOk(true);
      event.currentTarget.reset();
    } catch (err) {
      setError(err.message || "Unable to send your message");
    } finally {
      setBusy(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto h-fit max-h-[calc(100dvh-32px)] w-[min(680px,calc(100%-32px))] overflow-y-auto rounded-[10px] border-0 bg-canvas p-0 text-ink shadow-[0_30px_90px_rgba(27,25,23,0.3)] [scrollbar-width:none] backdrop:bg-[rgba(27,25,23,0.7)] backdrop:backdrop-blur-[5px] [&::-webkit-scrollbar]:hidden"
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
          Get in touch with Floortex.
        </h2>
        <p className="mb-[18px] max-w-[510px] text-sm leading-normal text-muted">
          Tell us about your space and preferred time. We’ll get back to you with samples, advice,
          and next steps.
        </p>
        <form className="grid gap-3" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
            <label className="grid gap-1.5 text-[13px] font-bold">
              Full name
              <input name="name" type="text" autoComplete="name" required placeholder="Your name" className={fieldClass} />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={fieldClass}
              />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold">
              Preferred date
              <input name="date" type="date" className={fieldClass} />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold">
              Preferred time
              <select name="time" defaultValue="" className={fieldClass}>
                <option value="">Select a time</option>
                <option>10:00 AM</option>
                <option>11:30 AM</option>
                <option>1:00 PM</option>
                <option>2:30 PM</option>
                <option>4:00 PM</option>
              </select>
            </label>
          </div>
          <label className="grid gap-1.5 text-[13px] font-bold">
            Phone
            <input name="phone" type="tel" autoComplete="tel" required placeholder="(555) 000-0000" className={fieldClass} />
          </label>
          <label className="grid gap-1.5 text-[13px] font-bold">
            <span>
              Tell us about your project <em className="font-normal text-muted not-italic">(optional)</em>
            </span>
            <textarea
              name="details"
              rows="2"
              placeholder="Rooms, materials, or anything you'd like to discuss"
              className={`${fieldClass} min-h-16 resize-y`}
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {ok ? <p className="text-sm font-semibold text-ink">Message sent. We’ll be in touch soon.</p> : null}
          <Button type="submit" full className="rounded-md" disabled={busy}>
            <Mail size={17} /> {busy ? "Sending…" : "Send message"}
          </Button>
        </form>
        <small className="mt-2.5 block text-center text-muted">12 Oakridge Way · Open daily, 10 AM – 6 PM</small>
      </div>
    </dialog>
  );
}
