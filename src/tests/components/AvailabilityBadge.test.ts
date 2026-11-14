import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { basics } from "@cv";
import AvailabilityBadge from "../../components/sections/AvailabilityBadge.astro";

describe("AvailabilityBadge", () => {
  it("renders the translatable status when cv.json marks basics.available", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(AvailabilityBadge);

    if (basics.available) {
      expect(html).toContain('data-i18n="ui.availability.open"');
      expect(html).toContain("bg-status-positive");
      expect(html).toMatch(
        /aria-hidden="true"[^>]*>\s*<span[^>]*availability-ping/,
      );
    } else {
      expect(html).not.toContain("ui.availability.open");
    }
  });
});
