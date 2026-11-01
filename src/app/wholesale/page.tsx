import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WholesaleCard from "@/components/WholesaleCard";
import { PRICES_UPDATED, wholesale } from "@/lib/wholesale";

export const metadata: Metadata = {
  title: "Wholesale — Fruit Heaven",
  description:
    "Bulk imported and local fruits for shops, hotels, restaurants and events.",
};

export default function WholesalePage() {
  return (
    <>
      <Navbar solid />
      <main className="mx-auto max-w-[1440px] px-6 pb-16 pt-24 md:pb-24 md:pt-28 lg:px-14">
        <h1 className="font-hand text-5xl md:text-7xl">Wholesale</h1>
        <p className="mt-3 max-w-2xl text-white/75">
          Supplying shops, hotels, restaurants and events with premium imported
          and fresh local fruits in bulk. Get in touch for current wholesale
          prices and availability.
        </p>

        <h2 className="mt-8 font-hand text-4xl md:mt-12 md:text-5xl">
          Available in bulk (Boxes)
        </h2>
        <p className="mt-3 text-sm text-white/60">
          Prices are per box and may change with market rates and availability.
          Last updated {PRICES_UPDATED}.
        </p>

        {wholesale.map((category) => (
          <section key={category.title} className="mt-10 md:mt-14">
            <h3 className="font-display text-2xl md:text-3xl">
              {category.title}
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {category.items.map((item) => (
                <WholesaleCard key={`${item.name}-${item.box}`} item={item} />
              ))}
            </div>
          </section>
        ))}

        <div className="mt-14 grid gap-3 md:mt-20 md:grid-cols-3 md:gap-6">
          <a
            href="tel:0777662766"
            className="rounded-xl bg-wine-dark/60 p-5 ring-1 md:p-6 ring-white/5 transition hover:ring-lilac/40"
          >
            <Phone className="h-5 w-5 text-lilac" />
            <p className="mt-3 font-mono md:mt-4 text-xs uppercase tracking-widest text-lilac">
              Call
            </p>
            <p className="mt-2">077 766 2766</p>
            <p>077 777 4932</p>
          </a>
          <a
            href="mailto:fruitheaven00@gmail.com?subject=Wholesale%20enquiry"
            className="rounded-xl bg-wine-dark/60 p-5 ring-1 md:p-6 ring-white/5 transition hover:ring-lilac/40"
          >
            <Mail className="h-5 w-5 text-lilac" />
            <p className="mt-3 font-mono md:mt-4 text-xs uppercase tracking-widest text-lilac">
              Email
            </p>
            <p className="mt-2">fruitheaven00@gmail.com</p>
          </a>
          <div className="rounded-xl bg-wine-dark/60 p-5 ring-1 md:p-6 ring-white/5">
            <MapPin className="h-5 w-5 text-lilac" />
            <p className="mt-3 font-mono md:mt-4 text-xs uppercase tracking-widest text-lilac">
              Visit
            </p>
            <p className="mt-2">No.55, New Manning Market, Peliyagoda.</p>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
