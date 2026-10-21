import { formatBytes, formatShare } from "@/lib/format";
import type { LanguageSlice } from "@/lib/github";
import { LanguageBar } from "./LanguageBar";
import { swatchClass } from "./RepoCard";

/** Language share as one 100%-stacked bar, with a table that doubles as legend and data view. */
export function LanguageBreakdown({ slices }: { slices: LanguageSlice[] }) {
  const summary = slices.map((slice) => `${slice.name} ${formatShare(slice.share)}`).join(", ");

  return (
    <div className="flex flex-col gap-5">
      <div role="img" aria-label={`Language share by bytes: ${summary}`}>
        <LanguageBar slices={slices} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[300px] border-collapse text-sm">
          <caption className="sr-only">Language share by bytes across showcased repositories</caption>
          <thead>
            <tr className="font-mono text-[11px] tracking-[0.06em] text-fg-3 uppercase">
              <th scope="col" className="pb-2.5 text-left font-medium">
                Language
              </th>
              <th scope="col" className="pb-2.5 text-right font-medium">
                Share
              </th>
              <th scope="col" className="pb-2.5 text-right font-medium">
                Size
              </th>
            </tr>
          </thead>
          <tbody>
            {slices.map((slice) => (
              <tr key={slice.name} className="border-t border-line">
                <th scope="row" className="py-2.5 pr-3 text-left font-normal">
                  <span className="inline-flex items-center gap-2">
                    <span className={`size-2.5 shrink-0 rounded-sm ${swatchClass[slice.color]}`} aria-hidden="true" />
                    <span>
                      {slice.name}
                      {slice.members && <span className="text-fg-3"> · {slice.members.join(", ")}</span>}
                    </span>
                  </span>
                </th>
                <td className="py-2.5 text-right tabular-nums">{formatShare(slice.share)}</td>
                <td className="py-2.5 pl-3 text-right text-fg-2 tabular-nums">{formatBytes(slice.bytes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
