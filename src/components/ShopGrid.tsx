"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";
import { retail as products, type Origin } from "@/lib/products";
import ProductCard from "./ProductCard";
import FilterChips from "./FilterChips";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default function ShopGrid() {
  const [filter, setFilter] = useState<Origin | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (filter === "all" || p.origin === filter) &&
        (!q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)),
    );
    // Fruits without a price yet sort to the end either way.
    if (sort === "price-asc")
      return [...list].sort(
        (a, b) => (a.price ?? Infinity) - (b.price ?? Infinity),
      );
    if (sort === "price-desc")
      return [...list].sort(
        (a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity),
      );
    if (sort === "name")
      return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filter, query, sort]);

  const sortSelect = (className: string) => (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value as Sort)}
      aria-label="Sort products"
      className={clsx(
        "rounded-full border border-white/20 bg-wine-dark px-4 py-2 font-mono text-xs uppercase tracking-wide focus:border-lilac focus:outline-none",
        className,
      )}
    >
      <option value="featured">Featured</option>
      <option value="price-asc">Price: low to high</option>
      <option value="price-desc">Price: high to low</option>
      <option value="name">Name A–Z</option>
    </select>
  );

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-white/10 py-4 sm:mt-10 sm:gap-4 sm:py-5">
        <label className="relative w-full sm:w-auto sm:min-w-[220px] sm:flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fruits…"
            className="w-full rounded-full border border-white/20 bg-wine-dark/60 py-2.5 pl-11 pr-4 text-sm placeholder:text-white/40 focus:border-lilac focus:outline-none"
          />
        </label>
        <FilterChips value={filter} onChange={setFilter} />
        {sortSelect("hidden sm:block")}
      </div>

      {/* On phones the sort control shares the count row instead of wrapping alone */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm text-white/60">
          {visible.length} {visible.length === 1 ? "product" : "products"}
        </p>
        {sortSelect("sm:hidden")}
      </div>

      {visible.length === 0 ? (
        <p className="py-24 text-center text-white/60">
          No fruits match your search.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} compact />
          ))}
        </div>
      )}
    </>
  );
}
