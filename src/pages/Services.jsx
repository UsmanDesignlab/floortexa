import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Accordion from "../components/Accordion";
import { services } from "../data";

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Our services</p>
        <h1>Every floor type. One careful team.</h1>
        <p className="lead">
          Explore carpets, stair runners, LVT, laminate, engineered wood and
          commercial flooring — each with clear inclusions and a path to quote.
        </p>
      </section>

      <section className="section">
        <div className="service-cards dense">
          {services.map((s) => (
            <Link className="service-card" key={s.slug} to={`/services/${s.slug}`}>
              <img src={s.image} alt="" loading="lazy" />
              <div>
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <span>
                  View details <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="section-head">
          <p className="eyebrow">Compare quickly</p>
          <h2>Accordion guide — pick what fits your room.</h2>
        </div>
        <Accordion
          items={services.map((s) => ({
            q: s.name,
            a: s.copy,
            includes: s.includes,
          }))}
        />
      </section>
    </>
  );
}
