"use client";

import GuideFaqSection from "./GuideFaqSection";
import { TAZMINAT_GUIDE_FAQ_ITEMS } from "@/data/tazminatGuideFaqItems";
import { DISABLE_AUTO_INTERNAL_LINKS } from "@/config/internalLinks";

export default function GuideFaq() {
  return (
    <GuideFaqSection id="guide-sss" items={TAZMINAT_GUIDE_FAQ_ITEMS} linkExcludeKeys={DISABLE_AUTO_INTERNAL_LINKS} />
  );
}
