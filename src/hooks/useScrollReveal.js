import { useEffect } from "react";

/** Reveal `.section-reveal` / `.reveal-child` elements on intersection. */
export function useScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target.querySelectorAll(".reveal-child").forEach((child, i) => {
            child.style.transitionDelay = reduce ? "0ms" : `${i * 90}ms`;
            child.classList.add("is-visible");
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(".section-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
