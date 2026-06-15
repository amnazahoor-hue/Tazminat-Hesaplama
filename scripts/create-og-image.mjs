import path from "node:path";
import sharp from "sharp";

const out = path.resolve("public/images/og-image.webp");

const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="100%" stop-color="#4f46e5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="600" y="300" text-anchor="middle" fill="#ffffff" font-family="Arial,sans-serif" font-size="56" font-weight="700">Tazminat Hesaplama</text>
  <text x="600" y="370" text-anchor="middle" fill="#c6f24e" font-family="Arial,sans-serif" font-size="28">İş Kanunu 4857 · Ücretsiz Araç</text>
</svg>`;

const stat = await sharp(Buffer.from(svg)).webp({ quality: 85 }).toFile(out);
console.log(`Created ${out} (${Math.round(stat.size / 1024)}KB)`);
