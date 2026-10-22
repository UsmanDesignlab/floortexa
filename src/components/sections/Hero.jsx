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
      className="relative flex min-h-svh items-center justify-end overflow-hidden text-white max-[980px]:justify-center"
      aria-label="Discover your ideal floor today"
    >
      <img
        key={slides[activeSlide]}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:animate-none motion-reduce:scale-100 [animation:heroFade_1.2s_ease_both,heroZoom_6s_ease-out_both]"
        src={slides[activeSlide]}
        alt="Flooring project gallery"
        fetchPriority={activeSlide === 0 ? "high" : "auto"}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,25,23,0.15)_0%,rgba(27,25,23,0.45)_55%,rgba(27,25,23,0.62)_100%),linear-gradient(180deg,rgba(27,25,23,0.35)_0%,transparent_35%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-b from-transparent to-canvas" />
      <div className="animate-[fadeUp_1s_cubic-bezier(0.22,1,0.36,1)_both] relative z-[1] m-[0_6%_4%_0] w-[min(560px,92%)] text-left motion-reduce:animate-none max-[980px]:m-[100px_5%_80px]">
        <h1 className="m-0 font-display text-[clamp(42px,6vw,72px)] font-light leading-[1.05] tracking-[-0.045em]">
          Discover your ideal
          <br />
          floor today
        </h1>
        <p className="mt-5 mb-7 max-w-[460px] text-[17px] leading-[1.65] text-white/90">
          Uncover a world of marble, porcelain tile, and natural wood with transparent specs. Your
          perfect finish awaits just a visit away!
        </p>
        <Button as={Link} to="/contact">
          <Calendar size={16} /> Book today
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
