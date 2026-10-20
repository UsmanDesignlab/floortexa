import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { email, phone, phoneHref, services } from "../data";

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Floortex home">
      <span className="brand-mark">f.</span>
      <span className="brand-word">
        floortex<span>.</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <div className="topbar">
        <span>Free measure & estimates across Essex</span>
        <a href={phoneHref}>
          <Phone size={14} /> {phone}
        </a>
      </div>
      <div className="nav-bar">
        <Brand />
        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About</NavLink>
          <div className={`nav-dropdown ${servicesOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="nav-drop-btn"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              Services <ChevronDown size={16} />
            </button>
            <div className="nav-mega">
              {services.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`}>
                  {s.name}
                </Link>
              ))}
              <Link to="/services">All services</Link>
            </div>
          </div>
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/repairs">Carpet repairs</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
          <NavLink to="/areas">Areas</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="nav-actions">
          <a className="btn btn-ghost" href={phoneHref}>
            Call us
          </a>
          <Link className="btn btn-primary" to="/contact">
            Get a quote
          </Link>
          <button
            className="menu-btn"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Brand />
          <p>
            Family-run flooring studio for carpets, LVT, laminate, wood and
            commercial floors across Essex — quality finish first.
          </p>
        </div>
        <div>
          <h4>Quick links</h4>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/repairs">Carpet repairs</Link>
          <Link to="/areas">Areas</Link>
        </div>
        <div>
          <h4>Popular services</h4>
          {services.slice(0, 5).map((s) => (
            <Link key={s.slug} to={`/services/${s.slug}`}>
              {s.name}
            </Link>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <a href={phoneHref}>{phone}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <p>Essex & selected Greater London</p>
          <Link className="btn btn-primary" to="/contact">
            Free estimate
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Floortex. All rights reserved.</span>
        <span>Demo site — beats the old template look with modern UX.</span>
      </div>
    </footer>
  );
}

function MobileCallBar() {
  return (
    <div className="mobile-cta-bar" aria-label="Quick actions">
      <a href={phoneHref}>Call us</a>
      <Link to="/contact">Get a quote</Link>
    </div>
  );
}

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <MobileCallBar />
    </>
  );
}
