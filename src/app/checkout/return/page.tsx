import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderStatus from "@/components/OrderStatus";

export const metadata: Metadata = {
  title: "Order status — Fruit Heaven",
  robots: { index: false },
};

export default function CheckoutReturnPage() {
  return (
    <>
      <Navbar solid />
      <main className="mx-auto max-w-[720px] px-6 pb-16 pt-24 md:pb-24 md:pt-32">
        <Suspense>
          <OrderStatus />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
