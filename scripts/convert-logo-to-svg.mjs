import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import potrace from "potrace";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public", "images", "logo.jpeg");
const output = path.join(root, "public", "images", "logo.svg");
const favicon = path.join(root, "public", "favicon.ico");

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const isWhite = r > 235 && g > 235 && b > 235;
  if (isWhite) {
    data[i + 3] = 0;
  }
}

const transparentPng = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 }
})
  .png()
  .toBuffer();

const svg = await new Promise((resolve, reject) => {
  potrace.trace(
    transparentPng,
    {
      color: "#1e538a",
      background: "transparent",
      threshold: 200,
      turdSize: 2,
      optTolerance: 0.2
    },
    (err, result) => {
      if (err) reject(err);
      else resolve(result);
    }
  );
});

const cleanedSvg = svg
  .replace(/fill="#000000"/g, 'fill="#1e538a"')
  .replace(/fill="#000"/g, 'fill="#1e538a"')
  .replace(/<svg /, '<svg xmlns="http://www.w3.org/2000/svg" ');

fs.writeFileSync(output, cleanedSvg, "utf8");

await sharp(transparentPng)
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(root, "public", "images", "favicon-32.png"));

await sharp(transparentPng)
  .resize(16, 16, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(root, "public", "images", "favicon-16.png"));

console.log(`Wrote ${output}`);
console.log("Wrote favicon PNGs");
