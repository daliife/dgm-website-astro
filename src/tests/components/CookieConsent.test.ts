import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import CookieConsent from "../../components/layout/CookieConsent.astro";

describe("CookieConsent", () => {
  it("renders the cookie banner region", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CookieConsent);

    expect(html).toContain('id="cookie-banner"');
    expect(html).toContain('id="cookie-accept"');
    expect(html).toContain('id="cookie-reject"');
  });

  it("uses localized cookie notice aria-label", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CookieConsent);

    expect(html).toContain('aria-label="Avís de cookies"');
    expect(html).toContain('data-i18n-aria="ui.a11y.cookieNotice"');
  });

  it("links to the privacy page", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CookieConsent);

    expect(html).toContain("/privacy");
    expect(html).toContain('data-i18n="ui.cookies.learnmore"');
  });

  it("exposes Accept and Reject labels", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CookieConsent);

    expect(html).toContain('data-i18n="ui.cookies.accept"');
    expect(html).toContain('data-i18n="ui.cookies.reject"');
    expect(html).toContain("Acceptar");
    expect(html).toContain("Rebutjar");
  });
});
