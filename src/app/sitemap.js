import {
  IHBAR_NEDIR_PATH,
  KIDEM_TAVANI_PATH,
  siteUrl,
  TAZMINAT_HESAPLAMA_PATH
} from "@/config/site";

export default function sitemap() {
  const routes = [
    "/",
    TAZMINAT_HESAPLAMA_PATH,
    IHBAR_NEDIR_PATH,
    KIDEM_TAVANI_PATH,
    "/ihbar-sureleri",
    "/tazminat-tavani-2024",
    "/is-kanunu",
    "/gizlilik-politikasi",
    "/kullanim-sartlari",
    "/yasal-uyari",
    "/privacy-policy",
    "/terms-and-conditions",
    "/disclaimer",
    "/contact",
    "/about-us",
    "/cookie-policy"
  ];

  return routes.map((route) => ({
    url: siteUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8
  }));
}
