import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const MAX_KB = 100;

/** @type {{ file: string, maxWidth?: number, quality?: number }[]} */
const TARGETS = [
  { file: "images/logo.webp", maxWidth: 256, quality: 82 },
  { file: "images/guides/guide-steps-office.webp", maxWidth: 1040, quality: 78 },
  { file: "images/home/employer-why-calculator-bg.webp", maxWidth: 1280, quality: 76 },
  { file: "images/ihbar/examples.webp", maxWidth: 1200, quality: 78 }
];

async function optimizeOne({ file, maxWidth, quality = 80 }) {
  const filePath = path.join(publicDir, file);
  const tempPath = `${filePath}.tmp`;

  let pipeline = sharp(filePath);
  const meta = await pipeline.metadata();

  if (maxWidth && meta.width && meta.width > maxWidth) {
    pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }

  await pipeline.webp({ quality, effort: 6 }).toFile(tempPath);
  await fs.rename(tempPath, filePath);

  const stat = await fs.stat(filePath);
  const kb = Math.round(stat.size / 1024);
  console.log(`${kb <= MAX_KB ? "✓" : "⚠"} ${file} (${kb}KB)`);

  if (kb > MAX_KB) {
    let q = quality - 8;
    while (kb > MAX_KB && q >= 52) {
      pipeline = sharp(filePath);
      if (maxWidth) {
        pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true });
      }
      await pipeline.webp({ quality: q, effort: 6 }).toFile(tempPath);
      await fs.rename(tempPath, filePath);
      const nextStat = await fs.stat(filePath);
      const nextKb = Math.round(nextStat.size / 1024);
      console.log(`  ↳ retried q=${q} → ${nextKb}KB`);
      if (nextKb <= MAX_KB) break;
      q -= 8;
    }
  }
}

async function auditAllWebp() {
  const imagesDir = path.join(publicDir, "images");
  const entries = [];

  async function walk(dir) {
    const items = await fs.readdir(dir, { withFileTypes: true });
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        await walk(fullPath);
      } else if (item.name.endsWith(".webp")) {
        const stat = await fs.stat(fullPath);
        entries.push({
          file: path.relative(publicDir, fullPath).replace(/\\/g, "/"),
          kb: Math.round(stat.size / 1024)
        });
      }
    }
  }

  await walk(imagesDir);
  entries.sort((a, b) => b.kb - a.kb);

  console.log("\nWebP audit:");
  for (const entry of entries) {
    const mark = entry.kb > MAX_KB ? "OVER" : "OK";
    console.log(`  [${mark}] ${entry.file} — ${entry.kb}KB`);
  }
}

async function main() {
  for (const target of TARGETS) {
    await optimizeOne(target);
  }
  await auditAllWebp();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
