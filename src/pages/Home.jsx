import { Link } from "react-router-dom";
import { ArrowUpRight, Check, Star } from "lucide-react";
import Accordion from "../components/Accordion";
import QuoteForm from "../components/QuoteForm";
import {
  homeFaqs,
  images,
  phone,
  phoneHref,
  reviews,
  services,
  whyUs,
} from "../data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <img src={images.hero} alt="" className="hero-bg" />
        <div className="hero-shade" />
        <div className="hero-inner">
          <p className="eyebrow light">Carpets · LVT · Wood · Laminate · Essex</p>
          <h1>
            Trained flooring specialists.
            <em> Beautiful finish.</em>
          </h1>
          <p className="lead">
            Supply and fit carpets, vinyl, laminate, engineered wood and stair
            runners across Essex — free measure, tidy installs, warranty included.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-primary" to="/contact">
              Get a free quote <ArrowUpRight size={16} />
            </Link>
            <Link className="btn btn-light" to="/gallery">
              View our work
            </Link>
          </div>
          <div className="hero-proof">
            <Star size={16} fill="currentColor" />
            <span>5-star style reviews · Free estimates all over Essex</span>
          </div>
        </div>
      </section>

      <section className="strip">
        <div className="strip-inner">
          <strong>Free measurement & estimates</strong>
          <span>Uplift & disposal</span>
          <span>Door trimming</span>
          <span>Furniture handling</span>
          <span>Always on time</span>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Why Floortex</p>
          <h2>Because we do it all — properly.</h2>
          <p>
            A modern flooring studio built to beat dated competitor sites on
            clarity, design and conversion — without cutting corners on fit.
          </p>
        </div>
        <div className="why-grid">
          {whyUs.map((item) => (
            <article key={item.title}>
              <Check size={18} />
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="section-head split">
          <div>
            <p className="eyebrow">Popular services</p>
            <h2>Supply & fit for homes and business.</h2>
          </div>
          <Link className="btn btn-ghost" to="/services">
            All services <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="service-cards">
          {services.map((s) => (
            <Link className="service-card" key={s.slug} to={`/services/${s.slug}`}>
              <img src={s.image} alt="" loading="lazy" />
              <div>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <span>
                  Explore <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="feature-band">
        <img src={images.stairs} alt="Custom stair runner" />
        <div>
          <p className="eyebrow">Custom rugs & stair runners</p>
          <h2>Runners and borders made for your staircase.</h2>
          <p>
            Create a rug or runner from almost any carpet with custom borders —
            a detail that separates a tidy fit from a designed one.
          </p>
          <Link className="btn btn-primary" to="/services/stair-runners">
            Stair runners <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <p className="eyebrow">Reviews</p>
          <h2>Trusted by homeowners across Essex.</h2>
        </div>
        <div className="review-grid">
          {reviews.map((r) => (
            <article key={r.title}>
              <div className="stars">★★★★★</div>
              <h3>{r.title}</h3>
              <p>“{r.quote}”</p>
              <span>{r.date}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt two-col">
        <div>
          <p className="eyebrow">FAQs</p>
          <h2>Everything you need before you book.</h2>
          <p>Clear answers — no fluff, no outdated template copy.</p>
          <a className="text-link" href={phoneHref}>
            Prefer to talk? Call {phone}
          </a>
        </div>
        <Accordion items={homeFaqs} />
      </section>

      <section className="section contact-band" id="quote">
        <div>
          <p className="eyebrow">Get a quote</p>
          <h2>Free estimate. Honest advice. Better finish.</h2>
          <p>
            Tell us the room, postcode and flooring interest — we’ll prepare a
            clear next step.
          </p>
        </div>
        <QuoteForm />
      </section>
    </>
  );
}
