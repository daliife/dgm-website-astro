import { getStoredLang } from "./i18n-client";

const UMAMI_SRC = "https://cloud.umami.is/script.js";
const UMAMI_WEBSITE_ID = "308bb911-c6d0-467c-8b4c-8e0a4ddf6294";
const UMAMI_DOMAINS = "davidgimeno.cat";

/** UI language + theme. Fired on consent load and when the user changes either. */
export const SESSION_PREFERENCES_EVENT = "session-preferences";
const SESSION_PREFERENCES_KEY = "umami-session-preferences";
const UMAMI_READY_TIMEOUT_MS = 10_000;

export type ThemePreference = "dark" | "light";
export type PreferenceSource = "initial" | "change";

export type SessionPreferences = {
  language: string;
  theme: ThemePreference;
  source: PreferenceSource;
};

type UmamiTracker = {
  track: (
    eventName: string,
    eventData?: Record<string, string | number | boolean>,
  ) => void | Promise<string>;
};

type GlobalWithUmami = typeof globalThis & { umami?: UmamiTracker };

function getUmami(): UmamiTracker | undefined {
  return (globalThis as GlobalWithUmami).umami;
}

export function getThemePreference(): ThemePreference {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function getSessionPreferences(
  source: PreferenceSource,
): SessionPreferences {
  return {
    language: getStoredLang(),
    theme: getThemePreference(),
    source,
  };
}

function whenUmamiReady(callback: (umami: UmamiTracker) => void): void {
  const ready = getUmami();
  if (ready) {
    callback(ready);
    return;
  }

  const startedAt = Date.now();
  const timer = setInterval(() => {
    const umami = getUmami();
    if (umami) {
      clearInterval(timer);
      callback(umami);
      return;
    }
    if (Date.now() - startedAt >= UMAMI_READY_TIMEOUT_MS) {
      clearInterval(timer);
    }
  }, 50);
}

function sendSessionPreferences(source: PreferenceSource): void {
  whenUmamiReady((umami) => {
    void umami.track(SESSION_PREFERENCES_EVENT, getSessionPreferences(source));
  });
}

/**
 * Sends UI language + theme once after consent / Umami load.
 * Deduped so SPA navigations do not re-fire the initial snapshot.
 */
export function trackSessionPreferences(): void {
  if (typeof sessionStorage === "undefined") return;
  if (sessionStorage.getItem(SESSION_PREFERENCES_KEY) === "1") return;

  whenUmamiReady((umami) => {
    if (sessionStorage.getItem(SESSION_PREFERENCES_KEY) === "1") return;
    void umami.track(
      SESSION_PREFERENCES_EVENT,
      getSessionPreferences("initial"),
    );
    sessionStorage.setItem(SESSION_PREFERENCES_KEY, "1");
  });
}

/** Sends current UI language + theme after the user changes either. */
export function trackSessionPreferenceChange(): void {
  sendSessionPreferences("change");
}

export function loadUmamiAnalytics() {
  if (typeof document === "undefined") return;
  if (document.querySelector("[data-umami-script]")) {
    trackSessionPreferences();
    return;
  }

  const script = document.createElement("script");
  script.defer = true;
  script.src = UMAMI_SRC;
  script.dataset.websiteId = UMAMI_WEBSITE_ID;
  script.dataset.domains = UMAMI_DOMAINS;
  script.setAttribute("data-umami-script", "");
  script.addEventListener("load", () => {
    trackSessionPreferences();
  });
  document.head.appendChild(script);
}
