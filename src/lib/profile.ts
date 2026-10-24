import data from "@/data/profile.json";

export type Highlight = { title: string; text: string };

export type Role = {
  title: string;
  level?: string;
  team: string;
  start: string;
  end: string | null;
  summary: string;
  highlights: Highlight[];
};

export type Job = {
  company: string;
  start: string;
  end: string | null;
  location: string;
  roles: Role[];
};

export type Profile = {
  name: string;
  aka: string;
  headline: string;
  focus: string[];
  location: string;
  availability: string;
  status: string;
  bio: string;
  /** `icon` picks the tile's icon: "orders", "events", "record" or "team". */
  metrics: { value: string; icon: string; label: string; source: string }[];
  contact: { email: string; github: string; githubUsername: string; linkedin: string };
  experience: Job[];
  education: { school: string; degree: string }[];
  skills: { category: string; items: string[] }[];
  languages: { name: string; level: string; note?: string }[];
  certifications: string[];
  awards: { title: string; org: string; year?: number; detail: string }[];
  patents: { title: string; detail: string }[];
  publications: { title: string; venue: string; year: number }[];
  memberships: string[];
  resume: { pdf: string; updated: string };
};

export const profile: Profile = data;

export const mailto = `mailto:${profile.contact.email}`;
