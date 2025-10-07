// Button Style Utilities
export const getButtonVariantClasses = (variant: string) => {
  switch (variant) {
    case "primary":
      return "bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 text-text-primary hover:bg-white/25 dark:hover:bg-white/15 hover:border-white/40 dark:hover:border-white/30 shadow-lg hover:shadow-xl hover:shadow-primary-500/10 focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2";
    case "secondary":
      return "bg-white/10 dark:bg-white/8 backdrop-blur-md border border-white/20 dark:border-white/15 text-text-primary hover:bg-white/20 dark:hover:bg-white/12 hover:border-white/30 dark:hover:border-white/25 shadow-md hover:shadow-lg hover:shadow-primary-500/5 focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2";
    case "outline":
      return "bg-white/8 dark:bg-white/6 backdrop-blur-md border border-primary-500/40 dark:border-primary-400/40 text-text-primary hover:bg-white/15 dark:hover:bg-white/10 hover:border-primary-500/60 dark:hover:border-primary-400/60 shadow-sm hover:shadow-md hover:shadow-primary-500/5 focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2";
    case "ghost":
      return "bg-white/8 dark:bg-white/6 backdrop-blur-md border border-transparent text-text-primary hover:bg-white/15 dark:hover:bg-white/10 hover:border-white/20 dark:hover:border-white/15 shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2";
    case "simple":
      return "bg-slate-100 dark:bg-bg-muted/30 hover:bg-slate-200 dark:hover:bg-bg-muted/50 text-text-accent hover:text-primary-600 dark:hover:text-primary-400 border border-transparent shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2";
    case "icon":
      return "text-text-muted hover:text-text-accent hover:bg-bg-muted border border-transparent shadow-none hover:shadow-sm focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2";
    default:
      return "bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/30 dark:border-white/20 text-text-primary hover:bg-white/25 dark:hover:bg-white/15 hover:border-white/40 dark:hover:border-white/30 shadow-lg hover:shadow-xl hover:shadow-primary-500/10 focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2";
  }
};

export const getButtonSizeClasses = (size: string) => {
  switch (size) {
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "md":
      return "px-4 py-2 text-base";
    case "lg":
      return "px-6 py-3 text-lg";
    case "icon":
      return "p-3 w-12 h-12";
    default:
      return "px-4 py-2 text-base";
  }
};

// Common Button Base Classes
export const BUTTON_BASE_CLASSES = [
  "inline-flex",
  "items-center",
  "justify-center",
  "gap-2",
  "font-medium",
  "rounded-xl",
  "border",
  "transition-all",
  "duration-300",
  "ease-out",
  "focus:outline-none",
  "disabled:opacity-50",
  "disabled:cursor-not-allowed",
  "disabled:transform-none",
  "hover:transform",
  "hover:-translate-y-0.5",
  "active:transform",
  "active:translate-y-0",
  "group",
  "relative",
  "overflow-hidden",
].join(" ");

// Glass Effect Variants
export const GLASS_EFFECT_VARIANTS = [
  "primary",
  "secondary",
  "outline",
  "ghost",
];

// Utility Functions
export const isGlassVariant = (variant: string): boolean => {
  return GLASS_EFFECT_VARIANTS.includes(variant);
};

export const buildButtonClasses = (
  variant: string,
  size: string,
  className: string = ""
): string => {
  return [
    BUTTON_BASE_CLASSES,
    getButtonVariantClasses(variant),
    getButtonSizeClasses(size),
    className,
  ].join(" ");
};
