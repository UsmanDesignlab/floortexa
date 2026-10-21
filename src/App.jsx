import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BedDouble,
  Calendar,
  Check,
  ChevronDown,
  Menu,
  Ruler,
  Star,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import GridMotion from "./GridMotion";

const photos = {
  hero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90",
  marble:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85",
  porcelain:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
  oak: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
  herringbone:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
  stone:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
  process:
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
  villa:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
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
  person4:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=240&q=85",
};

const finishes = [
  {
    id: "01",
    name: "Carrara",
    status: "available",
    type: "Natural Marble",
    size: "24 × 24 in",
    finish: "Honed",
    price: "From $12 / sq ft",
    room: "Living · Bath · Lobby",
    image: photos.marble,
    includes: ["Sealed surface", "Sample kit ready", "Expert install"],
  },
  {
    id: "02",
    name: "Limestone",
    status: "available",
    type: "Porcelain",
    size: "12 × 24 in",
    finish: "Matte",
    price: "From $7 / sq ft",
    room: "Kitchen · Hall",
    image: photos.porcelain,
    includes: ["Slip-resistant option", "Heat-ready", "Low maintenance"],
  },
  {
    id: "03",
    name: "Quiet Oak",
    status: "reserved",
    type: "Engineered Oak",
    size: "7 × 72 in",
    finish: "Natural oil",
    price: "From $9 / sq ft",
    room: "Bedroom · Living",
    image: photos.oak,
    includes: ["Acoustic underlay", "Wide plank", "Pet-friendly"],
  },
  {
    id: "04",
    name: "Herringbone",
    status: "available",
    type: "European Oak",
    size: "5 × 24 in",
    finish: "Smoked",
    price: "From $14 / sq ft",
    room: "Entry · Feature",
    image: photos.herringbone,
    includes: ["Pattern layout", "Matching thresholds", "Aftercare guide"],
  },
  {
    id: "05",
    name: "Travertine",
    status: "sold",
    type: "Natural Stone",
    size: "18 × 18 in",
    finish: "Filled & honed",
    price: "From $11 / sq ft",
    room: "Bath · Patio",
    image: photos.stone,
    includes: ["Outdoor grade", "Edge profiles", "Grout match"],
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
  {
    id: "07",
    name: "Calacatta",
    status: "available",
    type: "Marble look",
    size: "48 × 48 in",
    finish: "Polished",
    price: "From $10 / sq ft",
    room: "Lobby · Bath",
    image: photos.marble,
    includes: ["Bookmatch option", "Sample kit", "Install partners"],
  },
  {
    id: "08",
    name: "Warm Ash",
    status: "reserved",
    type: "Engineered Wood",
    size: "8 × 86 in",
    finish: "Brushed oil",
    price: "From $11 / sq ft",
    room: "Open plan",
    image: photos.oak,
    includes: ["Long boards", "Silent underlay", "Stair nosing"],
  },
];

const collections = [
  {
    tag: "COLLECTION 01",
    name: "Carrara Marble",
    price: "$12 / sq ft",
    copy: "Classic Italian-inspired marble with soft grey veining for living rooms, baths, and statement lobbies.",
    rooms: "Living · Bath · Lobby",
    area: "Tile & slab",
    image: photos.marble,
    note: "Includes sealing guidance & sample kit",
  },
  {
    tag: "COLLECTION 02",
    name: "Porcelain Stone",
    price: "$7 / sq ft",
    copy: "Stone-look porcelain with real-world durability for kitchens, halls, and high-traffic floors.",
    rooms: "Kitchen · Hall · Outdoor",
    area: "Large format",
    image: photos.porcelain,
    note: "Includes grip option & heat-ready install",
  },
  {
    tag: "COLLECTION 03",
    name: "Quiet Oak",
    price: "$9 / sq ft",
    copy: "Warm engineered oak with natural grain — calm underfoot and ready for real family life.",
    rooms: "Bedroom · Living · Stair",
    area: "Wide plank",
    image: photos.oak,
    note: "Includes acoustic underlay & aftercare",
  },
  {
    tag: "COLLECTION 04",
    name: "Herringbone",
    price: "$14 / sq ft",
    copy: "Smoked European oak in classic herringbone — pattern, depth, and a floor that holds the room.",
    rooms: "Entry · Feature rooms",
    area: "Parquet",
    image: photos.herringbone,
    note: "Includes layout plan & thresholds",
  },
  {
    tag: "COLLECTION 05",
    name: "Travertine Soft",
    price: "$11 / sq ft",
    copy: "Soft limestone warmth with filled pores — spa baths, courtyards, and indoor–outdoor flow.",
    rooms: "Bath · Spa · Patio",
    area: "Natural stone",
    image: photos.stone,
    note: "Includes outdoor grade & edge profiles",
  },
  {
    tag: "COLLECTION 06",
    name: "Commercial Slate",
    price: "$8 / sq ft",
    copy: "Large-format porcelain with slate texture for lobbies, retail, and lasting commercial installs.",
    rooms: "Lobby · Retail",
    area: "24 × 48 in",
    image: photos.process,
    note: "Includes commercial warranty",
  },
];

const serviceAreas = [
  { name: "Central Showroom", time: "Open daily", detail: "Full sample library", miles: "0 mi" },
  { name: "North City Homes", time: "25 min", detail: "Measure & fit", miles: "8.2 mi" },
  { name: "Westside Apartments", time: "18 min", detail: "Supply & install", miles: "6.4 mi" },
  { name: "Design Studio District", time: "12 min", detail: "Trade partners", miles: "4.1 mi" },
  { name: "Coastal New Builds", time: "40 min", detail: "Project pricing", miles: "18 mi" },
  { name: "Commercial Fit-outs", time: "On request", detail: "Volume supply", miles: "Citywide" },
];

const reviews = [
  {
    name: "Emily & James Carter",
    role: "Homeowners · Quiet Oak",
    quote:
      "Floortex made choosing marble and oak feel simple. Samples at home, clear advice, and an install that respected our schedule.",
    body: "From the first showroom visit to the final clean edge, every detail felt considered. Our living room floor completely changed how the house feels.",
    image: photos.person1,
  },
  {
    name: "Adrian Malik",
    role: "Architect · Carrara Vein",
    quote:
      "Transparent specs, honest lead times, and finishes that photograph as beautifully as they live.",
    body: "We specify Floortex on residential projects when clients want natural stone and wood that still works for everyday family life.",
    image: photos.person2,
  },
  {
    name: "Sofia Bennett",
    role: "Homeowner · Porcelain Stone",
    quote:
      "Durable porcelain that still looks warm. Perfect for kids, pets, and a busy kitchen.",
    body: "The team helped us compare finishes under our own light. Installation was tidy, and aftercare guidance was genuinely useful.",
    image: photos.person3,
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
    <a aria-label="Floortex home" href="#home" className={`brand ${light ? "is-light" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        f.
      </span>
      <span className="brand-word">Floortex</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["About", "#about"],
    ["Journal", "#journal"],
    ["Amenities", "#collections"],
    ["Contact", "#contact"],
  ];

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <Brand light={!scrolled} />
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([name, href]) => (
          <a key={name} href={href}>
            {name}
          </a>
        ))}
        <a href="#contact" className="header-cta">
          <Calendar size={15} /> Schedule Tour
        </a>
      </nav>
      <button
        className="mobile-menu"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
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
  const slides = [photos.hero, photos.villa, photos.showroom];
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="home" className="hero" aria-label="Discover your ideal floor today">
      {slides.map((image, index) => (
        <img
          key={image}
          className={`hero-image ${activeSlide === index ? "is-active" : ""}`}
          src={image}
          alt=""
          fetchPriority={index === 0 ? "high" : "auto"}
          aria-hidden="true"
        />
      ))}
      <div className="hero-shade" />
      <div className="hero-fade" />
      <div className="hero-content">
        <h1>
          Discover your ideal
          <br />
          floor today
        </h1>
        <p>
          Uncover a world of marble, porcelain tile, and natural wood with
          transparent specs. Your perfect finish awaits just a visit away!
        </p>
        <a href="#contact" className="btn btn-brand">
          <Calendar size={16} /> Book today
        </a>
      </div>
      <div className="hero-dots" aria-label="Hero image slides">
        {slides.map((image, index) => (
          <button
            key={image}
            type="button"
            className={activeSlide === index ? "is-active" : ""}
            aria-label={`Show image ${index + 1}`}
            aria-pressed={activeSlide === index}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="about" className="features section-reveal">
      <div className="features-head">
        <span className="pill">FEATURES</span>
        <h2>
          Designed for beauty,
          <br />
          clarity, and daily life.
        </h2>
        <p>
          Discover a flooring studio where marble, porcelain, and timber meet
          transparent specifications and lasting installation standards.
        </p>
      </div>

      <div className="bento">
        <article className="bento-card bento-green reveal-child">
          <div className="bento-copy">
            <h3>Step By Step Guide To Choosing Floors</h3>
            <p>
              Discover transparent material specs, schedule private showroom
              visits, and select tailored finishes with ease.
            </p>
          </div>
          <img src={photos.villa} alt="Finished Floortex interior" />
        </article>

        <article className="bento-card bento-sand reveal-child">
          <h3>6 Collections of Protected Material Quality</h3>
          <p>
            Each flooring range is oriented to maximize beauty, durability, and
            calm underfoot without compromising everyday living.
          </p>
          <div className="bento-metric">
            <strong>98%</strong>
            <span>Client satisfaction</span>
          </div>
        </article>

        <article className="bento-card bento-white reveal-child">
          <span className="trust-label">TRUSTED BY</span>
          <h4>250+ Floortex Homeowners</h4>
          <div className="avatar-row">
            <img src={photos.person1} alt="" />
            <img src={photos.person2} alt="" />
            <img src={photos.person3} alt="" />
            <img src={photos.person4} alt="" />
          </div>
          <div className="rating-line">
            <Star size={14} fill="currentColor" />
            <span>5.0 · Ratings from 4.9/5 Homeowners</span>
          </div>
        </article>

        <article className="bento-card bento-mini reveal-child">
          <h4>Marble & Natural Stone</h4>
          <p>Veined statement floors with sealing guidance.</p>
          <strong>Premium</strong>
        </article>
        <article className="bento-card bento-mini reveal-child">
          <h4>Porcelain Tile Systems</h4>
          <p>Large-format durability for kitchens and baths.</p>
          <strong>Everyday</strong>
        </article>
        <article className="bento-card bento-mini reveal-child">
          <h4>Engineered Wood</h4>
          <p>Warm oak planks and herringbone patterns.</p>
          <strong>Natural</strong>
        </article>
      </div>
    </section>
  );
}

function FinishExplorer() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 640px)").matches);
  const finish = finishes[active];

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const onChange = (event) => setMobile(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const positions = [
    { x: 13, y: 27 },
    { x: 37.5, y: 27 },
    { x: 62, y: 27 },
    { x: 86.5, y: 27 },
    { x: 13, y: 73 },
    { x: 37.5, y: 73 },
    { x: 62, y: 73 },
    { x: 86.5, y: 73 },
  ];
  const mobilePositions = [
    { x: 27, y: 13 },
    { x: 73, y: 13 },
    { x: 27, y: 38 },
    { x: 73, y: 38 },
    { x: 27, y: 63 },
    { x: 73, y: 63 },
    { x: 27, y: 88 },
    { x: 73, y: 88 },
  ];

  return (
    <section id="finishes" className="explorer section-reveal">
      <div className="section-head">
        <span className="pill">SHOWROOM</span>
        <h2>Interactive Finish Masterplan</h2>
        <p>
          Select any finish on the material map below to inspect format,
          surface, room fit, and indicative pricing.
        </p>
      </div>

      <div className="explorer-shell">
        <div className="map-panel">
          <div className="map-legend">
            <strong>Explore the finish plan</strong>
            <span>
              <i className="dot available" /> Available
            </span>
            <span>
              <i className="dot reserved" /> Popular
            </span>
            <span>
              <i className="dot sold" /> Limited
            </span>
            <span className="map-caption">8 material zones</span>
          </div>

          <div className="map-stage" style={{ "--zoom": zoom }}>
            <div className="map-canvas">
              {finishes.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`map-zone ${item.status} ${active === index ? "is-active" : ""}`}
                  style={{
                    left: `${(mobile ? mobilePositions : positions)[index].x}%`,
                    top: `${(mobile ? mobilePositions : positions)[index].y}%`,
                    backgroundImage: `linear-gradient(180deg, rgba(12, 20, 16, 0.02) 24%, rgba(12, 20, 16, 0.82) 100%), url("${item.image}")`,
                  }}
                  onClick={() => setActive(index)}
                  aria-label={`${item.id} ${item.name}`}
                >
                  <span className="zone-number">{item.id}</span>
                  <span className="zone-copy">
                    <strong>{item.name}</strong>
                    <small>{item.type}</small>
                  </span>
                  <span className="zone-status">{item.status}</span>
                </button>
              ))}
            </div>

            <div className="zoom-stack">
              <button type="button" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}>
                <ZoomIn size={16} />
              </button>
              <button type="button" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.85, z - 0.1))}>
                <ZoomOut size={16} />
              </button>
            </div>
          </div>

          <div className="map-foot">
            <p>Select a material zone to see its size, finish, price, and room recommendations.</p>
            <span>{finishes.length} finishes · sample kits ready</span>
          </div>
        </div>

        <aside className="detail-panel reveal-child">
          <div className="detail-top">
            <span className={`status ${finish.status}`}>{finish.status}</span>
            <h3>
              Finish {finish.id}
              <br />
              {finish.name}
            </h3>
            <a href="#collections" className="ghost-link">
              View Model <ArrowUpRight size={14} />
            </a>
          </div>
          <img src={finish.image} alt={finish.name} />
          <dl>
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
          <div className="includes">
            <span>INCLUSIONS</span>
            <ul>
              {finish.includes.map((line) => (
                <li key={line}>
                  <Check size={14} /> {line}
                </li>
              ))}
            </ul>
          </div>
          <a href="#contact" className="btn btn-brand full">
            Reserve samples · {finish.name}
          </a>
        </aside>
      </div>
    </section>
  );
}

function Collections() {
  return (
    <section id="collections" className="collections">
      <div className="collections-intro section-reveal">
        <span className="pill">RESIDENCES · ARCHITECTURAL PORTFOLIO</span>
        <h2>Residential Flooring Collections</h2>
        <p>
          Scroll to explore six distinctive Floortex finishes — marble,
          porcelain, oak, herringbone, stone, and commercial tile.
        </p>
      </div>

      {collections.map((item) => (
        <article key={item.name} className="collection-slide section-reveal">
          <img src={item.image} alt={item.name} loading="lazy" />
          <div className="glass-card">
            <span>{item.tag}</span>
            <h3>{item.name}</h3>
            <div className="glass-price">STARTING BASE PRICE · {item.price}</div>
            <p>{item.copy}</p>
            <div className="glass-stats">
              <div>
                <small>BEST FOR</small>
                <strong>
                  <BedDouble size={15} /> {item.rooms}
                </strong>
              </div>
              <div>
                <small>FORMAT</small>
                <strong>
                  <Ruler size={15} /> {item.area}
                </strong>
              </div>
            </div>
            <p className="glass-note">{item.note}</p>
            <a href="#contact" className="ghost-link light">
              View Specifications <ArrowUpRight size={14} />
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}

function MaterialsGallery() {
  const galleryImages = [
    { src: photos.marble, alt: "Carrara marble flooring in a bright interior" },
    { src: photos.porcelain, alt: "Porcelain stone flooring in a modern room" },
    { src: photos.oak, alt: "Natural oak flooring in a calm living space" },
    { src: photos.herringbone, alt: "European oak herringbone floor" },
    { src: photos.stone, alt: "Warm natural stone flooring" },
    { src: photos.process, alt: "Floor installation and material detail" },
    { src: photos.villa, alt: "Contemporary home with premium flooring" },
    { src: photos.showroom, alt: "Floortex showroom interior" },
  ];

  return (
    <section className="materials-gallery section-reveal" aria-labelledby="materials-gallery-title">
      <div className="materials-gallery-head">
        <span className="pill">MATERIALS IN MOTION</span>
        <h2 id="materials-gallery-title">Find the floor that feels like home.</h2>
        <p>Explore marble, porcelain, timber, and stone in real interiors.</p>
      </div>
      <GridMotion
        items={galleryImages}
        rows={4}
        aspectRatio={1.45}
        gap={16}
        radius={12}
        angle={-7}
        speed={18}
        direction="alternate"
        parallax={0.45}
        spotlight={0.55}
        dim={0.12}
        fade={0.28}
      />
    </section>
  );
}

function ServiceAreas() {
  return (
    <section id="areas" className="areas section-reveal">
      <div className="section-head">
        <span className="pill">LOCATION</span>
        <h2>Showroom & Strategic Connectivity</h2>
        <p>
          Quiet studio visits with direct coverage across residential and
          commercial projects — samples, measure, and install.
        </p>
      </div>
      <div className="areas-grid">
        <div className="areas-hero reveal-child">
          <img src={photos.showroom} alt="Floortex pavilion" />
          <div className="areas-badge">
            <strong>Floortex Pavilion</strong>
            <span>12 Oakridge Way · Daily 10 AM – 6 PM</span>
          </div>
        </div>
        <div className="areas-cards">
          {serviceAreas.map((area) => (
            <article key={area.name} className="reveal-child">
              <div>
                <h4>{area.name}</h4>
                <p>{area.detail}</p>
              </div>
              <div className="area-meta">
                <strong>{area.time}</strong>
                <span>{area.miles}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [active, setActive] = useState(1);
  const review = reviews[active];

  return (
    <section id="stories" className="reviews section-reveal">
      <div className="section-head">
        <span className="pill">COMMUNITY</span>
        <h2>
          Honest Feedback
          <br />
          From Valued Clients
        </h2>
        <p>
          Real experiences from families and professionals who found their
          flooring sanctuary with Floortex.
        </p>
      </div>

      <div className="review-people">
        {reviews.map((item, index) => (
          <button
            key={item.name}
            type="button"
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            aria-label={`View review from ${item.name}`}
          >
            <img src={item.image} alt="" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      <article className="review-card" key={active}>
        <h3>“{review.quote}”</h3>
        <p>{review.body}</p>
        <div className="review-foot">
          <img src={review.image} alt="" />
          <div>
            <strong>{review.name}</strong>
            <span>{review.role}</span>
          </div>
          <span className="stars">★★★★★</span>
        </div>
      </article>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="journal section-reveal">
      <div className="section-head split">
        <div>
          <span className="pill">JOURNAL</span>
          <h2>Latest Flooring Journal</h2>
          <p>
            Perspectives on marble, tile, timber, and install craft from the
            Floortex studio.
          </p>
        </div>
        <a href="#contact" className="btn btn-outline">
          More Articles
        </a>
      </div>
      <div className="journal-grid">
        {journal.map((post) => (
          <a href="#contact" className="journal-card reveal-child" key={post.title}>
            <img src={post.image} alt="" loading="lazy" />
            <div className="journal-body">
              <span>
                {post.category} · {post.date} · {post.read}
              </span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <em>
                Read Article <ArrowUpRight size={14} />
              </em>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="faq section-reveal">
      <div className="section-head">
        <span className="pill">FREQUENTLY ASKED QUESTIONS</span>
        <h2>Everything You Need to Know</h2>
        <p>
          Find answers to common questions about samples, install timelines, and
          material options.
        </p>
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div className={`faq-item ${open === i ? "open" : ""}`} key={faq.q}>
            <button
              type="button"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>{faq.q}</span>
              <ChevronDown size={20} />
            </button>
            <div className="faq-answer">
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
    <section id="contact" className="visit section-reveal">
      <div className="visit-media">
        <img src={photos.showroom} alt="" />
        <div className="visit-chip">
          <strong>Private Showing</strong>
          <span>Experience Floortex in Person</span>
          <small>12 Oakridge Way · Daily 10 AM – 6 PM</small>
        </div>
      </div>
      <div className="visit-panel">
        <span className="pill light">SHOWING</span>
        <h2>Schedule a private showroom walkthrough.</h2>
        <p>
          Join our team for an unhurried showing of marble, porcelain, and wood
          samples — inspect finishes and review install details.
        </p>
        <ul>
          <li>
            <Check size={16} /> 1-on-1 finish consultation with design leads
          </li>
          <li>
            <Check size={16} /> Detailed room measure & material analysis
          </li>
          <li>
            <Check size={16} /> Transparent finishes library & sample kits
          </li>
        </ul>
        <div className="visit-actions">
          <a href="mailto:hello@floortex.com" className="btn btn-brand">
            Reserve Showing Slot
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
  const [ok, setOk] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-top">
        <div>
          <Brand light />
          <p>
            A modern flooring discovery studio. Bridging pure material
            transparency with high-performing install standards.
          </p>
        </div>
        <div className="footer-subscribe">
          <h3>Stay Informed on New Finishes</h3>
          <p>
            Subscribe for newly released collections, sample drops, and install
            milestone notes.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setOk(true);
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
          {ok && <span className="ok">You’re on the list.</span>}
        </div>
      </div>

      <div className="footer-grid">
        <nav>
          <h4>Navigation</h4>
          <a href="#about">Cluster Features</a>
          <a href="#finishes">Masterplan Map</a>
          <a href="#collections">Model Showcase</a>
          <a href="#areas">Service Neighborhood</a>
          <a href="#stories">Resident Stories</a>
          <a href="#contact">Private Showing</a>
        </nav>
        <nav>
          <h4>Collections</h4>
          {collections.map((c) => (
            <a key={c.name} href="#collections">
              {c.name}
            </a>
          ))}
        </nav>
        <div>
          <h4>Sales Pavilion</h4>
          <p>12 Oakridge Way</p>
          <p>Daily: 10:00 AM – 6:00 PM</p>
          <p>(555) 890-4410</p>
        </div>
        <div>
          <h4>Studio Standards</h4>
          <p>Natural stone sealing guidance</p>
          <p>Low-VOC finish options</p>
          <p>Trusted install partners</p>
          <p>Zero-compromise aftercare</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Floortex. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll(".reveal-child").forEach((child, i) => {
            child.style.transitionDelay = reduce ? "0ms" : `${i * 90}ms`;
            child.classList.add("is-visible");
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <FinishExplorer />
        <MaterialsGallery />
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
