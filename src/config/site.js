export const SITE_URL = "https://kıdemtazminatıhesaplama.tr";
export const HOME_PATH = "/";
export const HOME_SLUG = "kıdem-tazminatı-hesaplaması";
export const HOME_SLUG_PATH = `/${HOME_SLUG}`;

export const HOME_PAGE_SEO = {
  title: "Kıdem Tazminatı Hesaplaması | Formül, Örnekler ve Hesaplayıcı",
  description:
    "İşten ayrılma tazminatı hesaplaması adım adım formül ve örneklerle hesaplamayı öğrenin. Tam ödemenizi anında tahmin etmek için işten ayrılma tazminatı aracımızı kullanın.",
  slug: HOME_SLUG,
  keywords: ["kıdem tazminatı hesaplaması"]
};

export const TAZMINAT_HESAPLAMA_PATH = "/tazminat-hesaplama";

export const TAZMINAT_PAGE_SEO = {
  title: "tazminat hesaplama Aracı | Çalışan Maaşını Tahmin Etme",
  description:
    "Çalışan ücretlerini hızlı ve doğru bir şekilde hesaplayın. Kullanımı kolay tazminat hesaplama: maaş, ikramiye, yan haklar ve toplam ücreti tahmin edin.",
  slug: "tazminat-hesaplama",
  keywords: ["tazminat hesaplaması"]
};

export const IHBAR_NEDIR_PATH = "/ihbar-tazminati-nedir";

export const IHBAR_PAGE_SEO = {
  title: "İhbar Tazminatı Nedir? Uygunluk Kriterleri ve Hesaplama Yöntemi.",
  description:
    "İhbar tazminatı, kimlerin bu tazminata hak kazandığı, nasıl hesaplandığı, ihbar süreleri ve kıdem tazminatı ile ihbar tazminatı arasındaki fark hakkında bilgi edinin.",
  slug: "ihbar tazminatı nedir",
  keywords: ["ihbar tazminatı nedir"]
};

export const KIDEM_TAVANI_PATH = "/kidem-tazminati-tavani";

export const KIDEM_TAVANI_PAGE_SEO = {
  title: "Kıdem Tazminatı Tavanı Hesaplayıcı | Kıdem Tazminatını Hesapla",
  description:
    "Türkiye'de 2026 yılı için geçerli olan kıdem tazminatı tavanı hakkında bilgi edinin; geçmiş tavan oranları, hesaplama yöntemleri ve uygunluk şartları da dahil olmak üzere.",
  slug: "Kıdem Tazminatı Tavanı Türkiye 2026",
  keywords: ["Kıdem Tazminatı Tavanı"]
};

export const HAKKIMIZDA_PATH = "/hakkimizda";
export const ILETISIM_PATH = "/iletisim";

/** @param {string} [path] */
export function siteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL;
  const slashPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${slashPath.endsWith("/") ? slashPath : `${slashPath}/`}`;
}

export const LEGACY_PATH_REDIRECTS = {
  [HOME_SLUG_PATH]: HOME_PATH,
  "/kidem-tazminati-hesaplamasi": HOME_PATH,
  "/toplam-tazminat-hesaplama-kilavuzu": TAZMINAT_HESAPLAMA_PATH,
  "/kidem-tazminati-tavani-turkiye-2026": KIDEM_TAVANI_PATH,
  "/ihbar-tazminati-hesaplama": IHBAR_NEDIR_PATH,
  "/yillik-izin-ucreti-hesaplama": TAZMINAT_HESAPLAMA_PATH,
  "/kidem-tazminati-nedir": HOME_PATH,
  "/about-us": HAKKIMIZDA_PATH,
  "/contact": ILETISIM_PATH,
  "/is-kanunu": HOME_PATH,
  "/tazminat-tavani-2024": KIDEM_TAVANI_PATH
};