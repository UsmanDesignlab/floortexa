import { Link } from "react-router-dom";
import { mediaUrl } from "../../lib/api";
import { Drawer } from "../ui/Drawer";
import { Button } from "../ui/Button";
import { useResource } from "../../hooks/useResource";

export function ProductDrawer({ productId, open, onClose }) {
  const { item, loading, error } = useResource("products", productId, open && Boolean(productId));
  const product = item;

  return (
    <Drawer open={open} onClose={onClose} title={product?.title || "Product details"} wide>
      {loading ? <p className="text-sm text-muted">Loading product…</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {product ? (
        <div className="space-y-5">
          {product.image ? (
            <img
              src={mediaUrl(product.image)}
              alt={product.title}
              className="h-72 w-full rounded-md object-cover sm:h-80"
            />
          ) : null}
          {product.category_title ? (
            <p className="text-[11px] font-bold tracking-[0.14em] text-brand uppercase">
              {product.category_title}
            </p>
          ) : null}
          <h3 className="font-display text-[28px] font-semibold tracking-tight text-ink">{product.title}</h3>
          <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-muted">{product.description}</p>
          <Button as={Link} to="/contact" className="w-full" onClick={onClose}>
            Ask about this finish
          </Button>
        </div>
      ) : null}
    </Drawer>
  );
}
