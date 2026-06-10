"use client";

import RelatedGuideCard from "./RelatedGuideCard";

export default function GuidePageEnd({ href, title, description, linkLabel }) {
  return (
    <section className="section content-section guide-section guide-section--end">
      <div className="container">
        <RelatedGuideCard href={href} title={title} description={description} linkLabel={linkLabel} />
      </div>
    </section>
  );
}
