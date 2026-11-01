import type { Metadata } from "next";
import {
  Allura,
  IBM_Plex_Mono,
  Marcellus,
  Outfit,
  Shadows_Into_Light,
} from "next/font/google";
import "./globals.css";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});
const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});
const shadows = Shadows_Into_Light({
  variable: "--font-shadows",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Fruit Heaven — Heaven in Every Bite",
  description:
    "Premium imported and fresh local fruits, delivered to your door.",
  icons: { icon: "/images/logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${plexMono.variable} ${marcellus.variable} ${allura.variable} ${shadows.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
