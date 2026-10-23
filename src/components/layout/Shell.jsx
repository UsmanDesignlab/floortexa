import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContactDialog } from "../dialogs/ContactDialog";

export function Shell() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState("");

  const openContact = useCallback((email = "") => {
    setContactEmail(typeof email === "string" ? email : "");
    setContactOpen(true);
  }, []);

  return (
    <>
      <Header onContact={() => openContact()} />
      <Outlet context={{ openContact }} />
      <Footer onContact={openContact} />
      <ContactDialog
        open={contactOpen}
        initialEmail={contactEmail}
        onClose={() => {
          setContactOpen(false);
          setContactEmail("");
        }}
      />
    </>
  );
}
