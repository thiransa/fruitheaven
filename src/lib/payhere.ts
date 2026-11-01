import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

// PayHere Checkout API: https://support.payhere.lk/api-&-mobile-sdk/checkout-api

export const PAYHERE_STATUS = {
  SUCCESS: "2",
  PENDING: "0",
  CANCELED: "-1",
  FAILED: "-2",
  CHARGEDBACK: "-3",
} as const;

export function payhereConfig() {
  const merchantId = process.env.PAYHERE_MERCHANT_ID;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
  if (!merchantId || !merchantSecret || !siteUrl) {
    throw new Error(
      "PayHere is not configured: set PAYHERE_MERCHANT_ID, PAYHERE_MERCHANT_SECRET and SITE_URL in .env.local",
    );
  }
  const sandbox = process.env.PAYHERE_SANDBOX === "true";
  return {
    merchantId,
    merchantSecret,
    siteUrl,
    checkoutUrl: sandbox
      ? "https://sandbox.payhere.lk/pay/checkout"
      : "https://www.payhere.lk/pay/checkout",
  };
}

const md5Upper = (value: string) =>
  createHash("md5").update(value).digest("hex").toUpperCase();

/** PayHere wants two decimals, a dot, and no thousands separator. */
export const formatAmount = (amount: number) => amount.toFixed(2);

export function checkoutHash(
  merchantId: string,
  merchantSecret: string,
  orderId: string,
  amount: string,
  currency: string,
) {
  return md5Upper(
    merchantId + orderId + amount + currency + md5Upper(merchantSecret),
  );
}

export type PayhereNotification = {
  merchant_id: string;
  order_id: string;
  payment_id: string;
  payhere_amount: string;
  payhere_currency: string;
  status_code: string;
  md5sig: string;
  method?: string;
  status_message?: string;
};

export function isValidNotification(
  n: PayhereNotification,
  merchantId: string,
  merchantSecret: string,
) {
  if (n.merchant_id !== merchantId) return false;
  const expected = md5Upper(
    n.merchant_id +
      n.order_id +
      n.payhere_amount +
      n.payhere_currency +
      n.status_code +
      md5Upper(merchantSecret),
  );
  const a = Buffer.from(expected);
  const b = Buffer.from(n.md5sig ?? "");
  return a.length === b.length && timingSafeEqual(a, b);
}
