import { useOutletContext } from "react-router-dom";
import {
  FAQ,
  Features,
  Hero,
  MaterialsGallery,
  Reviews,
  ServiceAreas,
  VisitCTA,
} from "../components/sections";
import { PopularProducts } from "../components/sections/PopularProducts";
import { CategoryShowcase } from "../components/sections/CategoryShowcase";
import { BlogCarousel } from "../components/blog/BlogCarousel";
import { useResourceList } from "../hooks/useResourceList";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function HomePage() {
  const { openTour } = useOutletContext();
  const { items: blogs, loading: blogsLoading } = useResourceList("blogs", {
    limit: 3,
    sort: "created_at",
    direction: "desc",
  });
  useScrollReveal();

  return (
    <main>
      <Hero />
      <Features />
      <MaterialsGallery />
      <PopularProducts />
      <CategoryShowcase />
      <ServiceAreas />
      <Reviews />
      <BlogCarousel blogs={blogs} loading={blogsLoading} />
      <FAQ />
      <VisitCTA onScheduleTour={openTour} />
    </main>
  );
}
