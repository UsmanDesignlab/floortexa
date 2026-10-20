import QuoteForm from "../components/QuoteForm";
import { address, email, phone, phoneHref } from "../data";

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Contact</p>
        <h1>Free estimate. Quick response.</h1>
        <p className="lead">
          Call, email or send the form — we’ll arrange measure, samples and a
          clear written quote.
        </p>
      </section>

      <section className="section two-col contact-page">
        <div className="contact-cards">
          <article>
            <h3>Call</h3>
            <a href={phoneHref}>{phone}</a>
          </article>
          <article>
            <h3>Email</h3>
            <a href={`mailto:${email}`}>{email}</a>
          </article>
          <article>
            <h3>Coverage</h3>
            <p>{address}</p>
          </article>
          <article>
            <h3>Hours</h3>
            <p>Mon–Sat by appointment · Evening visits available</p>
          </article>
        </div>
        <div className="panel">
          <h3>Request a free estimate</h3>
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
