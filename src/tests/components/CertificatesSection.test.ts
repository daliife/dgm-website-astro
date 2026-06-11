import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import CertificatesSection from "../../components/sections/CertificatesSection.astro";
import type { CertificateEntry } from "../../types/ui";

const certWithUrl: CertificateEntry = {
  name: "Cambridge Certificate in Advanced English (CAE)",
  issuer: "Cambridge",
  url: "https://example.com/cert.pdf",
};

const certWithoutUrl: CertificateEntry = {
  name: "Some Course",
  issuer: "Some Issuer",
};

describe("CertificatesSection", () => {
  it("renders issuer as heading", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CertificatesSection, {
      props: { certificates: [certWithUrl] },
    });

    expect(html).toContain("Cambridge");
  });

  it("renders cert name as a link when url is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CertificatesSection, {
      props: { certificates: [certWithUrl] },
    });

    expect(html).toContain('href="https://example.com/cert.pdf"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain("Cambridge Certificate in Advanced English (CAE)");
  });

  it("renders cert name as plain text when no url is provided", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CertificatesSection, {
      props: { certificates: [certWithoutUrl] },
    });

    expect(html).toContain("Some Course");
    expect(html).not.toContain("<a ");
    expect(html).not.toContain("href=");
  });

  it("renders multiple certificates", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CertificatesSection, {
      props: { certificates: [certWithUrl, certWithoutUrl] },
    });

    expect(html).toContain("Cambridge");
    expect(html).toContain("Some Issuer");
  });

  it("renders section heading with i18n key", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(CertificatesSection, {
      props: { certificates: [certWithUrl] },
    });

    expect(html).toContain('data-i18n="ui.about.certificates"');
  });
});
