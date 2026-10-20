import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";
import QuoteForm from "../components/QuoteForm";
import { images, repairsFaqs } from "../data";

export default function Repairs() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Carpet repairs</p>
        <h1>Fix it properly before you replace it.</h1>
        <p className="lead">
          Re-stretching, patching, stair repairs and seam work — when your carpet
          still has life left.
        </p>
      </section>

      <section className="section two-col">
        <img className="about-photo" src={images.carpet} alt="Carpet repair and fitting" />
        <div>
          <p className="eyebrow">Common repairs</p>
          <h2>Fast, honest carpet rescue.</h2>
          <ul className="tick-list">
            <li>Loose or rippled carpet re-stretch</li>
            <li>Stair runner re-secure</li>
            <li>Seam & edge repairs</li>
            <li>Burn / tear patch matching</li>
            <li>Threshold & bar replacement</li>
          </ul>
          <Link className="btn btn-primary" to="/contact">
            Book a repair visit
          </Link>
        </div>
      </section>

      <section className="section alt two-col">
        <div>
          <p className="eyebrow">Repair FAQs</p>
          <h2>Accordion answers</h2>
          <Accordion items={repairsFaqs} />
        </div>
        <div className="panel">
          <h3>Request a repair</h3>
          <QuoteForm defaultService="Carpet repairs" />
        </div>
      </section>
    </>
  );
}
