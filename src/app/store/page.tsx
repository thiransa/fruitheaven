import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Hand,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { retail } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Store — Fruit Heaven",
  description:
    "Visit Fruit Heaven at No.55, New Manning Market, Peliyagoda and pick your own premium imported and local fruits.",
};

const ADDRESS = "No.55, New Manning Market, Peliyagoda";
const MAP_QUERY = encodeURIComponent(`Fruit Heaven, ${ADDRESS}, Sri Lanka`);

const reasons = [
  {
    icon: Hand,
    title: "Pick your own",
    body: "Choose every fruit yourself — exactly the ripeness and size you like.",
  },
  {
    icon: Sparkles,
    title: "Freshest arrivals first",
    body: "New shipments land at the market, so in-store customers see them first.",
  },
  {
    icon: Users,
    title: "Friendly advice",
    body: "Ask our team what's in season, what's sweetest today, or what's best for gifting.",
  },
];

const cardClass =
  "rounded-xl bg-wine-dark/60 p-5 ring-1 ring-white/5 transition hover:ring-lilac/40 md:p-6";
const labelClass =
  "mt-3 font-mono text-xs uppercase tracking-widest text-lilac md:mt-4";

export default function StorePage() {
  return (
    <>
      <Navbar solid />
      <main className="mx-auto max-w-[1440px] px-6 pb-16 pt-24 md:pb-24 md:pt-28 lg:px-14">
        <h1 className="font-hand text-5xl md:text-7xl">Visit Our Store</h1>
        <p className="mt-3 max-w-2xl text-white/75">
          Come see us at New Manning Market and hand-pick premium imported and
          fresh local fruits in person.
        </p>

        <div className="mt-8 grid gap-6 md:mt-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="grid gap-3 md:gap-4">
            <div className={cardClass}>
              <MapPin className="h-5 w-5 text-lilac" />
              <p className={labelClass}>Find us</p>
              <p className="mt-2">{ADDRESS}.</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-lilac hover:underline"
              >
                Get directions <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <a href="tel:0777662766" className={cardClass}>
              <Phone className="h-5 w-5 text-lilac" />
              <p className={labelClass}>Call the store</p>
              <p className="mt-2">077 766 2766</p>
              <p>077 777 4932</p>
            </a>
            <a
              href="https://wa.me/94777662766?text=Hi%20Fruit%20Heaven%2C%20what%27s%20in%20store%20today%3F"
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              <MessageCircle className="h-5 w-5 text-lilac" />
              <p className={labelClass}>Check today&rsquo;s stock</p>
              <p className="mt-2">
                Message us on WhatsApp to see what&rsquo;s in store before you
                visit.
              </p>
            </a>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-xl ring-1 ring-white/5">
            <iframe
              title={`Map showing Fruit Heaven at ${ADDRESS}`}
              src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[30%]"
            />
          </div>
        </div>

        <h2 className="mt-14 font-hand text-4xl md:mt-20 md:text-5xl">
          Why Visit in Person
        </h2>
        <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-6">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl bg-wine-dark/60 p-5 ring-1 ring-white/5 md:p-6"
            >
              <Icon className="h-5 w-5 text-lilac" />
              <h3 className="mt-3 font-display text-xl">{title}</h3>
              <p className="mt-2 text-sm text-white/75">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-end justify-between gap-4 md:mt-20">
          <h2 className="font-hand text-4xl md:text-5xl">In Store Now</h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm text-lilac hover:underline"
          >
            Prefer delivery? Order online <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-4 md:mt-8 md:gap-6 lg:grid-cols-8">
          {retail.map((p) => (
            <li key={p.id}>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1024px) 12vw, (min-width: 640px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-2 font-display text-sm">{p.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-lilac">
                {p.origin}
              </p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
