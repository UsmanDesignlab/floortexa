import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScheduleTourDialog } from "../dialogs/ScheduleTourDialog";

export function Shell() {
  const [tourOpen, setTourOpen] = useState(false);
  const openTour = () => setTourOpen(true);

  return (
    <>
      <Header onScheduleTour={openTour} />
      <Outlet context={{ openTour }} />
      <Footer />
      <ScheduleTourDialog open={tourOpen} onClose={() => setTourOpen(false)} />
    </>
  );
}
