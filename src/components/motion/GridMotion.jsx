import { useEffect, useRef } from "react";
import "./GridMotion.css";

/** A lightweight, dependency-free adaptation of React Bits GridMotion. */
export default function GridMotion({
  items = [],
  rows = 4,
  aspectRatio = 1.33,
  gap = 16,
  radius = 14,
  angle = -8,
  speed = 24,
  direction = "alternate",
  parallax = 0.5,
  spotlight = 0.6,
  dim = 0.2,
  grayscale = false,
  fade = 0.35,
}) {
  const rootRef = useRef(null);
  const planeRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const plane = planeRef.current;
    if (!root || !plane) return undefined;
    const rowEls = [...plane.children];
    let raf = 0;
    let last = performance.now();
    let pointerX = 0;
    let pointerY = 0;
    let active = false;
    const move = (event) => {
      const rect = root.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
      active = pointerX >= -0.5 && pointerX <= 0.5 && pointerY >= -0.5 && pointerY <= 0.5;
      root.style.setProperty("--pointer-x", `${pointerX * 100}%`);
      root.style.setProperty("--pointer-y", `${pointerY * 100}%`);
      root.classList.toggle("has-pointer", active);
    };
    const leave = () => {
      active = false;
      root.classList.remove("has-pointer");
    };
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      rowEls.forEach((row, index) => {
        const driftDirection = direction === "alternate" ? (index % 2 ? 1 : -1) : direction === "right" ? 1 : -1;
        const loopWidth = Math.max(1, row.scrollWidth / 4);
        const offset = (Number(row.dataset.offset || 0) + speed * driftDirection * dt + loopWidth) % loopWidth;
        row.dataset.offset = offset;
        const nudge = active ? pointerX * parallax * 70 * (index % 2 ? -1 : 1) : 0;
        row.style.transform = `translate3d(calc(-${offset}px + ${nudge}px), 0, 0)`;
      });
      raf = requestAnimationFrame(frame);
    };
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
    };
  }, [direction, parallax, speed]);

  const count = Math.max(1, Math.min(12, Math.round(rows)));
  const repeatedItems = [...items, ...items, ...items, ...items];
  return (
    <div
      ref={rootRef}
      className={`grid-motion${grayscale ? " grid-motion--gray" : ""}`}
      style={{
        "--gm-gap": `${gap}px`,
        "--gm-radius": `${radius}px`,
        "--gm-aspect": aspectRatio,
        "--gm-rows": count,
        "--gm-angle": `${angle}deg`,
        "--gm-dim": dim,
        "--gm-spotlight": `${Math.max(80, spotlight * 520)}px`,
        "--gm-fade": `${fade * 20}%`,
      }}
      aria-label="Moving flooring materials gallery"
    >
      <div ref={planeRef} className="grid-motion__plane" aria-hidden="true">
        {Array.from({ length: count }, (_, row) => (
          <div className="grid-motion__row" key={row}>
            {repeatedItems.map((item, index) => {
              const src = typeof item === "string" ? item : item.src;
              const alt = typeof item === "string" ? "Flooring interior" : item.alt;
              return (
                <div className="grid-motion__tile" key={`${row}-${index}`}>
                  <img src={src} alt={alt || ""} loading="lazy" draggable="false" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
