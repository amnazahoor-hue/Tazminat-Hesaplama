/**
 * Capitalizes the first letter of each word in Turkish headings.
 * @param {string} text
 * @returns {string}
 */
export function capitalizeHeadingText(text) {
  if (typeof text !== "string" || !text) return text;

  return text
    .split(/(\s+)/)
    .map((segment) => {
      if (!/\S/.test(segment)) return segment;

      // Keep locative suffixes after years lowercase: 2026'da, 2025'te
      if (/^\d+'\p{L}+$/u.test(segment)) {
        return segment;
      }

      const chars = [...segment];
      for (let i = 0; i < chars.length; i++) {
        if (/\p{L}/u.test(chars[i])) {
          chars[i] = chars[i].toLocaleUpperCase("tr-TR");
          break;
        }
      }
      return chars.join("");
    })
    .join("");
}
