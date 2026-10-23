import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { subscribeLoading } from "../../lib/loadingStore";
import { cn } from "../../lib/cn";

const MIN_VISIBLE_MS = 180;
const EXIT_MS = 280;
const ROUTE_HOLD_MS = 160;

/**
 * Left + right black curtains meet in the center while a page opens or an API runs.
 * As soon as data is ready, they snap back out quickly.
 */
export function PageLoader() {
  const location = useLocation();
  const [apiPending, setApiPending] = useState(0);
  const [routeBusy, setRouteBusy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const shownAt = useRef(0);
  const closeTimer = useRef(0);
  const routeTimer = useRef(0);

  useEffect(() => subscribeLoading(setApiPending), []);

  useEffect(() => {
    setRouteBusy(true);
    window.clearTimeout(routeTimer.current);
    routeTimer.current = window.setTimeout(() => setRouteBusy(false), ROUTE_HOLD_MS);
    return () => window.clearTimeout(routeTimer.current);
  }, [location.pathname, location.search]);

  const shouldShow = apiPending > 0 || routeBusy;

  useEffect(() => {
    window.clearTimeout(closeTimer.current);

    if (shouldShow) {
      setClosing(false);
      setVisible(true);
      if (!shownAt.current) shownAt.current = Date.now();
      return undefined;
    }

    if (!visible) return undefined;

    const elapsed = Date.now() - (shownAt.current || Date.now());
    const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

    closeTimer.current = window.setTimeout(() => {
      setClosing(true);
      closeTimer.current = window.setTimeout(() => {
        setVisible(false);
        setClosing(false);
        shownAt.current = 0;
      }, EXIT_MS);
    }, wait);

    return () => window.clearTimeout(closeTimer.current);
  }, [shouldShow, visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
      aria-hidden={!shouldShow}
      aria-busy={shouldShow}
      role="status"
    >
      <span className="sr-only">Loading</span>
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-1/2 bg-black transition-transform duration-[280ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          closing ? "-translate-x-full" : "translate-x-0",
          !closing && "animate-[loaderInLeft_0.32s_cubic-bezier(0.76,0,0.24,1)_both]",
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 right-0 w-1/2 bg-black transition-transform duration-[280ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
          closing ? "translate-x-full" : "translate-x-0",
          !closing && "animate-[loaderInRight_0.32s_cubic-bezier(0.76,0,0.24,1)_both]",
        )}
      />
    </div>
  );
}
