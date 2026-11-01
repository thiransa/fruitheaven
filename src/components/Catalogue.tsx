"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { retail as products, type Origin } from "@/lib/products";
import ProductCard from "./ProductCard";
import FilterChips from "./FilterChips";
import Reveal from "./Reveal";

export default function Catalogue() {
  const [filter, setFilter] = useState<Origin | "all">("all");
  const visible = (
    filter === "all" ? products : products.filter((p) => p.origin === filter)
  ).slice(0, 6);

  return (
    <section
      id="catalogue"
      className="mx-auto max-w-[1440px] scroll-mt-16 px-6 pb-16 pt-8 md:pb-24 md:pt-12 lg:px-14"
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-4 md:gap-6">
        <h2 className="font-hand text-5xl md:text-6xl">The Catalogue</h2>
        <FilterChips value={filter} onChange={setFilter} />
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3 md:mt-12 md:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visible.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.05} className="h-full">
            <ProductCard product={p} compact />
          </Reveal>
        ))}
      </div>

      <div className="mt-10 flex justify-center md:mt-14">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-lg bg-mist px-10 py-4 text-[15px] text-wine-deep transition hover:bg-white"
        >
          Shop all fruits <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
