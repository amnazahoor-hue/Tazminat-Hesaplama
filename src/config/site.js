export const SITE_URL = "https://kıdemtazminatıhesaplama.tr";
export const HOME_PATH = "/";

export const TAZMINAT_HESAPLAMA_PATH = "/tazminat-hesaplama";
export const IHBAR_NEDIR_PATH = "/ihbar-tazminati-nedir";
export const KIDEM_TAVANI_PATH = "/kidem-tazminati-tavani";
export const HAKKIMIZDA_PATH = "/hakkimizda";
export const ILETISIM_PATH = "/iletisim";

/** @param {string} [path] */
export function siteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL;
  const slashPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${slashPath.endsWith("/") ? slashPath : `${slashPath}/`}`;
}

export const LEGACY_PATH_REDIRECTS = {
  "/kidem-tazminati-hesaplamasi": HOME_PATH,
  "/toplam-tazminat-hesaplama-kilavuzu": TAZMINAT_HESAPLAMA_PATH,
  "/kidem-tazminati-tavani-turkiye-2026": KIDEM_TAVANI_PATH,
  "/ihbar-tazminati-hesaplama": IHBAR_NEDIR_PATH,
  "/yillik-izin-ucreti-hesaplama": TAZMINAT_HESAPLAMA_PATH,
  "/kidem-tazminati-nedir": HOME_PATH,
  "/about-us": HAKKIMIZDA_PATH,
  "/contact": ILETISIM_PATH
};