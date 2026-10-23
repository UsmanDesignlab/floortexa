import { useState } from "react";
import { Link } from "react-router-dom";
import { Brand } from "../ui/Brand";
import { collections } from "../../data/content";

export function Footer({ onContact }) {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);

  return (
    <footer className="bg-ink px-[5%] pt-16 pb-7 text-white/85 max-[640px]:px-[4%]">
      <div className="grid grid-cols-2 gap-10 border-b border-white/10 pb-10 max-[980px]:grid-cols-1">
        <div>
          <Brand light />
          <p className="mt-4 max-w-[380px] leading-relaxed text-white/60">
            A modern flooring discovery studio. Bridging pure material transparency with
            high-performing install standards.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-display text-2xl text-white">Stay Informed on New Finishes</h3>
          <p className="mb-4 text-white/60">
            Subscribe for newly released collections, sample drops, and install milestone notes.
          </p>
          <form
            className="flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (email) setOk(true);
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-label="Email address"
              className="flex-1 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-[13px] text-white placeholder:text-white/40"
            />
            <button type="submit" className="rounded-xl bg-white px-[18px] font-bold text-brand">
              Join
            </button>
          </form>
          {ok ? <span className="mt-2.5 inline-block text-[13px] text-[#f2b78f]">You’re on the list.</span> : null}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 py-10 max-[980px]:grid-cols-1">
        <nav>
          <h4 className="mb-3.5 text-xs tracking-[0.1em] text-white/45 uppercase">Navigation</h4>
          {[
            ["Categories", "/categories"],
            ["Projects", "/projects"],
            ["Blogs", "/blogs"],
            ["About Us", "/about"],
          ].map(([label, href]) => (
            <Link key={label} to={href} className="mb-2 block text-sm text-white/80 hover:text-white">
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={onContact}
            className="mb-2 block text-left text-sm text-white/80 hover:text-white"
          >
            Contact Us
          </button>
        </nav>
        <nav>
          <h4 className="mb-3.5 text-xs tracking-[0.1em] text-white/45 uppercase">Collections</h4>
          {collections.map((item) => (
            <Link key={item.name} to="/categories" className="mb-2 block text-sm text-white/80 hover:text-white">
              {item.name}
            </Link>
          ))}
        </nav>
        <div>
          <h4 className="mb-3.5 text-xs tracking-[0.1em] text-white/45 uppercase">Sales Pavilion</h4>
          {["12 Oakridge Way", "Daily: 10:00 AM – 6:00 PM", "(555) 890-4410"].map((line) => (
            <p key={line} className="mb-2 text-sm text-white/80">
              {line}
            </p>
          ))}
        </div>
        <div>
          <h4 className="mb-3.5 text-xs tracking-[0.1em] text-white/45 uppercase">Studio Standards</h4>
          {[
            "Natural stone sealing guidance",
            "Low-VOC finish options",
            "Trusted install partners",
            "Zero-compromise aftercare",
          ].map((line) => (
            <p key={line} className="mb-2 text-sm text-white/80">
              {line}
            </p>
          ))}
        </div>
      </div>

      <div className="flex justify-between gap-4 border-t border-white/10 pt-[18px] text-[13px] text-white/45 max-[980px]:flex-col">
        <span>© {new Date().getFullYear()} Floortex. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
