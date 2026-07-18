import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getStoredLang } from "../../utils/i18n-client";

describe("getStoredLang", () => {
  const storage = new Map<string, string>();

  beforeEach(() => {
    storage.clear();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns ca when localStorage is empty", () => {
    expect(getStoredLang()).toBe("ca");
  });

  it("returns stored language when valid", () => {
    storage.set("lang", "en");
    expect(getStoredLang()).toBe("en");
  });

  it("falls back to ca for invalid stored value", () => {
    storage.set("lang", "fr");
    expect(getStoredLang()).toBe("ca");
  });
});
