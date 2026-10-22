import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { MotionObserver } from "@/components/MotionObserver";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/config/site";
import { mailto, profile } from "@/lib/profile";
import { story } from "@/lib/story";
import { themeInitScript } from "@/lib/theme-script";
import { geistMono, geistSans } from "./fonts";
import "./globals.css";

const defaultTitle = `${profile.name} — ${story.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: profile.name, url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: defaultTitle,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: SITE_DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#fafaff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
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
          Skip to content
        </a>
        <SiteHeader
          resumePdf={profile.resume.pdf}
          github={profile.contact.github}
          linkedin={profile.contact.linkedin}
          mailto={mailto}
        />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MotionObserver />
      </body>
    </html>
  );
}
