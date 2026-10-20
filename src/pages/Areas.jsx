import { Link } from "react-router-dom";
import { areas } from "../data";

export default function Areas() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Areas of operation</p>
        <h1>Flooring across Essex & nearby London.</h1>
        <p className="lead">
          Free measures where we operate. If your town isn’t listed, ask — we
          often cover neighbouring postcodes.
        </p>
      </section>

      <section className="section">
        <div className="areas-grid">
          {areas.map((area) => (
            <div key={area}>{area}</div>
          ))}
        </div>
        <div className="center-cta">
          <Link className="btn btn-primary" to="/contact">
            Check my postcode
          </Link>
        </div>
      </section>
    </>
  );
}
