"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Loader2, XCircle } from "lucide-react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/store/cart";

type OrderSummary = {
  id: string;
  status: "pending" | "paid" | "canceled" | "failed" | "chargedback";
  total: number;
  lines: { name: string; quantity: number }[];
};

const POLL_MS = 3000;
const MAX_POLLS = 20;

export default function OrderStatus() {
  const orderId = useSearchParams().get("order");
  const clearCart = useCart((s) => s.clear);
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [gaveUp, setGaveUp] = useState(false);

  // PayHere's notification can arrive a moment after the customer lands here,
  // so poll until the order leaves "pending".
  useEffect(() => {
    if (!orderId) return;
    let polls = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    async function check() {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId!)}`, {
        cache: "no-store",
      });
      if (cancelled) return;
      if (res.status === 404) return setNotFound(true);
      const data: OrderSummary = await res.json();
      setOrder(data);
      if (data.status === "paid") clearCart();
      if (data.status === "pending") {
        if (++polls < MAX_POLLS) timer = setTimeout(check, POLL_MS);
        else setGaveUp(true);
      }
    }
    check().catch(() => setGaveUp(true));
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [orderId, clearCart]);

  if (!orderId || notFound) {
    return (
      <Panel icon={<XCircle className="h-10 w-10 text-red-300" />} title="Order not found">
        We couldn&rsquo;t find that order. If you were charged, please contact us
        with your payment receipt.
      </Panel>
    );
  }

  if (!order || (order.status === "pending" && !gaveUp)) {
    return (
      <Panel
        icon={<Loader2 className="h-10 w-10 animate-spin text-lilac" />}
        title="Confirming your payment…"
      >
        This usually takes a few seconds. Please don&rsquo;t close this page.
      </Panel>
    );
  }

  if (order.status === "paid") {
    return (
      <Panel
        icon={<CheckCircle2 className="h-10 w-10 text-emerald-300" />}
        title="Thank you for your order!"
      >
        <p>
          Your payment of {formatPrice(order.total)} was successful. We&rsquo;ll
          be in touch to arrange delivery.
        </p>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-lilac">
          Order {order.id}
        </p>
        <ul className="mt-5 space-y-1 text-sm text-white/75">
          {order.lines.map((l) => (
            <li key={l.name}>
              {l.quantity} × {l.name}
            </li>
          ))}
        </ul>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-lg bg-mist px-8 py-3 text-wine-deep transition hover:bg-white"
        >
          Continue shopping
        </Link>
      </Panel>
    );
  }

  if (order.status === "pending") {
    return (
      <Panel icon={<Clock className="h-10 w-10 text-lilac" />} title="Payment is processing">
        We haven&rsquo;t received confirmation from PayHere yet. You&rsquo;ll get an
        email from PayHere once it completes — your order reference is{" "}
        <span className="font-mono">{order.id}</span>.
      </Panel>
    );
  }

  return (
    <Panel icon={<XCircle className="h-10 w-10 text-red-300" />} title="Payment not completed">
      <p>Your payment was {order.status}. Your basket has been kept so you can try again.</p>
      <Link
        href="/checkout"
        className="mt-8 inline-block rounded-lg bg-mist px-8 py-3 text-wine-deep transition hover:bg-white"
      >
        Back to checkout
      </Link>
    </Panel>
  );
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-wine-dark/60 p-8 text-center ring-1 ring-white/5 md:p-12">
      <div className="flex justify-center">{icon}</div>
      <h1 className="mt-5 font-hand text-4xl md:text-5xl">{title}</h1>
      <div className="mt-4 text-white/80">{children}</div>
    </div>
  );
}
