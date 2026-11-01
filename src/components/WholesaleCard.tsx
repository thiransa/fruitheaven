import ImageCarousel from "./ImageCarousel";
import { formatPrice } from "@/lib/products";
import type { WholesaleItem } from "@/lib/wholesale";

const WHATSAPP = "94777662766";

export default function WholesaleCard({ item }: { item: WholesaleItem }) {
  const message = `Hi Fruit Heaven, I'd like to order ${item.name}${item.box ? ` (${item.box})` : ""} wholesale.`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl bg-wine-dark/60 ring-1 ring-white/5 transition hover:ring-lilac/40">
      <div className="relative aspect-square overflow-hidden">
        <ImageCarousel
          images={item.images}
          alt={item.name}
          sizes="(min-width: 1280px) 17vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {item.images.length > 1 && (
          <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-wine-deep/80 px-2 py-0.5 text-[10px] font-medium text-white">
            {item.images.length} photos
          </span>
        )}
        {item.unavailable && (
          <span className="pointer-events-none absolute inset-x-2 bottom-6 rounded-md bg-wine-deep/90 px-2 py-1 text-center text-[11px] font-semibold text-white">
            Not available at the moment
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3">
        <div>
          <h4 className="line-clamp-2 min-h-10 font-display text-[15px] leading-5 sm:min-h-12 sm:text-base sm:leading-6">
            {item.name}
          </h4>
          {item.box && (
            <p className="mt-1.5 w-fit rounded-md bg-lilac px-2 py-0.5 text-xs font-semibold text-wine-deep">
              {item.box}
            </p>
          )}
          {item.price === undefined ? (
            <p className="mt-1.5 text-sm text-white/60">Price coming soon</p>
          ) : (
            <>
              <p className="mt-1.5 text-sm tabular-nums">
                {formatPrice(item.price)}
                {item.priceTo && (
                  <span className="text-white/70">
                    {" – "}
                    {item.priceTo.toLocaleString("en-LK")}
                  </span>
                )}
              </p>
              <p className="text-xs text-white/60">
                per box
                {item.note && (
                  <span className="text-lilac"> · {item.note}</span>
                )}
              </p>
            </>
          )}
        </div>
        {item.unavailable ? (
          <p className="mt-auto rounded-lg border border-white/10 py-2 text-center text-xs font-medium text-white/40">
            Out of stock
          </p>
        ) : (
          <a
            href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto rounded-lg border border-white/20 py-2 text-center text-xs font-medium text-white/90 transition hover:border-lilac hover:text-lilac"
          >
            Order on WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}
