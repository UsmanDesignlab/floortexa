import { useEffect, useMemo, useState } from "react";
import { SectionHead } from "../ui/SectionHead";
import { ProductDrawer } from "../product/ProductDrawer";
import { useResourceList } from "../../hooks/useResourceList";
import { mediaUrl } from "../../lib/api";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

function padIndex(index) {
  return String(index + 1).padStart(2, "0");
}

function mapProduct(product, index) {
  const blurb = String(product.description || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const prices = Array.isArray(product.prices) ? product.prices : [];
  const from = prices[0];
  const priceLabel = from
    ? `From £${from.price}${from.unit ? ` / ${from.unit}` : ""}`
    : "Ask showroom";
  return {
    id: product.id,
    code: padIndex(index),
    name: product.title || "Product",
    type: product.category_title || "Popular finish",
    summary: blurb.slice(0, 160) || "Open this product for full details and showroom guidance.",
    image: mediaUrl(product.image) || "/images/LVT-Flooring-Essex.jpg",
    includes: [priceLabel, "Sample kit ready", "Install guidance"],
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

  function openProduct(index) {
    const zone = zones[index];
    if (!zone) return;
    setActive(index);
    setDrawerId(zone.id);
  }

  return (
    <section id="popular" className={cn(reveal, "border-t border-line bg-canvas px-[5%] py-14 max-[640px]:px-[4%]")}>
      <div className="w-full">
        <SectionHead
          flush
          className="mb-10"
          pill="POPULAR PRODUCTS"
          title={<h2>Finishes homeowners ask for most</h2>}
          description={
            <p>
              Tap any finish below to open full product details — samples, specs, and install guidance.
            </p>
          }
        />

        {loading ? <p className="mb-6 text-sm text-muted">Loading popular products…</p> : null}
        {error ? <p className="mb-6 text-sm text-red-600">{error}</p> : null}
        {!loading && !error && zones.length === 0 ? (
          <p className="mb-6 text-sm text-muted">
            No popular products yet. Mark products as popular in admin.
          </p>
        ) : null}

        {zones.length > 0 ? (
          <div className="rounded-lg border border-[rgba(27,25,23,0.08)] bg-white p-5 shadow-[0_18px_50px_rgba(27,25,23,0.06)] sm:p-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
              <strong className="text-base font-bold text-ink sm:text-lg">Explore the finish plan</strong>
              <span className="font-semibold text-ink">
                {zones.length} material {zones.length === 1 ? "zone" : "zones"}
              </span>
            </div>

            <div className="overflow-hidden rounded-md bg-[#e8e8e8] p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
                {zones.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "relative flex aspect-[3/4] w-full flex-col items-start justify-between overflow-hidden rounded-md border border-white/80 p-3 text-left text-white shadow-sm transition duration-200 sm:p-4",
                      "touch-manipulation hover:z-[2] hover:border-ink/50 hover:shadow-md",
                      active === index && "z-[2] border-ink ring-1 ring-ink",
                    )}
                    onClick={() => openProduct(index)}
                    aria-label={`Open ${item.name}`}
                  >
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[rgba(27,25,23,0.82)] via-[rgba(27,25,23,0.15)] to-transparent" />
                    <span className="relative z-[1] rounded-full bg-[rgba(12,25,19,0.7)] px-2.5 py-1 text-[10px] font-bold tracking-[0.06em] text-white uppercase backdrop-blur-sm">
                      {item.code}
                    </span>
                    <span className="relative z-[1] mt-auto block w-full">
                      <strong className="block text-[15px] leading-snug sm:text-base">
                        {item.name}
                      </strong>
                      <small className="mt-0.5 block text-[10px] text-white/85">{item.type}</small>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between gap-4 text-[13px] text-muted max-[640px]:flex-col">
              <p className="m-0">Tap a finish to open the product drawer.</p>
              <span>
                {zones.length} popular {zones.length === 1 ? "product" : "products"}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <ProductDrawer
        productId={drawerId}
        open={Boolean(drawerId)}
        onClose={() => setDrawerId(null)}
      />
    </section>
  );
}
