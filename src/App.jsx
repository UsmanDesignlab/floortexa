import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Menu,
  Star,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const photos = {
  hero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90",
  marble:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
  porcelain:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  oak: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  herringbone:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  stone:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  process:
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85",
  showroom:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",
  journal1:
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=85",
  journal2:
    "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=900&q=85",
  journal3:
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=900&q=85",
  person1:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=85",
  person2:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85",
  person3:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=85",
};

const finishes = [
  {
    id: "01",
    name: "Carrara Vein",
    status: "available",
    type: "Natural Marble",
    size: "24 × 24 in",
    finish: "Honed",
    price: "From $12 / sq ft",
    room: "Living · Bath · Lobby",
    image: photos.marble,
    includes: ["Sealed surface", "Sample kit ready", "Expert install available"],
  },
  {
    id: "02",
    name: "Limestone Veil",
    status: "available",
    type: "Porcelain",
    size: "12 × 24 in",
    finish: "Matte",
    price: "From $7 / sq ft",
    room: "Kitchen · Hall · Outdoor",
    image: photos.porcelain,
    includes: ["Slip-resistant option", "Underfloor heat ready", "Low maintenance"],
  },
  {
    id: "03",
    name: "Quiet Oak",
    status: "reserved",
    type: "Engineered Oak",
    size: "7 × 72 in",
    finish: "Natural oil",
    price: "From $9 / sq ft",
    room: "Bedroom · Living · Stair",
    image: photos.oak,
    includes: ["Acoustic underlay", "Wide plank", "Pet-friendly finish"],
  },
  {
    id: "04",
    name: "Herringbone 04",
    status: "available",
    type: "European Oak",
    size: "5 × 24 in",
    finish: "Smoked",
    price: "From $14 / sq ft",
    room: "Entry · Feature rooms",
    image: photos.herringbone,
    includes: ["Pattern layout plan", "Matching thresholds", "Aftercare guide"],
  },
  {
    id: "05",
    name: "Travertine Soft",
    status: "sold",
    type: "Natural Stone",
    size: "18 × 18 in",
    finish: "Filled & honed",
    price: "From $11 / sq ft",
    room: "Bath · Spa · Patio",
    image: photos.stone,
    includes: ["Outdoor grade option", "Edge profiles", "Grout colour match"],
  },
  {
    id: "06",
    name: "Slate Line",
    status: "available",
    type: "Porcelain",
    size: "24 × 48 in",
    finish: "Textured",
    price: "From $8 / sq ft",
    room: "Commercial · Entry",
    image: photos.process,
    includes: ["Large format", "Rectified edges", "Commercial warranty"],
  },
];

const collections = [
  {
    tag: "COLLECTION 01",
    name: "Carrara Marble",
    price: "From $12 / sq ft",
    copy: "Classic Italian-inspired marble with soft grey veining for living rooms, baths, and statement lobbies.",
    specs: [
      ["FORMAT", "Tile & slab"],
      ["THICKNESS", "10–20 mm"],
      ["FINISH", "Honed / Polished"],
      ["BEST FOR", "Feature spaces"],
    ],
    image: photos.marble,
  },
  {
    tag: "COLLECTION 02",
    name: "Porcelain Stone",
    price: "From $7 / sq ft",
    copy: "Stone-look porcelain with real-world durability for kitchens, halls, and high-traffic floors.",
    specs: [
      ["FORMAT", "Large format"],
      ["THICKNESS", "8–12 mm"],
      ["FINISH", "Matte / Grip"],
      ["BEST FOR", "Daily living"],
    ],
    image: photos.porcelain,
  },
  {
    tag: "COLLECTION 03",
    name: "Quiet Oak",
    price: "From $9 / sq ft",
    copy: "Warm engineered oak with natural grain character — calm underfoot and ready for real family life.",
    specs: [
      ["FORMAT", "Wide plank"],
      ["THICKNESS", "14–18 mm"],
      ["FINISH", "Natural oil"],
      ["BEST FOR", "Homes & stairs"],
    ],
    image: photos.oak,
  },
  {
    tag: "COLLECTION 04",
    name: "Herringbone",
    price: "From $14 / sq ft",
    copy: "Smoked European oak in classic herringbone — pattern, depth, and a floor that holds the room.",
    specs: [
      ["FORMAT", "Parquet"],
      ["THICKNESS", "14 mm"],
      ["FINISH", "Smoked oil"],
      ["BEST FOR", "Feature floors"],
    ],
    image: photos.herringbone,
  },
  {
    tag: "COLLECTION 05",
    name: "Travertine Soft",
    price: "From $11 / sq ft",
    copy: "Soft limestone warmth with filled pores — spa baths, courtyards, and quiet indoor–outdoor flow.",
    specs: [
      ["FORMAT", "Tile"],
      ["THICKNESS", "12–15 mm"],
      ["FINISH", "Filled honed"],
      ["BEST FOR", "Bath & patio"],
    ],
    image: photos.stone,
  },
  {
    tag: "COLLECTION 06",
    name: "Commercial Slate",
    price: "From $8 / sq ft",
    copy: "Large-format porcelain with slate texture for lobbies, retail, and lasting commercial installs.",
    specs: [
      ["FORMAT", "24 × 48 in"],
      ["THICKNESS", "10 mm"],
      ["FINISH", "Textured"],
      ["BEST FOR", "High traffic"],
    ],
    image: photos.process,
  },
];

const serviceAreas = [
  { name: "Central Showroom", time: "Open daily", detail: "Full sample library" },
  { name: "North City Homes", time: "25 min", detail: "Measure & fit" },
  { name: "Westside Apartments", time: "18 min", detail: "Supply & install" },
  { name: "Design Studio District", time: "12 min", detail: "Trade partners" },
  { name: "Coastal New Builds", time: "40 min", detail: "Project pricing" },
  { name: "Commercial Fit-outs", time: "On request", detail: "Volume supply" },
];

const reviews = [
  {
    name: "Emily & James Carter",
    role: "Homeowners · Quiet Oak",
    quote:
      "Floortex made choosing marble and oak feel simple. Samples at home, clear advice, and an install that respected our schedule.",
    body: "From the first showroom visit to the final clean edge, every detail felt considered. Our living room floor completely changed how the house feels.",
    image: photos.person1,
    project: photos.oak,
  },
  {
    name: "Adrian Malik",
    role: "Architect · Carrara Vein",
    quote:
      "Transparent specs, honest lead times, and finishes that photograph as beautifully as they live.",
    body: "We specify Floortex on residential projects when clients want natural stone and wood that still works for everyday family life.",
    image: photos.person2,
    project: photos.marble,
  },
  {
    name: "Sofia Bennett",
    role: "Homeowner · Porcelain Stone",
    quote:
      "Durable porcelain that still looks warm. Perfect for kids, pets, and a busy kitchen.",
    body: "The team helped us compare finishes under our own light. Installation was tidy, and aftercare guidance was genuinely useful.",
    image: photos.person3,
    project: photos.porcelain,
  },
];

const journal = [
  {
    category: "MATERIALS",
    date: "August 18, 2026",
    read: "5 min read",
    title: "How to choose marble vs porcelain for busy homes",
    excerpt:
      "A practical guide to veining, slip resistance, sealing, and where each material truly earns its place.",
    image: photos.journal1,
  },
  {
    category: "INSTALL",
    date: "August 10, 2026",
    read: "7 min read",
    title: "Why substrate prep decides how long a floor lasts",
    excerpt:
      "Leveling, moisture checks, and movement joints — the quiet work that protects beautiful finishes.",
    image: photos.journal2,
  },
  {
    category: "CARE",
    date: "July 29, 2026",
    read: "4 min read",
    title: "Simple care routines for oak, stone, and tile",
    excerpt:
      "Low-effort habits that keep natural floors calm, clean, and ageing gracefully for years.",
    image: photos.journal3,
  },
];

const faqs = [
  {
    q: "Which flooring is right for my home — marble, tile, or wood?",
    a: "It depends on the room, traffic, moisture, and the feeling you want. We’ll walk through materials, finishes, maintenance, and budget, then narrow options that fit your space.",
  },
  {
    q: "Can I see samples before I decide?",
    a: "Yes. Take home sample kits and live with each finish in your own light for a few days. We’ll help you shortlist the right set to start with.",
  },
  {
    q: "Do you supply and install?",
    a: "Yes. Floortex handles supply, preparation guidance, and trusted installation partners — from first measure through final finish.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most residential installs move from confirmed order to fitting in 2–6 weeks depending on material lead times, site readiness, and room count.",
  },
];

function Brand({ light = false }) {
  return (
    <a
      aria-label="Floortex home"
      href="#home"
      className={`brand ${light ? "is-light" : ""}`}
    >
      <span className="brand-mark">
        f<span>.</span>
      </span>
      <span className="brand-word">floortex</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Finishes", "#finishes"],
    ["Collections", "#collections"],
    ["Journal", "#journal"],
    ["Contact", "#contact"],
  ];

  return (
    <header className="site-header">
      <Brand light />
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([name, href]) => (
          <a key={name} href={href}>
            {name}
          </a>
        ))}
      </nav>
      <a href="#contact" className="header-cta">
        <Calendar size={15} /> Book a Visit
      </a>
      <button
        className="mobile-menu"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {links.map(([name, href]) => (
            <a key={name} href={href} onClick={() => setMenuOpen(false)}>
              {name}
              <ArrowUpRight size={16} />
            </a>
          ))}
          <a href="mailto:hello@floortex.com">hello@floortex.com</a>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero" aria-label="Floortex hero">
      <img className="hero-image" src={photos.hero} alt="" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="hero-content">
        <p className="hero-brand">floortex</p>
        <h1>
          Discover your ideal
          <br />
          floor today
        </h1>
        <p className="hero-lead">
          Marble, porcelain tile, and natural wood — transparent specs, sample
          kits, and expert fitting for homes that feel finished.
        </p>
        <a href="#contact" className="btn btn-solid">
          <Calendar size={16} /> Book today
        </a>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="about" className="features section-pad">
      <div className="section-intro">
        <span className="eyebrow">FEATURES</span>
        <h2>Designed for beauty, durability, and daily life.</h2>
        <p>
          Floortex is a flooring studio for marble, tile, and timber — clear
          material guidance, lasting installs, and finishes chosen for how you
          actually live.
        </p>
      </div>

      <div className="features-split">
        <article className="feature-story">
          <h3>Step-by-step guide to choosing floors</h3>
          <p>
            Compare marble, porcelain, and wood with honest specs. Book a
            showroom visit, take samples home, and lock the finish with
            confidence.
          </p>
          <img src={photos.process} alt="Floortex showroom guidance" />
        </article>
        <article className="feature-story feature-story-alt">
          <h3>Materials that hold up to real homes</h3>
          <p>
            Every collection is selected for tone, texture, and performance —
            from soft living-room oak to high-traffic porcelain and statement
            marble.
          </p>
          <div className="feature-stat">
            <strong>98%</strong>
            <span>Client satisfaction on installed projects</span>
          </div>
        </article>
      </div>

      <div className="trust-row">
        <div className="trust-avatars">
          <img src={photos.person1} alt="" />
          <img src={photos.person2} alt="" />
          <img src={photos.person3} alt="" />
          <div>
            <strong>250+ floors installed</strong>
            <span className="trust-stars">
              <Star size={13} fill="currentColor" /> 5.0 from homeowners
            </span>
          </div>
        </div>
      </div>

      <div className="feature-cards">
        <article>
          <h4>Marble & natural stone</h4>
          <p>Veined statement floors with sealing guidance and careful install.</p>
          <span className="metric">Premium</span>
        </article>
        <article>
          <h4>Porcelain tile systems</h4>
          <p>Large-format durability for kitchens, baths, and commercial spaces.</p>
          <span className="metric">Everyday</span>
        </article>
        <article>
          <h4>Engineered wood</h4>
          <p>Warm oak planks and herringbone with acoustic underlay options.</p>
          <span className="metric">Natural</span>
        </article>
      </div>
    </section>
  );
}

function FinishExplorer() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(1);
  const finish = finishes[active];

  return (
    <section id="finishes" className="explorer section-pad">
      <div className="section-intro">
        <span className="eyebrow">SHOWROOM</span>
        <h2>Interactive finish explorer</h2>
        <p>
          Select any finish below to inspect format, surface, room fit, and
          indicative pricing — the Floortex equivalent of a clear material
          masterplan.
        </p>
      </div>

      <div className="explorer-layout">
        <div className="explorer-map">
          <div className="explorer-toolbar">
            <span>
              <i className="dot available" /> Available
            </span>
            <span>
              <i className="dot reserved" /> Popular
            </span>
            <span>
              <i className="dot sold" /> Limited
            </span>
            <div className="zoom-controls">
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => setZoom((z) => Math.min(1.35, z + 0.1))}
              >
                <ZoomIn size={16} />
              </button>
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => setZoom((z) => Math.max(0.85, z - 0.1))}
              >
                <ZoomOut size={16} />
              </button>
            </div>
          </div>

          <div
            className="finish-grid"
            style={{ transform: `scale(${zoom})` }}
            role="listbox"
            aria-label="Floortex finishes"
          >
            {finishes.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={active === index}
                className={`finish-pin ${active === index ? "is-active" : ""} ${item.status}`}
                onClick={() => setActive(index)}
              >
                <img src={item.image} alt="" />
                <span>{item.id}</span>
                <strong>{item.name}</strong>
              </button>
            ))}
          </div>
          <p className="explorer-note">
            * Click any finish to inspect detailed material specifications.{" "}
            {finishes.length} finishes · Sample kits available
          </p>
        </div>

        <aside className="finish-panel">
          <div className="panel-top">
            <span className={`status-pill ${finish.status}`}>{finish.status}</span>
            <h3>
              Finish {finish.id}
              <br />
              {finish.name}
            </h3>
          </div>
          <img src={finish.image} alt={finish.name} className="panel-image" />
          <dl className="panel-specs">
            <div>
              <dt>Type</dt>
              <dd>{finish.type}</dd>
            </div>
            <div>
              <dt>Size</dt>
              <dd>{finish.size}</dd>
            </div>
            <div>
              <dt>Finish</dt>
              <dd>{finish.finish}</dd>
            </div>
            <div>
              <dt>Price</dt>
              <dd>{finish.price}</dd>
            </div>
            <div>
              <dt>Best for</dt>
              <dd>{finish.room}</dd>
            </div>
          </dl>
          <div className="panel-includes">
            <span>INCLUDED</span>
            <ul>
              {finish.includes.map((item) => (
                <li key={item}>
                  <Check size={14} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <a href="#contact" className="btn btn-solid full">
            Reserve samples · {finish.name}
          </a>
        </aside>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section id="collections" className="collections section-pad">
      <div className="section-intro">
        <span className="eyebrow">COLLECTIONS</span>
        <h2>Residential flooring collections</h2>
        <p>
          Six considered ranges — marble, porcelain, oak, herringbone, stone, and
          commercial tile — with clear specs and starting prices.
        </p>
      </div>

      <div className="collection-stack">
        {collections.map((item) => (
          <article key={item.name} className="collection-card">
            <div className="collection-media">
              <img src={item.image} alt={item.name} loading="lazy" />
              <span>{item.tag}</span>
            </div>
            <div className="collection-body">
              <div className="collection-head">
                <h3>{item.name}</h3>
                <span>{item.price}</span>
              </div>
              <p>{item.copy}</p>
              <dl>
                {item.specs.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <a href="#contact" className="text-link">
                View specifications <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ServiceAreas() {
  return (
    <section id="areas" className="areas section-pad">
      <div className="section-intro">
        <span className="eyebrow">SERVICE</span>
        <h2>Showroom & installation coverage</h2>
        <p>
          Visit the Floortex pavilion for samples, or book a measure at home.
          We supply and fit across residential and commercial projects.
        </p>
      </div>
      <div className="areas-layout">
        <div className="areas-map">
          <img src={photos.showroom} alt="Floortex showroom interior" />
          <div className="areas-pin">
            <strong>Floortex Pavilion</strong>
            <span>12 Oakridge Way · Daily 10 AM – 6 PM</span>
          </div>
        </div>
        <div className="areas-list">
          {serviceAreas.map((area) => (
            <article key={area.name}>
              <div>
                <h4>{area.name}</h4>
                <p>{area.detail}</p>
              </div>
              <span>{area.time}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  return (
    <section id="stories" className="reviews section-pad">
      <div className="section-intro">
        <span className="eyebrow">COMMUNITY</span>
        <h2>
          Honest feedback
          <br />
          from valued clients
        </h2>
        <p>
          Real stories from homeowners and designers who found marble, tile, and
          timber floors that fit the way they live.
        </p>
      </div>

      <div className="review-switcher">
        {reviews.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            aria-label={`View review from ${item.name}`}
          >
            <img src={item.image} alt="" />
            <span>{item.name.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <article className="review-feature" key={active}>
        <img className="review-project" src={review.project} alt="" />
        <div className="review-copy">
          <h3>“{review.quote}”</h3>
          <p>{review.body}</p>
          <div className="review-author">
            <img src={review.image} alt="" />
            <div>
              <strong>{review.name}</strong>
              <span>{review.role}</span>
            </div>
            <span className="stars" aria-label="5 stars">
              ★★★★★
            </span>
          </div>
        </div>
      </article>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="journal section-pad">
      <div className="section-intro row">
        <div>
          <span className="eyebrow">JOURNAL</span>
          <h2>Latest flooring journal</h2>
          <p>
            Practical notes on marble, tile, wood, install, and care from the
            Floortex studio.
          </p>
        </div>
        <a href="#contact" className="btn btn-ghost">
          More articles
        </a>
      </div>
      <div className="journal-grid">
        {journal.map((post) => (
          <article key={post.title}>
            <img src={post.image} alt="" loading="lazy" />
            <div>
              <span className="meta">
                {post.category} · {post.date} · {post.read}
              </span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href="#contact" className="text-link">
                Read article <ArrowUpRight size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq section-pad">
      <div className="section-intro">
        <span className="eyebrow">FAQ</span>
        <h2>Everything you need to know</h2>
        <p>
          Clear answers on materials, samples, install timelines, and how
          Floortex works from first visit to finished floor.
        </p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div className={`faq-item ${open === i ? "open" : ""}`} key={faq.q}>
            <button
              className="faq-question"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <ChevronDown size={20} />
            </button>
            <div className="faq-answer" aria-hidden={open !== i}>
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VisitCTA() {
  return (
    <section id="contact" className="visit">
      <img src={photos.showroom} alt="" />
      <div className="visit-shade" />
      <div className="visit-panel">
        <span className="eyebrow light">SHOWING</span>
        <h2>Schedule a private showroom walkthrough.</h2>
        <p>
          Join our team for an unhurried visit — compare marble, porcelain, and
          wood samples, review install details, and leave with a clear plan.
        </p>
        <ul>
          <li>
            <Check size={16} /> 1-on-1 finish consultation
          </li>
          <li>
            <Check size={16} /> Sample kits to take home
          </li>
          <li>
            <Check size={16} /> Install timeline & pricing outline
          </li>
        </ul>
        <div className="visit-actions">
          <a href="mailto:hello@floortex.com" className="btn btn-solid">
            Reserve showing slot
          </a>
          <span>
            Concierge: <strong>(555) 890-4410</strong>
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Brand light />
          <p>
            Floortex — marble, porcelain tile, and natural wood flooring with
            transparent specs and expert installation.
          </p>
        </div>
        <div className="footer-subscribe">
          <h3>Stay informed on new finishes</h3>
          <p>New arrivals, sample drops, and studio notes.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubscribed(true);
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button type="submit">Join</button>
          </form>
          {subscribed && <span className="ok">You’re on the list.</span>}
        </div>
      </div>

      <div className="footer-grid">
        <nav aria-label="Footer navigation">
          <h4>Navigation</h4>
          <a href="#about">Features</a>
          <a href="#finishes">Finish explorer</a>
          <a href="#collections">Collections</a>
          <a href="#areas">Service areas</a>
          <a href="#stories">Client stories</a>
          <a href="#contact">Private showing</a>
        </nav>
        <nav aria-label="Collections">
          <h4>Collections</h4>
          {collections.map((c) => (
            <a key={c.name} href="#collections">
              {c.name}
            </a>
          ))}
        </nav>
        <div>
          <h4>Showroom</h4>
          <p>12 Oakridge Way</p>
          <p>Daily 10:00 AM – 6:00 PM</p>
          <p>(555) 890-4410</p>
          <a href="mailto:hello@floortex.com">hello@floortex.com</a>
        </div>
        <div>
          <h4>Studio standards</h4>
          <p>Natural stone sealing guidance</p>
          <p>Low-VOC finish options</p>
          <p>Trusted install partners</p>
          <p>Aftercare included</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Floortex. All rights reserved.</span>
        <span>Marble · Tile · Timber</span>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".section-pad, .visit").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <FinishExplorer />
        <Collections />
        <ServiceAreas />
        <Reviews />
        <Journal />
        <FAQ />
        <VisitCTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
