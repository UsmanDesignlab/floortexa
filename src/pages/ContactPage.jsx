import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { AnimatedTitle } from "../components/ui/AnimatedTitle";
import { Reveal } from "../components/ui/Reveal";
import { ContactForm } from "../components/contact/ContactForm";
import { siteContact } from "../data/siteContact";

const details = [
  {
    icon: Phone,
    label: "Phone",
    value: siteContact.phone,
    href: siteContact.phoneHref,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteContact.email,
    href: siteContact.emailHref,
  },
  {
    icon: MapPin,
    label: "Address",
    value: siteContact.address,
    href: siteContact.mapsHref,
  },
  {
    icon: Clock3,
    label: "Hours",
    value: siteContact.hours,
  },
];

export default function ContactPage() {
  const [params] = useSearchParams();
  const initialEmail = String(params.get("email") || "").trim();

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <section className="px-[5%] pt-28 pb-12 max-[640px]:px-[4%] max-[640px]:pt-24 sm:pt-32 sm:pb-14 lg:px-16">
        <AnimatedTitle text="Contact Us" />
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-[17px]">
          Fill in the form and we&apos;ll get back with samples, advice, and a free no-obligation
          quote. {siteContact.responseNote}
        </p>
      </section>

      <section className="px-[5%] pb-24 max-[640px]:px-[4%] sm:pb-32 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <aside className="space-y-8">
            <Reveal className="overflow-hidden rounded-xl border border-line bg-white p-6 sm:p-8">
              <h2 className="font-display text-[clamp(24px,3vw,32px)] font-medium tracking-tight">
                Contact details
              </h2>
              <ul className="mt-7 space-y-6">
                {details.map((item) => {
                  const Icon = item.icon;
                  const body = (
                    <>
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-sand text-ink">
                        <Icon size={18} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-bold tracking-[0.14em] text-muted uppercase">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-[15px] font-semibold text-ink sm:text-[16px]">
                          {item.value}
                        </span>
                      </span>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          className="flex items-start gap-4 transition hover:opacity-80"
                        >
                          {body}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4">{body}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal
              delay={90}
              className="rounded-xl border border-line bg-white p-6 sm:p-8"
            >
              <h2 className="font-display text-[clamp(22px,2.6vw,28px)] font-medium tracking-tight">
                Service area
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{siteContact.serviceArea}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Not sure if we cover your postcode?{" "}
                <a
                  href={siteContact.phoneHref}
                  className="font-semibold text-ink underline-offset-2 hover:underline"
                >
                  Give us a call
                </a>
                .
              </p>
            </Reveal>
          </aside>

          <Reveal
            delay={120}
            className="rounded-xl border border-line bg-white p-6 shadow-[0_18px_50px_rgba(27,25,23,0.06)] sm:p-8 lg:p-10"
          >
            <h2 className="font-display text-[clamp(24px,3vw,32px)] font-medium tracking-tight">
              Send us a message
            </h2>
            <p className="mt-3 mb-7 max-w-xl text-[15px] leading-relaxed text-muted">
              Tell us about your space — rooms, materials, stairs, or anything you&apos;re unsure
              about. We&apos;ll reply during working hours.
            </p>
            <ContactForm initialEmail={initialEmail} />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
