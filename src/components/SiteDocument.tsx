/* eslint-disable @next/next/no-head-element -- This shared shell is the root document for both App Router layouts and the global 404. */
import type { ReactNode } from "react";
import type { Content } from "@/i18n/types";
import { SiteFooter } from "./SiteFooter";
import { MotionObserver } from "./MotionObserver";
import { SiteHeader } from "./SiteHeader";
import { themeInitScript } from "@/lib/theme-script";
import { geistMono, geistSans } from "@/app/fonts";
import "@/app/globals.css";

export function SiteDocument({ children, content }: { children: ReactNode; content: Content }) {
  const { ui, locale, profile } = content;
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only rounded-lg bg-accent px-4 py-3 text-sm font-medium text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
        >
          {ui.skip}
        </a>
        <SiteHeader
          ui={ui}
          locale={locale}
          name={profile.name}
          resumePdf={profile.resume.pdf}
          github={profile.contact.github}
          linkedin={profile.contact.linkedin}
          mailto={`mailto:${profile.contact.email}`}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter content={content} />
        <MotionObserver />
      </body>
    </html>
  );
}
