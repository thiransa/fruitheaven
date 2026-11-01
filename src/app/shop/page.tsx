import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ShopGrid from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop — Fruit Heaven",
  description: "Shop premium imported and fresh local fruits.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar solid />
      <main className="mx-auto max-w-[1440px] px-6 pb-16 pt-24 md:pb-24 md:pt-28 lg:px-14">
        <h1 className="font-hand text-5xl md:text-7xl">Order Now</h1>
        <p className="mt-3 max-w-xl text-white/75">
          Premium imported and fresh local fruits, hand-picked and delivered to
          your door.
        </p>
        <ShopGrid />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
