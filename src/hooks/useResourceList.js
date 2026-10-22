import { useEffect, useState } from "react";
import { listResource } from "../lib/api";

export function useResourceList(resource, params = {}, enabled = true) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [error, setError] = useState("");
  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    if (!enabled) return undefined;
    let active = true;
    setLoading(true);
    setError("");
    listResource(resource, JSON.parse(paramsKey))
      .then((data) => {
        if (!active) return;
        setItems(data?.items ?? []);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || "Failed to load");
        setItems([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [resource, paramsKey, enabled]);

  return { items, loading, error };
}
