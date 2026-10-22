import { useState } from "react";
import { Pill } from "../ui/Pill";
import { ProductCard } from "../product/ProductCard";
import { ProductDrawer } from "../product/ProductDrawer";
import { useResourceList } from "../../hooks/useResourceList";
import { reveal } from "../../lib/classes";
import { cn } from "../../lib/cn";

export function PopularProducts() {
  const { items, loading, error } = useResourceList("products", {
    is_popular: "true",
    limit: 8,
    sort: "created_at",
    direction: "desc",
  });
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section id="popular" className={cn(reveal, "border-t border-line bg-canvas px-[5%] py-[90px] max-[640px]:px-[4%]")}>
      <div className="mb-10 max-w-2xl">
        <Pill>POPULAR PRODUCTS</Pill>
        <h2 className="mt-3.5 font-display text-[clamp(34px,4.8vw,56px)] font-medium leading-[1.08] tracking-[-0.04em]">
          Finishes homeowners ask for most
        </h2>
        <p className="mt-3 text-[17px] leading-relaxed text-muted">
          Browse highlighted materials from the Floortex catalog. Open any product for full details.
        </p>
      </div>

      {loading ? <p className="text-sm text-muted">Loading popular products…</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {!loading && !error && items.length === 0 ? (
        <p className="text-sm text-muted">No popular products yet. Mark products as popular in admin.</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} onClick={(item) => setSelectedId(item.id)} />
        ))}
      </div>

      <ProductDrawer productId={selectedId} open={Boolean(selectedId)} onClose={() => setSelectedId(null)} />
    </section>
  );
}
