import {
  HOME_PATH,
  IHBAR_NEDIR_PATH,
  KIDEM_TAVANI_PATH,
  TAZMINAT_HESAPLAMA_PATH
} from "@/config/site";

/** Longest phrases first — first match per rule per text block */
export const INTERNAL_LINK_RULES = [
  { key: "kidem-hesaplama-araci", term: "Kıdem Tazminatı Hesaplama", href: `${HOME_PATH}#hesapla` },
  { key: "hesaplayicimiz", term: "hesaplayıcımızı", href: `${TAZMINAT_HESAPLAMA_PATH}#hesapla` },
  { key: "kidem-tavani-heading", term: "Kıdem Tazminatı Tavanı", href: KIDEM_TAVANI_PATH },
  { key: "kidem-tavani-hesap", term: "kıdem tazminatı tavanını", href: `${KIDEM_TAVANI_PATH}#tavan-hesaplama` },
  { key: "kidem-tavani-mechanism", term: "kıdem tazminatı tavanı hesaplama", href: `${KIDEM_TAVANI_PATH}#tavan-hesaplama` },
  { key: "kidem-tavani", term: "kıdem tazminatı tavanı", href: KIDEM_TAVANI_PATH },
  { key: "tavan-2026", term: "2026 kıdem tazminatı tavanı", href: `${KIDEM_TAVANI_PATH}#tavan-2026` },
  { key: "tavan-2025", term: "2025 yılı kıdem tazminatı tavanı", href: KIDEM_TAVANI_PATH },
  { key: "tavan-tutarlari", term: "Tavan tutarları", href: KIDEM_TAVANI_PATH },
  { key: "tavan-tutari", term: "tavan tutarı", href: `${KIDEM_TAVANI_PATH}#tavan-hesaplama` },
  { key: "gecerli-tavanlar", term: "geçerli yasal tavanlar", href: KIDEM_TAVANI_PATH },
  { key: "tavan-limitleri", term: "Tavan limitleri", href: KIDEM_TAVANI_PATH },
  { key: "ihbar-hesap", term: "İhbar tazminatı hesaplaması", href: IHBAR_NEDIR_PATH },
  { key: "ihbar-sure-hesap", term: "İhbar süresi hesaplaması", href: `${IHBAR_NEDIR_PATH}#ihbar-sure` },
  { key: "ihbar-birlesik", term: "İşten çıkarma ve ihbar tazminatı birleşik hesaplaması", href: `${TAZMINAT_HESAPLAMA_PATH}#guide-adimlar` },
  { key: "ihbar-cap", term: "İhbar Tazminatı", href: IHBAR_NEDIR_PATH },
  { key: "ihbar-tazminatina", term: "ihbar tazminatına", href: IHBAR_NEDIR_PATH },
  { key: "ihbar-tazminati", term: "ihbar tazminatı", href: IHBAR_NEDIR_PATH },
  { key: "ihbar-suresi-cap", term: "İhbar süresi", href: `${IHBAR_NEDIR_PATH}#ihbar-sure` },
  { key: "ihbar-suresi", term: "ihbar süresi", href: `${IHBAR_NEDIR_PATH}#ihbar-sure` },
  { key: "isten-ayrilma", term: "işten ayrılma tazminatı", href: HOME_PATH },
  { key: "isten-cikarma-tavani", term: "işten çıkarma tazminatı tavanı", href: `${KIDEM_TAVANI_PATH}#tavan-nedir` },
  { key: "kidem-cap", term: "Kıdem Tazminatı", href: HOME_PATH },
  { key: "kidem", term: "kıdem tazminatı", href: HOME_PATH },
  { key: "yillik-izin-ucret", term: "Kullanılmayan yıllık izin tazminatı", href: `${TAZMINAT_HESAPLAMA_PATH}#guide-bilesenler` },
  { key: "yillik-izin-ucretleri", term: "kullanılmamış yıllık izin ücretleri", href: `${TAZMINAT_HESAPLAMA_PATH}#guide-bilesenler` },
  { key: "yillik-izin-ucreti", term: "yıllık izin ücreti", href: `${TAZMINAT_HESAPLAMA_PATH}#guide-bilesenler` },
  { key: "toplam-tazminat", term: "toplam tazminat", href: TAZMINAT_HESAPLAMA_PATH },
  { key: "tazminat-hesaplama-cap", term: "Tazminat hesaplaması", href: TAZMINAT_HESAPLAMA_PATH },
  { key: "tazminat-hesaplama", term: "tazminat hesaplaması", href: TAZMINAT_HESAPLAMA_PATH }
];

export const CARD_TITLE_LINKS = {
  "Kıdem Tazminatı": HOME_PATH,
  "İhbar Tazminatı": IHBAR_NEDIR_PATH,
  "Bildirim Ödemesi": IHBAR_NEDIR_PATH
};
