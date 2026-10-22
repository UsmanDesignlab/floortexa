import { Pill } from "../ui/Pill";
import { carouselImages } from "../../carouselImages";
import GridMotion from "../motion/GridMotion";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function MaterialsGallery() {
  const galleryImages = carouselImages
    .slice(0, 24)
    .map((src) => ({ src, alt: "Flooring project image" }));

  return (
    <section
      className={cn(reveal, "overflow-hidden border-t border-line bg-canvas px-0 pt-[72px] pb-[82px]")}
      aria-labelledby="materials-gallery-title"
    >
      <div className="mx-auto mb-6 max-w-[780px] px-[5%] text-center">
        <Pill>MATERIALS IN MOTION</Pill>
        <h2
          id="materials-gallery-title"
          className="mt-3.5 mb-2.5 font-display text-[clamp(30px,4vw,48px)] leading-[1.12] tracking-[-0.04em]"
        >
          Find the floor that feels like home.
        </h2>
        <p className="m-0 text-muted">Explore marble, porcelain, timber, and stone in real interiors.</p>
      </div>
      <GridMotion
        items={galleryImages}
        rows={4}
        aspectRatio={1.45}
        gap={16}
        radius={12}
        angle={-7}
        speed={18}
        direction="alternate"
        parallax={0.45}
        spotlight={0.55}
        dim={0.12}
        fade={0.28}
      />
    </section>
  );
}
