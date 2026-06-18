/**
 * Website URL & Schema Validator — Explanation Report (PDF)
 * Run: node scripts/generate-schema-validator-report.mjs
 */
import { jsPDF } from "jspdf";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "Website-URL-Schema-Validator-Explanation-Report.pdf");

const REPORT = {
  title: "Website URL & Schema Validator",
  subtitle: "Explanation Report",
  project: "Kıdem Tazminatı Hesaplama",
  preparedFor: "Business / Client Review",
  date: "18 June 2026",
  status: "No action required",
  originalUrl: "https://kıdemtazminatıhesaplama.tr/",
  punycodeUrl: "https://xn--kdemtazminathesaplama-kgdl.tr/",
  vercelPreview: "https://tazminat-hesaplama.vercel.app/"
};

const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
const W = 210;
const H = 297;
const M = 18;
const CW = W - M * 2;
let pageNum = 0;
let y = 0;

const C = {
  primary: [79, 70, 229],
  primaryDark: [55, 48, 163],
  accent: [198, 242, 78],
  success: [22, 163, 74],
  info: [37, 99, 235],
  text: [30, 41, 59],
  muted: [100, 116, 139],
  light: [248, 250, 252],
  border: [226, 232, 240],
  white: [255, 255, 255],
  calloutBg: [236, 253, 245],
  calloutBorder: [167, 243, 208]
};

function rgb(c) {
  doc.setTextColor(c[0], c[1], c[2]);
}
function fill(c) {
  doc.setFillColor(c[0], c[1], c[2]);
}
function stroke(c) {
  doc.setDrawColor(c[0], c[1], c[2]);
}

function footer() {
  pageNum += 1;
  stroke(C.border);
  doc.setLineWidth(0.2);
  doc.line(M, H - 14, W - M, H - 14);
  doc.setFontSize(8);
  rgb(C.muted);
  doc.setFont("helvetica", "normal");
  doc.text(REPORT.project, M, H - 8);
  doc.text(`Page ${pageNum}`, W - M, H - 8, { align: "right" });
  doc.text("Schema Validator Explanation Report", W / 2, H - 8, { align: "center" });
}

function newPage() {
  if (pageNum > 0) footer();
  doc.addPage();
}

function needY(h) {
  if (y + h > H - 22) {
    newPage();
    y = 24;
    drawPageHeader();
  }
}

function drawPageHeader() {
  fill(C.primary);
  doc.rect(0, 0, W, 12, "F");
  doc.setFontSize(8);
  rgb(C.white);
  doc.setFont("helvetica", "bold");
  doc.text("SCHEMA VALIDATOR REPORT", M, 8);
  doc.setFont("helvetica", "normal");
  doc.text(REPORT.originalUrl.replace(/^https:\/\//, ""), W - M, 8, { align: "right" });
  y = 22;
}

function sectionTitle(text, num) {
  needY(14);
  doc.setFontSize(14);
  rgb(C.text);
  doc.setFont("helvetica", "bold");
  doc.text(num ? `${num}. ${text}` : text, M, y);
  y += 9;
}

function paragraph(text, opts = {}) {
  const width = opts.width ?? CW;
  const size = opts.size ?? 10;
  const gap = opts.gap ?? 4;
  doc.setFontSize(size);
  doc.setFont("helvetica", opts.bold ? "bold" : "normal");
  rgb(opts.color ?? C.text);
  const lines = doc.splitTextToSize(text, width);
  needY(lines.length * 5 + gap);
  doc.text(lines, opts.x ?? M, y);
  y += lines.length * 5 + gap;
}

function pill(text, x, py, tone = "info") {
  const colors = {
    info: [219, 234, 254],
    success: [220, 252, 231],
    neutral: [241, 245, 249]
  };
  const textColors = {
    info: C.info,
    success: C.success,
    neutral: C.muted
  };
  doc.setFontSize(7.5);
  const tw = doc.getTextWidth(text) + 8;
  fill(colors[tone] ?? colors.info);
  doc.roundedRect(x, py - 4.5, tw, 7, 2, 2, "F");
  rgb(textColors[tone] ?? C.info);
  doc.setFont("helvetica", "bold");
  doc.text(text, x + 4, py);
  return tw + 4;
}

function callout(title, body) {
  const bodyLines = doc.splitTextToSize(body, CW - 12);
  const boxH = 14 + bodyLines.length * 5;
  needY(boxH + 6);
  fill(C.calloutBg);
  stroke(C.calloutBorder);
  doc.setLineWidth(0.4);
  doc.roundedRect(M, y, CW, boxH, 2, 2, "FD");
  fill(C.success);
  doc.rect(M, y, 3, boxH, "F");
  doc.setFontSize(10);
  rgb(C.text);
  doc.setFont("helvetica", "bold");
  doc.text(title, M + 8, y + 7);
  doc.setFont("helvetica", "normal");
  rgb(C.text);
  doc.setFontSize(9.5);
  doc.text(bodyLines, M + 8, y + 13);
  y += boxH + 6;
}

function statRow(items) {
  needY(28);
  const colW = CW / items.length;
  items.forEach((item, i) => {
    const x = M + i * colW;
    fill(C.light);
    stroke(C.border);
    doc.setLineWidth(0.2);
    doc.roundedRect(x + 1, y, colW - 2, 24, 2, 2, "FD");
    doc.setFontSize(16);
    rgb(C.primary);
    doc.setFont("helvetica", "bold");
    doc.text(String(item.value), x + colW / 2, y + 10, { align: "center" });
    doc.setFontSize(7.5);
    rgb(C.muted);
    doc.setFont("helvetica", "normal");
    const labelLines = doc.splitTextToSize(item.label, colW - 8);
    doc.text(labelLines, x + colW / 2, y + 16, { align: "center" });
  });
  y += 30;
}

function table(headers, rows, colWidths) {
  const rowH = 8;
  const headerH = 9;
  const totalH = headerH + rows.length * rowH + 4;
  needY(totalH);

  let x = M;
  fill(C.primary);
  doc.rect(M, y, CW, headerH, "F");
  doc.setFontSize(8);
  rgb(C.white);
  doc.setFont("helvetica", "bold");
  headers.forEach((h, i) => {
    doc.text(h, x + 2, y + 6);
    x += colWidths[i];
  });
  y += headerH;

  rows.forEach((row, ri) => {
    x = M;
    if (ri % 2 === 0) {
      fill(C.light);
      doc.rect(M, y, CW, rowH, "F");
    }
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    row.forEach((cell, ci) => {
      rgb(ci === 3 && cell.startsWith("No") ? C.success : C.text);
      const lines = doc.splitTextToSize(String(cell), colWidths[ci] - 4);
      doc.text(lines.slice(0, 2), x + 2, y + 5);
      x += colWidths[ci];
    });
    y += rowH;
  });
  y += 6;
}

function twoColumn(leftTitle, leftBody, rightTitle, rightBody) {
  needY(52);
  const half = (CW - 6) / 2;
  [0, 1].forEach((i) => {
    const x = M + i * (half + 6);
    fill(C.light);
    stroke(C.border);
    doc.setLineWidth(0.2);
    doc.roundedRect(x, y, half, 46, 2, 2, "FD");
    doc.setFontSize(10);
    rgb(C.text);
    doc.setFont("helvetica", "bold");
    doc.text(i === 0 ? leftTitle : rightTitle, x + 4, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    rgb(C.muted);
    const intro = i === 0 ? leftBody.intro : rightBody.intro;
    doc.text(doc.splitTextToSize(intro, half - 8), x + 4, y + 14);
    fill(C.white);
    stroke(C.border);
    doc.roundedRect(x + 4, y + 22, half - 8, 10, 1, 1, "FD");
    doc.setFont("courier", "normal");
    doc.setFontSize(7);
    rgb(C.primary);
    const code = i === 0 ? leftBody.code : rightBody.code;
    doc.text(doc.splitTextToSize(code, half - 12)[0], x + 6, y + 29);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    rgb(C.muted);
    const note = i === 0 ? leftBody.note : rightBody.note;
    doc.text(doc.splitTextToSize(note, half - 8), x + 4, y + 38);
  });
  y += 52;
}

function faqItem(q, a) {
  const aLines = doc.splitTextToSize(a, CW - 4);
  needY(8 + aLines.length * 5 + 6);
  doc.setFontSize(9.5);
  rgb(C.text);
  doc.setFont("helvetica", "bold");
  doc.text(`Q: ${q}`, M, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  rgb(C.muted);
  doc.text(`A: ${aLines[0]}`, M + 2, y);
  if (aLines.length > 1) {
    for (let i = 1; i < aLines.length; i++) {
      y += 5;
      doc.text(aLines[i], M + 2, y);
    }
  }
  y += 8;
}

function divider() {
  needY(6);
  stroke(C.border);
  doc.setLineWidth(0.2);
  doc.line(M, y, W - M, y);
  y += 6;
}

function subheading(text) {
  needY(8);
  doc.setFontSize(10);
  rgb(C.text);
  doc.setFont("helvetica", "bold");
  doc.text(text, M, y);
  y += 7;
}

// ── Cover ─────────────────────────────────────────────────────
fill(C.primaryDark);
doc.rect(0, 0, W, H, "F");
fill(C.primary);
doc.rect(0, H * 0.36, W, 4, "F");
fill(C.accent);
doc.rect(0, H * 0.36, 72, 4, "F");

doc.setFontSize(10);
rgb(C.accent);
doc.setFont("helvetica", "bold");
doc.text("TECHNICAL BRIEF · FOR NON-TECHNICAL STAKEHOLDERS", M, 48);

doc.setFontSize(22);
rgb(C.white);
doc.setFont("helvetica", "bold");
doc.text("Website URL &", M, 66);
doc.text("Schema Validator", M, 78);
doc.setFontSize(16);
doc.text("Explanation Report", M, 90);

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
rgb([203, 213, 225]);
doc.text(`Project: ${REPORT.project}`, M, 108);
doc.text(`Prepared for: ${REPORT.preparedFor}`, M, 116);
doc.text(`Date: ${REPORT.date}`, M, 124);

fill([255, 255, 255]);
doc.roundedRect(M, 138, CW, 58, 3, 3, "F");

doc.setFontSize(9);
rgb(C.muted);
doc.setFont("helvetica", "bold");
doc.text("BOTTOM LINE", M + 10, 150);

doc.setFontSize(9.5);
doc.setFont("helvetica", "normal");
rgb(C.text);
const coverBlurb = doc.splitTextToSize(
  `When the website goes live, visitors will use the original Turkish domain ${REPORT.originalUrl} The xn-- address seen in the Schema Markup Validator is the same domain in machine-readable format — not a second website, not a bug, and not something that requires a code fix.`,
  CW - 20
);
doc.text(coverBlurb, M + 10, 158);

fill(C.success);
doc.roundedRect(M + 10, 182, 52, 10, 2, 2, "F");
doc.setFontSize(8);
rgb(C.white);
doc.setFont("helvetica", "bold");
doc.text(`STATUS: ${REPORT.status.toUpperCase()}`, M + 36, 189, { align: "center" });

doc.setFontSize(8);
rgb([148, 163, 184]);
doc.setFont("helvetica", "italic");
doc.text("Covers: IDN domains · Punycode · Schema Markup Validator · Production vs preview URLs", M, 214);
doc.text("References: validator.schema.org · WHATWG URL Standard · RFC 5891", M, 220);

pageNum = 1;
footer();

// ── Page 2: Executive summary + validator table ───────────────
newPage();
drawPageHeader();

let px = M;
px += pill("Technical Brief", px, y, "info");
px += pill("Status: No action required", px, y, "success");
y += 10;

sectionTitle("Executive Summary", "1");
paragraph(
  `Our website is configured to use one official address: kıdemtazminatıhesaplama.tr. This address appears in the website source code, sitemap, canonical tags, and structured data (JSON-LD).`
);
paragraph(
  `During SEO testing with Google's Schema Markup Validator, the tool shows two panels: SOURCE (raw page code) and DETECTED (parsed result). The SOURCE panel shows our original Turkish URL. The DETECTED panel shows an ASCII version starting with xn--. This conversion is performed automatically by the validator — not by our website sending a different address.`
);

statRow([
  { value: "1", label: "Live domain\n(what users see)" },
  { value: "Same site", label: "Punycode =\ntechnical alias" },
  { value: "0", label: "Code changes\nneeded" }
]);

callout(
  "Bottom line (read this first)",
  `Visitors will use ${REPORT.originalUrl} The xn-- address in the Schema Markup Validator is the same domain in a machine-readable format. It is not a second website, not a bug, and not something we need to fix in our code.`
);

sectionTitle("What You See in the Validator", "2");
table(
  ["Panel", "What it shows", "Who controls it", "Problem?"],
  [
    ["SOURCE", REPORT.originalUrl, "Our website code", "No — correct"],
    ["DETECTED", REPORT.punycodeUrl, "Validator (auto conversion)", "No — same domain"],
    ["Browser (live)", REPORT.originalUrl, "Domain registrar + DNS", "No — users see this"]
  ],
  [22, 52, 48, 28]
);

// ── Page 3: Analogy + technical explanation ───────────────────
newPage();
drawPageHeader();

sectionTitle("Simple Analogy", "3");
twoColumn(
  "Human-readable name",
  {
    intro: "Like writing a person's name in their native language:",
    code: "kıdemtazminatıhesaplama.tr",
    note: "This is what people see and remember."
  },
  "System-readable code",
  {
    intro: "Like a passport number for the same person:",
    code: "xn--kdemtazminathesaplama-kgdl.tr",
    note: "Computers and DNS use this behind the scenes. Same identity, different notation."
  }
);

sectionTitle("Why Does This Happen?", "4");
subheading("International Domain Names (IDN)");
paragraph(
  `Our domain contains the Turkish letter ı (dotless i). The public internet's DNS system only accepts plain ASCII characters (A–Z, 0–9, hyphens). Every IDN domain therefore has an official ASCII alias called Punycode, always starting with xn--.`,
  { size: 9.5 }
);
divider();
subheading("What our code outputs");
paragraph(
  `In src/config/site.js we define a single site URL. That URL is used everywhere: page metadata, sitemap, robots.txt, canonical links, and JSON-LD schema. The HTML source contains the original Turkish domain — confirmed in the validator's SOURCE panel.`,
  { size: 9.5 }
);
divider();
subheading("What the validator does");
paragraph(
  `When the Schema Markup Validator reads a URL, it runs it through a standard URL parser (same as browsers and Node.js). That parser converts Turkish characters to Punycode before displaying the result in the DETECTED panel. We cannot change how Google's tool displays parsed URLs.`,
  { size: 9.5 }
);

sectionTitle("Live Deployment vs. Preview URL", "5");
table(
  ["Environment", "URL", "Purpose"],
  [
    ["Production (live)", REPORT.originalUrl, "Public website — official address"],
    ["Vercel preview", REPORT.vercelPreview, "Development/testing only"],
    ["Schema canonical", REPORT.originalUrl, "Tells search engines the official domain"]
  ],
  [38, 72, 62]
);
paragraph(
  "Testing on the Vercel preview URL is normal during development. Structured data still correctly points to the production domain above.",
  { size: 8.5, color: C.muted }
);

// ── Page 4: FAQ + Conclusion ──────────────────────────────────
newPage();
drawPageHeader();

sectionTitle("FAQ for Non-Technical Readers", "6");
faqItem(
  "Will users see the xn-- address when the site is live?",
  "No. Users will see and type the normal Turkish domain in the browser. The xn-- form is mainly visible inside technical testing tools."
);
faqItem(
  "Are these two URLs different websites?",
  "No. They are the same website. xn--kdemtazminathesaplama-kgdl.tr is the computer-readable name for kıdemtazminatıhesaplama.tr."
);
faqItem(
  "Does this hurt SEO or Google ranking?",
  "No. Google understands both forms as identical. Search engines have supported international domains and Punycode for many years."
);
faqItem(
  "Do we need to change our code?",
  "No. Our code already uses the correct original URL. The Punycode display in the validator is a tool behavior, not a website error."
);
faqItem(
  "Can we force the validator to show the Turkish URL?",
  "Not in the DETECTED panel. The SOURCE panel already shows the original URL, which is what matters for the live site and search engines."
);

sectionTitle("Conclusion & Sign-Off", "7");
paragraph(
  `The website is correctly configured to launch on ${REPORT.originalUrl} The Punycode URL visible in schema validation tools is an automatic technical translation of the same domain. It does not indicate duplicate hosting, a wrong domain, or a development mistake.`
);

needY(36);
fill([239, 246, 255]);
stroke(C.info);
doc.setLineWidth(0.3);
doc.roundedRect(M, y, CW, 32, 2, 2, "FD");
doc.setFontSize(9);
rgb(C.info);
doc.setFont("helvetica", "bold");
doc.text("Suggested one-sentence explanation for clients", M + 6, y + 8);
doc.setFont("helvetica", "normal");
rgb(C.text);
doc.setFontSize(9);
const clientLine = doc.splitTextToSize(
  '"Our live site uses the Turkish domain kıdemtazminatıhesaplama.tr. The xn-- address you may see in SEO tools is just the computer version of the same domain — like a passport number for the same person."',
  CW - 12
);
doc.text(clientLine, M + 6, y + 15);
y += 38;

divider();
paragraph(
  "References: Schema Markup Validator (validator.schema.org) · WHATWG URL Standard · RFC 5891 (Internationalized Domain Names) · Project config: src/config/site.js",
  { size: 7.5, color: C.muted }
);

footer();
doc.save(OUT);
console.log(`PDF saved: ${OUT}`);
