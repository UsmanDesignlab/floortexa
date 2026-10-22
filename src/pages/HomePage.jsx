import { useOutletContext } from "react-router-dom";
import {
  FAQ,
  Features,
  FinishExplorer,
  Hero,
  MaterialsGallery,
  Reviews,
  ServiceAreas,
  VisitCTA,
} from "../components/sections";
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
      <FinishExplorer />
      <ServiceAreas />
      <Reviews />
      <BlogCarousel blogs={blogs} loading={blogsLoading} />
      <FAQ />
      <VisitCTA onScheduleTour={openTour} />
    </main>
  );
}
