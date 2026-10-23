import { useEffect, useState } from "react";
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
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useScrolled(40);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white text-ink transition duration-300",
        scrolled && "bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-2xl",
      )}
    >
      <div className="mx-auto grid h-[72px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-[4.5%] sm:h-[92px] max-[980px]:flex max-[980px]:justify-between">
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
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen ? (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-ink sm:top-[92px] max-[980px]:block min-[981px]:hidden">
          <nav
            className="flex h-full flex-col gap-1 overflow-y-auto overscroll-contain px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                    "flex items-center justify-between border-b border-white/10 py-4 text-[18px] transition",
                    isActive
                      ? "font-bold text-white"
                      : "font-semibold text-white/60 hover:text-white",
                  )
                }
              >
                {link.label}
                <ArrowUpRight size={16} className="opacity-70" />
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
