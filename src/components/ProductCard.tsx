"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import clsx from "clsx";
import { formatPrice, hasPrice, type Listing } from "@/lib/products";
import { useCart } from "@/store/cart";

export default function ProductCard({
  product: p,
  compact = false,
}: {
  product: Listing;
  compact?: boolean;
}) {
  const add = useCart((s) => s.add);
  const priced = hasPrice(p);

  const addButton = (className: string) =>
    priced && (
      <button
        onClick={() => hasPrice(p) && add(p)}
        aria-label={`Add ${p.name} to cart`}
        className={clsx(
          "shrink-0 place-items-center rounded-full bg-mist text-wine-deep transition hover:bg-lilac active:scale-95",
          className,
        )}
      >
        <Plus className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </button>
    );

  const comingSoon = <span className="text-white/60">Price coming soon</span>;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-wine-dark/60 ring-1 ring-white/5 transition hover:ring-lilac/40">
      <div
        className={clsx(
          "relative overflow-hidden",
          compact ? "aspect-square" : "aspect-[4/3]",
        )}
      >
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes={
            compact
              ? "(min-width: 1280px) 17vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <span
          className={clsx(
            "absolute left-2 top-2 rounded-full bg-wine-deep/80 font-mono uppercase tracking-wide text-lilac",
            compact ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-[11px]",
          )}
        >
          {p.origin}
        </span>
        {/* Phones: the add button sits on the photo so the text gets the full card width */}
        {compact &&
          addButton(
            "absolute bottom-2 right-2 grid h-9 w-9 shadow-md sm:hidden",
          )}
      </div>

      {compact ? (
        <div className="flex flex-1 items-end justify-between gap-2 p-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 min-h-10 font-display text-[15px] leading-5 sm:min-h-12 sm:text-base sm:leading-6">
              {p.name}
            </h3>
            <p className="mt-1.5 text-sm sm:mt-1">
              {priced ? (
                <>
                  {formatPrice(p.price!)}
                  <span className="block text-xs text-white/60 sm:inline">
                    <span className="hidden sm:inline"> / </span>
                    {p.unit}
                  </span>
                </>
              ) : (
                comingSoon
              )}
            </p>
          </div>
          {addButton("hidden h-8 w-8 sm:grid")}
        </div>
      ) : (
        <div className="flex flex-1 items-end justify-between gap-4 p-5">
          <div className="min-w-0">
            <h3 className="font-display text-xl">{p.name}</h3>
            <p className="mt-1 text-sm text-white/70">{p.description}</p>
            <p className="mt-3 text-lg">
              {priced ? (
                <>
                  {formatPrice(p.price!)}
                  <span className="text-sm text-white/60"> / {p.unit}</span>
                </>
              ) : (
                comingSoon
              )}
            </p>
          </div>
          {addButton("grid h-11 w-11")}
        </div>
      )}
    </article>
  );
}
