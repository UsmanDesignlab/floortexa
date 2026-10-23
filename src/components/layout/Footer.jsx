import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Brand } from "../ui/Brand";
import { collections } from "../../data/content";
import { siteContact } from "../../data/siteContact";

export function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-ink px-[5%] pt-16 pb-7 text-white/85 max-[640px]:px-[4%]">
      <div className="grid grid-cols-2 gap-10 border-b border-white/10 pb-10 max-[980px]:grid-cols-1">
        <div>
          <Brand light />
          <p className="mt-4 max-w-[380px] leading-relaxed text-white/60">
            Premium flooring installation across London and Essex — carpet, LVT, laminate,
            herringbone, and stair runners fitted with craft and honest advice.
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
              const value = email.trim();
              if (!value) return;
              navigate(`/contact?email=${encodeURIComponent(value)}`);
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
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 py-10 max-[980px]:grid-cols-1">
        <nav>
          <h4 className="mb-3.5 text-xs tracking-[0.1em] text-white/45 uppercase">Navigation</h4>
          {[
            ["Home", "/"],
            ["About Us", "/about"],
            ["Categories", "/categories"],
            ["Projects", "/projects"],
            ["Blogs", "/blogs"],
            ["Contact Us", "/contact"],
          ].map(([label, href]) => (
            <Link key={label} to={href} className="mb-2 block text-sm text-white/80 hover:text-white">
              {label}
            </Link>
          ))}
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
          <h4 className="mb-3.5 text-xs tracking-[0.1em] text-white/45 uppercase">Showroom</h4>
          <p className="mb-2 text-sm text-white/80">{siteContact.address}</p>
          <p className="mb-2 text-sm text-white/80">{siteContact.hours}</p>
          <a href={siteContact.phoneHref} className="mb-2 block text-sm text-white/80 hover:text-white">
            {siteContact.phone}
          </a>
          <a href={siteContact.emailHref} className="mb-2 block text-sm text-white/80 hover:text-white">
            {siteContact.email}
          </a>
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
        <span>© {new Date().getFullYear()} Floortexa Ltd. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
