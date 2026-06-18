import {
  HOME_PATH,
  IHBAR_NEDIR_PATH,
  KIDEM_TAVANI_PATH,
  TAZMINAT_HESAPLAMA_PATH
} from "@/config/site";

/**
 * Cross-page internal links only (home ↔ tazminat; ihbar/tavan → home or tazminat).
 * Longest phrases first — one match per rule key per page.
 */
export const CROSS_PAGE_LINK_RULES = [
  { key: "to-home-kidem-araci", term: "Kıdem Tazminatı Hesaplama", href: `${HOME_PATH}#hesapla` },
  { key: "to-tazminat-hesaplayici", term: "hesaplayıcımızı", href: `${TAZMINAT_HESAPLAMA_PATH}#hesapla` },
  { key: "to-tazminat-cap", term: "Tazminat hesaplaması", href: TAZMINAT_HESAPLAMA_PATH },
  { key: "to-home-kidem-cap", term: "Kıdem Tazminatı", href: HOME_PATH },
  { key: "to-home-isten", term: "işten ayrılma tazminatı", href: HOME_PATH },
  { key: "to-home-kidem", term: "kıdem tazminatı", href: HOME_PATH },
  { key: "to-tazminat", term: "tazminat hesaplaması", href: TAZMINAT_HESAPLAMA_PATH }
];

/** Max auto-links per main content page (shared budget across the page). */
export const PAGE_LINK_POLICY = {
  [HOME_PATH]: {
    maxLinks: 3,
    allowedKeys: ["to-tazminat-hesaplayici", "to-tazminat", "to-tazminat-cap"]
  },
  [TAZMINAT_HESAPLAMA_PATH]: {
    maxLinks: 3,
    allowedKeys: ["to-home-kidem", "to-home-kidem-cap"]
  },
  [IHBAR_NEDIR_PATH]: {
    maxLinks: 3,
    allowedKeys: ["to-home-kidem", "to-home-isten", "to-tazminat"]
  },
  [KIDEM_TAVANI_PATH]: {
    maxLinks: 3,
    allowedKeys: ["to-home-kidem", "to-home-kidem-araci", "to-tazminat"]
  }
};

export const DISABLE_AUTO_INTERNAL_LINKS = new Set(CROSS_PAGE_LINK_RULES.map((rule) => rule.key));

/** @deprecated Use DISABLE_AUTO_INTERNAL_LINKS */
export const TAZMINAT_GUIDE_NO_LINK_KEYS = DISABLE_AUTO_INTERNAL_LINKS;

/** @deprecated Use DISABLE_AUTO_INTERNAL_LINKS */
export const HOME_PAGE_NO_LINK_KEYS = DISABLE_AUTO_INTERNAL_LINKS;

/** @deprecated Use DISABLE_AUTO_INTERNAL_LINKS */
export const TAZMINAT_GUIDE_KIDEM_ONLY_EXCLUDE_KEYS = DISABLE_AUTO_INTERNAL_LINKS;
