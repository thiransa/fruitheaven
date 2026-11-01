import { NextResponse } from "next/server";
import { getOrder } from "@/lib/orders";

// Lets the return page poll for the payment result. Only exposes what that
// page needs — order IDs are unguessable but this still avoids leaking PII.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const order = await getOrder((await params).id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: order.id,
    status: order.status,
    total: order.total,
    currency: order.currency,
    lines: order.lines.map(({ name, quantity }) => ({ name, quantity })),
  });
}
