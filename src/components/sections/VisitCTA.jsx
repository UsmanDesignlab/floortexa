import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import { Pill } from "../ui/Pill";
import { photos } from "../../data/content";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function VisitCTA({ onScheduleTour }) {
  return (
    <section
      id="contact"
      className={cn(
        reveal,
        "mx-[5%] mt-6 mb-16 grid grid-cols-[1.05fr_0.95fr] items-stretch gap-4 max-[980px]:grid-cols-1 max-[640px]:mx-[4%] max-[640px]:mt-5 max-[640px]:mb-10",
      )}
    >
      <div className="relative min-h-[520px] overflow-hidden rounded-lg">
        <img src={photos.showroom} alt="" className="h-full w-full object-cover" />
        <div className="absolute bottom-[18px] left-[18px] max-w-[280px] rounded-lg bg-white/95 px-4 py-3.5">
          <strong className="mb-1 block text-xs tracking-[0.1em] text-brand uppercase">Private Showing</strong>
          <span className="mb-1 block font-display text-lg font-semibold">Experience Floortex in Person</span>
          <small className="text-muted">12 Oakridge Way · Daily 10 AM – 6 PM</small>
        </div>
      </div>
      <div className="flex flex-col justify-center rounded-lg bg-ink px-9 py-[38px] text-white">
        <Pill light className="self-start">
          SHOWING
        </Pill>
        <h2 className="mt-3 mb-3.5 font-display text-[clamp(30px,3.4vw,42px)] font-medium leading-[1.15] tracking-[-0.035em]">
          Schedule a private showroom walkthrough.
        </h2>
        <p className="mb-5 leading-[1.65] text-white/80">
          Join our team for an unhurried showing of marble, porcelain, and wood samples — inspect
          finishes and review install details.
        </p>
        <ul className="mb-7 grid list-none gap-3 p-0">
          {[
            "1-on-1 finish consultation with design leads",
            "Detailed room measure & material analysis",
            "Transparent finishes library & sample kits",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-[15px]">
              <Check size={16} /> {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="inverse" className="rounded-lg" onClick={onScheduleTour}>
            Reserve Showing Slot
          </Button>
          <span>
            Concierge: <strong>(555) 890-4410</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
