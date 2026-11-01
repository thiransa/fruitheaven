"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader2, Lock, Minus, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import {
  customerSchema,
  type CheckoutResponse,
  type CustomerInput,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/products";
import { cartTotal, useCart } from "@/store/cart";

type Errors = Partial<Record<keyof CustomerInput | "form", string>>;

const fields: {
  name: keyof CustomerInput;
  label: string;
  type?: string;
  autoComplete: string;
  span?: boolean;
}[] = [
  { name: "firstName", label: "First name", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", autoComplete: "family-name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "address", label: "Delivery address", autoComplete: "street-address", span: true },
  { name: "city", label: "City", autoComplete: "address-level2" },
];

const inputClass =
  "mt-1.5 w-full rounded-lg border bg-wine-dark/60 px-4 py-3 text-[15px] placeholder:text-white/40 focus:border-lilac focus:outline-none";

/** PayHere only accepts a real form POST, so build one and submit it. */
function redirectToPayhere(action: string, values: Record<string, string>) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;
  for (const [name, value] of Object.entries(values)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  document.body.appendChild(form);
  form.submit();
}

export default function CheckoutForm() {
  const { items, setQuantity, remove } = useCart();
  // The cart lives in localStorage, so wait for hydration before rendering it.
  const [mounted, setMounted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="mt-10 h-96 animate-pulse rounded-xl bg-wine-dark/40" />;
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-xl bg-wine-dark/60 p-8 text-center ring-1 ring-white/5">
        <p className="text-white/75">Your basket is empty.</p>
        <Link
          href="/shop"
          className="mt-5 inline-block rounded-lg bg-mist px-8 py-3 text-wine-deep transition hover:bg-white"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (!data.notes) delete data.notes;

    const parsed = customerSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof CustomerInput] ??= issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: parsed.data,
          items: items.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const body: CheckoutResponse = await res.json();
      if (!body.ok) {
        const next: Errors = { form: body.error };
        for (const [k, v] of Object.entries(body.fieldErrors ?? {})) {
          next[k as keyof CustomerInput] = v[0];
        }
        setErrors(next);
        setSubmitting(false);
        return;
      }
      redirectToPayhere(body.action, body.fields);
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setSubmitting(false);
    }
  }

  const total = cartTotal(items);

  return (
    <div className="mt-8 grid gap-8 md:mt-12 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
      <form onSubmit={onSubmit} noValidate className="order-2 lg:order-1">
        <h2 className="font-mono text-xs uppercase tracking-widest text-lilac">
          Delivery details
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <label key={f.name} className={clsx("block text-sm", f.span && "sm:col-span-2")}>
              {f.label}
              <input
                name={f.name}
                type={f.type ?? "text"}
                autoComplete={f.autoComplete}
                aria-invalid={!!errors[f.name]}
                className={clsx(
                  inputClass,
                  errors[f.name] ? "border-red-400" : "border-white/20",
                )}
              />
              {errors[f.name] && (
                <span className="mt-1 block text-xs text-red-300">{errors[f.name]}</span>
              )}
            </label>
          ))}
          <label className="block text-sm sm:col-span-2">
            Order notes <span className="text-white/50">(optional)</span>
            <textarea
              name="notes"
              rows={3}
              placeholder="Delivery instructions, preferred time…"
              className={clsx(inputClass, "resize-none border-white/20")}
            />
          </label>
        </div>

        {errors.form && (
          <p className="mt-5 rounded-lg bg-red-500/15 px-4 py-3 text-sm text-red-200">
            {errors.form}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-mist py-4 text-wine-deep transition hover:bg-white disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Lock className="h-4 w-4" />
          )}
          {submitting ? "Redirecting to PayHere…" : `Pay ${formatPrice(total)}`}
        </button>
        <p className="mt-3 text-center text-xs text-white/50">
          You&rsquo;ll be taken to PayHere to pay securely by card or mobile wallet.
        </p>
      </form>

      <aside className="order-1 h-fit rounded-xl bg-wine-dark/60 p-5 ring-1 ring-white/5 md:p-6 lg:order-2">
        <h2 className="font-mono text-xs uppercase tracking-widest text-lilac">
          Your order
        </h2>
        <ul className="mt-4 divide-y divide-white/10">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 py-3">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="font-display leading-tight">{item.name}</p>
                    <p className="text-xs text-white/60">{item.unit}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="text-white/50 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-white/20 px-2 py-0.5">
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex justify-between border-t border-white/10 pt-4 text-lg">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </aside>
    </div>
  );
}
