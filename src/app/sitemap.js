const baseUrl = "https://tazminathesaplama.com";

export default function sitemap() {
  const routes = [
    "",
    "/ihbar-tazminati-hesaplama",
    "/yillik-izin-ucreti-hesaplama",
    "/kidem-tazminati-nedir",
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
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
