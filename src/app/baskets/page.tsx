import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { baskets } from "@/lib/products";

export const metadata: Metadata = {
  title: "Fruit Baskets — Fruit Heaven",
  description:
    "Fresh fruit baskets and gift hampers for birthdays, celebrations, get-well wishes and corporate gifting.",
};

export default function BasketsPage() {
  return (
    <>
      <Navbar solid />
      <main className="mx-auto max-w-[1440px] px-6 pb-16 pt-24 md:pb-24 md:pt-28 lg:px-14">
        <section className="grid items-center gap-6 md:grid-cols-[1fr_auto] md:gap-12">
          <div>
            <h1 className="font-hand text-5xl md:text-7xl">Fruit Baskets</h1>
            <p className="mt-3 max-w-2xl text-white/75">
              Hand-packed baskets of premium imported and fresh local fruits —
              the perfect gift for birthdays, celebrations, get-well wishes and
              corporate occasions.
            </p>
          </div>
          <Image
            src="/images/logo.png"
            alt=""
            width={1254}
            height={1254}
            priority
            className="mx-auto hidden h-auto w-56 md:block"
          />
        </section>

        <section className="relative mt-8 overflow-hidden rounded-xl ring-1 ring-white/5 md:mt-12">
          <div
            aria-hidden
            className="grid grid-cols-2 gap-1 blur-[2px] lg:grid-cols-4"
          >
            {baskets.map((b) => (
              <div key={b.id} className="relative aspect-square">
                <Image
                  src={b.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-wine-deep/75 px-6 text-center">
            <span className="rounded-full border border-lilac/50 px-4 py-1 font-mono text-[11px] uppercase tracking-widest text-lilac">
              Our basket catalogue
            </span>
            <h2 className="mt-4 font-hand text-6xl md:text-8xl">Coming Soon</h2>
            <p className="mt-6 max-w-md text-white/80 md:mt-8">
              We&rsquo;re putting together a range of ready-made baskets. Until
              then, we&rsquo;ll happily build one just for you.
            </p>
          </div>
        </section>

        <section className="mt-14 flex flex-col items-start gap-5 rounded-xl bg-wine-dark/60 p-6 ring-1 ring-white/5 md:mt-20 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-hand text-4xl md:text-5xl">
              Build a Custom Basket
            </h2>
            <p className="mt-2 max-w-xl text-white/75">
              Choose your favourite fruits, budget and occasion — we&rsquo;ll
              put it together and add a personal note.
            </p>
          </div>
          <a
            href="https://wa.me/94777662766?text=Hi%20Fruit%20Heaven%2C%20I%27d%20like%20a%20custom%20fruit%20basket."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-mist px-5 py-4 text-[15px] text-wine-deep transition hover:bg-white md:w-auto md:px-8"
          >
            Customize &amp; Order on WhatsApp
          </a>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
