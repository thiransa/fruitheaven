"use client";

import { getImageProps } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const alt = "Apples, oranges, grapes and pomegranates piled on a table";

// Art direction: a portrait crop for phones, the wide photo from md (768px) up.
const {
  props: { srcSet: desktopSrcSet },
} = getImageProps({
  alt,
  src: "/images/hero.jpg",
  width: 1695,
  height: 928,
  sizes: "100vw",
  priority: true,
});
const {
  props: { srcSet: mobileSrcSet, ...mobileImg },
} = getImageProps({
  alt,
  src: "/images/hero-mobile.jpg",
  width: 1060,
  height: 1900,
  sizes: "100vw",
  priority: true,
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-[100svh] max-h-[900px] min-h-[600px] w-full overflow-hidden md:h-[max(520px,55vw)] md:max-h-[860px] md:min-h-0"
    >
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from mobileImg */}
        <img
          {...mobileImg}
          className="absolute inset-0 h-full w-full object-cover object-bottom md:object-[center_60%]"
        />
      </picture>
      {/* Darken the wall behind the fruit so the nav and headline read clearly */}
      <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/90 via-wine-deep/45 to-transparent" />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative mx-auto h-full max-w-[1440px] px-6">
        <h1 className="sr-only">Heaven in Every Bite</h1>
        <div
          aria-hidden
          className="absolute left-1/2 top-[18%] w-[min(92vw,1080px)] -translate-x-1/2 text-center leading-none text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] md:top-[17%] md:text-left"
        >
          <motion.span
            {...rise(0.1)}
            className="block font-display text-[19vw] tracking-wide md:pl-[8%] md:text-[clamp(2.6rem,8.5vw,8rem)]"
          >
            HEAVEN
          </motion.span>
          <motion.span
            {...rise(0.3)}
            className="-mt-[0.1em] block font-sans text-[16vw] font-light md:-mt-[0.15em] md:pl-[37%] md:text-[clamp(2.6rem,8vw,7.5rem)]"
          >
            in
          </motion.span>
          <motion.span
            {...rise(0.5)}
            className="-mt-[0.1em] flex items-baseline justify-center md:justify-start md:pl-[30%]"
          >
            <span className="font-script text-[23vw] md:text-[clamp(3.4rem,11vw,10.5rem)]">
              Every
            </span>
            <span className="ml-[0.25em] font-display text-[18vw] tracking-wide md:ml-[0.35em] md:text-[clamp(2.6rem,8.5vw,8rem)]">
              BITE
            </span>
          </motion.span>
        </div>

        <motion.div
          {...rise(0.8)}
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 md:bottom-[14%]"
        >
          <Link
            href="/shop"
            className="inline-block whitespace-nowrap rounded-lg bg-mist/95 px-10 py-4 text-[15px] text-wine-deep shadow-lg transition hover:bg-white"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
