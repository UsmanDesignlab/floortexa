import { mediaUrl } from "../../lib/api";

export function ProductCard({ product, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(product)}
      className="group overflow-hidden rounded-xl border border-line bg-white text-left shadow-[0_12px_30px_rgba(27,25,23,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(27,25,23,0.1)]"
    >
      <div className="aspect-[4/3] overflow-hidden bg-sand">
        {product.image ? (
          <img
            src={mediaUrl(product.image)}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full place-items-center text-sm text-muted">No image</div>
        )}
      </div>
      <div className="p-4">
        {product.category_title ? (
          <p className="mb-1 text-[11px] font-bold tracking-[0.12em] text-brand uppercase">
            {product.category_title}
          </p>
        ) : null}
        <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{product.title}</h3>
        {product.description ? (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{product.description}</p>
        ) : null}
      </div>
    </button>
  );
}
