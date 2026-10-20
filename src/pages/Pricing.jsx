import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";
import { pricing } from "../data";

export default function Pricing() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Pricing</p>
        <h1>Transparent starting points. Final quote after measure.</h1>
        <p className="lead">
          Indicative ranges for planning — your free measure locks the exact
          figure for room size, underlay and prep.
        </p>
      </section>

      <section className="section">
        <div className="price-grid">
          {pricing.map((tier) => (
            <article key={tier.name} className="price-card">
              <h3>{tier.name}</h3>
              <p className="price">{tier.from}</p>
              <p className="muted">{tier.note}</p>
              <ul>
                {tier.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link className="btn btn-primary" to="/contact">
                Get exact quote
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt">
        <div className="section-head">
          <p className="eyebrow">Pricing FAQs</p>
          <h2>How quotes work</h2>
        </div>
        <Accordion
          items={[
            {
              q: "Do you beat written quotes?",
              a: "Bring a like-for-like written quote and we’ll compete on value — while protecting the quality of underlay, prep and finish.",
            },
            {
              q: "What’s included in a supply & fit price?",
              a: "Typically materials, fitting labour, standard door trimming and tidy finish. Uplift and complex prep are confirmed on measure.",
            },
            {
              q: "Is the measure free?",
              a: "Yes — free measurements and estimates across Essex.",
            },
          ]}
        />
      </section>
    </>
  );
}
