import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import credits from "@/lib/photo-credits.json";

export const metadata: Metadata = {
  title: "Photo Credits — Fruit Heaven",
};

// Wholesale fruit photos come from Wikimedia Commons; their licences require
// credit. Each image was cropped to a square, which counts as a modification.
const licenseUrl = (license: string) => {
  const m = license.match(/^CC (BY(?:-SA)?) (\d\.\d)/i);
  if (m) return `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/`;
  if (/^CC0/i.test(license)) return "https://creativecommons.org/publicdomain/zero/1.0/";
  return undefined;
};

export default function CreditsPage() {
  return (
    <>
      <Navbar solid />
      <main className="mx-auto max-w-[1000px] px-6 pb-16 pt-24 md:pb-24 md:pt-28">
        <h1 className="font-hand text-5xl md:text-7xl">Photo Credits</h1>
        <p className="mt-3 max-w-2xl text-white/75">
          Fruit photos on our wholesale page are from{" "}
          <a
            href="https://commons.wikimedia.org"
            className="text-lilac hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Wikimedia Commons
          </a>
          , cropped to fit. Thank you to the photographers below.
        </p>

        <ul className="mt-8 divide-y divide-white/10">
          {credits.map((c) => {
            const url = licenseUrl(c.license);
            return (
              <li key={c.image} className="flex items-center gap-4 py-3">
                <Image
                  src={c.image}
                  alt=""
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0 text-sm">
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block truncate hover:text-lilac hover:underline"
                  >
                    {c.title}
                  </a>
                  <p className="text-white/60">
                    by {c.author} ·{" "}
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lilac hover:underline"
                      >
                        {c.license}
                      </a>
                    ) : (
                      c.license
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <Footer />
    </>
  );
}
