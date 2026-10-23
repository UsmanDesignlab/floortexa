import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "../ui/Button";
import { SectionHead } from "../ui/SectionHead";
import { ProductDrawer } from "../product/ProductDrawer";
import { useResourceList } from "../../hooks/useResourceList";
import { mediaUrl } from "../../lib/api";
import { reveal, revealChild } from "../../lib/classes";
import { cn } from "../../lib/cn";

function padIndex(index) {
  return String(index + 1).padStart(2, "0");
}

function mapProduct(product, index) {
  const blurb = String(product.description || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    id: product.id,
    code: padIndex(index),
    name: product.title || "Product",
    type: product.category_title || "Popular finish",
    summary: blurb.slice(0, 160) || "Open this product for full details and showroom guidance.",
    image: mediaUrl(product.image) || "/images/LVT-Flooring-Essex.jpg",
    includes: ["Sample kit ready", "Transparent specs", "Install guidance"],
  };
}

export function FinishExplorer() {
  const { items, loading, error } = useResourceList("products", {
    is_popular: "true",
    limit: 11,
    sort: "created_at",
    direction: "desc",
  });
  const [active, setActive] = useState(0);
  const [drawerId, setDrawerId] = useState(null);

  const zones = useMemo(() => items.map(mapProduct), [items]);

  useEffect(() => {
    if (active >= zones.length) setActive(0);
  }, [active, zones.length]);

  const finish = zones[active] || null;

  function openProduct(index) {
    const zone = zones[index];
    if (!zone) return;
    setActive(index);
    setDrawerId(zone.id);
  }

  return (
    <section id="popular" className={cn(reveal, "border-t border-line bg-canvas px-[3%] py-12 max-[640px]:px-[4%]")}>
      <SectionHead
        pill="POPULAR PRODUCTS"
        title={<h2>Finishes homeowners ask for most</h2>}
        description={
          <p>
            Select any finish on the material map below to inspect details, surface, and room fit —
            then open the full product view.
          </p>
        }
      />

      {loading ? <p className="mb-6 text-center text-sm text-muted">Loading popular products…</p> : null}
      {error ? <p className="mb-6 text-center text-sm text-red-600">{error}</p> : null}
      {!loading && !error && zones.length === 0 ? (
        <p className="mb-6 text-center text-sm text-muted">
          No popular products yet. Mark products as popular in admin.
        </p>
      ) : null}

      {zones.length > 0 && finish ? (
        <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(300px,0.72fr)] items-stretch gap-4 max-[980px]:grid-cols-1">
          <div className="rounded-lg border border-[rgba(27,25,23,0.08)] bg-white p-4 shadow-[0_18px_50px_rgba(27,25,23,0.06)]">
            <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
              <strong className="text-base font-bold text-ink">Explore the finish plan</strong>
              <span className="font-semibold text-ink">
                {zones.length} material {zones.length === 1 ? "zone" : "zones"}
              </span>
            </div>

            <div className="min-h-[240px] overflow-hidden rounded-md bg-[#f0e5db] p-3 sm:min-h-[280px] sm:p-4">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,148px))] justify-start gap-2.5 sm:grid-cols-[repeat(auto-fill,minmax(140px,158px))] sm:gap-3">
                {zones.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "relative flex h-[168px] w-full flex-col items-start justify-between overflow-hidden rounded-md border-2 border-white/95 p-2.5 text-left text-white shadow-[0_6px_16px_rgba(22,34,27,0.14)] transition duration-200 sm:h-[190px] sm:p-3",
                      "touch-manipulation hover:z-[2] hover:border-white hover:shadow-[0_12px_28px_rgba(22,34,27,0.25),0_0_0_3px_#ff6b00]",
                      active === index &&
                        "z-[2] border-white shadow-[0_12px_28px_rgba(22,34,27,0.25),0_0_0_3px_#ff6b00]",
                    )}
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(27, 25, 23, 0.02) 24%, rgba(27, 25, 23, 0.82) 100%), url("${item.image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    onClick={() => openProduct(index)}
                    aria-label={`Open ${item.name}`}
                  >
                    <span className="rounded-full bg-[rgba(12,25,19,0.7)] px-2 py-0.5 text-[9px] font-bold tracking-[0.06em] text-white uppercase backdrop-blur-sm">
                      {item.code}
                    </span>
                    <span className="mt-auto block w-full">
                      <strong className="block text-[13px] leading-snug [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] sm:text-sm">
                        {item.name}
                      </strong>
                      <small className="mt-0.5 block text-[9px] text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]">
                        {item.type}
                      </small>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-4 text-[13px] text-muted max-[640px]:flex-col">
              <p className="m-0">Tap a finish to open full product details.</p>
              <span>
                {zones.length} popular {zones.length === 1 ? "product" : "products"}
              </span>
            </div>
          </div>

          <aside
            className={cn(
              revealChild,
              "relative flex flex-col rounded-lg border border-[rgba(27,25,23,0.08)] bg-white p-[22px] shadow-[0_18px_50px_rgba(27,25,23,0.06)] max-[980px]:hidden",
            )}
          >
            <div className="mb-[18px]">
              <span className="mb-3 block text-[11px] font-bold tracking-[0.14em] text-brand">
                PRODUCT {finish.code}
              </span>
              <h3 className="mb-[5px] font-display text-[clamp(30px,3vw,42px)] font-semibold leading-[1.08] tracking-[-0.04em]">
                {finish.name}
              </h3>
              <p className="m-0 text-sm leading-normal text-muted">{finish.type}</p>
            </div>
            <div className="relative mb-5 overflow-hidden rounded-md">
              <img
                src={finish.image}
                alt={finish.name}
                className="block h-[clamp(220px,19vw,300px)] w-full object-cover"
              />
            </div>
            <dl className="m-0 grid grid-cols-1 gap-2.5">
              <div className="flex min-w-0 flex-col gap-[5px] rounded-md bg-sand px-3 py-[11px] text-sm">
                <dt className="text-xs text-muted">Overview</dt>
                <dd className="m-0 leading-snug font-semibold">{finish.summary}</dd>
              </div>
            </dl>
            <div className="my-[18px] rounded-md border border-line p-4">
              <span className="mb-3 block text-xs font-bold text-brand">Included with this finish</span>
              <ul className="m-0 grid list-none gap-2.5 p-0">
                {finish.includes.map((line) => (
                  <li key={line} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="shrink-0 text-brand" /> {line}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-auto grid gap-2.5">
              <Button type="button" full onClick={() => setDrawerId(finish.id)}>
                Open {finish.name}
              </Button>
              <Button as={Link} to="/contact" variant="outline" full>
                Ask about this finish
              </Button>
            </div>
          </aside>
        </div>
      ) : null}

      <ProductDrawer
        productId={drawerId}
        open={Boolean(drawerId)}
        onClose={() => setDrawerId(null)}
      />
    </section>
  );
}
