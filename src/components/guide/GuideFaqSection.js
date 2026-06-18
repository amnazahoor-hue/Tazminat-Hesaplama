"use client";

import Accordion from "./ui/Accordion";
import { GuideSection } from "./motion/Reveal";
import SectionHeading from "./motion/SectionHeading";

export default function GuideFaqSection({ id, items, headingId, linkExcludeKeys }) {
  return (
    <GuideSection id={id} className="guide-section--faq">
      <SectionHeading id={headingId}>Sıkça Sorulan Sorular</SectionHeading>
      <Accordion items={items} linkExcludeKeys={linkExcludeKeys} />
    </GuideSection>
  );
}
