export type ButtonVariant = "primary" | "outline" | "ghost" | "simple";
export type ButtonSize = "sm" | "md" | "none";

export type NavLink = "about" | "projects" | "experience" | "contact";

export type SocialNetwork = "Linkedin" | "Github" | "Email";

export interface SocialProfile {
  network: SocialNetwork;
  url: string;
  username?: string;
}

export interface WorkEntry {
  company: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
  /** Square logo under `public/logos/` (falls back to company initials). */
  logo?: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  /** Longer copy for the project detail page (falls back to description). */
  longDescription?: string;
  url?: string;
  githubUrl?: string;
  image?: string;
  imageSource?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  category?: "professional" | "personal" | "academic";
  /** Bullet points for the project detail page. */
  highlights?: string[];
  /** Shown in the home "selected work" strip. */
  featured?: boolean;
}

export interface SkillEntry {
  name: string;
  level: string;
  keywords: string[];
}

export interface EducationEntry {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  /** Square logo under `public/logos/` (falls back to institution initials). */
  logo?: string;
}

export interface CertificateEntry {
  name: string;
  issuer: string;
  url?: string;
}

export interface LanguageEntry {
  language: string;
  fluency: string;
}
