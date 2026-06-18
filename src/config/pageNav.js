import {
  HAKKIMIZDA_PATH,
  HOME_PATH,
  HOME_SLUG_PATH,
  IHBAR_NEDIR_PATH,
  KIDEM_TAVANI_PATH,
  LEGACY_PATH_REDIRECTS,
  siteUrl,
  TAZMINAT_HESAPLAMA_PATH
} from "@/config/site";

export { HOME_PATH };

export const MAIN_HEADER_PAGES = [
  {
    path: HOME_PATH,
    url: siteUrl(HOME_PATH),
    label: "Kıdem Tazminatı Hesaplama",
    shortLabel: "Kıdem",
    title: "Kıdem Tazminatı Hesaplama"
  },
  {
    path: TAZMINAT_HESAPLAMA_PATH,
    url: siteUrl(TAZMINAT_HESAPLAMA_PATH),
    label: "Tazminat Hesaplama",
    shortLabel: "Tazminat",
    title: "Tazminat Hesaplama"
  },
  {
    path: IHBAR_NEDIR_PATH,
    url: siteUrl(IHBAR_NEDIR_PATH),
    label: "İhbar Tazminatı Nedir",
    shortLabel: "İhbar Nedir",
    title: "İhbar Tazminatı Nedir"
  },
  {
    path: KIDEM_TAVANI_PATH,
    url: siteUrl(KIDEM_TAVANI_PATH),
    label: "Kıdem Tazminatı Tavanı",
    shortLabel: "Tavan",
    title: "Kıdem Tazminatı Tavanı"
  }
];

/** Header pill nav — home calculator link omitted (logo covers anasayfa). */
export const HEADER_NAV_PAGES = [
  ...MAIN_HEADER_PAGES.filter((page) => page.path !== HOME_PATH),
  {
    path: HAKKIMIZDA_PATH,
    url: siteUrl(HAKKIMIZDA_PATH),
    label: "Hakkımızda",
    shortLabel: "Hakkımızda",
    title: "Hakkımızda"
  }
];

/** @type {Record<string, { cta: { path: string, section?: string, focusInput?: string }, items: { id: string, label: string, long?: boolean }[] }>} */
export const PAGE_NAV = {
  [HOME_PATH]: {
    cta: { path: HOME_PATH, section: "hesapla", focusInput: "giris" },
    items: [
      { id: "hesapla", label: "Kıdem Tazminatı Hesaplayıcısı", long: true },
      { id: "nasil-hesaplanir", label: "Nasıl Hesaplanır?" },
      { id: "tazminat-turleri", label: "Türler" },
      { id: "sss", label: "Sıkça Sorulan Sorular", long: true }
    ]
  },
  [TAZMINAT_HESAPLAMA_PATH]: {
    cta: { path: TAZMINAT_HESAPLAMA_PATH, section: "hesapla", focusInput: "tazminat-giris" },
    items: [
      { id: "hesapla", label: "Toplam Tazminat Hesaplayıcısı", long: true },
      { id: "guide-tanim", label: "Nedir?" },
      { id: "guide-adimlar", label: "Nasıl Hesaplanır?" },
      { id: "guide-faktorler", label: "Faktörler" },
      { id: "guide-2026", label: "2026 Kılavuzu" },
      { id: "guide-sss", label: "Sıkça Sorulan Sorular", long: true }
    ]
  },
  [IHBAR_NEDIR_PATH]: {
    cta: { path: HOME_PATH, section: "hesapla", focusInput: "giris" },
    items: [
      { id: "ihbar-tanim", label: "İhbar tazminatı nedir?", long: true },
      { id: "ihbar-sure", label: "İhbar Süresi" },
      { id: "ihbar-ornekler", label: "Örnekler" },
      { id: "ihbar-haklar", label: "Haklar" },
      { id: "ihbar-sss", label: "Sıkça Sorulan Sorular", long: true }
    ]
  },
  [KIDEM_TAVANI_PATH]: {
    cta: { path: HOME_PATH, section: "hesapla", focusInput: "giris" },
    items: [
      { id: "tavan-tanim", label: "Tavan 2026" },
      { id: "tavan-nedir", label: "Nedir?" },
      { id: "tavan-2026", label: "Oranlar" },
      { id: "tavan-hesaplama", label: "Hesaplama" },
      { id: "tavan-sss", label: "Sıkça Sorulan Sorular", long: true }
    ]
  }
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return HOME_PATH;
  const stripped = pathname.replace(/\/$/, "") || "/";
  if (stripped === "/") return HOME_PATH;
  if (stripped === "/kidem-tazminati-hesaplamasi" || stripped === HOME_SLUG_PATH) return HOME_PATH;
  return LEGACY_PATH_REDIRECTS[stripped] ?? stripped;
}

export function resolvePagePath(pathname) {
  return normalizePath(pathname);
}

export function getPageNav(pathname) {
  return PAGE_NAV[resolvePagePath(pathname)] ?? null;
}

export function isMainHeaderPage(pathname) {
  const pagePath = resolvePagePath(pathname);
  return MAIN_HEADER_PAGES.some((page) => page.path === pagePath);
}

export function getMainPageMeta(pathname) {
  const pagePath = resolvePagePath(pathname);
  return MAIN_HEADER_PAGES.find((page) => page.path === pagePath) ?? null;
}

export function buildSectionHref(path, sectionId) {
  return sectionId ? `${path}#${sectionId}` : path;
}
