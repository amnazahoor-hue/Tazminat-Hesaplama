import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = fs.readFileSync(path.join(root, "src/components/CompensationCalculator.js"), "utf8");
const lines = src.split(/\r?\n/);
const body = lines.slice(738, 1785).join("\n");

const header = `"use client";

import dynamic from "next/dynamic";
import AppImage from "@/components/common/AppImage";
import Link from "next/link";
import CalcCta from "@/components/common/CalcCta";
import { H2, H3, H4 } from "@/components/common/Heading";
import { TAZMINAT_HESAPLAMA_PATH } from "@/config/site";
import { DISABLE_AUTO_INTERNAL_LINKS } from "@/config/internalLinks";
import { IMAGES, IMAGE_ALTS, getImageMeta } from "@/config/images";
import TickMark from "@/components/common/TickMark";
import { ShieldCheck, Sparkles } from "lucide-react";
import { HOME_FAQ_ITEMS } from "@/data/homeFaqItems";

const HowStepsCarousel = dynamic(() => import("@/components/HowStepsCarousel"));
const FaqAccordion = dynamic(() => import("@/components/common/FaqAccordion"));
const SummaryShowcaseIllustration = dynamic(() => import("@/components/SummaryShowcaseIllustration"));

function ContentSection({ id, alt, children, reveal = "up" }) {
  return (
    <section className={\`section content-section\${alt ? " alt" : ""}\`} id={id}>
      <div className={\`container scroll-reveal scroll-reveal--\${reveal}\`}>{children}</div>
    </section>
  );
}

export default function HomeBelowFoldContent({ linkText }) {
  return (
    <>
`;

const footer = `
    </>
  );
}
`;

const outDir = path.join(root, "src/components/home");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "HomeBelowFoldContent.js"), header + body + footer);
console.log("Wrote HomeBelowFoldContent.js");
