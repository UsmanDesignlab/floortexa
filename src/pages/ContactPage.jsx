import { useState } from "react";
import { Calendar, Check } from "lucide-react";
import { Pill } from "../components/ui/Pill";
import { Button } from "../components/ui/Button";
import { photos } from "../data/content";
import { submitContact } from "../lib/api";
import { useResourceList } from "../hooks/useResourceList";

const initial = {
  full_name: "",
  email: "",
  phone: "",
  category_id: "",
  details: "",
  website: "",
};

export default function ContactPage() {
  const { items: categories } = useResourceList("categories", { limit: 50, sort: "title", direction: "asc" });
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
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        category_id: form.category_id || null,
        details: form.details,
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

  const fieldClass =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink outline-none focus:border-brand focus:ring-2 focus:ring-brand/15";

  return (
    <main className="bg-canvas">
      <section className="mx-auto grid max-w-[1180px] gap-8 px-[5%] pt-32 pb-20 lg:grid-cols-[0.95fr_1.05fr] max-[640px]:px-[4%]">
        <div className="relative min-h-[520px] overflow-hidden rounded-2xl">
          <img src={photos.showroom} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8 text-white">
            <Pill light>SHOWROOM</Pill>
            <h1 className="mt-4 font-display text-[clamp(34px,4vw,48px)] font-medium tracking-tight">
              Contact Floortex
            </h1>
            <p className="mt-3 max-w-md text-white/85">
              Tell us about your rooms, preferred materials, and timing. We’ll help you schedule a
              private showing.
            </p>
            <div className="mt-6 rounded-xl bg-white/95 p-4 text-ink">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                <Calendar size={16} /> Open daily · 10:00 AM – 6:00 PM
              </p>
              <p className="mt-1 text-sm text-muted">12 Oakridge Way · Concierge (555) 890-4410</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-7 shadow-[0_18px_40px_rgba(27,25,23,0.05)] md:p-9">
          <Pill>CONTACT FORM</Pill>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">Send a project enquiry</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Your message is submitted through the Floortex contact API and appears in the admin inbox.
          </p>

          <form className="mt-7 grid gap-4" onSubmit={onSubmit}>
            <label className="grid gap-1.5 text-sm font-semibold">
              Full name
              <input
                required
                name="full_name"
                value={form.full_name}
                onChange={onChange}
                className={fieldClass}
                placeholder="Your name"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm font-semibold">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                Phone
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="(555) 000-0000"
                />
              </label>
            </div>
            <label className="grid gap-1.5 text-sm font-semibold">
              Category of interest
              <select name="category_id" value={form.category_id} onChange={onChange} className={fieldClass}>
                <option value="">Select a category (optional)</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              Project details
              <textarea
                required
                name="details"
                rows={5}
                value={form.details}
                onChange={onChange}
                className={fieldClass}
                placeholder="Rooms, materials, timeline, or anything we should prepare"
              />
            </label>
            <input
              tabIndex={-1}
              autoComplete="off"
              name="website"
              value={form.website}
              onChange={onChange}
              className="hidden"
              aria-hidden="true"
            />
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {ok ? (
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
                <Check size={16} /> Message sent. We’ll be in touch soon.
              </p>
            ) : null}
            <Button type="submit" disabled={busy} className="mt-2">
              {busy ? "Sending…" : "Submit enquiry"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
