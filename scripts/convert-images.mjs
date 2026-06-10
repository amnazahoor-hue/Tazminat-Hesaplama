import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const imagesDir = path.join(publicDir, "images");

const ISTOCK_URL =
  "https://media.istockphoto.com/id/2205123913/photo/businesswoman-showing-infographic-to-businessman-in-modern-office.webp?a=1&b=1&s=612x612&w=0&k=20&c=wqTpLelKGasnT5vUOUGDYwXrms1cyE3Q1rniDA-AtuA=";

const ROOT_MAPPINGS = [
  ["logo.png", "logo.webp"],
  ["hero-carousel-lira.png", "home/hero-carousel-lira.webp"],
  ["hero-carousel-1.png", "home/hero-carousel-1.webp"],
  ["hero-carousel-2.png", "home/hero-carousel-2.webp"],
  ["hero-carousel-3.png", "home/hero-carousel-3.webp"],
  ["hero-image.png", "home/hero-image.webp"],
  ["intro-severance-bg.webp", "home/intro-severance-bg.webp"],
  ["free-calc-office.webp", "home/free-calc-office.webp"],
  ["feature-results-salary.jpg", "home/feature-results-salary.webp"],
  ["feature-tax-coin.jpg", "home/feature-tax-coin.webp"],
  ["employer-why-calculator-bg.jpg", "home/employer-why-calculator-bg.webp"],
  ["employer-why-bg.jpg", "home/employer-why-bg.webp"],
  ["diff-purple-salary.jpg", "home/diff-purple-salary.webp"],
  ["diff-invoice-salary.jpg", "home/diff-invoice-salary.webp"],
  ["free-calc-idea.png", "home/free-calc-idea.webp"],
  ["intro-corkboard.png", "home/intro-corkboard.webp"],
  ["intro-sticky-idea.png", "home/intro-sticky-idea.webp"]
];

const SUBDIR_MAPPINGS = [
  ["images/ihbar/hero.jpg", "ihbar/hero.webp"],
  ["images/ihbar/kidem.jpg", "ihbar/kidem.webp"],
  ["images/ihbar/examples.jpg", "ihbar/examples.webp"],
  ["images/ihbar/rights.jpg", "ihbar/rights.webp"],
  ["images/tazminat-hesaplama/hero.jpg", "tazminat-hesaplama/hero.webp"]
];

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function convertToWebp(inputPath, outputPath, quality = 82) {
  await ensureDir(outputPath);
  await sharp(inputPath).webp({ quality, effort: 4 }).toFile(outputPath);
  const inputStat = await fs.stat(inputPath);
  const outputStat = await fs.stat(outputPath);
  console.log(
    `✓ ${path.relative(publicDir, outputPath)} (${Math.round(outputStat.size / 1024)}KB, was ${Math.round(inputStat.size / 1024)}KB)`
  );
}

async function downloadIstock() {
  const outputPath = path.join(imagesDir, "guides", "guide-steps-office.webp");
  await ensureDir(outputPath);

  const response = await fetch(ISTOCK_URL);
  if (!response.ok) {
    throw new Error(`Failed to download istock image: ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer).webp({ quality: 82, effort: 4 }).toFile(outputPath);
  console.log(`✓ ${path.relative(publicDir, outputPath)} (downloaded)`);
}

async function main() {
  await fs.mkdir(imagesDir, { recursive: true });

  for (const [source, target] of ROOT_MAPPINGS) {
    const inputPath = path.join(publicDir, source);
    const outputPath = path.join(imagesDir, target);
    try {
      await fs.access(inputPath);
      await convertToWebp(inputPath, outputPath);
    } catch {
      console.warn(`⚠ Skipped missing file: ${source}`);
    }
  }

  for (const [source, target] of SUBDIR_MAPPINGS) {
    const inputPath = path.join(publicDir, source);
    const outputPath = path.join(imagesDir, target);
    try {
      await fs.access(inputPath);
      await convertToWebp(inputPath, outputPath);
    } catch {
      console.warn(`⚠ Skipped missing file: ${source}`);
    }
  }

  await downloadIstock();
  console.log("\nDone — all images converted under public/images/");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
