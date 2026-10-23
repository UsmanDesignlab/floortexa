import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageLoader } from "../ui/PageLoader";

export function Shell() {
  return (
    <>
      <PageLoader />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
