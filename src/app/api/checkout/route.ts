import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { checkoutSchema, type CheckoutResponse } from "@/lib/checkout";
import { createOrder, type OrderLine } from "@/lib/orders";
import { checkoutHash, formatAmount, payhereConfig } from "@/lib/payhere";
import { allProducts, CURRENCY } from "@/lib/products";

export async function POST(request: Request) {
  const parsed = checkoutSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    // Key errors by the field name ("email", "phone", ...) for the form to show.
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path.at(-1) ?? "form");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return NextResponse.json<CheckoutResponse>(
      { ok: false, error: "Please check your details", fieldErrors },
      { status: 400 },
    );
  }

  let config;
  try {
    config = payhereConfig();
  } catch (err) {
    console.error(err);
    return NextResponse.json<CheckoutResponse>(
      { ok: false, error: "Online payments are not available right now." },
      { status: 503 },
    );
  }

  // Price the order from our own catalogue — never trust prices from the browser.
  const lines: OrderLine[] = [];
  for (const item of parsed.data.items) {
    const product = allProducts.find((p) => p.id === item.id);
    if (!product) {
      return NextResponse.json<CheckoutResponse>(
        { ok: false, error: "An item in your basket is no longer available." },
        { status: 400 },
      );
    }
    lines.push({
      id: product.id,
      name: product.name,
      unit: product.unit,
      price: product.price,
      quantity: item.quantity,
    });
  }
  const total = lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

  const orderId = `FH-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`;
  const now = new Date().toISOString();
  const { customer } = parsed.data;

  await createOrder({
    id: orderId,
    createdAt: now,
    updatedAt: now,
    status: "pending",
    currency: CURRENCY,
    total,
    lines,
    customer,
  });

  const amount = formatAmount(total);
  const fields: Record<string, string> = {
    merchant_id: config.merchantId,
    return_url: `${config.siteUrl}/checkout/return?order=${orderId}`,
    cancel_url: `${config.siteUrl}/checkout/cancel?order=${orderId}`,
    notify_url: `${config.siteUrl}/api/payhere/notify`,
    order_id: orderId,
    items: `Fruit Heaven order ${orderId}`,
    currency: CURRENCY,
    amount,
    first_name: customer.firstName,
    last_name: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    city: customer.city,
    country: "Sri Lanka",
    delivery_address: customer.address,
    delivery_city: customer.city,
    delivery_country: "Sri Lanka",
    hash: checkoutHash(
      config.merchantId,
      config.merchantSecret,
      orderId,
      amount,
      CURRENCY,
    ),
  };
  lines.forEach((line, i) => {
    const n = i + 1;
    fields[`item_name_${n}`] = line.name;
    fields[`item_number_${n}`] = line.id;
    fields[`amount_${n}`] = formatAmount(line.price);
    fields[`quantity_${n}`] = String(line.quantity);
  });

  return NextResponse.json<CheckoutResponse>({
    ok: true,
    action: config.checkoutUrl,
    fields,
  });
}
