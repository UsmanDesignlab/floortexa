import { Link } from "react-router-dom";
import { mediaUrl } from "../../lib/api";

export function CategoryCard({ category }) {
  return (
    <Link
      to={`/categories/${category.id}`}
      className="group relative block min-h-[240px] overflow-hidden rounded-xl bg-ink text-white shadow-[0_18px_40px_rgba(27,25,23,0.12)] sm:min-h-[300px]"
    >
      {category.image ? (
        <img
          src={mediaUrl(category.image)}
          alt={category.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-white/70 uppercase">Category</p>
        <h3 className="font-display text-[clamp(24px,3vw,34px)] font-semibold tracking-tight">
          {category.title}
        </h3>
        {category.description ? (
          <p className="mt-2 line-clamp-2 text-sm text-white/80">{category.description}</p>
        ) : null}
      </div>
    </Link>
  );
}
