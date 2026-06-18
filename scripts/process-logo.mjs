import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const inputPath = path.join(root, "public", "LOGO.jpeg");
const outputWebp = path.join(root, "public", "images", "logo.webp");
const publicDir = path.join(root, "public");
const MAX_KB = 100;
const WHITE_THRESHOLD = 242;

async function removeWhiteBackground(buffer) {
  const { data, info } = await sharp(buffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const pixels = new Uint8Array(data);

  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];

    if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD) {
      pixels[i + 3] = 0;
    }
  }

  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 }
  }).trim({ threshold: 10 });
}

async function writeWebpUnderLimit(pipeline, outputPath) {
  let quality = 86;

  while (quality >= 50) {
    const resized = pipeline.clone().resize(640, null, { withoutEnlargement: true, fit: "inside" });
    const buffer = await resized.webp({ quality, effort: 6, alphaQuality: 100 }).toBuffer();

    if (buffer.length <= MAX_KB * 1024) {
      await fs.writeFile(outputPath, buffer);
      return { quality, kb: Math.round(buffer.length / 1024) };
    }

    quality -= 6;
  }

  const buffer = await pipeline
    .clone()
    .resize(480, null, { withoutEnlargement: true, fit: "inside" })
    .webp({ quality: 78, effort: 6, alphaQuality: 100 })
    .toBuffer();

  await fs.writeFile(outputPath, buffer);
  return { quality: 78, kb: Math.round(buffer.length / 1024) };
}

async function writeFavicons(sourcePipeline) {
  const sizes = [
    ["favicon-16.png", 16],
    ["favicon-32.png", 32],
    ["favicon-48.png", 48],
    ["apple-touch-icon.png", 180]
  ];

  for (const [name, size] of sizes) {
    await sourcePipeline
      .clone()
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(path.join(publicDir, name));
    const stat = await fs.stat(path.join(publicDir, name));
    console.log(`✓ ${name} (${stat.size} bytes)`);
  }
}

async function main() {
  const input = await fs.readFile(inputPath);
  const transparent = await removeWhiteBackground(input);
  const meta = await transparent.metadata();
  console.log(`Trimmed logo: ${meta.width}x${meta.height}`);

  const { quality, kb } = await writeWebpUnderLimit(transparent, outputWebp);
  console.log(`✓ images/logo.webp (${kb}KB, quality ${quality})`);

  await writeFavicons(transparent);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
