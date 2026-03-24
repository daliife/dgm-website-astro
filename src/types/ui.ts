// UI Component Types
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "simple"
  | "icon";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

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

// Timeline Types
export interface TimelineItem {
  startDate?: string;
  endDate?: string;
  title: string;
  description?: string;
  link?: string;
  company?: string;
  highlights?: string[];
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  githubUrl?: string;
  image?: string;
  technologies: string[];
  featured?: boolean;
}

// Navigation Types
export type NavLink = "about" | "projects" | "work" | "contact";

// Social Network Types
export type SocialNetwork = "Linkedin" | "Github" | "Email";

export interface SocialProfile {
  network: SocialNetwork;
  url: string;
}

// Typography Types
export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";
export type TypographyColor = "primary" | "secondary" | "muted" | "accent";
export type TypographyWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold";
export type TypographyAlign = "left" | "center" | "right" | "justify";

// Layout Types
export type ContainerType = "narrow" | "medium" | "wide" | "full";
export type SectionSpacing = "sm" | "md" | "lg" | "xl";
