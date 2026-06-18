import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outWebp = path.join(root, "public", "images", "og-image.webp");
const outPng = path.join(root, "public", "images", "og-image.png");
const opengraphPng = path.join(root, "src", "app", "opengraph-image.png");
const twitterPng = path.join(root, "src", "app", "twitter-image.png");
const source = process.env.OG_SOURCE
  ? path.resolve(process.env.OG_SOURCE)
  : path.join(root, "public", "images", "og-source.png");

const MAX_KB = 100;
const WIDTH = 1200;
const HEIGHT = 630;

async function writeOg(sourcePath, quality) {
  const resized = sharp(sourcePath).resize(WIDTH, HEIGHT, { fit: "cover", position: "top" });

  await resized.clone().webp({ quality, effort: 6 }).toFile(outWebp);
  await resized.clone().png({ compressionLevel: 9 }).toFile(outPng);
  await fs.copyFile(outPng, opengraphPng);
  await fs.copyFile(outPng, twitterPng);

  const stat = await fs.stat(outWebp);
  return Math.round(stat.size / 1024);
}

try {
  await fs.access(source);
} catch {
  console.error(`Source image not found: ${source}`);
  console.error("Place og-source.png in public/images/ or set OG_SOURCE.");
  process.exit(1);
}

let quality = 82;
let kb = await writeOg(source, quality);

while (kb > MAX_KB && quality >= 52) {
  quality -= 6;
  kb = await writeOg(source, quality);
}

console.log(`Created ${outWebp} (${kb}KB, ${WIDTH}x${HEIGHT}, quality ${quality})`);
console.log(`Synced PNG OG assets to ${outPng}, ${opengraphPng}, ${twitterPng}`);

if (kb > MAX_KB) {
  console.warn(`Warning: output is still above ${MAX_KB}KB`);
  process.exit(1);
}
