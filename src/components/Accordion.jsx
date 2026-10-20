import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items, allowMultiple = false }) {
  const [open, setOpen] = useState(allowMultiple ? [] : 0);

  const isOpen = (index) =>
    allowMultiple ? open.includes(index) : open === index;

  const toggle = (index) => {
    if (allowMultiple) {
      setOpen((current) =>
        current.includes(index)
          ? current.filter((i) => i !== index)
          : [...current, index],
      );
      return;
    }
    setOpen(open === index ? -1 : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div
          className={`accordion-item ${isOpen(index) ? "is-open" : ""}`}
          key={item.q || item.title}
        >
          <button
            type="button"
            className="accordion-trigger"
            aria-expanded={isOpen(index)}
            onClick={() => toggle(index)}
          >
            <span>{item.q || item.title}</span>
            <ChevronDown size={20} aria-hidden="true" />
          </button>
          <div className="accordion-panel">
            <p>{item.a || item.detail || item.copy}</p>
            {item.includes && (
              <ul>
                {item.includes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
