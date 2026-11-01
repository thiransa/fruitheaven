import { z } from "zod";

// PayHere rejects payloads containing emojis or markup, so keep text fields plain.
const plain = (label: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(max)
    .regex(/^[^<>\p{Extended_Pictographic}]*$/u, `${label} contains unsupported characters`);

export const customerSchema = z.object({
  firstName: plain("First name", 50),
  lastName: plain("Last name", 50),
  email: z.string().trim().email("Enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ]{9,15}$/, "Enter a valid phone number"),
  address: plain("Address", 200),
  city: plain("City", 50),
  notes: z
    .string()
    .trim()
    .max(300)
    .regex(/^[^<>\p{Extended_Pictographic}]*$/u, "Notes contain unsupported characters")
    .optional(),
});

export const checkoutSchema = z.object({
  customer: customerSchema,
  items: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1, "Your basket is empty"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CustomerInput = z.infer<typeof customerSchema>;

export type CheckoutResponse =
  | { ok: true; action: string; fields: Record<string, string> }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };
