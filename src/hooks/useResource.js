import { useEffect, useState } from "react";
import { getResource } from "../lib/api";

export function useResource(resource, id, enabled = true) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(Boolean(enabled && id));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!enabled || !id) return undefined;
    let active = true;
    setLoading(true);
    setError("");
    getResource(resource, id)
      .then((data) => {
        if (!active) return;
        setItem(data);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load");
        setItem(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [resource, id, enabled]);

  return { item, loading, error };
}
