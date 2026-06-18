"use client";

import GuideFaqSection from "./GuideFaqSection";
import { TAZMINAT_GUIDE_FAQ_ITEMS } from "@/data/tazminatGuideFaqItems";

export default function GuideFaq() {
  return <GuideFaqSection id="guide-sss" items={TAZMINAT_GUIDE_FAQ_ITEMS} />;
}
