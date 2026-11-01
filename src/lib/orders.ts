import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

// A small JSON-file order store so checkout works end to end on one server.
// Serverless hosts (e.g. Vercel) have no persistent disk: swap these functions
// for a real database before deploying there.

export type OrderStatus =
  | "pending"
  | "paid"
  | "canceled"
  | "failed"
  | "chargedback";

export type OrderLine = {
  id: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
};

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: OrderStatus;
  currency: string;
  total: number;
  lines: OrderLine[];
  customer: Customer;
  payment?: { paymentId: string; method?: string; message?: string };
};

const FILE = path.join(
  process.env.ORDERS_DIR ?? path.join(process.cwd(), "data"),
  "orders.json",
);

async function readAll(): Promise<Record<string, Order>> {
  try {
    return JSON.parse(await readFile(FILE, "utf8"));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw err;
  }
}

// Serialise writes so concurrent requests can't clobber each other.
let queue: Promise<unknown> = Promise.resolve();

function mutate<T>(fn: (orders: Record<string, Order>) => T): Promise<T> {
  const run = queue.then(async () => {
    const orders = await readAll();
    const result = fn(orders);
    await mkdir(path.dirname(FILE), { recursive: true });
    const tmp = `${FILE}.tmp`;
    await writeFile(tmp, JSON.stringify(orders, null, 2));
    await rename(tmp, FILE);
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

export async function getOrder(id: string) {
  return (await readAll())[id];
}

export function createOrder(order: Order) {
  return mutate((orders) => {
    orders[order.id] = order;
  });
}

export function updateOrder(id: string, patch: Partial<Order>) {
  return mutate((orders) => {
    const existing = orders[id];
    if (!existing) return undefined;
    orders[id] = { ...existing, ...patch, updatedAt: new Date().toISOString() };
    return orders[id];
  });
}
