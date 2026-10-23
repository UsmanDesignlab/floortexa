import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "../components/ui/Button";
import { submitContact } from "../lib/api";

const fieldClass =
  "w-full min-w-0 rounded-md border border-line bg-white px-3 py-2.5 font-normal text-ink outline-offset-2 focus:outline-2 focus:outline-brand";

const initial = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  details: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setOk(false);
    try {
      await submitContact({
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        category_id: null,
        details: [
          form.date ? `Preferred date: ${form.date}` : null,
          form.time ? `Preferred time: ${form.time}` : null,
          form.details || null,
        ]
          .filter(Boolean)
          .join("\n") || "Contact enquiry",
        website: "",
      });
      setOk(true);
      setForm(initial);
    } catch (err) {
      setError(err.message || "Unable to send your message");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="bg-canvas px-[5%] pt-32 pb-20 max-[640px]:px-[4%]">
      <div className="mx-auto w-full max-w-[680px] rounded-[10px] border border-line bg-white p-[clamp(20px,3vw,28px)] shadow-[0_18px_50px_rgba(27,25,23,0.06)]">
        <span className="text-[11px] font-bold tracking-[0.14em] text-brand">CONTACT</span>
        <h1 className="my-2 max-w-[510px] font-display text-[clamp(28px,3vw,36px)] font-semibold leading-[1.08] tracking-[-0.04em]">
          Get in touch with Floortex.
        </h1>
        <p className="mb-[18px] max-w-[510px] text-sm leading-normal text-muted">
          Tell us about your space and preferred time. We’ll get back to you with samples, advice,
          and next steps.
        </p>

        <form className="grid gap-3" onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-3 max-[640px]:grid-cols-1">
            <label className="grid gap-1.5 text-[13px] font-bold">
              Full name
              <input
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your name"
                value={form.name}
                onChange={onChange}
                className={fieldClass}
              />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
                className={fieldClass}
              />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold">
              Preferred date
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={onChange}
                className={fieldClass}
              />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold">
              Preferred time
              <select name="time" value={form.time} onChange={onChange} className={fieldClass}>
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
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="(555) 000-0000"
              value={form.phone}
              onChange={onChange}
              className={fieldClass}
            />
          </label>
          <label className="grid gap-1.5 text-[13px] font-bold">
            <span>
              Tell us about your project <em className="font-normal text-muted not-italic">(optional)</em>
            </span>
            <textarea
              name="details"
              rows="3"
              placeholder="Rooms, materials, or anything you'd like to discuss"
              value={form.details}
              onChange={onChange}
              className={`${fieldClass} min-h-16 resize-y`}
            />
          </label>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {ok ? (
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
              <Check size={16} /> Message sent. We’ll be in touch soon.
            </p>
          ) : null}

          <Button type="submit" full className="rounded-md" disabled={busy}>
            <Mail size={17} /> {busy ? "Sending…" : "Send message"}
          </Button>
        </form>
        <small className="mt-2.5 block text-center text-muted">12 Oakridge Way · Open daily, 10 AM – 6 PM</small>
      </div>
    </main>
  );
}
