"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

// Native scroll-snap does the swiping on touch; arrows and dots are for mouse users.
export default function ImageCarousel({
  images,
  alt,
  sizes,
}: {
  images: string[];
  alt: string;
  sizes: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  if (images.length === 1) {
    return <Image src={images[0]} alt={alt} fill sizes={sizes} className="object-cover" />;
  }

  const goTo = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="group/carousel absolute inset-0">
      <div
        ref={track}
        onScroll={(e) => {
          const el = e.currentTarget;
          setIndex(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label={`${alt} photos`}
      >
        {images.map((src, i) => (
          <div key={src} className="relative h-full w-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${alt} — photo ${i + 1} of ${images.length}`}
              fill
              sizes={sizes}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {index > 0 && (
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-wine-deep/70 text-white opacity-0 transition group-hover/carousel:opacity-100 sm:grid"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      {index < images.length - 1 && (
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-wine-deep/70 text-white opacity-0 transition group-hover/carousel:opacity-100 sm:grid"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
        {images.map((src, i) => (
          <span
            key={src}
            className={clsx(
              "h-1.5 rounded-full bg-white shadow transition-all",
              i === index ? "w-4" : "w-1.5 opacity-60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
