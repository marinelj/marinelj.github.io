import { Fragment } from "react";

/** Runs of Chinese characters and CJK punctuation. */
const CHINESE = /([　-〿㐀-鿿＀-￯]+)/;

/**
 * Text that mixes English and Chinese. Each Chinese run gets lang="zh-CN", so it
 * renders in a Chinese font and screen readers switch voice for it.
 */
export function MixedText({ text }: { text: string }) {
  return text.split(CHINESE).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} lang="zh-CN">
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
