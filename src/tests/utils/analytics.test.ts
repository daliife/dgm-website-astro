import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getThemePreference,
  getSessionPreferences,
  trackSessionPreferences,
  trackSessionPreferenceChange,
  loadUmamiAnalytics,
  SESSION_PREFERENCES_EVENT,
} from "../../utils/analytics";

describe("analytics session preferences", () => {
  const localStore = new Map<string, string>();
  const sessionStore = new Map<string, string>();
  let darkClass = false;
  let headAppendChild: ReturnType<typeof vi.fn>;
  let existingScript: Element | null = null;

  beforeEach(() => {
    localStore.clear();
    sessionStore.clear();
    darkClass = false;
    existingScript = null;
    headAppendChild = vi.fn((script: HTMLScriptElement) => {
      script.dispatchEvent(new Event("load"));
      return script;
    });

    vi.stubGlobal("localStorage", {
      getItem: (key: string) => localStore.get(key) ?? null,
      setItem: (key: string, value: string) => localStore.set(key, value),
      removeItem: (key: string) => localStore.delete(key),
    });
    vi.stubGlobal("sessionStorage", {
      getItem: (key: string) => sessionStore.get(key) ?? null,
      setItem: (key: string, value: string) => sessionStore.set(key, value),
      removeItem: (key: string) => sessionStore.delete(key),
    });
    vi.stubGlobal("document", {
      documentElement: {
        classList: {
          contains: (token: string) => token === "dark" && darkClass,
        },
      },
      querySelector: (selector: string) =>
        selector === "[data-umami-script]" ? existingScript : null,
      createElement: (tag: string) => {
        if (tag !== "script") throw new Error(`Unexpected tag: ${tag}`);
        const listeners = new Map<string, EventListener>();
        const script = {
          defer: false,
          src: "",
          dataset: {} as Record<string, string>,
          setAttribute: vi.fn(),
          addEventListener: (type: string, listener: EventListener) => {
            listeners.set(type, listener);
          },
          dispatchEvent: (event: Event) => {
            listeners.get(event.type)?.(event);
            return true;
          },
        };
        return script;
      },
      head: {
        appendChild: headAppendChild,
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    Reflect.deleteProperty(globalThis, "umami");
  });

  it("reads light theme by default", () => {
    expect(getThemePreference()).toBe("light");
  });

  it("reads dark theme from document class", () => {
    darkClass = true;
    expect(getThemePreference()).toBe("dark");
  });

  it("builds session preferences from stored lang and theme", () => {
    localStore.set("lang", "en");
    darkClass = true;
    expect(getSessionPreferences("initial")).toEqual({
      language: "en",
      theme: "dark",
      source: "initial",
    });
  });

  it("tracks session-preferences once per tab session on initial load", () => {
    const track = vi.fn();
    vi.stubGlobal("umami", { track });
    localStore.set("lang", "es");
    darkClass = false;

    trackSessionPreferences();
    trackSessionPreferences();

    expect(track).toHaveBeenCalledTimes(1);
    expect(track).toHaveBeenCalledWith(SESSION_PREFERENCES_EVENT, {
      language: "es",
      theme: "light",
      source: "initial",
    });
    expect(sessionStore.get("umami-session-preferences")).toBe("1");
  });

  it("tracks preference changes even after the initial snapshot", () => {
    const track = vi.fn();
    vi.stubGlobal("umami", { track });
    localStore.set("lang", "ca");
    darkClass = false;

    trackSessionPreferences();
    darkClass = true;
    trackSessionPreferenceChange();
    localStore.set("lang", "en");
    trackSessionPreferenceChange();

    expect(track).toHaveBeenCalledTimes(3);
    expect(track).toHaveBeenNthCalledWith(2, SESSION_PREFERENCES_EVENT, {
      language: "ca",
      theme: "dark",
      source: "change",
    });
    expect(track).toHaveBeenNthCalledWith(3, SESSION_PREFERENCES_EVENT, {
      language: "en",
      theme: "dark",
      source: "change",
    });
  });

  it("loads Umami script and tracks preferences on load", () => {
    const track = vi.fn();
    vi.stubGlobal("umami", { track });
    localStore.set("lang", "ca");
    darkClass = true;

    loadUmamiAnalytics();

    expect(headAppendChild).toHaveBeenCalledTimes(1);
    const script = headAppendChild.mock.calls[0][0] as {
      src: string;
      dataset: Record<string, string>;
    };
    expect(script.src).toBe("https://cloud.umami.is/script.js");
    expect(script.dataset.websiteId).toBe(
      "308bb911-c6d0-467c-8b4c-8e0a4ddf6294",
    );
    expect(track).toHaveBeenCalledWith(SESSION_PREFERENCES_EVENT, {
      language: "ca",
      theme: "dark",
      source: "initial",
    });
  });

  it("does not inject a second Umami script when already present", () => {
    existingScript = {} as Element;
    const track = vi.fn();
    vi.stubGlobal("umami", { track });

    loadUmamiAnalytics();

    expect(headAppendChild).not.toHaveBeenCalled();
    expect(track).toHaveBeenCalledTimes(1);
  });
});
