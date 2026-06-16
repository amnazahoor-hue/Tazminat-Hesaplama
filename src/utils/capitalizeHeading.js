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

      const chars = [...segment];
      let capitalized = false;

      return chars
        .map((char) => {
          if (!capitalized && /\p{L}/u.test(char)) {
            capitalized = true;
            return char.toLocaleUpperCase("tr-TR");
          }
          return char;
        })
        .join("");
    })
    .join("");
}
