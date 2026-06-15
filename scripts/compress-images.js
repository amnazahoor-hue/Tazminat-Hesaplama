const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const MAX_KB = 100;
const publicDir = path.resolve(__dirname, "..", "public");
const stagingDir = path.join(__dirname, ".compress-staging");

const TARGETS = [
  "images/logo.webp",
  "images/guides/guide-steps-office.webp",
  "images/home/employer-why-calculator-bg.webp",
  "images/ihbar/examples.webp"
];

async function compressInPlace(relativePath) {
  const filePath = path.join(publicDir, relativePath);
  const originalStat = await fs.promises.stat(filePath);
  const originalKb = Math.round(originalStat.size / 1024);

  if (originalKb < MAX_KB) {
    console.log(`${relativePath}: ${originalKb}KB (already <${MAX_KB}KB, skipped)`);
    return;
  }

  const meta = await sharp(filePath).metadata();
  const hasAlpha = Boolean(meta.hasAlpha);

  const inputBuffer = await fs.promises.readFile(filePath);
  let quality = 80;
  let alphaQuality = 100;
  let outputKb = Infinity;
  let usedQuality = quality;
  let usedAlphaQuality = alphaQuality;
  let outputBuffer = null;

  while (quality >= 40) {
    while (true) {
      const webpOptions = { quality, effort: 6, smartSubsample: true };
      if (hasAlpha) {
        webpOptions.alphaQuality = alphaQuality;
      }

      outputBuffer = await sharp(inputBuffer).webp(webpOptions).toBuffer();
      outputKb = Math.round(outputBuffer.length / 1024);

      if (outputKb < MAX_KB) {
        usedQuality = quality;
        usedAlphaQuality = alphaQuality;
        break;
      }

      if (hasAlpha && alphaQuality > 70) {
        alphaQuality -= 5;
        continue;
      }

      break;
    }

    if (outputKb < MAX_KB) {
      break;
    }

    quality -= 5;
    alphaQuality = 100;
  }

  if (outputKb >= MAX_KB || !outputBuffer) {
    throw new Error(`${relativePath}: could not reach <${MAX_KB}KB (last ${outputKb}KB)`);
  }

  await fs.promises.mkdir(stagingDir, { recursive: true });
  const stagingPath = path.join(stagingDir, path.basename(filePath));
  await fs.promises.writeFile(stagingPath, outputBuffer);

  const { execFile } = require("child_process");
  const { promisify } = require("util");
  const execFileAsync = promisify(execFile);
  const psPath = (value) => value.replace(/'/g, "''");
  await execFileAsync("powershell", [
    "-NoProfile",
    "-Command",
    `Copy-Item -LiteralPath '${psPath(stagingPath)}' -Destination '${psPath(filePath)}' -Force`
  ]);
  await fs.promises.unlink(stagingPath).catch(() => {});

  const alphaNote = hasAlpha ? `, alphaQuality ${usedAlphaQuality}` : "";
  console.log(`${relativePath}: ${originalKb}KB → ${outputKb}KB (quality ${usedQuality}${alphaNote})`);
}

async function main() {
  for (const relativePath of TARGETS) {
    await compressInPlace(relativePath);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
