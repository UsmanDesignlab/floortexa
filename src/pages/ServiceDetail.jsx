import { Link, Navigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import QuoteForm from "../components/QuoteForm";
import { services } from "../data";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);
  if (!service) return <Navigate to="/services" replace />;

  return (
    <>
      <section className="service-hero">
        <img src={service.image} alt="" />
        <div className="service-hero-copy">
          <p className="eyebrow light">Service</p>
          <h1>{service.name}</h1>
          <p>{service.copy}</p>
          <Link className="btn btn-light" to="/contact">
            Get a quote
          </Link>
        </div>
      </section>

      <section className="section two-col">
        <div>
          <p className="eyebrow">What’s included</p>
          <h2>A clearer package than the old competitor pages.</h2>
          <ul className="include-list">
            {service.includes.map((line) => (
              <li key={line}>
                <Check size={18} /> {line}
              </li>
            ))}
          </ul>
          <Link className="text-link" to="/services">
            ← All services
          </Link>
        </div>
        <div className="panel">
          <h3>Request this service</h3>
          <QuoteForm defaultService={service.name} />
        </div>
      </section>
    </>
  );
}
