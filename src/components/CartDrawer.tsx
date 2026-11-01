"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { cartTotal, useCart } from "@/store/cart";

export default function CartDrawer() {
  const { items, isOpen, close, setQuantity, remove } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-wine-dark shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-hand text-3xl">Your Basket</h2>
              <button onClick={close} aria-label="Close cart">
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <p className="flex flex-1 items-center justify-center px-6 text-white/60">
                Your basket is empty.
              </p>
            ) : (
              <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-6">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="font-display">{item.name}</p>
                          <p className="text-xs text-white/60">{item.unit}</p>
                        </div>
                        <button
                          onClick={() => remove(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-white/50 hover:text-white"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-white/20 px-2 py-1">
                          <button
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-5 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p>{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-white/10 px-6 py-6">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal(items))}</span>
              </div>
              {items.length === 0 ? (
                <button
                  disabled
                  className="mt-5 w-full rounded-lg bg-mist py-4 text-wine-deep opacity-40"
                >
                  Checkout
                </button>
              ) : (
                <Link
                  href="/checkout"
                  onClick={close}
                  className="mt-5 block w-full rounded-lg bg-mist py-4 text-center text-wine-deep transition hover:bg-white"
                >
                  Checkout
                </Link>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
