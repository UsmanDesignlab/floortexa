import { useState } from "react";

const images = {
  hero: "/assets/floortex-hero.png",
  stairs: "/assets/floortex-stairs.png",
  vinyl: "/assets/floortex-vinyl.png",
};

const collections = [
  {
    index: "01 / NATURAL CHARACTER",
    title: <>Wood & engineered<br />flooring</>,
    label: "Wood & engineered flooring",
    image: images.hero,
    alt: "Warm oak herringbone floor in a contemporary living room",
  },
  {
    index: "02 / SOFT UNDERFOOT",
    title: <>Carpets & stair<br />runners</>,
    label: "Carpets & stair runners",
    image: images.stairs,
    alt: "Soft neutral carpet runner on a staircase",
  },
  {
    index: "03 / EVERYDAY EASE",
    title: <>Luxury vinyl<br />& LVT</>,
    label: "Luxury vinyl & LVT",
    image: images.vinyl,
    alt: "Light wood-look flooring in a refined kitchen",
  },
];

const services = [
  "Carpets & stair runners",
  "Luxury vinyl & LVT",
  "Laminate flooring",
  "Wood & engineered wood",
  "Commercial & safety floors",
];

const steps = [
  ["✳", "Tell us your vision", "Share your room, preferred look and what matters most to you."],
  ["▤", "Explore your options", "Compare materials, tones and finishes suited to your space."],
  ["⌁", "Plan the details", "Discuss measurements, practical needs and the next steps."],
  ["✧", "Enjoy the result", "Bring your room together with flooring made to be lived on."],
];

const faqs = [
  ["Which flooring is best for a busy home?", "Luxury vinyl and laminate can be practical options for busy spaces, while carpets bring softness and warmth. The right choice depends on the room, foot traffic and finish you prefer."],
  ["Can I ask about more than one flooring type?", "Of course. Tell us which materials you are considering and we can help you compare the look and practical considerations."],
  ["Do you cover the whole UK?", "Floortex is presented as UK-wide in this demo. Add your exact coverage and installation availability before using the site for live enquiries."],
  ["What should I include in my enquiry?", "The room type, approximate size, preferred flooring, postcode and any timing you have in mind are a great start."],
];

function Brand() {
  return (
    <a className="logo" href="#top" aria-label="Floortex home">
      <span className="logo-mark">f<span>.</span></span>
      <span>floortex<span className="logo-dot">.</span></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["About", "#about"], ["Collections", "#collections"], ["Services", "#services"], ["Our process", "#process"], ["FAQs", "#faq"]];
  return (
    <>
      <div className="topbar"><span>Thoughtful floors. Beautiful spaces.</span><span>Serving homes & businesses across the UK <span aria-hidden="true">↗</span></span></div>
      <header className="header" id="top">
        <Brand />
        <nav className={`nav ${open ? "open" : ""}`} id="main-nav" aria-label="Main navigation">
          {links.map(([name, href]) => <a href={href} key={name} onClick={() => setOpen(false)}>{name}</a>)}
        </nav>
        <a className="header-cta" href="#quote">Get a quote <span aria-hidden="true">↗</span></a>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span /><span /></button>
      </header>
    </>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-image" /><div className="hero-shade" />
      <div className="hero-content container">
        <p className="eyebrow hero-eyebrow"><span className="line" /> THE FOUNDATION OF A BEAUTIFUL HOME</p>
        <h1 id="hero-title">Floors that feel<br /><em>like home.</em></h1>
        <p className="hero-copy">From the first sample to the final detail, discover flooring that brings your space together.</p>
        <div className="hero-actions"><a className="btn btn-dark" href="#collections">Explore collections <span>↗</span></a><a className="text-link" href="#quote">Plan your project <span>↗</span></a></div>
      </div>
      <div className="hero-bottom container"><span>01 / 03 &nbsp;—&nbsp; DESIGN BEGINS UNDERFOOT</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
    </section>
  );
}

function Intro() {
  return (
    <section className="intro section-pad" id="about">
      <div className="container intro-grid">
        <div><p className="eyebrow">WELCOME TO FLOORTEX</p><h2>More than a floor.<br /><em>A feeling.</em></h2></div>
        <div className="intro-copy"><p>Every room has a story. The right flooring gives it a beautiful place to begin. Explore considered materials, practical choices and finishes that suit how you really live.</p><a className="under-link" href="#services">Discover what we do <span>↗</span></a></div>
      </div>
      <div className="container highlights" aria-label="Our approach">
        <div><span className="highlight-icon">✧</span><strong>Style for every space</strong><small>Choices for homes and commercial spaces</small></div>
        <div><span className="highlight-icon">▧</span><strong>Materials that matter</strong><small>Textures and finishes worth exploring</small></div>
        <div><span className="highlight-icon">↗</span><strong>Start with a conversation</strong><small>Tell us what you are planning</small></div>
      </div>
    </section>
  );
}

function Collections({ onSelect }) {
  return (
    <section className="collections section-pad" id="collections">
      <div className="container section-heading"><div><p className="eyebrow">EXPLORE THE POSSIBILITIES</p><h2>Find your perfect <em>floor.</em></h2></div><p>Whatever your space calls for, there is a surface to make it yours.</p></div>
      <div className="container collection-grid">
        {collections.map((item, index) => (
          <a className={`collection-card ${index === 0 ? "card-large" : ""}`} href="#quote" key={item.label} onClick={() => onSelect(item.label)}>
            <img src={item.image} alt={item.alt} loading="lazy" /><span className="collection-overlay" />
            <span className="card-content"><span className="card-index">{item.index}</span><strong>{item.title}</strong><span className="card-arrow">↗</span></span>
          </a>
        ))}
      </div>
      <div className="container more-collections"><span>ALSO EXPLORE</span>{["Laminate flooring", "Commercial flooring", "Safety flooring"].map(label => <a href="#quote" key={label} onClick={() => onSelect(label)}>{label} <span>↗</span></a>)}</div>
    </section>
  );
}

function Services() {
  return (
    <section className="statement" id="services"><div className="container statement-grid">
      <div><p className="eyebrow light">WHAT WE CAN HELP WITH</p><h2>Flooring for the way <em>you live.</em></h2><p>From a single room refresh to a larger project, start with the style you love and the practical needs of your space.</p><a className="btn btn-light" href="#quote">Tell us about your space <span>↗</span></a></div>
      <div className="services-list">{services.map((service, index) => <div key={service}><span>{String(index + 1).padStart(2, "0")}</span><strong>{service}</strong><span>↗</span></div>)}</div>
    </div></section>
  );
}

function Feature() {
  return (
    <section className="feature section-pad"><div className="container feature-grid">
      <div className="feature-photo"><img src={images.vinyl} alt="Warm wood-look floor in a bright modern kitchen" loading="lazy" /><span className="feature-note">MADE FOR REAL LIFE <span>↗</span></span></div>
      <div className="feature-content"><p className="eyebrow">BEAUTY MEETS PRACTICALITY</p><h2>A good floor changes <em>everything.</em></h2><p>Warmth underfoot. A finish that ties the room together. Materials selected with your space, daily routine and design goals in mind.</p><ul><li><span>01</span>Explore colour, texture and finish</li><li><span>02</span>Choose for your room and routine</li><li><span>03</span>Make the details feel intentional</li></ul><a className="under-link" href="#quote">Start your project <span>↗</span></a></div>
    </div></section>
  );
}

function Process() {
  return (
    <section className="process section-pad" id="process"><div className="container">
      <div className="section-heading"><div><p className="eyebrow">A SIMPLE WAY TO BEGIN</p><h2>From idea to <em>underfoot.</em></h2></div><p>Great spaces begin with a conversation. Here is how your flooring journey can take shape.</p></div>
      <div className="steps">{steps.map(([symbol, title, copy], index) => <article key={title}><span className="step-number">{String(index + 1).padStart(2, "0")}</span><div className="step-symbol">{symbol}</div><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>
  );
}

function Banner() {
  return <section className="banner"><div className="banner-image" /><div className="container banner-content"><p className="eyebrow light">EVERY ROOM BEGINS SOMEWHERE</p><h2>Let’s make your<br /><em>next step beautiful.</em></h2><a className="btn btn-light" href="#quote">Request a quote <span>↗</span></a></div></section>;
}

function FAQ() {
  return (
    <section className="faq section-pad" id="faq"><div className="container faq-grid">
      <div><p className="eyebrow">GOOD TO KNOW</p><h2>Questions, <em>answered.</em></h2><p>Choosing a floor should feel exciting. Here are a few things to consider as you get started.</p></div>
      <div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
    </div></section>
  );
}

function Quote({ flooring, onFlooringChange }) {
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    setBrief(`FLOORTEX PROJECT BRIEF\n\nName: ${fields.get("name")}\nEmail: ${fields.get("email")}\nPostcode: ${fields.get("postcode")}\nFlooring interest: ${fields.get("flooring")}\n\nProject details:\n${fields.get("message")}`);
  };
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <section className="quote section-pad" id="quote"><div className="container quote-grid">
      <div><p className="eyebrow light">LET’S TALK FLOORING</p><h2>Tell us what you’re <em>imagining.</em></h2><p>Have a room in mind? Share a few details and build a ready-to-send project brief.</p><div className="quote-aside"><span>✧</span><p>Homes, workplaces and everything in between. We would love to hear about your project.</p></div></div>
      <form className="quote-form" onSubmit={onSubmit}>
        <div className="form-row"><label>Your name<input name="name" autoComplete="name" required placeholder="Your name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label></div>
        <div className="form-row"><label>Postcode<input name="postcode" autoComplete="postal-code" required placeholder="e.g. SW1A 1AA" /></label><label>Flooring interest<select name="flooring" value={flooring} onChange={event => onFlooringChange(event.target.value)} required><option value="">Choose an option</option>{[...services.slice(0, 3), "Wood & engineered flooring", "Commercial flooring", "Safety flooring", "Not sure yet"].map(item => <option key={item}>{item}</option>)}</select></label></div>
        <label>Tell us about your space<textarea name="message" rows="4" required placeholder="Room type, approximate size, style ideas or any questions..." /></label>
        <button className="btn btn-cream" type="submit">Create my project brief <span>↗</span></button>
        <p className="form-note">Demo form: your brief is prepared on this device. No details are sent to Floortex yet.</p>
        {brief && <div className="form-result" role="status"><strong>Your project brief is ready.</strong><p>Copy it below and send it to Floortex once your contact channel is connected.</p><button type="button" onClick={onCopy}>{copied ? "Copied!" : "Copy brief"}</button></div>}
      </form>
    </div></section>
  );
}

function Footer() {
  return <footer className="footer"><div className="container footer-main">
    <div><div className="footer-logo"><Brand /></div><p>Flooring made for living.<br />Beautiful spaces begin from the ground up.</p></div>
    <div><h3>Explore</h3><a href="#collections">Collections</a><a href="#services">Services</a><a href="#process">Our process</a><a href="#faq">FAQs</a></div>
    <div><h3>Get in touch</h3><a href="#quote">Start an enquiry ↗</a><span>UK-wide service area</span><span>Contact details coming soon</span></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Floortex. All rights reserved.</span><span>Imagery is illustrative. Business details are demo content pending confirmation.</span><a href="#top">Back to top ↑</a></div></footer>;
}

export default function App() {
  const [flooring, setFlooring] = useState("");
  return <><Header /><main><Hero /><Intro /><Collections onSelect={setFlooring} /><Services /><Feature /><Process /><Banner /><FAQ /><Quote flooring={flooring} onFlooringChange={setFlooring} /></main><Footer /></>;
}
