const UMAMI_SRC = "https://cloud.umami.is/script.js";
const UMAMI_WEBSITE_ID = "308bb911-c6d0-467c-8b4c-8e0a4ddf6294";
const UMAMI_DOMAINS = "davidgimeno.cat";

export function loadUmamiAnalytics() {
  if (typeof document === "undefined") return;
  if (document.querySelector("[data-umami-script]")) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = UMAMI_SRC;
  script.dataset.websiteId = UMAMI_WEBSITE_ID;
  script.dataset.domains = UMAMI_DOMAINS;
  script.setAttribute("data-umami-script", "");
  document.head.appendChild(script);
}
