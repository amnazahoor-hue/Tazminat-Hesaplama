import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const imagesDir = path.join(publicDir, "images");
const MAX_KB = 100;

const GUIDE_STEPS_IMAGE_URL =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&h=2560&q=90";

/** Only assets referenced in src/config/images.js, ihbarGuideContent.js, or layout metadata */
const ROOT_MAPPINGS = [
  ["logo.png", "logo.webp", { maxWidth: 256, quality: 82 }],
  ["hero-carousel-lira.png", "home/hero-carousel-lira.webp", { quality: 82 }],
  ["hero-carousel-1.png", "home/hero-carousel-1.webp", { quality: 82 }],
  ["hero-carousel-2.png", "home/hero-carousel-2.webp", { quality: 82 }],
  ["hero-carousel-3.png", "home/hero-carousel-3.webp", { quality: 82 }],
  ["intro-severance-bg.webp", "home/intro-severance-bg.webp", { quality: 82 }],
  ["free-calc-office.webp", "home/free-calc-office.webp", { quality: 82 }],
  ["feature-results-salary.jpg", "home/feature-results-salary.webp", { quality: 82 }],
  ["feature-tax-coin.jpg", "home/feature-tax-coin.webp", { quality: 82 }],
  ["employer-why-calculator-bg.jpg", "home/employer-why-calculator-bg.webp", { maxWidth: 1280, quality: 76 }],
  ["employer-why-bg.jpg", "home/employer-why-bg.webp", { quality: 82 }],
  ["diff-purple-salary.jpg", "home/diff-purple-salary.webp", { quality: 82 }]
];

const SUBDIR_MAPPINGS = [
  ["images/ihbar/hero.jpg", "ihbar/hero.webp", { quality: 82 }],
  ["images/ihbar/kidem.jpg", "ihbar/kidem.webp", { quality: 82 }],
  ["images/ihbar/examples.jpg", "ihbar/examples.webp", { maxWidth: 1200, quality: 78 }],
  ["images/tazminat-hesaplama/hero.jpg", "tazminat-hesaplama/hero.webp", { quality: 82 }]
];

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function convertToWebp(inputPath, outputPath, options = {}) {
  const { maxWidth, quality = 82 } = options;
  await ensureDir(outputPath);

  let pipeline = sharp(inputPath);
  if (maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }

  await pipeline.webp({ quality, effort: 6 }).toFile(outputPath);
  const outputStat = await fs.stat(outputPath);
  const kb = Math.round(outputStat.size / 1024);
  console.log(`✓ ${path.relative(publicDir, outputPath)} (${kb}KB)`);
}

async function downloadGuideStepsImage() {
  const outputPath = path.join(imagesDir, "guides", "guide-steps-office.webp");
  await ensureDir(outputPath);

  const response = await fetch(GUIDE_STEPS_IMAGE_URL);
  if (!response.ok) {
    throw new Error(`Failed to download guide steps image: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer)
    .resize(1040, 1380, { fit: "cover", position: "centre" })
    .webp({ quality: 78, effort: 6 })
    .toFile(outputPath);

  const outputStat = await fs.stat(outputPath);
  console.log(
    `✓ ${path.relative(publicDir, outputPath)} (downloaded, ${Math.round(outputStat.size / 1024)}KB)`
  );
}

async function main() {
  await fs.mkdir(imagesDir, { recursive: true });

  for (const [source, target, options] of ROOT_MAPPINGS) {
    const inputPath = path.join(publicDir, source);
    const outputPath = path.join(imagesDir, target);
    try {
      await fs.access(inputPath);
      await convertToWebp(inputPath, outputPath, options);
    } catch {
      console.warn(`⚠ Skipped missing file: ${source}`);
    }
  }

  for (const [source, target, options] of SUBDIR_MAPPINGS) {
    const inputPath = path.join(publicDir, source);
    const outputPath = path.join(imagesDir, target);
    try {
      await fs.access(inputPath);
      await convertToWebp(inputPath, outputPath, options);
    } catch {
      console.warn(`⚠ Skipped missing file: ${source}`);
    }
  }

  await downloadGuideStepsImage();
  console.log(`\nDone — WebP assets under public/images/ (target ≤ ${MAX_KB}KB)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
