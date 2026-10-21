import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import { Container, PageHeader, delay, tintAt } from "@/components/ui";
import { mailto, profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Jia Li, senior data engineer, by email, LinkedIn or GitHub.",
  alternates: { canonical: "/contact/" },
  openGraph: { url: "/contact/" },
};

function ContactCard({
  href,
  icon,
  title,
  detail,
  index,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  detail: string;
  index: number;
}) {
  const tint = tintAt(index);
  return (
    <a
      href={href}
      className={`reveal lift group flex h-full min-h-[148px] flex-col justify-between gap-6 rounded-2xl border border-transparent p-5 sm:p-6 ${tint.bg}`}
      style={delay(index * 90)}
    >
      <span className="flex items-center justify-between">
        <span className={`inline-flex size-11 items-center justify-center rounded-full bg-surface ${tint.ink}`}>
          {icon}
        </span>
        <ArrowUpRightIcon className="text-fg-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-sm text-fg-2">{detail}</span>
      </span>
    </a>
  );
}

export default function ContactPage() {
  const linkedinHandle = new URL(profile.contact.linkedin).pathname.replace(/^\/|\/$/g, "");
  const languages = profile.languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(", ");

  return (
    <>
      <PageHeader eyebrow="05 / Contact" title="Get in touch">
        <p className="max-w-[60ch] text-base leading-relaxed text-fg-2 sm:text-[17px]">
          {profile.status}. Based in {profile.location}, and {profile.availability.toLowerCase()}.
        </p>
      </PageHeader>

      <Container className="pb-16 lg:pb-24">
        <ul className="grid gap-4 md:grid-cols-3">
          <li>
            <ContactCard index={0} href={mailto} icon={<MailIcon size={20} />} title="Email" detail="Send me an email" />
          </li>
          <li>
            <ContactCard
              index={1}
              href={profile.contact.linkedin}
              icon={<LinkedInIcon size={20} />}
              title="LinkedIn"
              detail={linkedinHandle}
            />
          </li>
          <li>
            <ContactCard
              index={2}
              href={profile.contact.github}
              icon={<GitHubIcon size={20} />}
              title="GitHub"
              detail={`@${profile.contact.githubUsername}`}
            />
          </li>
        </ul>
        <p className="mt-8 text-sm text-fg-3">Working languages: {languages}.</p>
      </Container>
    </>
  );
}
