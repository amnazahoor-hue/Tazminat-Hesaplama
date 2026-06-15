"use client";

import Link from "next/link";

export default function GuideRelatedTools({ links, title = "İlgili Hesaplama Araçları" }) {
  if (!links?.length) return null;

  return (
    <aside className="guide-related-tools" translate="no">
      <h2 className="guide-related-tools-title">{title}</h2>
      <ul className="guide-related-tools-list">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
