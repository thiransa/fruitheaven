import { wholesale } from "./wholesale";

export type Origin = "imported" | "local" | "basket";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  origin: Origin;
  image: string;
};

/** A fruit as listed in the shop; price and unit stay empty until retail prices are set. */
export type Listing = Omit<Product, "price" | "unit"> & {
  price?: number;
  unit?: string;
};

export const hasPrice = (l: Listing): l is Product =>
  l.price !== undefined && l.unit !== undefined;

export const CURRENCY = "LKR";

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const baskets: Product[] = [
  {
    id: "mixed-basket",
    name: "Heaven Fruit Basket",
    description: "A curated mix of the season's best.",
    price: 8500,
    unit: "basket",
    origin: "basket",
    image: "/images/products/mixed.jpg",
  },
  {
    id: "signature-basket",
    name: "Signature Basket",
    description:
      "Red apples, Shine Muscat grapes and mandarins, beautifully wrapped.",
    price: 12500,
    unit: "basket",
    origin: "basket",
    image: "/images/products/basket-gift.jpg",
  },
  {
    id: "classic-basket",
    name: "Classic Basket",
    description: "Red grapes, oranges and pomegranate for any occasion.",
    price: 9500,
    unit: "basket",
    origin: "basket",
    image: "/images/products/basket-classic.jpg",
  },
  {
    id: "imported-basket",
    name: "Imported Luxury Basket",
    description: "Our finest imported fruits in one premium hamper.",
    price: 18500,
    unit: "basket",
    origin: "basket",
    image: "/images/products/basket-imported.jpg",
  },
];

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// The shop lists the same fruits as the wholesale page. Retail prices live on
// each wholesale item (`retail`); fruits without one show "Price coming soon".
export const retail: Listing[] = wholesale
  .flatMap((category) =>
    category.items.map((item) => {
      const name = item.retail?.name ?? item.name;
      return {
        id: slug(name),
        name,
        description: category.title,
        origin: /jaffna/i.test(item.name) ? "local" : "imported",
        image: item.images[0],
        price: item.retail?.price,
        unit: item.retail?.unit,
      } satisfies Listing;
    }),
  )
  .filter((l, i, all) => all.findIndex((x) => x.id === l.id) === i);

// Only priced fruits can be ordered. Baskets are "coming soon" — add
// ...baskets here once they can be ordered.
export const allProducts: Product[] = retail.filter(hasPrice);
