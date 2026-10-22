import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ScheduleTourDialog } from "./components/dialogs/ScheduleTourDialog";
import {
  Collections,
  FAQ,
  Features,
  FinishExplorer,
  Hero,
  Journal,
  MaterialsGallery,
  Reviews,
  ServiceAreas,
  VisitCTA,
} from "./components/sections";
import { useScrollReveal } from "./hooks/useScrollReveal";

export default function App() {
  const [tourOpen, setTourOpen] = useState(false);
  useScrollReveal();

  return (
    <>
      <Header onScheduleTour={() => setTourOpen(true)} />
      <main>
        <Hero />
        <Features />
        <MaterialsGallery />
        <FinishExplorer />
        <Collections />
        <ServiceAreas />
        <Reviews />
        <Journal />
        <FAQ />
        <VisitCTA onScheduleTour={() => setTourOpen(true)} />
      </main>
      <Footer />
      <ScheduleTourDialog open={tourOpen} onClose={() => setTourOpen(false)} />
    </>
  );
}
