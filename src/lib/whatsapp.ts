import { formatPrice } from "@/lib/products";
import type { CustomerInput } from "@/lib/checkout";
import type { CartItem } from "@/store/cart";

export const WHATSAPP_NUMBER = "94777662766";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Until PayHere goes live, retail orders are sent to us as a WhatsApp message. */
export const PAYHERE_ENABLED = process.env.NEXT_PUBLIC_PAYHERE_ENABLED === "true";

export function orderMessage(items: CartItem[], customer: CustomerInput, total: number) {
  const lines = items.map(
    (i) => `- ${i.name} (${i.unit}) x ${i.quantity} = ${formatPrice(i.price * i.quantity)}`,
  );
  return [
    "Hi Fruit Heaven, I'd like to place an order:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    `Name: ${customer.firstName} ${customer.lastName}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email}`,
    `Address: ${customer.address}, ${customer.city}`,
    ...(customer.notes ? [`Notes: ${customer.notes}`] : []),
  ].join("\n");
}
