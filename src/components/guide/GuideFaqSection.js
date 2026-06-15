"use client";

import { useMemo } from "react";
import Accordion from "./ui/Accordion";
import { GuideSection } from "./motion/Reveal";
import SectionHeading from "./motion/SectionHeading";

function buildFaqSchema(items, includeFormula = false) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: includeFormula && faq.formula ? `${faq.answer} ${faq.formula}` : faq.answer
      }
    }))
  };
}

export default function GuideFaqSection({ id, items, includeFormula = false, headingId }) {
  const faqSchema = useMemo(() => buildFaqSchema(items, includeFormula), [items, includeFormula]);

  return (
    <GuideSection id={id} className="guide-section--faq">
      <SectionHeading id={headingId}>SSS</SectionHeading>
      <Accordion items={items} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </GuideSection>
  );
}
