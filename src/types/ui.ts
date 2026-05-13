// UI Component Types
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "simple"
  | "icon";
export type ButtonSize = "sm" | "md" | "lg" | "icon" | "none";

// Common Props Types
export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  "aria-label"?: string;
  "aria-expanded"?: string;
  "aria-controls"?: string;
  "data-collapse-toggle"?: string;
}

export interface LinkButtonProps extends BaseButtonProps {
  href: string;
  target?: string;
  rel?: string;
  download?: string;
}

export interface ActionButtonProps extends BaseButtonProps {
  onclick?: string;
}

export type ButtonProps = LinkButtonProps & ActionButtonProps;

// Navigation Types
export type NavLink = "about" | "projects" | "work" | "contact";

// Social Network Types
export type SocialNetwork = "Linkedin" | "Github" | "Email";

export interface SocialProfile {
  network: SocialNetwork;
  url: string;
  username?: string;
}

// CV Content Types
export interface WorkEntry {
  company: string;
  position: string;
  url?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface ProjectEntry {
  name: string;
  description: string;
  url?: string;
  image?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
  category?: "professional" | "personal" | "academic";
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
}

export interface CertificateEntry {
  name: string;
  issuer: string;
}

export interface LanguageEntry {
  language: string;
  fluency: string;
}
