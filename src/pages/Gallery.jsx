import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { gallery } from "../data";

const tags = ["All", ...Array.from(new Set(gallery.map((g) => g.tag)))];

export default function Gallery() {
  const [tag, setTag] = useState("All");
  const items = useMemo(
    () => (tag === "All" ? gallery : gallery.filter((g) => g.tag === tag)),
    [tag],
  );

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Gallery</p>
        <h1>Work that shows underfoot.</h1>
        <p className="lead">
          A curated set of interiors — filter by material. Replace with your real
          project photos anytime.
        </p>
      </section>

      <section className="section">
        <div className="filter-row" role="tablist" aria-label="Gallery filters">
          {tags.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tag === t}
              className={tag === t ? "is-active" : ""}
              onClick={() => setTag(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {items.map((item) => (
            <figure key={item.label}>
              <img src={item.image} alt={item.label} loading="lazy" />
              <figcaption>
                <strong>{item.label}</strong>
                <span>{item.tag}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="center-cta">
          <Link className="btn btn-primary" to="/contact">
            Want this finish? Get a quote
          </Link>
        </div>
      </section>
    </>
  );
}
