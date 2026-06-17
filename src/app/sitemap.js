import { IHBAR_NEDIR_PATH, KIDEM_TAVANI_PATH, siteUrl, TAZMINAT_HESAPLAMA_PATH } from "@/config/site";

/** Indexable main content routes only (legal/corporate/author pages are noindex). */
export default function sitemap() {
  const routes = ["/", TAZMINAT_HESAPLAMA_PATH, IHBAR_NEDIR_PATH, KIDEM_TAVANI_PATH];

  return routes.map((route) => ({
    url: siteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8
  }));
}
