export const HEADING_LOCALE_TR = "tr-TR";
export const HEADING_LOCALE_EN = "en-US";

const YEAR_LOCATIVE_SUFFIX = /^\d+'\p{L}+$/u;

/**
 * @param {string} text
 * @param {string} [locale]
 * @returns {string}
 */
export function capitalizeHeadingText(text, locale = HEADING_LOCALE_TR) {
  if (typeof text !== "string" || !text) return text;

  const isEnglish = locale === HEADING_LOCALE_EN || locale.toLowerCase().startsWith("en");

  return text
    .split(/(\s+)/)
    .map((segment) => {
      if (!/\S/.test(segment)) return segment;

      if (!isEnglish && YEAR_LOCATIVE_SUFFIX.test(segment)) {
        return segment;
      }

      const chars = [...segment];
      for (let i = 0; i < chars.length; i++) {
        if (/\p{L}/u.test(chars[i])) {
          chars[i] = chars[i].toLocaleUpperCase(isEnglish ? HEADING_LOCALE_EN : HEADING_LOCALE_TR);
          break;
        }
      }
      return chars.join("");
    })
    .join("");
}

/**
 * @returns {"tr-TR" | "en-US"}
 */
export function detectHeadingLocale() {
  if (typeof document === "undefined") return HEADING_LOCALE_TR;

  const html = document.documentElement;
  const lang = (html.getAttribute("lang") || "tr").toLowerCase();

  if (lang.startsWith("en") || html.classList.contains("translated-ltr")) {
    return HEADING_LOCALE_EN;
  }

  return HEADING_LOCALE_TR;
}
