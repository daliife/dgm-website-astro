import { describe, it, expect } from "vitest";
import type { SocialProfile } from "../../types/ui";
import { getSocialProfile } from "../../utils/socialLinks";

const profiles: SocialProfile[] = [
  { network: "Linkedin", url: "https://linkedin.com/in/example" },
  { network: "Github", url: "https://github.com/example" },
  { network: "Email", url: "mailto:hi@example.com" },
];

describe("getSocialProfile", () => {
  it("finds a profile by network name", () => {
    expect(getSocialProfile(profiles, "Github")?.url).toBe(
      "https://github.com/example",
    );
  });

  it("returns undefined for an unknown network", () => {
    expect(getSocialProfile(profiles, "Twitter")).toBeUndefined();
  });

  it("handles empty or missing profiles", () => {
    expect(getSocialProfile([], "Github")).toBeUndefined();
    expect(
      getSocialProfile(undefined as unknown as SocialProfile[], "Github"),
    ).toBeUndefined();
  });
});
