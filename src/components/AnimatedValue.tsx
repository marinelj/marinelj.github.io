import type { CSSProperties } from "react";

/**
 * Shows a stat like "10M+" whose digits count up from zero. Screen readers and search
 * engines get the plain value; non-numeric values ("Python") render as they are.
 */
export function AnimatedValue({ value, delay = 0 }: { value: string; delay?: number }) {
  const match = /^(\D*)(\d+)(\D*)$/.exec(value);
  if (!match) return <>{value}</>;
  const [, prefix, digits, suffix] = match;
  const style = {
    "--to": Number(digits),
    "--w": `${digits.length}ch`,
    "--d": `${delay}ms`,
  } as CSSProperties;
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">
        {prefix}
        <span className="countup" style={style} />
        {suffix}
      </span>
    </>
  );
}
