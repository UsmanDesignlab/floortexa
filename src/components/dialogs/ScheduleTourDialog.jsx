import { useEffect, useRef } from "react";
import { Calendar, X } from "lucide-react";
import { Button } from "../ui/Button";

const fieldClass =
  "w-full min-w-0 rounded-md border border-line bg-white px-3 py-2.5 font-normal text-ink outline-offset-2 focus:outline-2 focus:outline-brand";

export function ScheduleTourDialog({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const submitRequest = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = "Floortex showroom tour request";
    const body = `Name: ${form.get("name")}\nEmail: ${form.get("email")}\nPreferred date: ${form.get("date")}\nPreferred time: ${form.get("time")}\nProject details: ${form.get("details") || "Not provided"}`;
    window.location.href = `mailto:hello@floortex.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto h-fit max-h-[calc(100dvh-32px)] w-[min(680px,calc(100%-32px))] overflow-y-auto rounded-[10px] border-0 bg-canvas p-0 text-ink shadow-[0_30px_90px_rgba(27,25,23,0.3)] [scrollbar-width:none] backdrop:bg-[rgba(27,25,23,0.7)] backdrop:backdrop-blur-[5px] [&::-webkit-scrollbar]:hidden"
      aria-labelledby="tour-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="relative p-[clamp(20px,3vw,28px)]">
        <button
          type="button"
          className="absolute top-5 right-5 grid h-9 w-9 place-items-center rounded-md border border-line bg-white"
          aria-label="Close schedule tour dialog"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <span className="text-[11px] font-bold tracking-[0.14em] text-brand">PRIVATE SHOWROOM VISIT</span>
        <h2
          id="tour-dialog-title"
          className="my-2 max-w-[510px] font-display text-[clamp(28px,3vw,36px)] font-semibold leading-[1.08] tracking-[-0.04em]"
        >
          See your next floor in person.
        </h2>
        <p className="mb-[18px] max-w-[510px] text-sm leading-normal text-muted">
          Choose a preferred time and tell us about your space. We’ll prepare an email request for
          our showroom team.
        </p>
        <form className="grid gap-3" onSubmit={submitRequest}>
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
              <input name="date" type="date" required className={fieldClass} />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold">
              Preferred time
              <select name="time" required defaultValue="" className={fieldClass}>
                <option value="" disabled>
                  Select a time
                </option>
                <option>10:00 AM</option>
                <option>11:30 AM</option>
                <option>1:00 PM</option>
                <option>2:30 PM</option>
                <option>4:00 PM</option>
              </select>
            </label>
          </div>
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
          <Button type="submit" full className="rounded-md">
            <Calendar size={17} /> Prepare tour request
          </Button>
        </form>
        <small className="mt-2.5 block text-center text-muted">12 Oakridge Way · Open daily, 10 AM – 6 PM</small>
      </div>
    </dialog>
  );
}
