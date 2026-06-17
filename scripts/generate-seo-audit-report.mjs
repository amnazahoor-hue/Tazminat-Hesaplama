/**
 * Professional SEO Audit Report PDF — Tazminat Hesaplama
 * Run: node scripts/generate-seo-audit-report.mjs
 */
import { jsPDF } from "jspdf";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "SEO-Audit-Report-Tazminat-Hesaplama.pdf");

const SITE = {
  name: "Tazminat Hesaplama",
  url: "https://kıdemtazminatıhesaplama.tr",
  stack: "Next.js 16 (App Router) · React · Turkish (tr)",
  auditDate: "11 June 2026",
  auditor: "Technical SEO Codebase Audit"
};

const INDEXABLE = [
  { path: "/", title: "Kıdem Tazminatı Hesaplaması | Formül, Örnekler ve Hesaplayıcı", titleLen: 61, descLen: 170 },
  { path: "/tazminat-hesaplama/", title: "tazminat hesaplama Aracı | Çalışan Maaşını Tahmin Etme", titleLen: 54, descLen: 151 },
  { path: "/ihbar-tazminati-nedir/", title: "İhbar Tazminatı Nedir? Uygunluk Kriterleri ve Hesaplama Yöntemi.", titleLen: 64, descLen: 166 },
  { path: "/kidem-tazminati-tavani/", title: "Kıdem Tazminatı Tavanı Hesaplayıcı | Kıdem Tazminatını Hesapla", titleLen: 62, descLen: 171 }
];

const SUPPORTING = [
  "/hakkimizda/", "/iletisim/", "/yazar/",
  "/gizlilik-politikasi/", "/kullanim-sartlari/", "/yasal-uyari/"
];

const CATEGORIES = [
  {
    id: "A",
    name: "Title Tag & Meta",
    passing: [
      ["A3", "Unique title tags per indexable page", "src/config/site.js"],
      ["A5", "Unique meta descriptions per route", "buildPageMetadata() in each page.js"],
      ["A6", "Keyword variation in descriptions", "HOME, TAZMINAT, IHBAR, TAVAN SEO blocks"]
    ],
    failing: [
      ["A1", "Primary keyword at title start", "TAZMINAT title starts lowercase; HOME keyword after pipe"],
      ["A2", "Title length 50–60 chars", "HOME 61, IHBAR 64, TAVAN 62 characters"],
      ["A4", "Meta description 140–160 chars", "All indexable pages: 151–171 characters"]
    ]
  },
  {
    id: "B",
    name: "Heading Structure",
    passing: [
      ["B1", "One H1 per page with primary keyword", "CompensationCalculator.js, guide shells"],
      ["B3", "H2 subtopic coverage", "12+ H2s on home; SectionHeading on guides"],
      ["B5", "Primary keyword in H2", "Kıdem Tazminatı Hesaplayıcısı, Nasıl Hesaplanır"],
      ["B6", "Logical hierarchy H2→H3→H4", "Calculator results block"]
    ],
    failing: [
      ["B2", "H1 aligned with title tag", "/tazminat-hesaplama H1 ≠ title topic"],
      ["B4", "H3–H6 for nested detail only", "Footer h4 panels; result card h4 labels"]
    ]
  },
  {
    id: "C",
    name: "URL Structure",
    passing: [
      ["C1", "Keyword-rich clean URLs", "/tazminat-hesaplama, /kidem-tazminati-tavani"],
      ["C2", "Lowercase hyphenated URLs", "next.config.js trailingSlash"],
      ["C4", "Consistent URL pattern", "Static App Router slugs"],
      ["C5", "No dynamic indexable URLs", "sitemap.js — 4 static routes"]
    ],
    failing: [
      ["C3", "Short URLs, no stop words", "/ihbar-tazminati-nedir contains nedir"]
    ]
  },
  {
    id: "D",
    name: "Content Quality",
    passing: [
      ["D1", "Keyword in first 100 words", "hero-copy, CompensationCalculator.js"],
      ["D4", "Matches search intent", "Calculator + rehber content"],
      ["D7", "FAQ sections present", "Home 12 Qs; GuideFaqSection on guides"],
      ["D10", "Bold for answer emphasis", "GuideBlocks.js table highlights"]
    ],
    failing: [
      ["D2", "Keyword density 1–2%", "Not measured in codebase"],
      ["D3", "LSI keywords throughout", "Partial; English fragments in tavan content"],
      ["D5", "Word count vs SERP average", "Not benchmarked"],
      ["D6", "Original non-filler content", "Cannot verify from code audit"],
      ["D8", "Answer-first per H2", "Many sections open with context"],
      ["D9", "Content date-stamped", "No visible last-updated date"]
    ]
  },
  {
    id: "E",
    name: "Image Optimization",
    passing: [
      ["E1", "WEBP format for content images", "public/images/**/*.webp"],
      ["E5", "Descriptive file names", "intro-severance-bg.webp, etc."],
      ["E7", "OG image 1200×630", "og-image.webp verified"]
    ],
    failing: [
      ["E2", "Compression <100KB", "logo.webp 99KB, guide-steps-office 98KB"],
      ["E3", "ALT on all images", "HowStepsCarousel steps 2,4,5 missing imageAlt"],
      ["E4", "Natural ALT text", "Some long keyword-heavy alts"],
      ["E6", "Lazy load below-fold", "Many below-fold images use priority"],
      ["E8", "No image-only text", "Hero carousel carries messaging role"]
    ]
  },
  {
    id: "F",
    name: "Internal Linking",
    passing: [
      ["F1", "No orphan pages", "Footer + Navbar link all routes"],
      ["F2", "Calculator linked from home", "CalcCta → #hesapla"],
      ["F4", "Descriptive anchor text", "internalLinks.js — no click here"],
      ["F6", "Topic cluster inter-linking", "linkInternalTerms.jsx"],
      ["F8", "Direct 301 redirects", "next.config.js legacy paths"],
      ["F9", "Links per page <150", "Within safe limits"]
    ],
    failing: [
      ["F3", "Links in first 3–4 paragraphs", "Home hero CTA only at top"],
      ["F5", "Exact-match anchor overuse", "Repeated kıdem/ihbar anchors"],
      ["F7", "No broken links", "Runtime 404s not verified in audit"],
      ["F10", "Related tools at page bottom", "Components removed; not rendered on guides"]
    ]
  },
  {
    id: "G",
    name: "Schema Markup",
    passing: [
      ["G1", "FAQ schema on FAQ pages", "FAQPage JSON-LD home + guides"],
      ["G3", "WebApplication on tool page", "src/app/page.js"],
      ["G4", "Organization on homepage", "buildOrganizationSchema()"],
      ["G5", "Article on guide pages", "3 guide page.js files"],
      ["G7", "No conflicting schema types", "Separate JSON-LD blocks"]
    ],
    failing: [
      ["G2", "Breadcrumb schema sitewide", "Homepage lacks BreadcrumbSchema"],
      ["G6", "Video schema", "No video embeds"],
      ["G8", "Schema validated (Rich Results)", "No validation evidence in repo"]
    ]
  },
  {
    id: "H",
    name: "Canonical & Duplicates",
    passing: [
      ["H1", "Self-referencing canonical", "buildPageMetadata() alternates.canonical"],
      ["H3", "No AMP/mobile duplicate", "Single responsive site"],
      ["H4", "Unique meta per page", "Per-route metadata exports"],
      ["H5", "Thin pages noindexed", "ROBOTS_NOINDEX_FOLLOW on trust pages"]
    ],
    failing: [
      ["H2", "Pagination canonical", "N/A — no pagination"]
    ]
  },
  {
    id: "I",
    name: "E-E-A-T & Trust",
    passing: [
      ["I2", "About Us page", "/hakkimizda/"],
      ["I3", "Privacy & Terms in footer", "LEGAL_NAV"],
      ["I4", "Authoritative citations", "mevzuat.gov.tr, resmigazete.gov.tr"],
      ["I6", "Contact with email", "iletisim/page.js"]
    ],
    failing: [
      ["I1", "Author on all content pages", "Author only on /yazar (noindex)"],
      ["I5", "Statistics freshness", "Mixed 2025/2026 data; no refresh date"]
    ]
  },
  {
    id: "J",
    name: "User Experience",
    passing: [
      ["J3", "Clear descriptive CTAs", "CalcCta: Hesapla, Şimdi Hesapla"],
      ["J4", "≤3 clicks to any page", "Flat nav + footer"],
      ["J5", "Lists for scannable content", "Guides, FAQ, bullet lists"],
      ["J7", "Multimedia adds value", "Carousel, illustrations, 3D scenes"]
    ],
    failing: [
      ["J1", "TOC for long pages", "TableOfContents removed (unused)"],
      ["J2", "Calculator above fold", "Hero section precedes #hesapla"],
      ["J6", "CLS = 0 on results", "Dynamic results; no CLS measurement"],
      ["J8", "Social sharing on pillar pages", "ShareBar removed (unused)"]
    ]
  },
  {
    id: "K",
    name: "AEO / GEO Optimization",
    passing: [
      ["K1", "Direct answer near top", "hero-copy intro"],
      ["K2", "What is [topic] section", "İşten Çıkarma Tazminatı Nedir?"],
      ["K4", "HowTo / step-by-step", "HowStepsCarousel, StepsShowcase"],
      ["K5", "Speakable schema", "SPEAKABLE_SELECTORS + buildSpeakableSchema"],
      ["K7", "Tabular data", "SeveranceBreakdownTable, guide tables"],
      ["K9", "Result explanations", "result-note, eligNote messages"],
      ["K10", "Citation-friendly phrasing", "İş Kanunu 4857 references"]
    ],
    failing: [
      ["K3", "Natural FAQ phrasing", "Guide FAQs use S1/S2 prefixes"],
      ["K6", "Self-contained H2 sections", "Long multi-topic blocks"],
      ["K8", "Key Takeaways near top", "Özet section at page bottom"],
      ["K11", "Wikipedia/Wikidata presence", "Not evidenced"],
      ["K12", "Brand + tool off-site pairing", "Not verifiable from code"],
      ["K13", "Avoid hedging language", "genellikle, çoğu durumda used"],
      ["K14", "AI citation testing", "No test artifacts"],
      ["K15", "Indexable static result pages", "Results client-side only"]
    ]
  }
];

const PRIORITY = [
  { p: "P1 — Critical", items: "Meta title/description lengths (A2, A4); calculator above fold (J2); homepage breadcrumb schema (G2)" },
  { p: "P2 — High", items: "Missing image ALT (E3); lazy-load below-fold (E6); author byline on guides (I1); FAQ natural phrasing (K3)" },
  { p: "P3 — Medium", items: "H1/title alignment (B2); content date stamps (D9); related tools footer (F10); Key Takeaways position (K8)" },
  { p: "P4 — Low", items: "Wikipedia presence (K11); AI citation tests (K14); video schema (G6); TOC for long pages (J1)" }
];

// ── PDF engine ──────────────────────────────────────────────
const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
const W = 210;
const H = 297;
const M = 18;
const CW = W - M * 2;
let pageNum = 0;

const C = {
  primary: [79, 70, 229],
  primaryDark: [55, 48, 163],
  accent: [198, 242, 78],
  pass: [22, 163, 74],
  fail: [220, 38, 38],
  warn: [217, 119, 6],
  text: [30, 41, 59],
  muted: [100, 116, 139],
  light: [248, 250, 252],
  border: [226, 232, 240],
  white: [255, 255, 255]
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
  doc.text(SITE.name, M, H - 8);
  doc.text(`Page ${pageNum}`, W - M, H - 8, { align: "right" });
  doc.text("Confidential — Codebase SEO Audit", W / 2, H - 8, { align: "center" });
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

let y = 0;

function drawPageHeader() {
  fill(C.primary);
  doc.rect(0, 0, W, 12, "F");
  doc.setFontSize(8);
  rgb(C.white);
  doc.setFont("helvetica", "bold");
  doc.text("SEO AUDIT REPORT", M, 8);
  doc.setFont("helvetica", "normal");
  doc.text(SITE.url, W - M, 8, { align: "right" });
  y = 22;
}

// ── Cover ───────────────────────────────────────────────────
fill(C.primaryDark);
doc.rect(0, 0, W, H, "F");
fill(C.primary);
doc.rect(0, H * 0.38, W, 4, "F");
fill(C.accent);
doc.rect(0, H * 0.38, 60, 4, "F");

doc.setFontSize(11);
rgb(C.accent);
doc.setFont("helvetica", "bold");
doc.text("TECHNICAL SEO AUDIT", M, 52);

doc.setFontSize(28);
rgb(C.white);
doc.text("Tazminat", M, 68);
doc.text("Hesaplama", M, 80);

doc.setFontSize(12);
doc.setFont("helvetica", "normal");
rgb([203, 213, 225]);
doc.text("Kıdem · İhbar · Tazminat Hesaplama Platformu", M, 92);

doc.setFontSize(10);
doc.text(`Site URL: ${SITE.url}`, M, 108);
doc.text(`Audit Date: ${SITE.auditDate}`, M, 116);
doc.text(`Framework: ${SITE.stack}`, M, 124);
doc.text(`Method: Read-only codebase analysis`, M, 132);

// Score box on cover
fill([255, 255, 255]);
doc.roundedRect(M, 148, CW, 52, 3, 3, "F");
const totalPass = CATEGORIES.reduce((s, c) => s + c.passing.length, 0);
const totalFail = CATEGORIES.reduce((s, c) => s + c.failing.length, 0);
const total = totalPass + totalFail;
const score = Math.round((totalPass / total) * 100);

doc.setFontSize(36);
rgb(C.primary);
doc.setFont("helvetica", "bold");
doc.text(`${score}%`, M + 12, 178);
doc.setFontSize(10);
rgb(C.muted);
doc.setFont("helvetica", "normal");
doc.text("Overall Compliance Score", M + 12, 186);
doc.text(`${totalPass} passing  ·  ${totalFail} gaps  ·  ${total} checklist items`, M + 12, 194);

fill(C.pass);
doc.roundedRect(M + 100, 158, 36, 14, 2, 2, "F");
doc.setFontSize(9);
rgb(C.white);
doc.setFont("helvetica", "bold");
doc.text(`PASS: ${totalPass}`, M + 118, 167, { align: "center" });

fill(C.fail);
doc.roundedRect(M + 140, 158, 36, 14, 2, 2, "F");
doc.text(`GAPS: ${totalFail}`, M + 158, 167, { align: "center" });

doc.setFontSize(9);
rgb([148, 163, 184]);
doc.setFont("helvetica", "italic");
doc.text("This report reflects implementation status found in source code at audit time.", M, 220);
doc.text("No live crawl or Rich Results Test validation was performed.", M, 226);

pageNum = 1;
footer();

// ── Executive Summary ───────────────────────────────────────
newPage();
drawPageHeader();

doc.setFontSize(16);
rgb(C.text);
doc.setFont("helvetica", "bold");
doc.text("1. Executive Summary", M, y);
y += 10;

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
rgb(C.text);
const exec = [
  "Tazminat Hesaplama is a Next.js compensation calculator with four indexable content routes and six supporting trust/legal pages (noindex). The site demonstrates strong foundations in structured data (FAQ, WebApplication, Article, Speakable), internal topic clustering, and Turkish-language content depth.",
  `The audit evaluated ${total} checklist items across 11 categories (A–K). ${totalPass} items pass (${score}%), while ${totalFail} items require attention — primarily meta tag length optimization, mobile calculator placement, image ALT coverage, and AEO content formatting.`,
  "Highest-impact gaps: meta descriptions exceed 160 characters on all indexable pages; the calculator requires scrolling past the hero on mobile; homepage lacks breadcrumb schema; several carousel images lack ALT text."
];
for (const p of exec) {
  const lines = doc.splitTextToSize(p, CW);
  needY(lines.length * 5 + 4);
  doc.text(lines, M, y);
  y += lines.length * 5 + 4;
}

y += 4;
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
rgb(C.text);
needY(10);
doc.text("1.1 Category Scorecard", M, y);
y += 8;

for (const cat of CATEGORIES) {
  const pass = cat.passing.length;
  const fail = cat.failing.length;
  const pct = Math.round((pass / (pass + fail)) * 100);
  needY(10);
  fill(C.light);
  stroke(C.border);
  doc.setLineWidth(0.2);
  doc.roundedRect(M, y - 4, CW, 8, 1, 1, "FD");
  doc.setFontSize(9);
  rgb(C.text);
  doc.setFont("helvetica", "bold");
  doc.text(`${cat.id}. ${cat.name}`, M + 3, y + 1);
  doc.setFont("helvetica", "normal");
  rgb(C.muted);
  doc.text(`${pass}✓  ${fail}✗`, M + 90, y + 1);
  // progress bar
  const barX = M + 115;
  const barW = 55;
  fill(C.border);
  doc.roundedRect(barX, y - 1.5, barW, 3, 1, 1, "F");
  fill(pct >= 70 ? C.pass : pct >= 50 ? C.warn : C.fail);
  doc.roundedRect(barX, y - 1.5, barW * (pct / 100), 3, 1, 1, "F");
  doc.setFontSize(8);
  rgb(C.text);
  doc.text(`${pct}%`, barX + barW + 4, y + 1);
  y += 10;
}

// ── Scope & Pages ───────────────────────────────────────────
newPage();
drawPageHeader();

doc.setFontSize(16);
rgb(C.text);
doc.setFont("helvetica", "bold");
doc.text("2. Audit Scope & Methodology", M, y);
y += 10;

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
const method = [
  "Scope: Full read-only analysis of src/app routes, components, config, public assets, next.config.js, sitemap.js, robots.js, and SEO utilities.",
  "Method: Static code review against a 87-point SEO checklist (Title/Meta, Headings, URLs, Content, Images, Links, Schema, Canonical, E-E-A-T, UX, AEO/GEO).",
  "Limitations: No live HTTP crawl, no Google Rich Results Test, no SERP benchmarking, no keyword density measurement, no CLS/Lighthouse runtime tests.",
  "Post-audit note: Unused social links and dead link components were removed from codebase after initial audit."
];
for (const p of method) {
  const lines = doc.splitTextToSize(p, CW);
  needY(lines.length * 5 + 3);
  doc.text(lines, M, y);
  y += lines.length * 5 + 3;
}

y += 6;
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
doc.text("2.1 Indexable Pages", M, y);
y += 8;

// Table header
fill(C.primary);
doc.rect(M, y - 4, CW, 7, "F");
doc.setFontSize(8);
rgb(C.white);
doc.setFont("helvetica", "bold");
doc.text("URL", M + 2, y);
doc.text("Title Chars", M + 68, y);
doc.text("Desc Chars", M + 92, y);
doc.text("Status", M + 118, y);
y += 8;

for (const row of INDEXABLE) {
  needY(8);
  fill(C.light);
  doc.rect(M, y - 4, CW, 7, "F");
  doc.setFontSize(8);
  rgb(C.text);
  doc.setFont("helvetica", "normal");
  doc.text(row.path, M + 2, y);
  const titleOk = row.titleLen >= 50 && row.titleLen <= 60;
  const descOk = row.descLen >= 140 && row.descLen <= 160;
  rgb(titleOk ? C.pass : C.fail);
  doc.text(String(row.titleLen), M + 78, y);
  rgb(descOk ? C.pass : C.fail);
  doc.text(String(row.descLen), M + 102, y);
  rgb(titleOk && descOk ? C.pass : C.warn);
  doc.text(titleOk && descOk ? "OK" : "Review", M + 118, y);
  y += 8;
}

y += 6;
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
rgb(C.text);
doc.text("2.2 Supporting Pages (noindex)", M, y);
y += 7;
doc.setFontSize(9);
doc.setFont("helvetica", "normal");
rgb(C.muted);
doc.text(SUPPORTING.join("   "), M, y);
y += 10;

// ── Detailed findings per category ──────────────────────────
for (const cat of CATEGORIES) {
  newPage();
  drawPageHeader();

  fill(C.primary);
  doc.rect(M, y - 5, CW, 10, "F");
  doc.setFontSize(12);
  rgb(C.white);
  doc.setFont("helvetica", "bold");
  doc.text(`${cat.id}. ${cat.name}`, M + 3, y + 1);
  const cp = cat.passing.length;
  const cf = cat.failing.length;
  doc.setFontSize(9);
  doc.text(`${cp} Pass · ${cf} Gaps`, W - M - 3, y + 1, { align: "right" });
  y += 12;

  if (cat.passing.length) {
    doc.setFontSize(10);
    rgb(C.pass);
    doc.setFont("helvetica", "bold");
    doc.text("Passing", M, y);
    y += 6;
    for (const [id, name, loc] of cat.passing) {
      needY(12);
      fill([240, 253, 244]);
      stroke([187, 247, 208]);
      doc.setLineWidth(0.15);
      doc.roundedRect(M, y - 3.5, CW, 9, 1, 1, "FD");
      doc.setFontSize(8);
      rgb(C.pass);
      doc.setFont("helvetica", "bold");
      doc.text(id, M + 2, y + 1.5);
      doc.setFont("helvetica", "bold");
      rgb(C.text);
      doc.text(name, M + 12, y + 1.5);
      doc.setFont("helvetica", "normal");
      rgb(C.muted);
      const locLines = doc.splitTextToSize(loc, CW - 14);
      doc.text(locLines[0], M + 12, y + 5.5);
      y += 11;
    }
    y += 3;
  }

  if (cat.failing.length) {
    needY(8);
    doc.setFontSize(10);
    rgb(C.fail);
    doc.setFont("helvetica", "bold");
    doc.text("Gaps / Action Required", M, y);
    y += 6;
    for (const [id, name, reason] of cat.failing) {
      needY(14);
      fill([254, 242, 242]);
      stroke([254, 202, 202]);
      doc.setLineWidth(0.15);
      doc.roundedRect(M, y - 3.5, CW, 11, 1, 1, "FD");
      doc.setFontSize(8);
      rgb(C.fail);
      doc.setFont("helvetica", "bold");
      doc.text(id, M + 2, y + 1.5);
      doc.setFont("helvetica", "bold");
      rgb(C.text);
      doc.text(name, M + 12, y + 1.5);
      doc.setFont("helvetica", "normal");
      rgb(C.muted);
      const rLines = doc.splitTextToSize(reason, CW - 14);
      doc.text(rLines, M + 12, y + 5.5);
      y += 6 + rLines.length * 4;
    }
  }
}

// ── Priority Recommendations ────────────────────────────────
newPage();
drawPageHeader();

doc.setFontSize(16);
rgb(C.text);
doc.setFont("helvetica", "bold");
doc.text("3. Priority Recommendations", M, y);
y += 10;

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
rgb(C.text);
const recIntro = "The following prioritization helps focus development effort on items with the highest SEO and user-impact return. Items are ordered by expected ranking, crawl, and conversion impact.";
const recLines = doc.splitTextToSize(recIntro, CW);
doc.text(recLines, M, y);
y += recLines.length * 5 + 8;

for (const row of PRIORITY) {
  needY(18);
  fill(C.light);
  stroke(C.border);
  doc.setLineWidth(0.2);
  doc.roundedRect(M, y - 4, CW, 14, 2, 2, "FD");
  doc.setFontSize(10);
  rgb(C.primary);
  doc.setFont("helvetica", "bold");
  doc.text(row.p, M + 4, y + 2);
  doc.setFontSize(9);
  rgb(C.text);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(row.items, CW - 10);
  doc.text(lines, M + 4, y + 8);
  y += 14 + (lines.length - 1) * 4;
}

y += 8;
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
rgb(C.text);
needY(10);
doc.text("3.1 Quick Wins (< 1 day)", M, y);
y += 7;
doc.setFontSize(9);
doc.setFont("helvetica", "normal");
rgb(C.text);
const qw = [
  "• Trim meta descriptions to 140–160 characters on all 4 indexable pages (site.js)",
  "• Shorten title tags to 50–60 chars; capitalize TAZMINAT_PAGE_SEO title",
  "• Add imageAlt for HowStepsCarousel steps 2, 4, 5",
  "• Remove priority flag from below-fold images; enable lazy loading",
  "• Add BreadcrumbSchema to homepage (src/app/page.js)"
];
for (const item of qw) {
  needY(6);
  doc.text(item, M + 2, y);
  y += 6;
}

y += 4;
doc.setFontSize(12);
doc.setFont("helvetica", "bold");
needY(10);
doc.text("3.2 Strategic Improvements (1–2 weeks)", M, y);
y += 7;
doc.setFontSize(9);
doc.setFont("helvetica", "normal");
const st = [
  "• Move calculator (#hesapla) above fold on mobile or add sticky CTA",
  "• Add author byline / Evren Mazı attribution on guide pages",
  "• Rewrite guide FAQ questions to natural PAA phrasing (remove S1/S2 prefixes)",
  "• Add visible last-updated date on content pages and sitemap lastModified",
  "• Compress images >95KB; remove unused logo.jpeg duplicate",
  "• Re-introduce related-tools footer on guide pages with valid internal links"
];
for (const item of st) {
  needY(6);
  doc.text(item, M + 2, y);
  y += 6;
}

// ── Schema inventory ────────────────────────────────────────
newPage();
drawPageHeader();

doc.setFontSize(16);
rgb(C.text);
doc.setFont("helvetica", "bold");
doc.text("4. Structured Data Inventory", M, y);
y += 10;

const schemaRows = [
  ["Homepage /", "Organization, WebApplication, Speakable, FAQPage", "Active"],
  ["/tazminat-hesaplama/", "Article, Speakable, FAQPage, BreadcrumbList", "Active"],
  ["/ihbar-tazminati-nedir/", "Article, Speakable, FAQPage, BreadcrumbList", "Active"],
  ["/kidem-tazminati-tavani/", "Article, Speakable, FAQPage, BreadcrumbList", "Active"],
  ["Legal / About / Contact", "BreadcrumbList, Speakable", "Active (noindex)"],
  ["/yazar/", "ProfilePage, Person, Speakable", "Active (noindex)"],
  ["Sitewide", "VideoObject", "Missing"]
];

fill(C.primary);
doc.rect(M, y - 4, CW, 7, "F");
doc.setFontSize(8);
rgb(C.white);
doc.setFont("helvetica", "bold");
doc.text("Page", M + 2, y);
doc.text("Schema Types", M + 45, y);
doc.text("Status", M + 145, y);
y += 8;

for (const [page, types, status] of schemaRows) {
  needY(9);
  fill(C.light);
  doc.rect(M, y - 4, CW, 8, "F");
  doc.setFontSize(8);
  rgb(C.text);
  doc.setFont("helvetica", "normal");
  doc.text(page, M + 2, y);
  doc.text(types, M + 45, y);
  rgb(status === "Missing" ? C.fail : C.pass);
  doc.text(status, M + 145, y);
  y += 9;
}

y += 10;
doc.setFontSize(16);
doc.setFont("helvetica", "bold");
rgb(C.text);
doc.text("5. Conclusion", M, y);
y += 10;

doc.setFontSize(10);
doc.setFont("helvetica", "normal");
const conclusion = [
  `Tazminat Hesaplama achieves a ${score}% compliance rate against the audited checklist, with particular strength in schema markup, internal linking architecture, FAQ coverage, and Turkish-language content depth.`,
  "The platform is well-positioned for organic search in the kıdem tazminatı niche. Addressing meta tag length, mobile calculator visibility, and image accessibility will yield the fastest measurable SEO improvements.",
  "A follow-up audit after implementing P1 and P2 recommendations should include live Rich Results Test validation, Lighthouse CLS measurement, and SERP word-count benchmarking."
];
for (const p of conclusion) {
  const lines = doc.splitTextToSize(p, CW);
  needY(lines.length * 5 + 4);
  doc.text(lines, M, y);
  y += lines.length * 5 + 4;
}

y += 12;
stroke(C.border);
doc.line(M, y, W - M, y);
y += 8;
doc.setFontSize(9);
rgb(C.muted);
doc.setFont("helvetica", "italic");
doc.text("End of Report", W / 2, y, { align: "center" });
doc.text(`Generated ${SITE.auditDate} · ${SITE.auditor}`, W / 2, y + 6, { align: "center" });

footer();

writeFileSync(OUT, Buffer.from(doc.output("arraybuffer")));
console.log("Professional SEO report written to:", OUT);
console.log(`Score: ${score}% (${totalPass}/${total} passing)`);
