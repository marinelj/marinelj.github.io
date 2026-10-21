"use client";

import {
  Bar,
  BarChart,
  BarStack,
  Tooltip,
  XAxis,
  YAxis,
  type BarShapeProps,
  type TooltipContentProps,
} from "recharts";
import { formatBytes, formatShare } from "@/lib/format";
import type { LanguageSlice } from "@/lib/github";
import { swatchClass } from "./RepoCard";
import { BAR_HEIGHT, GAP, MIN_VISIBLE_SHARE } from "./languageBarSpec";

function Segment({ x, y, width, height, fill, gap, active }: BarShapeProps & { gap: number; active?: boolean }) {
  return (
    <rect
      x={x}
      y={y}
      width={Math.max(0, (width ?? 0) - gap)}
      height={height}
      fill={fill}
      opacity={active ? 0.78 : 1}
    />
  );
}

function SliceTooltip({ active, payload, slices }: TooltipContentProps & { slices: LanguageSlice[] }) {
  const slice = active ? slices.find((s) => s.name === payload?.[0]?.dataKey) : undefined;
  if (!slice) return null;
  return (
    <div className="rounded-lg border border-line bg-surface px-3 py-2 shadow-md">
      <p className="text-sm font-semibold tabular-nums">{formatShare(slice.share)}</p>
      <p className="flex items-center gap-2 text-xs text-fg-2">
        <span className={`h-0.5 w-3 rounded-full ${swatchClass[slice.color]}`} aria-hidden="true" />
        {slice.members ? `Other (${slice.members.join(", ")})` : slice.name} · {formatBytes(slice.bytes)}
      </p>
    </div>
  );
}

/** Recharts version of the bar: per-segment hover tooltips on a 100%-stacked bar. */
export function LanguageBarChart({ slices }: { slices: LanguageSlice[] }) {
  const visible = slices.filter((slice) => slice.share >= MIN_VISIBLE_SHARE);
  const row = Object.fromEntries(visible.map((slice) => [slice.name, slice.share]));

  return (
    <BarChart
      data={[row]}
      layout="vertical"
      responsive
      style={{ width: "100%", height: BAR_HEIGHT }}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      barCategoryGap={0}
      accessibilityLayer={false}
    >
      <XAxis type="number" domain={[0, 1]} hide />
      <YAxis type="category" hide />
      <Tooltip
        shared={false}
        cursor={false}
        isAnimationActive={false}
        allowEscapeViewBox={{ x: true, y: true }}
        offset={12}
        content={(props) => <SliceTooltip {...props} slices={slices} />}
      />
      <BarStack radius={4}>
        {visible.map((slice, index) => {
          const gap = index < visible.length - 1 ? GAP : 0;
          return (
            <Bar
              key={slice.name}
              dataKey={slice.name}
              fill={`var(--${slice.color})`}
              isAnimationActive={false}
              shape={(props: BarShapeProps) => <Segment {...props} gap={gap} />}
              activeBar={(props: BarShapeProps) => <Segment {...props} gap={gap} active />}
            />
          );
        })}
      </BarStack>
    </BarChart>
  );
}
