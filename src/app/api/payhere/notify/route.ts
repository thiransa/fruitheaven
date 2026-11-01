import { getOrder, updateOrder, type OrderStatus } from "@/lib/orders";
import {
  formatAmount,
  isValidNotification,
  PAYHERE_STATUS,
  payhereConfig,
  type PayhereNotification,
} from "@/lib/payhere";

const statusFor: Record<string, OrderStatus> = {
  [PAYHERE_STATUS.SUCCESS]: "paid",
  [PAYHERE_STATUS.PENDING]: "pending",
  [PAYHERE_STATUS.CANCELED]: "canceled",
  [PAYHERE_STATUS.FAILED]: "failed",
  [PAYHERE_STATUS.CHARGEDBACK]: "chargedback",
};

// PayHere posts payment results here server-to-server (form-urlencoded).
// This — not the browser landing on return_url — is the source of truth.
export async function POST(request: Request) {
  const form = await request.formData();
  const n = Object.fromEntries(
    [...form.entries()].map(([k, v]) => [k, String(v)]),
  ) as PayhereNotification;

  const { merchantId, merchantSecret } = payhereConfig();
  if (!isValidNotification(n, merchantId, merchantSecret)) {
    console.warn("PayHere notify: invalid signature", n.order_id);
    return new Response("invalid signature", { status: 400 });
  }

  const order = await getOrder(n.order_id);
  if (!order) {
    console.warn("PayHere notify: unknown order", n.order_id);
    return new Response("unknown order", { status: 404 });
  }

  // Guard against a signed notification for a different amount or currency.
  if (
    n.payhere_currency !== order.currency ||
    n.payhere_amount !== formatAmount(order.total)
  ) {
    console.warn("PayHere notify: amount mismatch", n.order_id, n.payhere_amount);
    return new Response("amount mismatch", { status: 400 });
  }

  const status = statusFor[n.status_code];
  if (!status) return new Response("unknown status", { status: 400 });

  // Don't let a late pending/canceled message overwrite a confirmed payment.
  if (order.status === "paid" && status !== "chargedback") {
    return new Response("ok");
  }

  await updateOrder(order.id, {
    status,
    payment: {
      paymentId: n.payment_id,
      method: n.method,
      message: n.status_message,
    },
  });
  console.log(`PayHere notify: order ${order.id} → ${status}`);
  return new Response("ok");
}
