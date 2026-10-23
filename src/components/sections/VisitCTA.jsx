import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";
import { photos } from "../../data/content";
import { siteContact } from "../../data/siteContact";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function VisitCTA() {
  return (
    <section
      id="contact"
      className={cn(
        reveal,
        "mx-[5%] mt-6 mb-16 grid grid-cols-[1.05fr_0.95fr] items-stretch gap-4 max-[980px]:grid-cols-1 max-[640px]:mx-[4%] max-[640px]:mt-5 max-[640px]:mb-10",
      )}
    >
      <div className="relative min-h-[520px] overflow-hidden rounded-lg">
        <img src={photos.visit} alt="Floortexa Essex showroom" className="h-full w-full object-cover" />
        <div className="absolute bottom-[18px] left-[18px] max-w-[280px] rounded-lg bg-white/95 px-4 py-3.5">
          <strong className="mb-1 block text-xs tracking-[0.1em] text-brand uppercase">Private Showing</strong>
          <span className="mb-1 block font-display text-lg font-semibold">Experience Floortexa in Person</span>
          <small className="text-muted">
            {siteContact.address} · {siteContact.hours}
          </small>
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-lg bg-ink px-9 py-[38px] text-white">
        <Pill light className="self-start">
          SHOWING
        </Pill>
        <h2 className="mt-3 mb-3.5 font-display text-[clamp(30px,3.4vw,42px)] font-medium leading-[1.15] tracking-[-0.035em]">
          Book a free home measure or showroom visit.
        </h2>
        <p className="mb-5 leading-[1.65] text-white/80">
          Compare carpet, LVT, laminate, and wood samples with our team — then plan a clean supply
          and fit for your Essex home.
        </p>
        <ul className="mb-7 grid list-none gap-3 p-0">
          {[
            "1-on-1 flooring advice for every room",
            "Free home measure & stair assessment",
            "Sample boards and clear fitting quotes",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[15px]">
              <Check size={16} /> {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-4">
          <Button as={Link} to="/contact" variant="inverse" className="rounded-lg">
            Contact
          </Button>
          <span>
            Call:{" "}
            <a href={siteContact.phoneHref} className="font-semibold text-white underline-offset-2 hover:underline">
              {siteContact.phone}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
