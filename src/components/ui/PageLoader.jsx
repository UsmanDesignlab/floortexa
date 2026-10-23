import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { subscribeLoading } from "../../lib/loadingStore";
import { cn } from "../../lib/cn";

const MIN_VISIBLE_MS = 220;
const EXIT_MS = 240;
const ROUTE_HOLD_MS = 140;

/**
 * Slim top progress bar + soft centered spinner (replaces the old black curtains).
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
      className={cn(
        "pointer-events-none fixed inset-0 z-[200] transition-opacity duration-200",
        closing ? "opacity-0" : "opacity-100",
      )}
      aria-hidden={!shouldShow}
      aria-busy={shouldShow}
      role="status"
    >
      <span className="sr-only">Loading</span>

      {/* Top progress bar */}
      <div className="absolute inset-x-0 top-0 h-[3px] overflow-hidden bg-transparent">
        <div className="h-full w-1/3 origin-left rounded-full bg-ink [animation:loaderBar_0.9s_ease-in-out_infinite]" />
      </div>

      {/* Soft center spinner — only when an API is actually pending */}
      {apiPending > 0 ? (
        <div className="absolute inset-0 grid place-items-center bg-canvas/35 backdrop-blur-[1px]">
          <div className="grid place-items-center gap-3 rounded-xl border border-line bg-white/90 px-6 py-5 shadow-[0_18px_50px_rgba(27,25,23,0.1)]">
            <div className="h-9 w-9 rounded-full border-2 border-line border-t-ink [animation:loaderSpin_0.7s_linear_infinite]" />
            <p className="text-[12px] font-semibold tracking-[0.12em] text-muted uppercase">Loading</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
