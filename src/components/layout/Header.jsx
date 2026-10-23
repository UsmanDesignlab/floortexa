import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { Brand } from "../ui/Brand";
import { useScrolled } from "../../hooks/useScrolled";
import { cn } from "../../lib/cn";

const navLinks = [
  { label: "Home", to: "/", end: true },
  { label: "About Us", to: "/about" },
  { label: "Categories", to: "/categories" },
  { label: "Projects", to: "/projects" },
  { label: "Blogs", to: "/blogs" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 grid h-[92px] grid-cols-[1fr_auto_1fr] items-center border-b border-black/10 bg-white px-[4.5%] text-ink transition duration-300",
        "max-[980px]:flex max-[980px]:justify-between",
        scrolled && "bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-2xl",
      )}
    >
      <Brand mono />
      <nav
        className="flex items-center justify-self-center gap-7 max-[1100px]:gap-5 max-[980px]:hidden"
        aria-label="Main navigation"
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              cn(
                "text-xs uppercase tracking-[0.14em] transition",
                isActive
                  ? "font-bold text-black"
                  : "font-semibold text-black/45 hover:text-black",
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <Link
        to="/contact"
        className="inline-flex justify-self-end items-center justify-center gap-2 rounded-md border-0 bg-ink px-5 py-3 text-[15px] font-semibold tracking-[0.02em] text-white transition duration-300 hover:bg-black max-[980px]:hidden"
      >
        <Mail size={16} /> Contact
      </Link>
      <button
        type="button"
        className="hidden h-11 w-11 place-items-center rounded-lg border border-black/10 bg-white text-ink max-[980px]:grid"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      {menuOpen ? (
        <nav
          className="absolute top-[92px] right-[4%] left-[4%] hidden flex-col gap-3.5 rounded-[18px] border border-white/10 bg-ink p-[22px] text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] max-[980px]:flex"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex justify-between text-lg transition",
                  isActive
                    ? "font-bold text-white"
                    : "font-semibold text-white/55 hover:text-white",
                )
              }
            >
              {link.label}
              <ArrowUpRight size={16} />
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-md border-0 bg-white px-5 py-3.5 text-[15px] font-semibold text-ink transition hover:bg-white/90"
          >
            <Mail size={16} /> Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
