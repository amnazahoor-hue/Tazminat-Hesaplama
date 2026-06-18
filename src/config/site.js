export const SITE_URL = "https://kıdemtazminatıhesaplama.tr";

const SITE_UNICODE_HOST = "kıdemtazminatıhesaplama.tr";
const SITE_UNICODE_ORIGIN = `https://${SITE_UNICODE_HOST}`;

/** Known Punycode / ASCII host variants that must map to SITE_UNICODE_HOST. */
const LEGACY_SITE_HOSTS = [
  "xn--kdemtazminathesaplama-kgdl.tr",
  "xn--kdemtazminathesaplama-kgd.tr",
  "kidemtazminatihesaplama.tr",
  "kidentazminatihesaplama.tr"
];

/** Any Punycode encoding of this site's hostname. */
const SITE_PUNYCODE_HOST_RE = /xn--kdemtazminathesaplama-[a-z0-9]+\.tr/gi;
const SITE_PUNYCODE_URL_RE = /https?:\/\/xn--kdemtazminathesaplama-[a-z0-9]+\.tr/gi;

/** Punycode hostname for SITE_URL (Node/URL normalizes IDN to this form). */
export function getSitePunycodeHost() {
  return new URL(SITE_URL).hostname;
}

/** Unicode hostname as written in SITE_URL. */
export function getSiteUnicodeHost() {
  return SITE_UNICODE_HOST;
}

function replaceLegacySiteHosts(value) {
  let result = value;

  for (const host of LEGACY_SITE_HOSTS) {
    if (result.includes(host)) {
      result = result.replaceAll(host, SITE_UNICODE_HOST);
    }
  }

  result = result.replace(SITE_PUNYCODE_URL_RE, SITE_UNICODE_ORIGIN);
  result = result.replace(SITE_PUNYCODE_HOST_RE, SITE_UNICODE_HOST);

  const punycodeHost = getSitePunycodeHost();
  if (punycodeHost !== SITE_UNICODE_HOST && result.includes(punycodeHost)) {
    result = result.replaceAll(punycodeHost, SITE_UNICODE_HOST);
  }

  return result;
}

/** Force site URLs in strings to use the Unicode domain (not xn-- Punycode). */
export function toUnicodeSiteUrl(url) {
  if (typeof url !== "string" || !url) return url;
  return replaceLegacySiteHosts(url);
}

/** Post-process JSON-LD text so every site origin uses the Unicode domain. */
export function normalizeJsonLdSiteUrls(json) {
  if (typeof json !== "string" || !json) return json;
  return replaceLegacySiteHosts(json);
}
export const HOME_PATH = "/";
export const HOME_SLUG = "kıdem-tazminatı-hesaplaması";
export const HOME_SLUG_PATH = `/${HOME_SLUG}`;

export const HOME_PAGE_SEO = {
  title: "Kıdem Tazminatı Hesaplaması | Formül, Örnekler ve Hesaplayıcı",
  description:
    "Kıdem tazminatını hesaplamayı bir formül ve örneklerle öğrenin. Kıdem tazminatı aracımızı kullanarak tam ödemenizi anında tahmin edin.",
  slug: HOME_SLUG,
  keywords: ["kıdem tazminatı hesaplaması"]
};

export const TAZMINAT_HESAPLAMA_PATH = "/tazminat-hesaplama";

export const TAZMINAT_PAGE_SEO = {
  title: "Tazminat Hesaplama Aracı | Çalışan Maaşını Tahmin Etme",
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
export const AUTHOR_PATH = "/yazar";

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