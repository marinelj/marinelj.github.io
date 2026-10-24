import { formatDate } from "@/lib/format";
import { github } from "@/lib/github";
import type { Content } from "@/i18n/types";
import { GitHubIcon, LinkedInIcon } from "./Icons";

const iconLink =
  "inline-flex size-11 items-center justify-center rounded-[10px] border border-line text-fg transition-colors hover:bg-surface-2";

export function SiteFooter({ content }: { content: Content }) {
  const { profile, ui, locale } = content;
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 pt-6 pb-8 sm:px-6 lg:px-8">
        <p className="font-mono text-xs text-fg-3">
          © {new Date().getUTCFullYear()} {profile.name} · {ui.footerMotto} · {ui.refreshed}{" "}
          {formatDate(github.generatedAt, locale)}
        </p>
        <ul className="flex gap-2.5">
          <li>
            <a href={profile.contact.linkedin} aria-label="LinkedIn" className={iconLink}>
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href={profile.contact.github} aria-label="GitHub" className={iconLink}>
              <GitHubIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
