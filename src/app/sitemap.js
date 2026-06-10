const baseUrl = "https://tazminathesaplama.com";

export default function sitemap() {
  const routes = [
    "/kidem-tazminati-hesaplamasi",
    "/ihbar-tazminati-hesaplama",
    "/yillik-izin-ucreti-hesaplama",
    "/kidem-tazminati-nedir",
    "/toplam-tazminat-hesaplama-kilavuzu",
    "/ihbar-tazminati-nedir",
    "/kidem-tazminati-tavani-turkiye-2026",
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
    priority: route === "/kidem-tazminati-hesaplamasi" ? 1 : 0.8
  }));
}
