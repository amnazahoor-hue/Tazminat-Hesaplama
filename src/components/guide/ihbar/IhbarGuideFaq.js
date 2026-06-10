"use client";

import { useMemo } from "react";
import Accordion from "../ui/Accordion";
import { GuideSection } from "../motion/Reveal";
import SectionHeading from "../motion/SectionHeading";
import { IHBAR_FAQ_ITEMS } from "@/data/ihbarGuideContent";

export default function IhbarGuideFaq() {
  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: IHBAR_FAQ_ITEMS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.formula ? `${faq.answer} ${faq.formula}` : faq.answer
        }
      }))
    }),
    []
  );

  return (
    <GuideSection id="ihbar-sss" alt className="guide-section--faq">
      <SectionHeading>SSS</SectionHeading>
      <Accordion items={IHBAR_FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </GuideSection>
  );
}
