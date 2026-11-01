"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import clsx from "clsx";
import { cartCount, useCart } from "@/store/cart";

const leftLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Store", href: "/store" },
  { label: "Wholesale", href: "/wholesale" },
];

const rightLinks = [
  { label: "Baskets", href: "/baskets" },
  { label: "Mission", href: "/#mission" },
  { label: "Contact", href: "#contact" },
];

const linkClass =
  "font-mono text-[13px] uppercase tracking-wide text-white/90 transition hover:text-lilac";

export default function Navbar({ solid = false }: { solid?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.open);
  // Cart is persisted in localStorage, so only show the count after hydration.
  const [mounted, setMounted] = useState(false);
  const count = mounted ? cartCount(items) : 0;

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartButton = (
    <button
      onClick={openCart}
      className={clsx(linkClass, "relative flex items-center gap-2")}
      aria-label="Open cart"
    >
      <ShoppingBag className="h-4 w-4" />
      <span className="hidden lg:inline">Cart</span>
      {count > 0 && (
        <span className="absolute -right-3 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-lilac px-1 font-sans text-[10px] font-semibold text-wine-dark">
          {count}
        </span>
      )}
    </button>
  );

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        solid || scrolled ? "bg-wine-dark/95 backdrop-blur" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-14">
        <ul className="hidden flex-1 items-center gap-12 md:flex">
          {leftLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="shrink-0" aria-label="Fruit Heaven home">
          <Image
            src="/images/wordmark.png"
            alt="Fruit Heaven"
            width={1022}
            height={215}
            priority
            className="h-auto w-[124px] brightness-125"
          />
        </Link>

        <ul className="hidden flex-1 items-center justify-end gap-12 md:flex">
          {rightLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className={linkClass}>
                {l.label}
              </Link>
            </li>
          ))}
          <li>{cartButton}</li>
        </ul>

        <div className="md:hidden">{cartButton}</div>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-4 bg-wine-dark/95 px-6 pb-6 pt-2 md:hidden">
          {[...leftLinks, ...rightLinks].map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
