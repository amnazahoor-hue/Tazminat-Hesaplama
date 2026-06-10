export const HOME_PATH = "/kidem-tazminati-hesaplamasi";

/** @type {Record<string, { cta: { path: string, section?: string, focusInput?: string }, items: { id: string, label: string }[] }>} */
export const PAGE_NAV = {
  [HOME_PATH]: {
    cta: { path: HOME_PATH, section: "hesapla", focusInput: "giris" },
    items: [
      { id: "hesapla", label: "Hesaplayıcı" },
      { id: "nasil-hesaplanir", label: "Nasıl Hesaplanır?" },
      { id: "tazminat-turleri", label: "Türler" },
      { id: "sss", label: "SSS" }
    ]
  },
  "/toplam-tazminat-hesaplama-kilavuzu": {
    cta: { path: HOME_PATH, section: "hesapla", focusInput: "giris" },
    items: [
      { id: "guide-tanim", label: "Nedir?" },
      { id: "guide-adimlar", label: "Nasıl Hesaplanır?" },
      { id: "guide-faktorler", label: "Faktörler" },
      { id: "guide-2026", label: "2026 Kılavuzu" },
      { id: "guide-sss", label: "SSS" }
    ]
  },
  "/ihbar-tazminati-nedir": {
    cta: { path: "/ihbar-tazminati-hesaplama", section: "hesapla" },
    items: [
      { id: "ihbar-tanim", label: "İhbar tazminatı nedir?", long: true },
      { id: "ihbar-sure", label: "İhbar Süresi" },
      { id: "ihbar-ornekler", label: "Örnekler" },
      { id: "ihbar-haklar", label: "Haklar" },
      { id: "ihbar-sss", label: "SSS" }
    ]
  },
  "/kidem-tazminati-tavani-turkiye-2026": {
    cta: { path: "/kidem-tazminati-hesaplamasi", section: "hesapla", focusInput: "giris" },
    items: [
      { id: "tavan-tanim", label: "Tavan 2026" },
      { id: "tavan-nedir", label: "Nedir?" },
      { id: "tavan-2026", label: "Oranlar" },
      { id: "tavan-hesaplama", label: "Hesaplama" },
      { id: "tavan-sss", label: "SSS" }
    ]
  },
  "/ihbar-tazminati-hesaplama": {
    cta: { path: "/ihbar-tazminati-hesaplama", section: "hesapla" },
    items: [{ id: "hesapla", label: "İhbar Hesaplayıcısı" }]
  },
  "/yillik-izin-ucreti-hesaplama": {
    cta: { path: "/yillik-izin-ucreti-hesaplama", section: "hesapla" },
    items: [{ id: "hesapla", label: "İzin Hesaplayıcısı" }]
  },
  "/kidem-tazminati-nedir": {
    cta: { path: HOME_PATH, section: "hesapla" },
    items: [
      { id: "tanim", label: "Tanım" },
      { id: "formul", label: "Formül" },
      { id: "vergi", label: "Vergi & Tavan" }
    ]
  },
  "/ihbar-sureleri": {
    cta: { path: "/ihbar-tazminati-hesaplama", section: "hesapla" },
    items: [{ id: "tablo", label: "İhbar Tablosu" }]
  },
  "/is-kanunu": {
    cta: { path: HOME_PATH, section: "hesapla" },
    items: [{ id: "mevzuat", label: "Madde Özetleri" }]
  },
  "/tazminat-tavani-2024": {
    cta: { path: HOME_PATH, section: "hesapla" },
    items: [{ id: "tavan", label: "Tavan Tablosu" }]
  },
  "/contact": {
    cta: { path: HOME_PATH, section: "hesapla" },
    items: [
      { id: "iletisim", label: "İletişim" },
      { id: "destek", label: "Destek" }
    ]
  }
};

export function resolvePagePath(pathname) {
  if (!pathname || pathname === "/") return HOME_PATH;
  return pathname;
}

export function getPageNav(pathname) {
  return PAGE_NAV[resolvePagePath(pathname)] ?? null;
}

export function buildSectionHref(path, sectionId) {
  return sectionId ? `${path}#${sectionId}` : path;
}
