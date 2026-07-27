# Web CV improvement proposals — July 2026

Branch: `feat/web-cv-audit-proposals`

Audit based on the current codebase (`dgm-website-astro`), not assumptions.  
Baseline: Astro 6 static site, content from `cv.json`, routes `/`, `/about`, `/work`, `/projects`, `/contact`, `/privacy`, `/404`.  
Already strong: Person/ProfilePage/ItemList JSON-LD, sitemap, robots (incl. AI crawler policy), dark/light theme, CA/EN/ES client i18n, print CV, skip link + a11y scaffolding, consent-gated Umami, WebP project thumbs, View Transitions + prefetch.

Use the **Interest** column when deciding what to implement next (`yes` / `no` / `later`).

---

## Proposals by category

| ID        | Category        | Proposal                                                                                          | Current state (verified)                                                                                                                                                             | What it improves / resolves                                                            | Effort\* | Interest |
| --------- | --------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | -------- | -------- |
| SEO-1     | SEO / i18n      | URL-based locales + `hreflang` (`/en/…`, `/es/…`)                                                 | Client-only locale — **discarded**                                                                                                                                                   | Indexable EN/ES pages, clearer language targeting for search, shareable localized URLs | L        | no       |
| SEO-2     | SEO             | Localize page `title` / `description` meta (work, contact, projects still English in frontmatter) | **Done** — Catalan SSR meta via `t()` / `getPageTitle*`; OG alt/site_name; JSON-LD; webmanifest                                                                                      | Consistent SERP snippets in Catalan (and later EN/ES if SEO-1 lands)                   | S        | yes      |
| SEO-3     | SEO             | Add `twitter:site` / creator handles                                                              | **Discarded**                                                                                                                                                                        | Slightly richer Twitter/X unfurls when shared                                          | S        | no       |
| SEO-4     | SEO             | Harden canonical URLs against host/`base` variance (cdmon vs GitHub Pages)                        | **Done** — `getCanonicalUrl()` always emits `https://davidgimeno.cat/…` for canonical / og:url / twitter:url                                                                         | Avoid wrong canonicals when building for Pages vs production                           | S        | yes      |
| A11Y-1    | Accessibility   | Localize hard-coded English image alts (e.g. About portrait)                                      | **Done** — `ui.a11y.portraitOf` + `data-i18n-alt` / `data-alt-name` on About portraits                                                                                               | Screen-reader users hear correct language after locale switch                          | S        | yes      |
| A11Y-2    | Accessibility   | Manual / automated a11y pass (axe or similar) on all routes + both themes                         | **Done (code pass)** — localized skip link; `data-i18n-aria` on CookieConsent + NextUpNav; route a11y tests for skip link + portrait alts. Full axe/browser pass still optional.     | Catch contrast/focus/label regressions before they ship                                | S        | yes      |
| PERF-1    | Performance     | Use Astro `<Image>` (or optimized pipeline) for project card thumbs, not only plain `<img>`       | Profile uses Astro Image+AVIF; cards use local WebP `<img>` — **discarded**                                                                                                          | Better srcset/format control, LCP consistency on `/projects`                           | M        | no       |
| PERF-2    | Performance     | Measure Core Web Vitals on production (LCP/INP/CLS) and fix only proven issues                    | **Done** — Lab (Lighthouse mobile): home/projects/about ≈100; LCP ~1.3–1.4s; CLS 0. Proven fix: trailing-slash hrefs + `trailingSlash: "always"` (Apache DirectorySlash 301 ~780ms). | Data-driven speed work instead of speculative optimization                             | S        | yes      |
| UX-1      | UX / conversion | Contact form (needs email/API provider)                                                           | Mailto + social links only — **discarded**                                                                                                                                           | Lower friction for recruiters/clients; measurable leads                                | M–L      | no       |
| UX-2      | UX              | Downloadable static CV PDF (hosted file)                                                          | “Print CV” = `window.print()` + `print.css` only — **discarded**                                                                                                                     | One-click PDF for ATS/email without relying on browser print                           | M        | no       |
| UX-3      | UX              | Cookie banner: Accept vs Reject (or essential-only)                                               | **Done** — Accept loads Umami; Reject stores choice and skips analytics; legacy dismiss migrated to accepted                                                                         | Clearer privacy choice; aligns banner copy with real consent                           | S        | yes      |
| UX-4      | UX              | Language toggle visible on mobile chrome (not only inside menu)                                   | **Done** — LanguageToggle in mobile top bar next to theme; removed from hamburger panel                                                                                              | Faster language switch on phones                                                       | S        | yes      |
| CONTENT-1 | Content depth   | Project / case-study detail pages (`/projects/[slug]`)                                            | **Done** — `/projects/[slug]` with longDescription (CA/EN/ES), highlights, tech, visit/GitHub CTAs, live screenshots @960×640, prev/next + NextUpNav                                 | Deeper storytelling, internal SEO, portfolio narrative without leaving the site        | L        | yes      |
| CONTENT-2 | Content depth   | Blog / notes + RSS                                                                                | No MDX/collections, no RSS — **later**                                                                                                                                               | Thought leadership, long-tail SEO, shareable writing                                   | L        | later    |
| CONTENT-3 | Content         | Surface unused CV fields (e.g. project dates if added to `cv.json`)                               | **Done** — dates from GitHub (`created` / last activity); Estudi Seitai start-only (private repo, ongoing); shown via `WorkDates` on `ProjectCard`                                   | Clearer project timeline when data exists                                              | S        | yes      |
| CONTENT-4 | Content         | Testimonials / recommendations section                                                            | Not in `cv.json` or pages — **later**                                                                                                                                                | Social proof for hiring decisions                                                      | M        | later    |
| TECH-1    | Security        | Security headers in `.htaccess` (CSP, X-Frame-Options, Referrer-Policy, etc.)                     | **Done** — CSP (+ Umami allowlist), HSTS, nosniff, DENY framing, Referrer-Policy, Permissions-Policy                                                                                 | Reduce clickjacking/XSS blast radius on static host                                    | S        | yes      |
| TECH-2    | PWA             | Full offline / service worker                                                                     | `site.webmanifest` only; no SW — **skipped for now**                                                                                                                                 | Offline shell — usually low value for a CV site                                        | M        | no       |
| TECH-3    | Analytics       | Richer Umami goals (CTA clicks, print, outbound project links)                                    | Pageviews after Accept only — **skipped for now**                                                                                                                                    | Know which CTAs convert; inform UX priorities                                          | S        | no       |
| I18N-1    | i18n quality    | Audit CV-derived free text still missing `data-i18n` (summaries, highlights if any hard-coded)    | **Done (body/UI)** — languages, certificate names, footer built-with/cycle, print label/location, home SSR label. Meta/OG still SEO-2.                                               | True bilingual/trilingual reading for all UI + narrative copy                          | M        | yes      |

\*Effort: **S** = small (hours), **M** = medium (days), **L** = large (multi-day / content-heavy).

---

## Explicitly out of scope until confirmed

These were **not** invented as needed; confirm before treating as work:

1. **Primary goal of the site** — hiring, freelancing leads, personal brand, or SEO traffic? Priority order depends on this.
2. **Whether you want to maintain a blog** — CONTENT-2 only makes sense if you will write regularly.
3. **Contact form backend** — UX-1 needs a provider (Formspree, Basin, custom API, etc.); none exists in the repo today.
4. **Legal bar for cookies** — UX-3 done: Accept vs Reject; Umami only after Accept (documented on `/privacy`).
5. **Testimonials availability** — CONTENT-4 needs real quotes you can publish.

---

## Suggested triage questions (reply with IDs)

Reply like: `SEO-2 yes`, `CONTENT-1 later`, `TECH-2 no`, etc.

Or groups:

- Must do soon: …
- Nice later: …
- Skip: …
