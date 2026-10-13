import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Menu,
  MapPin,
  Plus,
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
  },
  {
    quote:
      "The samples, the thoughtful advice, the final finish—it was all considered. Our new floor has completely changed how the space feels, and I couldn’t be happier.",
    name: "Adrian Malik",
    role: "Homeowner, Richmond",
  },
  {
    quote:
      "A lovely team from the first conversation to the last detail. We found something beautiful that works for everyday family life, and the quality is excellent.",
    name: "Sofia Bennett",
    role: "Homeowner, Bristol",
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
    ["Our story", "#about"],
    ["Collections", "#work"],
    ["Our process", "#approach"],
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
        Let’s talk <ArrowUpRight size={15} />
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

function Intro() {
  return (
    <section id="about" className="intro section-pad">
      <div className="intro-top">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> A more considered floor
        </span>
        <span className="section-index">01 / OUR STORY</span>
      </div>
      <div className="intro-copy">
        <h2>
          Good design starts <em>from the ground up.</em>
        </h2>
        <p>
          We believe a floor should feel as good as it looks. That’s why we
          bring together honest materials, thoughtful advice, and a little extra
          care to make choosing yours a pleasure.
        </p>
        <a className="text-link" href="#approach">
          A little about us <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="intro-gallery">
        <figure className="gallery-image gallery-large">
          <img
            loading="lazy"
            decoding="async"
            src={photos.oak}
            alt="Natural oak flooring in a light-filled, contemporary home"
          />
          <figcaption>
            <span>Natural oak, slow mornings</span>
            <ArrowUpRight size={16} />
          </figcaption>
        </figure>
        <figure className="gallery-image gallery-small">
          <img
            loading="lazy"
            decoding="async"
            src={photos.stone}
            alt="Soft limestone-inspired surface in a warm neutral interior"
          />
          <figcaption>
            <span>Stone, with a softer side</span>
            <ArrowUpRight size={16} />
          </figcaption>
        </figure>
        <div className="gallery-note">
          <span className="note-star">✳</span>
          <p>
            Material-led.
            <br />
            Thoughtfully chosen.
            <br />
            Made for real life.
          </p>
          <span className="note-count">A better way to floor.</span>
        </div>
      </div>
      <div className="impact">
        <div className="impact-label">
          <span>THE THINGS WE VALUE</span>
          <span>A little care adds up.</span>
        </div>
        <div className="impact-stat">
          <strong>01</strong>
          <span>
            Honest, natural
            <br />
            materials
          </span>
        </div>
        <div className="impact-stat">
          <strong>02</strong>
          <span>
            Advice for
            <br />
            real life
          </span>
        </div>
        <div className="impact-stat">
          <strong>03</strong>
          <span>
            Careful
            <br />
            installation
          </span>
        </div>
        <div className="impact-stat">
          <strong>04</strong>
          <span>
            Thoughtful
            <br />
            aftercare
          </span>
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
  return (
    <section id="approach" className="approach section-pad">
      <div className="section-heading approach-heading">
        <div>
          <span className="eyebrow">
            <span className="eyebrow-dot" /> From first thought to final fit
          </span>
          <h2>
            Choosing well.
            <br />
            <em>Living beautifully.</em>
          </h2>
        </div>
        <div className="heading-aside">
          <p>
            Good floors last. Good guidance makes choosing one easy. We’re here
            for every step of the way.
          </p>
        </div>
      </div>
      <div className="approach-content">
        <div className="approach-list" role="group" aria-label="Our process">
          {processes.map((item, index) => (
            <button
              key={item.name}
              className={`approach-tab ${active === index ? "active" : ""}`}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
            >
              <span className="approach-number">0{index + 1}</span>
              <span>{item.name}</span>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <div className="approach-detail" key={active}>
          <img
            loading="lazy"
            decoding="async"
            src={
              active === 0
                ? photos.process
                : [
                    photos.process,
                    photos.oak,
                    photos.stone,
                    photos.herringbone,
                  ][active]
            }
            alt="Flooring details and carefully considered interior materials"
          />
          <div className="detail-card">
            <span className="eyebrow">A good place to start</span>
            <h3>{processes[active].title}</h3>
            <p>{processes[active].copy}</p>
            <p>{processes[active].detail}</p>
            <a href="#contact" className="text-link">
              Let’s find your floor <ArrowUpRight size={15} />
            </a>
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
        <span className="eyebrow">
          <span className="eyebrow-dot" /> A few good questions
        </span>
        <h2>
          Good to <em>know.</em>
        </h2>
        <p>
          Everything you might want to know before choosing a new floor. Still
          curious? We’re always happy to help.
        </p>
        <a className="text-link" href="mailto:hello@floortex.com">
          Ask us anything <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div className={`faq-item ${open === i ? "open" : ""}`} key={faq.q}>
            <button
              className="faq-question"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>
                <small>0{i + 1}</small>
                {faq.q}
              </span>
              <span className="faq-toggle">
                {open === i ? <X size={15} /> : <Plus size={15} />}
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
  return (
    <section className="reviews section-pad">
      <div className="reviews-heading">
        <span className="eyebrow">
          <span className="eyebrow-dot" /> Kind words, lovely homes
        </span>
        <h2>
          Made for living.
          <br />
          <em>Loved by living.</em>
        </h2>
        <p>A few notes from people who found their floor with us.</p>
      </div>
      <div className="review-stage">
        <img
          loading="lazy"
          decoding="async"
          className="review-image"
          src={photos.process}
          alt="Warm, light-filled home with natural timber flooring"
        />
        <div className="review-card" key={active}>
          <span className="quote-mark">“</span>
          <p className="review-quote">{review.quote}</p>
          <div className="review-person">
            <img src={photos.person} alt="" />
            <div>
              <strong>{review.name}</strong>
              <span>{review.role}</span>
            </div>
            <span className="review-stars" aria-label="5 out of 5 stars">
              ★★★★★
            </span>
          </div>
          <div className="review-controls">
            <span>
              0{active + 1} <span className="review-divider">/</span> 0
              {reviews.length}
            </span>
            <div>
              <button
                onClick={() => change(-1)}
                aria-label="Show previous story"
              >
                <ArrowLeft size={17} />
              </button>
              <button onClick={() => change(1)} aria-label="Show next story">
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
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
          alt="Sunset on a considered contemporary home"
        />
        <div className="contact-shade" />
        <div className="contact-copy">
          <span className="eyebrow light-eyebrow">
            <span className="eyebrow-dot" /> Your next chapter starts here
          </span>
          <h2>
            Make yourself
            <br />
            <em>at home.</em>
          </h2>
          <p>
            Tell us what you’re dreaming of. We’ll help you find the floor that
            brings it to life.
          </p>
          <a className="button button-light" href="mailto:hello@floortex.com">
            Let’s find your floor <ArrowUpRight size={16} />
          </a>
        </div>
        <span className="contact-coordinate">A LITTLE MORE ROOM TO LIVE.</span>
      </div>
      <div className="footer-main">
        <div className="footer-brand">
          <Brand light />
          <p>
            Beautiful floors.
            <br />
            Better days at home.
          </p>
          <a href="mailto:hello@floortex.com">
            hello@floortex.com <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="footer-col">
          <span className="footer-label">FIND YOUR WAY</span>
          <a href="#home">Home</a>
          <a href="#about">Our story</a>
          <a href="#work">Collections</a>
          <a href="#approach">Our process</a>
        </div>
        <div className="footer-col">
          <span className="footer-label">COME SAY HELLO</span>
          <span>Here when you need us</span>
          <span>Questions, samples, or just a chat</span>
          <a href="mailto:hello@floortex.com">
            Get in touch <ArrowUpRight size={14} />
          </a>
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
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button aria-label="Subscribe">
              {subscribed ? <Check size={16} /> : <ArrowUpRight size={16} />}
            </button>
          </form>
          {subscribed && (
            <span className="subscribe-success">
              You’re on the list. Speak soon.
            </span>
          )}
        </div>
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
