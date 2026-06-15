"use client";

import GuideRelatedTools from "./GuideRelatedTools";
import RelatedGuideCard from "./RelatedGuideCard";
import ShareBar from "./ShareBar";

export default function GuidePageFooter({ relatedLinks, relatedCard, shareUrl, shareTitle }) {
  const stacked = Boolean(relatedCard);

  return (
    <section className="section content-section guide-section guide-section--end guide-page-footer">
      <div className={`container guide-page-footer-inner${stacked ? " guide-page-footer-inner--stacked" : ""}`}>
        {relatedCard ? (
          <RelatedGuideCard {...relatedCard} />
        ) : (
          <GuideRelatedTools links={relatedLinks} />
        )}
        <ShareBar url={shareUrl} title={shareTitle} />
      </div>
    </section>
  );
}