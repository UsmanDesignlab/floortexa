import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "../ui/Button";
import { carouselImages } from "../../carouselImages";

export function Hero() {
  const slides = carouselImages;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center justify-center overflow-hidden text-white pt-[12vh]"
      aria-label="Discover your ideal floor today"
    >
      <img
        key={slides[activeSlide]}
        className="absolute inset-0 h-full w-full object-cover [animation:heroFade_0.8s_ease_both]"
        src={slides[activeSlide]}
        alt="Flooring project gallery"
        decoding="async"
        fetchPriority={activeSlide === 0 ? "high" : "auto"}
      />
      <div className="absolute inset-0 bg-[rgba(27,25,23,0.22)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-canvas" />
      <div className="animate-[fadeUp_1s_cubic-bezier(0.22,1,0.36,1)_both] relative z-[1] mx-auto w-[min(720px,94%)] px-[4%] text-center motion-reduce:animate-none">
        <h1 className="m-0 font-display text-[clamp(48px,7vw,88px)] font-light leading-[1.05] tracking-[-0.045em]">
          Discover your ideal
          <br />
          floor today
        </h1>
        <p className="mx-auto mt-6 mb-8 max-w-[540px] text-[19px] leading-[1.65] text-white/90">
          Carpet, LVT, laminate, vinyl, and engineered wood — supplied and fitted across Essex with
          honest samples and a tidy finish. Your perfect floor is just a visit away.
        </p>
        <Button
          as={Link}
          to="/contact"
          className="!rounded-md !px-8 !py-4 !text-base !shadow-none"
        >
          <Calendar size={18} /> Book today
        </Button>
      </div>
      <div
        className="absolute right-[6%] bottom-7 z-[3] flex items-center gap-3.5 text-[13px] font-semibold text-white"
        aria-label="Hero image slides"
      >
        <button
          type="button"
          aria-label="Previous image"
          className="grid h-[34px] w-[34px] place-items-center rounded-full border border-white/75 bg-black/25 text-2xl leading-none text-white"
          onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)}
        >
          ‹
        </button>
        <span>
          {activeSlide + 1} / {slides.length}
        </span>
        <button
          type="button"
          aria-label="Next image"
          className="grid h-[34px] w-[34px] place-items-center rounded-full border border-white/75 bg-black/25 text-2xl leading-none text-white"
          onClick={() => setActiveSlide((current) => (current + 1) % slides.length)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
