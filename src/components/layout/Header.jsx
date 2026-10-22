import { useState } from "react";
import { ArrowUpRight, Calendar, Menu, X } from "lucide-react";
import { Brand } from "../ui/Brand";
import { Button } from "../ui/Button";
import { navLinks } from "../../data/content";
import { useScrolled } from "../../hooks/useScrolled";
import { cn } from "../../lib/cn";

export function Header({ onScheduleTour }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 grid h-[78px] grid-cols-[1fr_auto_1fr] items-center border-b border-line bg-white px-[4.5%] text-ink transition duration-300",
        "max-[980px]:flex max-[980px]:justify-between",
        scrolled && "bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-2xl",
      )}
    >
      <Brand />
      <nav className="flex items-center justify-self-center gap-7 max-[980px]:hidden" aria-label="Main navigation">
        {navLinks.map(([name, href]) => (
          <a key={name} href={href} className="text-xs font-semibold uppercase tracking-[0.14em]">
            {name}
          </a>
        ))}
      </nav>
      <Button
        size="sm"
        className="justify-self-end tracking-[0.02em] max-[980px]:hidden"
        onClick={onScheduleTour}
      >
        <Calendar size={15} /> Schedule Tour
      </Button>
      <button
        type="button"
        className="hidden h-[42px] w-[42px] place-items-center rounded-lg border-0 bg-sand text-inherit max-[980px]:grid"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      {menuOpen ? (
        <nav
          className="absolute top-[78px] right-[4%] left-[4%] hidden flex-col gap-3.5 rounded-[18px] bg-[rgba(27,25,23,0.96)] p-[22px] text-white backdrop-blur-2xl max-[980px]:flex"
          aria-label="Mobile navigation"
        >
          {navLinks.map(([name, href]) => (
            <a
              key={name}
              href={href}
              className="flex justify-between text-lg font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              {name}
              <ArrowUpRight size={16} />
            </a>
          ))}
          <Button
            variant="inverse"
            full
            className="rounded-lg"
            onClick={() => {
              setMenuOpen(false);
              onScheduleTour();
            }}
          >
            <Calendar size={16} /> Schedule Tour
          </Button>
          <a href="mailto:hello@floortex.com" className="flex justify-between text-lg font-semibold">
            hello@floortex.com
          </a>
        </nav>
      ) : null}
    </header>
  );
}
