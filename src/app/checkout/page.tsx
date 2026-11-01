import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout — Fruit Heaven",
  robots: { index: false },
};

export default function CheckoutPage() {
  return (
    <>
      <Navbar solid />
      <main className="mx-auto max-w-[1200px] px-6 pb-16 pt-24 md:pb-24 md:pt-28 lg:px-14">
        <h1 className="font-hand text-5xl md:text-7xl">Checkout</h1>
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
