import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Menu,
  MapPin,
  X,
} from "lucide-react";

const photos = {
  hero: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90",
  oak: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  stone:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  herringbone:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  process:
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=85",
  cta: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85",
  person:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=180&q=85",
};

const products = [
  {
    name: "Quiet Oak",
    category: "Engineered oak · Natural",
    price: "Sample available",
    image: photos.oak,
  },
  {
    name: "Limestone Veil",
    category: "Porcelain · Warm ivory",
    price: "Sample available",
    image: photos.stone,
  },
  {
    name: "Herringbone No. 04",
    category: "European oak · Smoked",
    price: "Sample available",
    image: photos.herringbone,
  },
];

const heroSlides = [
  {
    image: photos.hero,
    name: "Quiet Oak",
    detail: "Natural European oak",
    alt: "Warm oak flooring in a sunlit modern living room",
  },
  {
    image: photos.stone,
    name: "Limestone Veil",
    detail: "Porcelain · Warm ivory",
    alt: "Soft limestone-inspired flooring in a calm contemporary interior",
  },
  {
    image: photos.herringbone,
    name: "Herringbone No. 04",
    detail: "European oak · Smoked",
    alt: "Smoked oak herringbone flooring in a refined living space",
  },
];

const processes = [
  {
    name: "Find your finish",
    title: "A floor that feels like you.",
    copy: "Start with the feeling you want to come home to. We’ll help you explore wood, stone, and modern surfaces that fit your style, space, and budget.",
    detail:
      "Bring home a few samples and see every finish in your own light, alongside your furniture and the way you live.",
  },
  {
    name: "Made for real life",
    title: "Beautiful, day after day.",
    copy: "The right floor works as beautifully as it looks. We’ll help you find the right balance of texture, durability, warmth, and care.",
    detail:
      "Thoughtful advice on wear, underfloor heating, pets, and maintenance makes choosing a floor feel easy.",
  },
  {
    name: "Expert installation",
    title: "The little details matter.",
    copy: "A great finish starts long before the final plank. Our trusted installation team takes care at every step, from preparation through the last clean edge.",
    detail:
      "Your dedicated team keeps you informed, protects your home, and leaves everything ready to enjoy.",
  },
  {
    name: "Here for the long run",
    title: "A little care goes a long way.",
    copy: "Real materials grow more beautiful with use. We’ll help you care for your new floor and be here when you need a hand.",
    detail:
      "Get clear maintenance guidance and thoughtful aftercare from people who know your floor.",
  },
];

const faqs = [
  {
    q: "Which flooring is right for my home?",
    a: "It depends on the room, how you use it, and the feeling you want to create. We’ll talk through materials, finishes, maintenance, and budget, then help you narrow down the options that make sense for your home.",
  },
  {
    q: "Can I see samples before I decide?",
    a: "Absolutely. Our samples let you live with each finish for a few days and see how it looks in your home throughout the day. Get in touch and we’ll help you choose a few to start with.",
  },
  {
    q: "Do you offer installation?",
    a: "Yes. Our experienced installation partners take care of the full process, including preparation, fitting, and finishing details. We’ll coordinate the work and keep you updated along the way.",
  },
  {
    q: "How do I care for my new floor?",
    a: "Every floor is different, so we’ll share simple care instructions tailored to your material and finish. The right routine is easy to follow and helps your floor age beautifully.",
  },
  {
    q: "Can you work with my budget?",
    a: "Of course. We carry a considered range across different price points and will help you understand the options clearly. You can get a beautiful, lasting result without compromising on what matters to you.",
  },
];

const reviews = [
  {
    quote:
      "Floortex made choosing a new floor feel genuinely easy. Their team helped us find the perfect oak, and the installation was seamless. The whole house feels different now.",
    name: "Emily Carter",
    role: "Floortex customer",
    personImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=85",
    image: photos.process,
  },
  {
    quote:
      "The samples, the thoughtful advice, the final finish—it was all considered. Our new floor has completely changed how the space feels, and I couldn’t be happier.",
    name: "Adrian Malik",
    role: "Homeowner, Richmond",
    personImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&h=240&q=85",
    image: photos.oak,
  },
  {
    quote:
      "A lovely team from the first conversation to the last detail. We found something beautiful that works for everyday family life, and the quality is excellent.",
    name: "Sofia Bennett",
    role: "Homeowner, Bristol",
    personImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&h=240&q=85",
    image: photos.stone,
  },
];

function Brand({ light = false }) {
  return (
    <a
      aria-label="Floortex home"
      href="#home"
      className={`brand ${light ? "text-white" : ""}`}
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
    ["Home", "#home"],
    ["About", "#about"],
    ["Collections", "#work"],
    ["Process", "#approach"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="site-header">
      <Brand />
      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(([name, href]) => (
          <a key={name} href={href}>
            {name}
          </a>
        ))}
      </nav>
      <a href="#contact" className="header-cta">
        Book a Visit <ArrowUpRight size={15} />
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
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setActive((current) => (current + 1) % heroSlides.length);
      }
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const previewIndices = [active, (active + 1) % heroSlides.length];
  const slide = heroSlides[active];

  return (
    <section
      id="home"
      className="hero hero-showcase"
      aria-label="Featured Floortex flooring collections"
    >
      <div className="hero-background" aria-hidden="true">
        {heroSlides.map((item, index) => (
          <img
            key={item.name}
            className={`hero-image ${index === active ? "is-active" : ""}`}
            src={item.image}
            alt=""
            fetchPriority={index === 0 ? "high" : undefined}
          />
        ))}
      </div>
      <div className="hero-shade" />
      <div className="hero-watermark" aria-hidden="true">
        floortex
      </div>
      <div className="hero-stage">
        <div className="hero-main">
          <div className="eyebrow hero-eyebrow">
            <span className="eyebrow-dot" /> Flooring for the life happening on
            it
          </div>
          <p className="hero-description">
            Thoughtful flooring, beautifully fitted. Natural materials and
            lasting finishes, chosen for the way you live.
          </p>
          <div className="hero-actions">
            <div className="hero-metrics" aria-label="What Floortex offers">
              <div>
                <strong>Natural</strong>
                <span>Materials</span>
              </div>
              <div>
                <strong>Expert</strong>
                <span>Fitting</span>
              </div>
              <div>
                <strong>Made to last</strong>
                <span>Everyday living</span>
              </div>
            </div>
            <a href="#work" className="button button-light">
              View collections <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="hero-feature" aria-label="Featured flooring collection">
          <div className="hero-thumbnails">
            {previewIndices.map((index) => {
              const item = heroSlides[index];
              return (
                <button
                  key={item.name}
                  type="button"
                  className={`hero-thumbnail ${index === active ? "is-current" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-label={`Show ${item.name} collection`}
                  aria-pressed={index === active}
                >
                  <img src={item.image} alt="" loading="lazy" />
                </button>
              );
            })}
          </div>
          <div className="hero-feature-card" aria-live="off">
            <div className="hero-feature-heading">
              <div>
                <h2>{slide.name}</h2>
                <p>{slide.detail}</p>
              </div>
              <span className="hero-slide-count">
                0{active + 1} / 0{heroSlides.length}
              </span>
            </div>
            <a className="hero-feature-link" href="#work">
              Explore collection <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const numberRef = useRef(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setCount(value);
      return undefined;
    }

    let frameId;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const startTime = performance.now();
        const duration = 900;
        const animate = (time) => {
          const progress = Math.min((time - startTime) / duration, 1);
          setCount(Math.round(value * progress));
          if (progress < 1) frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.5 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value]);

  return <strong ref={numberRef}>{String(count).padStart(2, "0")}</strong>;
}
function Intro() {
  const impactItems = [
    {
      number: "01",
      label: "Natural materials",
      detail: "Made to feel at home",
    },
    { number: "02", label: "Expert guidance", detail: "A considered choice" },
    { number: "03", label: "Careful fitting", detail: "Finished with care" },
    { number: "04", label: "Lasting comfort", detail: "Ready for real life" },
  ];

  return (
    <section id="about" className="intro section-pad">
      <div className="who-intro">
        <span className="who-pill">Who we are</span>
        <h2 className="who-title">
          <span>Floortex brings thoughtful flooring to</span>
          <strong>everyday homes, with honest materials</strong>
          <span>and care in every detail.</span>
        </h2>
        <p className="who-description">
          From the first sample to the final fit, we make it easier to find a
          floor that feels right for your home and the way you live.
        </p>
        <div className="who-gallery" aria-label="Floortex flooring inspiration">
          <img
            loading="lazy"
            decoding="async"
            src={photos.oak}
            alt="Warm oak flooring in a bright contemporary living room"
          />
          <img
            loading="lazy"
            decoding="async"
            src={photos.stone}
            alt="Soft stone-look flooring in a calm modern interior"
          />
          <img
            loading="lazy"
            decoding="async"
            src={photos.herringbone}
            alt="Herringbone flooring in a refined home interior"
          />
        </div>
      </div>
      <div className="who-impact">
        <span className="who-pill">Our impact</span>
        <div className="impact-grid">
          {impactItems.map((item) => (
            <article className="impact-card" key={item.number}>
              <CountUp value={Number(item.number)} />
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function ProductCard({ product, index }) {
  return (
    <a
      href="#contact"
      className={`product-card work-reveal product-card-${index + 1}`}
    >
      <div className="product-photo">
        <img
          loading="lazy"
          decoding="async"
          src={product.image}
          alt={`${product.name} flooring in a contemporary interior`}
        />
        <div className="product-meta">
          <div className="product-meta-top">
            <div className="product-meta-copy">
              <h3>{product.name}</h3>
              <span className="product-category">
                <MapPin size={13} />
                {product.category}
              </span>
            </div>
            <span className="product-open" aria-hidden="true">
              <ArrowRight size={20} />
            </span>
          </div>
          <div className="product-meta-footer">
            <span>{product.price}</span>
            <span>
              Explore finish <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function Work() {
  return (
    <section id="work" className="work section-pad">
      <div className="work-inner">
        <div className="work-heading">
          <div className="work-heading-copy work-reveal">
            <span className="eyebrow work-eyebrow">
              <BriefcaseBusiness size={13} aria-hidden="true" /> Selected Work
            </span>
            <h2>
              Collections that let the <em>floors hold the room.</em>
            </h2>
          </div>
          <a href="#contact" className="work-consult work-reveal">
            Book a consultation <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="products-grid">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const [active, setActive] = useState(0);
  const approachItems = [
    {
      name: "Wood flooring",
      image: photos.oak,
      title: "Warmth in every grain.",
      copy: "Explore natural oak and considered wood finishes selected for the feeling, tone, and character they bring to your home.",
      detail:
        "We’ll help you compare styles, finishes, and practical details, then find the right fit for each room.",
    },
    {
      name: "Stone & porcelain",
      image: photos.stone,
      title: "A beautiful, practical finish.",
      copy: "Discover stone-inspired surfaces and porcelain with the texture and colour to bring a room together.",
      detail:
        "We’ll guide you through finish, format, durability, and care so your choice works beautifully every day.",
    },
    {
      name: "Space planning",
      image: photos.process,
      title: "Made to work with your space.",
      copy: "Every home is different. We consider room shape, natural light, how you move through a space, and the look you want.",
      detail:
        "From the first measurements to the finishing details, we help the whole floor feel considered.",
    },
    {
      name: "Expert installation",
      image: photos.herringbone,
      title: "Care in every detail.",
      copy: "A lasting finish starts with careful preparation and the right hands on every part of the installation.",
      detail:
        "Our fitting team takes care with the details, keeping your home and schedule in mind from start to finish.",
    },
    {
      name: "Care & aftercare",
      image: photos.cta,
      title: "Comfort that lasts.",
      copy: "The right care helps your floor stay beautiful as life happens around it.",
      detail:
        "We’ll share clear advice on looking after your chosen material, and be here if you need a hand later on.",
    },
  ];
  const item = approachItems[active];

  return (
    <section id="approach" className="approach section-pad">
      <div className="approach-intro">
        <span className="approach-pill">Our Approach</span>
        <h2>Crafting Floors with Purpose</h2>
        <p>
          Thoughtfully selected materials, practical guidance, and careful
          fitting come together to make a floor feel right at home.
        </p>
      </div>
      <div className="approach-content">
        <div
          className="approach-list"
          role="group"
          aria-label="Floortex services"
        >
          {approachItems.map((service, index) => (
            <button
              key={service.name}
              className={`approach-tab ${active === index ? "active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span>{service.name}</span>
              <span className="approach-number">0{index + 1}</span>
            </button>
          ))}
        </div>
        <div className="approach-detail" key={active}>
          <img
            loading="lazy"
            decoding="async"
            src={item.image}
            alt={`${item.name} in a considered contemporary home`}
          />
          <div className="approach-description">
            <h3>Description</h3>
            <p>{item.copy}</p>
            <p>{item.detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq section-pad" id="faq">
      <div className="faq-intro">
        <span className="faq-pill">FAQ</span>
        <h2>Frequently Asked Questions</h2>
        <p>
          Find clear answers to common questions about Floortex flooring,
          installation, and care so you can choose with confidence.
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
              <span className="faq-toggle" aria-hidden="true">
                <ChevronDown size={21} />
              </span>
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
function Reviews() {
  const [active, setActive] = useState(0);
  const change = (direction) =>
    setActive((active + direction + reviews.length) % reviews.length);
  const review = reviews[active];
  const nextReview = reviews[(active + 1) % reviews.length];

  return (
    <section className="reviews section-pad">
      <div className="reviews-heading">
        <div className="reviews-title">
          <span className="eyebrow">
            <span className="eyebrow-dot" /> Client stories
          </span>
          <h2>
            Real Experiences,
            <br />
            Trusted by Clients
          </h2>
        </div>
        <div className="reviews-intro">
          <p>
            Hear how our clients shaped spaces that truly match their lifestyle,
            ambitions, and expectations.
          </p>
          <div className="review-controls" aria-label="Client story navigation">
            <button onClick={() => change(-1)} aria-label="Show previous story">
              <ArrowLeft size={20} />
            </button>
            <button onClick={() => change(1)} aria-label="Show next story">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="review-stage" key={active}>
        <img
          className="review-image"
          src={review.image}
          alt="A Floortex customer's finished home"
        />
        <article className="review-story">
          <span className="quote-mark" aria-hidden="true">
            “
          </span>
          <p className="review-quote">{review.quote}</p>
          <div className="review-person">
            <img src={review.personImage} alt="" />
            <div>
              <strong>{review.name}</strong>
              <span>{review.role}</span>
            </div>
          </div>
        </article>
        <img
          className="review-side-image"
          src={nextReview.image}
          alt="Another Floortex flooring project"
        />
      </div>
    </section>
  );
}

function ContactFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer id="contact" className="footer">
      <div className="contact-banner">
        <img
          loading="lazy"
          decoding="async"
          src={photos.cta}
          alt="Contemporary Floortex home surrounded by trees"
        />
        <div className="contact-shade" />
        <div className="contact-copy">
          <h2>Find Your Perfect Floor for Modern Living</h2>
          <p>
            Thoughtful materials and expert fitting, chosen around the way you
            live.
          </p>
          <a className="button button-light" href="mailto:hello@floortex.com">
            Book a Visit <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <Brand light />
          <p>
            Beautiful floors.
            <br />
            Better days at home.
          </p>
        </div>
        <nav className="footer-col" aria-label="Footer navigation">
          <span className="footer-label">FIND YOUR WAY</span>
          <a href="#home">Home</a>
          <a href="#about">Our story</a>
          <a href="#work">Collections</a>
          <a href="#approach">Our process</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-col">
          <span className="footer-label">COME SAY HELLO</span>
          <a href="mailto:hello@floortex.com">
            hello@floortex.com <ArrowUpRight size={14} />
          </a>
          <span>Questions, samples, or just a chat</span>
        </div>
      </div>
      <div className="footer-newsletter">
        <span className="footer-label">A NOTE FROM US</span>
        <p>New arrivals, good ideas, and a little inspiration for home.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email) setSubscribed(true);
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email-input">
            Email address
          </label>
          <input
            id="newsletter-email-input"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button aria-label="Subscribe">
            {subscribed ? <Check size={17} /> : <ArrowUpRight size={17} />}
          </button>
        </form>
        {subscribed && (
          <span className="subscribe-success">
            You’re on the list. Speak soon.
          </span>
        )}
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        FLOORTEX
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Floortex. Made for living.</span>
        <span>
          Thoughtfully chosen, always <span className="footer-heart">✳</span>
        </span>
        <a href="#home">
          Back to the top <ArrowUpRight size={14} />
        </a>
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
    document
      .querySelectorAll(".section-pad, .contact-banner")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Approach />
        <FAQ />
        <Reviews />
      </main>
      <ContactFooter />
    </>
  );
}

export default App;
