import {
  HAKKIMIZDA_PATH,
  IHBAR_NEDIR_PATH,
  ILETISIM_PATH,
  KIDEM_TAVANI_PATH,
  siteUrl,
  TAZMINAT_HESAPLAMA_PATH
} from "@/config/site";

/** Indexable routes (legal & author pages remain noindex). */
export default function sitemap() {
  const routes = [
    "/",
    TAZMINAT_HESAPLAMA_PATH,
    IHBAR_NEDIR_PATH,
    KIDEM_TAVANI_PATH,
    HAKKIMIZDA_PATH,
    ILETISIM_PATH
  ];

  return routes.map((route) => ({
    url: siteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8
  }));
}
