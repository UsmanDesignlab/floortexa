import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";
import { images, whyUs } from "../data";

export default function About() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">About Floortex</p>
        <h1>Family-run flooring. Designer-level presentation.</h1>
        <p className="lead">
          We supply and fit carpets, vinyl, laminate, engineered wood and LVT
          across Essex — with free measures, warranty and public liability cover.
        </p>
      </section>

      <section className="section two-col">
        <img className="about-photo" src={images.gallery1} alt="Floortex finished living space" />
        <div>
          <p className="eyebrow">Welcome</p>
          <h2>Your local flooring studio — rebuilt for 2026.</h2>
          <p>
            Competitor sites still look like old WordPress templates. Floortex is
            built for how people actually choose floors: clear services, samples,
            proof and an easy quote path — while the install stays hands-on and
            careful.
          </p>
          <ul className="tick-list">
            <li>Free measurements & estimates</li>
            <li>Expert advice for your budget</li>
            <li>Samples brought to your property</li>
            <li>Evenings & weekend visits by arrangement</li>
          </ul>
          <Link className="btn btn-primary" to="/contact">
            Book a measure
          </Link>
        </div>
      </section>

      <section className="section alt">
        <div className="section-head">
          <p className="eyebrow">Why homeowners choose us</p>
          <h2>Local knowledge. National-standard finish.</h2>
        </div>
        <Accordion
          allowMultiple
          items={whyUs.map((w) => ({ title: w.title, a: w.detail }))}
        />
      </section>

      <section className="section two-col">
        <div>
          <p className="eyebrow">What we install</p>
          <h2>Complete floor laying services.</h2>
          <Accordion
            items={[
              {
                q: "Residential floors",
                a: "Carpets, stair runners, LVT, vinyl, laminate and engineered wood for homes that need to look good and live hard.",
              },
              {
                q: "Commercial floors",
                a: "Carpet tiles, safety flooring, communal carpets and durable vinyl for offices, housing and retail.",
              },
              {
                q: "Repairs & aftercare",
                a: "Re-stretching, patching and stair fixes when a full replace isn’t needed yet.",
              },
            ]}
          />
        </div>
        <img className="about-photo" src={images.vinyl} alt="LVT flooring install" />
      </section>
    </>
  );
}
