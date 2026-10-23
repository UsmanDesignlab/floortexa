import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

/** /contact always opens the shared contact popup, then returns home. */
export default function ContactPage() {
  const navigate = useNavigate();
  const { openContact } = useOutletContext();

  useEffect(() => {
    openContact?.();
    navigate("/", { replace: true });
  }, [navigate, openContact]);

  return null;
}
