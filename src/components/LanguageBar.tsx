"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { LanguageSlice } from "@/lib/github";
import { swatchClass } from "./RepoCard";
import { BAR_HEIGHT, MIN_VISIBLE_SHARE } from "./languageBarSpec";

type ChartProps = { slices: LanguageSlice[]; otherLabel: string };

/** The same bar in plain HTML: rendered at build time and shown until the chart loads. */
function StaticBar({ slices }: ChartProps) {
  return (
    <div className="flex gap-0.5 overflow-hidden rounded" style={{ height: BAR_HEIGHT }}>
      {slices
        .filter((slice) => slice.share >= MIN_VISIBLE_SHARE)
        .map((slice) => (
          <span key={slice.name} className={swatchClass[slice.color]} style={{ flex: `${slice.share} 1 0` }} />
        ))}
    </div>
  );
}

/**
 * Loads the interactive Recharts version after the page is up, so the chart library
 * never delays the first paint on slow connections.
 */
export function LanguageBar({ slices, otherLabel }: ChartProps) {
  const [Chart, setChart] = useState<ComponentType<ChartProps> | null>(null);

  useEffect(() => {
    let active = true;
    import("./LanguageBarChart").then((module) => {
      if (active) setChart(() => module.LanguageBarChart);
    });
    return () => {
      active = false;
    };
  }, []);

  return Chart ? <Chart slices={slices} otherLabel={otherLabel} /> : <StaticBar slices={slices} otherLabel={otherLabel} />;
}
