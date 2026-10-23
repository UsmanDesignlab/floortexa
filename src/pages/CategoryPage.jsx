import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Layers, Package, Sparkles } from "lucide-react";
import { mediaUrl } from "../lib/api";
import { useResource } from "../hooks/useResource";
import { useResourceList } from "../hooks/useResourceList";
import { ProductCard } from "../components/product/ProductCard";
import { ProductDrawer } from "../components/product/ProductDrawer";

export default function CategoryPage() {
  const { id } = useParams();
  const { item: category, loading: categoryLoading, error: categoryError } = useResource(
    "categories",
    id,
  );
  const {
    items: products,
    loading: productsLoading,
    error: productsError,
  } = useResourceList(
    "products",
    { category_id: id, limit: 50, sort: "title", direction: "asc" },
    Boolean(id),
  );
  const { items: otherCategories } = useResourceList("categories", {
    limit: 8,
    sort: "title",
    direction: "asc",
  });
  const [selectedId, setSelectedId] = useState(null);

  const hero = category?.image;
  const related = otherCategories.filter((item) => item.id !== id).slice(0, 3);

  return (
    <main className="bg-canvas text-ink">
      {categoryLoading ? (
        <p className="px-[5%] pt-32 text-sm text-muted">Loading category…</p>
      ) : null}
      {categoryError ? (
        <p className="px-[5%] pt-32 text-sm text-red-600">{categoryError}</p>
      ) : null}

      {category ? (
        <>
          <div className="relative z-[1] shadow-[0_24px_50px_rgba(0,0,0,0.22)]">
            <section className="relative min-h-[100svh] overflow-hidden">
              {hero ? (
                <img
                  src={mediaUrl(hero)}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-sand" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />

              <div className="relative z-[1] flex min-h-[100svh] flex-col justify-between px-[5%] py-28 max-[640px]:px-[4%]">
                <Link
                  to="/categories"
                  className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
                >
                  <ArrowLeft size={16} /> Back
                </Link>

                <div className="pb-2">
                  <p className="inline-flex items-center gap-1.5 text-[14px] text-white/90">
                    <Layers size={15} />
                    Flooring category
                  </p>
                </div>
              </div>
            </section>
          </div>

          <section className="px-[5%] py-16 max-[640px]:px-[4%] sm:py-20">
            <h1 className="max-w-4xl font-display text-[clamp(36px,6.5vw,68px)] font-medium leading-[1.02] tracking-[-0.04em] text-ink">
              {category.title}
            </h1>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[15px] text-muted">
              <Layers size={14} />
              Flooring category
            </p>

            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
              <div>
                <h2 className="font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight text-ink">
                  Overview
                </h2>
                <p className="mt-5 whitespace-pre-wrap text-[16px] leading-[1.8] text-muted">
                  {category.description ||
                    "Browse products in this category — samples, specs, and professional fitting across Essex."}
                </p>
              </div>

              <dl className="divide-y divide-line border-y border-line self-start">
                {[
                  { icon: Layers, label: "Category", value: category.title },
                  {
                    icon: Package,
                    label: "Products",
                    value: productsLoading ? "…" : `${products.length} available`,
                  },
                  { icon: Sparkles, label: "Service", value: "Supply & professional fit" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-6 py-5 text-[15px]"
                  >
                    <dt className="inline-flex items-center gap-2.5 text-muted">
                      <row.icon size={16} className="opacity-70" />
                      {row.label}
                    </dt>
                    <dd className="text-right font-medium text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section className="px-[5%] pb-16 max-[640px]:px-[4%] sm:pb-24">
            <h2 className="mb-8 font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight text-ink">
              Products
            </h2>
            {productsLoading ? <p className="text-sm text-muted">Loading products…</p> : null}
            {productsError ? <p className="text-sm text-red-600">{productsError}</p> : null}
            {!productsLoading && products.length === 0 ? (
              <p className="text-sm text-muted">No products in this category yet.</p>
            ) : null}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={(item) => setSelectedId(item.id)}
                />
              ))}
            </div>
          </section>

          {related.length > 0 ? (
            <section className="border-t border-line px-[5%] py-16 max-[640px]:px-[4%] sm:py-24">
              <h2 className="mb-10 font-display text-[clamp(28px,3.4vw,42px)] font-medium tracking-tight text-ink">
                Other categories
              </h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
                {related.map((item) => (
                  <Link key={item.id} to={`/categories/${item.id}`} className="group block">
                    <div className="overflow-hidden rounded-xl bg-sand">
                      <div className="aspect-[16/11] overflow-hidden">
                        {item.image ? (
                          <img
                            src={mediaUrl(item.image)}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                            loading="lazy"
                          />
                        ) : (
                          <div className="h-full w-full bg-line" />
                        )}
                      </div>
                    </div>
                    <h3 className="mt-5 font-display text-[20px] font-medium leading-snug tracking-tight text-ink sm:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-muted">
                      <Layers size={13} />
                      Flooring category
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : null}

      <ProductDrawer
        productId={selectedId}
        open={Boolean(selectedId)}
        onClose={() => setSelectedId(null)}
      />
    </main>
  );
}
