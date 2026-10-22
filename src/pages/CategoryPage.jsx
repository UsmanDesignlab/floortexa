import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { mediaUrl } from "../lib/api";
import { useResource } from "../hooks/useResource";
import { useResourceList } from "../hooks/useResourceList";
import { ProductCard } from "../components/product/ProductCard";
import { ProductDrawer } from "../components/product/ProductDrawer";

export default function CategoryPage() {
  const { id } = useParams();
  const { item: category, loading: categoryLoading, error: categoryError } = useResource("categories", id);
  const { items: products, loading: productsLoading, error: productsError } = useResourceList(
    "products",
    { category_id: id, limit: 50, sort: "title", direction: "asc" },
    Boolean(id),
  );
  const [selectedId, setSelectedId] = useState(null);

  return (
    <main className="bg-canvas pb-20">
      <section className="relative min-h-[360px] overflow-hidden bg-ink text-white">
        {category?.image ? (
          <img
            src={mediaUrl(category.image)}
            alt={category.title}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
        <div className="relative z-[1] mx-auto max-w-[1200px] px-[5%] pt-32 pb-14 max-[640px]:px-[4%]">
          <Link to="/categories" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80">
            <ArrowLeft size={16} /> All categories
          </Link>
          {categoryLoading ? <p>Loading category…</p> : null}
          {categoryError ? <p className="text-red-200">{categoryError}</p> : null}
          {category ? (
            <>
              <h1 className="font-display text-[clamp(40px,6vw,64px)] font-medium tracking-tight">
                {category.title}
              </h1>
              {category.description ? (
                <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/85">{category.description}</p>
              ) : null}
            </>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-[5%] pt-12 max-[640px]:px-[4%]">
        <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight">Products in this category</h2>
        {productsLoading ? <p className="text-sm text-muted">Loading products…</p> : null}
        {productsError ? <p className="text-sm text-red-600">{productsError}</p> : null}
        {!productsLoading && products.length === 0 ? (
          <p className="text-sm text-muted">No products in this category yet.</p>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={(item) => setSelectedId(item.id)} />
          ))}
        </div>
      </section>

      <ProductDrawer productId={selectedId} open={Boolean(selectedId)} onClose={() => setSelectedId(null)} />
    </main>
  );
}
