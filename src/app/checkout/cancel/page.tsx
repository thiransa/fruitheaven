import type { Metadata } from "next";
import Link from "next/link";
import { XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Payment cancelled — Fruit Heaven",
  robots: { index: false },
};

export default function CheckoutCancelPage() {
  return (
    <>
      <Navbar solid />
      <main className="mx-auto max-w-[720px] px-6 pb-16 pt-24 md:pb-24 md:pt-32">
        <div className="rounded-xl bg-wine-dark/60 p-8 text-center ring-1 ring-white/5 md:p-12">
          <div className="flex justify-center">
            <XCircle className="h-10 w-10 text-white/60" />
          </div>
          <h1 className="mt-5 font-hand text-4xl md:text-5xl">Payment cancelled</h1>
          <p className="mt-4 text-white/80">
            No payment was taken. Your basket has been saved — you can pick up
            where you left off.
          </p>
          <Link
            href="/checkout"
            className="mt-8 inline-block rounded-lg bg-mist px-8 py-3 text-wine-deep transition hover:bg-white"
          >
            Back to checkout
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
