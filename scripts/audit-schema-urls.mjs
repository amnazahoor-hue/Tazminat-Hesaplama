import fs from "node:fs";
import path from "node:path";

const appDir = ".next/server/app";
const files = fs.readdirSync(appDir).filter((f) => f.endsWith(".html"));
let failures = 0;

for (const file of files) {
  const html = fs.readFileSync(path.join(appDir, file), "utf8");
  const idx = html.indexOf('type="application/ld+json"');
  if (idx < 0) continue;

  const start = html.indexOf(">", idx) + 1;
  const end = html.indexOf("</script>", start);
  const json = html.slice(start, end);

  if (json.includes("xn--")) {
    failures += 1;
    console.log(`FAIL ${file}: punycode found in JSON-LD`);
  } else {
    console.log(`OK   ${file}`);
  }
}

if (failures > 0) {
  process.exit(1);
}
