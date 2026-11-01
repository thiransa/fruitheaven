"use client";

import clsx from "clsx";
import type { Origin } from "@/lib/products";

const filters: { label: string; value: Origin | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Imported", value: "imported" },
  { label: "Local", value: "local" },
];

export default function FilterChips({
  value,
  onChange,
}: {
  value: Origin | "all";
  onChange: (value: Origin | "all") => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={clsx(
            "rounded-full border px-3 py-1.5 font-mono sm:px-4 text-xs uppercase tracking-wide transition",
            value === f.value
              ? "border-lilac bg-lilac text-wine-dark"
              : "border-white/30 text-white/80 hover:border-lilac hover:text-lilac",
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
