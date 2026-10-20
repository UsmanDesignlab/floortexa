import { useState } from "react";
import { services } from "../data";

export default function QuoteForm({ defaultService = "" }) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="quote-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-row">
        <label>
          Name
          <input name="name" required placeholder="Your name" autoComplete="name" />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            autoComplete="email"
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Phone
          <input name="phone" required placeholder="07..." autoComplete="tel" />
        </label>
        <label>
          Postcode
          <input name="postcode" required placeholder="RM11..." autoComplete="postal-code" />
        </label>
      </div>
      <label>
        Service interest
        <select name="service" defaultValue={defaultService} required>
          <option value="">Choose a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.name}>
              {s.name}
            </option>
          ))}
          <option value="Carpet repairs">Carpet repairs</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>
      <label>
        Message
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Room type, size, timing, or any questions..."
        />
      </label>
      <button className="btn btn-primary" type="submit">
        Request free estimate
      </button>
      <p className="form-note">
        Demo form — connects to your inbox once live enquiry routing is set.
      </p>
      {sent && (
        <p className="form-success" role="status">
          Thanks — your estimate request is ready. We’ll confirm contact details before go-live.
        </p>
      )}
    </form>
  );
}
