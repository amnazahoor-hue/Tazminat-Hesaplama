"use client";

import { useMemo } from "react";
import Accordion from "../ui/Accordion";
import { GuideSection } from "../motion/Reveal";
import SectionHeading from "../motion/SectionHeading";
import { TAVAN_FAQ_ITEMS } from "@/data/tavanGuideContent";

export default function TavanGuideFaq() {
  const faqSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: TAVAN_FAQ_ITEMS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    }),
    []
  );

  return (
    <GuideSection id="tavan-sss" alt className="guide-section--faq">
      <SectionHeading>SSS</SectionHeading>
      <Accordion items={TAVAN_FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </GuideSection>
  );
}
