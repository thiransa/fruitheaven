// Wholesale prices are per box, in LKR. Update PRICES_UPDATED whenever they change.
// `retail` is the shop price for the same fruit; leave it out to show "Price coming soon".
export const PRICES_UPDATED = "30 October 2026";

export type WholesaleItem = {
  name: string;
  /** Box contents — piece count and/or weight. Leave out until known. */
  box?: string;
  /** Leave out until known; the card then shows "Price coming soon". */
  price?: number;
  /** Upper bound when a fruit comes in several grades at different prices. */
  priceTo?: number;
  note?: string;
  /** Out of stock: the card shows a badge and hides the order button. */
  unavailable?: boolean;
  /** First photo is the cover; more photos make the card swipeable. */
  images: string[];
  /** Shop price. `name` tells apart two box sizes of the same fruit. */
  retail?: { price: number; unit: string; name?: string };
};

export type WholesaleCategory = {
  title: string;
  items: WholesaleItem[];
};

const crispyAppleImages = [
  "/images/wholesale/crispy-apple-1.jpg",
  "/images/wholesale/crispy-apple-box.jpg",
  "/images/wholesale/crispy-apple-3.jpg",
  "/images/wholesale/crispy-apple-4.jpg",
];

export const wholesale: WholesaleCategory[] = [
  {
    title: "Apples",
    items: [
      {
        name: "Good Farm Fuji Apple",
        box: "125 pcs",
        price: 24000,
        images: ["/images/wholesale/good-farm-fuji-2.jpg"],
        retail: { price: 230, unit: "1 apple" },
      },
      {
        name: "China Red Delicious Apple",
        box: "125–150 pcs",
        price: 18000,
        images: [1, 2].map((n) => `/images/wholesale/red-delicious-${n}.jpg`),
        retail: { price: 160, unit: "1 apple" },
      },
      {
        name: "Green Apple (South Africa)",
        box: "135 pcs",
        price: 26000,
        images: [1, 2, 3].map(
          (n) => `/images/wholesale/green-apple-sa-${n}.jpg`,
        ),
        retail: { price: 220, unit: "1 apple" },
      },
      {
        name: "Cherry Apple (Red)",
        box: "8 pcs (4 kg)",
        price: 5500,
        // Crates first, then the open pack.
        images: [1, 7, 2, 3, 4, 5, 6].map(
          (n) => `/images/wholesale/cherry-apple-${n}.jpg`,
        ),
        retail: { price: 1650, unit: "1 kg" },
      },
      {
        name: "USA Apple (Red)",
        box: "125 pcs",
        price: 28000,
        // Close-up first.
        images: [3, 1, 2].map((n) => `/images/wholesale/usa-apple-${n}.jpg`),
        retail: { price: 250, unit: "1 apple" },
      },
      {
        name: "Crispy Apple",
        box: "135–150 pcs (18 kg)",
        price: 25000,
        images: crispyAppleImages,
        retail: { price: 200, unit: "1 apple", name: "Crispy Apple (Big)" },
      },
      {
        name: "Crispy Apple",
        box: "252 pcs (21 kg)",
        price: 27500,
        images: [1, 2, 3].map(
          (n) => `/images/wholesale/crispy-apple-252-${n}.jpg`,
        ),
        retail: { price: 130, unit: "1 apple", name: "Crispy Apple (Small)" },
      },
      {
        name: "China Green Apple",
        box: "128–135 pcs",
        price: 21000,
        images: [
          "/images/wholesale/green-apple-box.jpg",
          "/images/wholesale/green-apple-close.jpg",
        ],
        retail: { price: 200, unit: "1 apple" },
      },
      {
        name: "South Africa Royal Gala Apple",
        box: "198–216 pcs",
        price: 24500,
        images: [1, 2].map((n) => `/images/wholesale/royal-gala-${n}.jpg`),
        retail: { price: 150, unit: "1 apple" },
      },
      {
        name: "South African Beauty Gala Apple",
        box: "135+ pcs",
        price: 24000,
        images: [1, 2].map((n) => `/images/wholesale/beauty-gala-${n}.jpg`),
        retail: { price: 190, unit: "1 apple" },
      },
      {
        name: "Flash Gala Apple",
        box: "180+ pcs",
        price: 20000,
        images: [1, 2, 3, 4].map(
          (n) => `/images/wholesale/flash-gala-${n}.jpg`,
        ),
        retail: { price: 140, unit: "1 apple" },
      },
      {
        name: "Fuji Apple (China)",
        box: "128–135 pcs",
        price: 20000,
        images: ["/images/wholesale/fuji-apple-china.jpg"],
        retail: { price: 200, unit: "1 apple" },
      },
      {
        name: "Bola New Apple",
        box: "125, 135 or 198 pcs",
        price: 22000,
        images: [1, 2].map((n) => `/images/wholesale/bola-new-apple-${n}.jpg`),
        retail: { price: 150, unit: "1 apple" },
      },
    ],
  },
  {
    title: "Oranges & Mandarins",
    items: [
      {
        name: "South Africa Orange",
        box: "72–88 pcs",
        price: 16500,
        images: [1, 2, 3].map((n) => `/images/wholesale/sa-orange-${n}.jpg`),
        retail: { price: 220, unit: "1 orange" },
      },
      {
        name: "Australian Orange",
        box: "113–125 pcs",
        price: 21000,
        // Open box is the cover.
        images: [5, 3, 1, 2, 4].map(
          (n) => `/images/wholesale/australian-orange-${n}.jpg`,
        ),
        retail: { price: 220, unit: "1 orange" },
      },
      {
        name: "South African Mandarin",
        box: "10 kg",
        price: 10000,
        images: ["/images/wholesale/south-african-mandarin.jpg"],
        retail: { price: 1200, unit: "1 kg" },
      },
      {
        name: "Australian Mandarin",
        box: "15 kg",
        price: 19000,
        images: [
          "/images/wholesale/australian-mandarin-15kg-3.jpg",
          "/images/wholesale/australian-mandarin-15kg-2.jpg",
          "/images/wholesale/australian-mandarin-15kg-1-zoom.jpg",
        ],
        retail: {
          price: 1600,
          unit: "1 kg",
          name: "Australian Mandarin (15 kg)",
        },
      },
      {
        name: "Australian Mandarin",
        box: "9 kg",
        price: 9000,
        // Full box is the cover.
        images: [3, 1, 2].map(
          (n) => `/images/wholesale/australian-mandarin-9kg-${n}.jpg`,
        ),
        retail: {
          price: 1200,
          unit: "1 kg",
          name: "Australian Mandarin (9 kg)",
        },
      },
      {
        name: "Australian Vitore Mandarin",
        box: "7.5 kg",
        price: 8500,
        images: ["/images/wholesale/australian-vitore-mandarin.jpg"],
        retail: { price: 1400, unit: "1 kg" },
      },
      {
        name: "China Mandarin",
        box: "9 kg",
        price: 7500,
        images: [1, 2].map((n) => `/images/wholesale/china-mandarin-${n}.jpg`),
        retail: { price: 1000, unit: "1 kg" },
      },
      {
        name: "China Baby Mandarin",
        box: "7 kg",
        price: 7500,
        images: [1, 2, 3].map(
          (n) => `/images/wholesale/china-baby-mandarin-${n}.jpg`,
        ),
        retail: { price: 700, unit: "1 bag" },
      },
      {
        name: "China Orange",
        box: "88 pcs",
        price: 14000,
        unavailable: true,
        images: [1, 2, 3].map((n) => `/images/wholesale/china-orange-${n}.jpg`),
      },
    ],
  },
  {
    title: "Grapes",
    items: [
      {
        name: "China Red Grapes",
        box: "6 kg",
        price: 6500,
        priceTo: 7500,
        note: "3 grades",
        images: [1, 2, 3, 4, 5].map(
          (n) => `/images/wholesale/red-grapes-${n}.jpg`,
        ),
        retail: { price: 1600, unit: "1 kg" },
      },
      {
        name: "China Green Grapes",
        box: "5 kg",
        price: 8500,
        images: [1, 2, 3, 4, 5, 6].map(
          (n) => `/images/wholesale/green-grapes-${n}.jpg`,
        ),
        retail: { price: 2200, unit: "1 kg" },
      },
      {
        name: "China Black Grapes",
        box: "5 kg",
        price: 9000,
        // Tray photo is the cover.
        images: [3, 1, 2, 4].map(
          (n) => `/images/wholesale/black-grapes-${n}.jpg`,
        ),
        retail: { price: 2300, unit: "1 kg" },
      },
      {
        name: "USA Red Grapes",
        box: "9 kg",
        price: 16000,
        images: [1, 2].map((n) => `/images/wholesale/usa-red-grapes-${n}.jpg`),
        retail: { price: 2200, unit: "1 kg" },
      },
      {
        name: "Australian Red Grapes",
        box: "9 kg",
        price: 15000,
        images: [1, 2].map(
          (n) => `/images/wholesale/australian-red-grapes-${n}.jpg`,
        ),
        retail: { price: 2000, unit: "1 kg" },
      },
      {
        name: "Jaffna Grapes (Black)",
        box: "7 kg",
        price: 5500,
        images: ["/images/wholesale/jaffna-grapes-black.jpg"],
        retail: { price: 1000, unit: "1 kg" },
      },
    ],
  },
  {
    title: "Pomegranates",
    items: [
      {
        name: "Egypt Pomegranate",
        box: "4 kg (12–15 pcs)",
        price: 6500,
        images: [1, 2].map(
          (n) => `/images/wholesale/egypt-pomegranate-${n}.jpg`,
        ),
        retail: { price: 650, unit: "1 pc" },
      },
      {
        name: "China Pomegranate",
        box: "12 kg",
        price: 14000,
        // Photo 2 is the cover.
        images: [2, 1, 3, 4].map(
          (n) => `/images/wholesale/china-pomegranate-${n}.jpg`,
        ),
        retail: { price: 1400, unit: "1 kg" },
      },
      {
        name: "Indian Pomegranate",
        box: "14 pcs",
        price: 7500,
        images: [1, 2, 3].map(
          (n) => `/images/wholesale/indian-pomegranate-${n}.jpg`,
        ),
        retail: { price: 650, unit: "1 pc" },
      },
    ],
  },
  {
    title: "Berries & More",
    items: [
      {
        name: "Sweet Plums",
        box: "2 kg",
        price: 4000,
        images: [1, 2, 3, 4].map((n) => `/images/wholesale/plums-${n}.jpg`),
        retail: { price: 2400, unit: "1 kg" },
      },
      {
        name: "China Sour Plums",
        box: "2.5 kg",
        price: 5000,
        images: [1, 2, 3].map(
          (n) => `/images/wholesale/china-sour-plums-${n}.jpg`,
        ),
        retail: { price: 2000, unit: "1 kg" },
      },
      {
        name: "Kiwi",
        box: "2.5 kg",
        price: 4500,
        images: [1, 2, 3].map((n) => `/images/wholesale/kiwi-${n}.jpg`),
        retail: { price: 2200, unit: "1 kg" },
      },
      {
        name: "Blueberry",
        box: "1.5 kg",
        price: 14500,
        // Open punnet is the cover.
        images: [2, 1].map((n) => `/images/wholesale/blueberry-${n}.jpg`),
        retail: { price: 1500, unit: "1 box" },
      },
      {
        name: "Strawberry",
        box: "250 g",
        price: 1400,
        // Zoomed-in punnet with the label is the cover.
        images: [
          "/images/wholesale/strawberry-1-zoom.jpg",
          "/images/wholesale/strawberry-2.jpg",
        ],
        retail: { price: 1400, unit: "1 box" },
      },
      {
        name: "Dates",
        box: "5 kg",
        price: 7000,
        images: [1, 2, 3].map((n) => `/images/wholesale/dates-${n}.jpg`),
        retail: { price: 450, unit: "250 g" },
      },
    ],
  },
  {
    title: "Pears",
    items: [
      {
        name: "Golden Pears",
        box: "8.5 kg",
        price: 8500,
        images: [1, 2, 3].map((n) => `/images/wholesale/golden-pears-${n}.jpg`),
        retail: { price: 260, unit: "1 pc" },
      },
      {
        name: "Ya Pears",
        box: "40 pcs",
        price: 7500,
        images: [1, 2].map((n) => `/images/wholesale/ya-pears-${n}.jpg`),
        retail: { price: 230, unit: "1 pc" },
      },
      {
        name: "Green Pears",
        box: "8.5 kg",
        price: 8500,
        images: ["/images/wholesale/green-pears-1.jpg"],
        retail: { price: 1200, unit: "1 kg" },
      },
      {
        name: "South African Pears",
        box: "8 kg",
        price: 9500,
        // Tru-Cape box is the cover.
        images: [3, 1, 2, 4, 5, 6].map(
          (n) => `/images/wholesale/sa-pears-${n}.jpg`,
        ),
        retail: { price: 1450, unit: "1 kg" },
      },
      {
        name: "Butter Pear",
        box: "36–40 pcs",
        price: 8500,
        images: ["/images/wholesale/butter-pear.jpg"],
        retail: { price: 280, unit: "1 pc" },
      },
    ],
  },
];
