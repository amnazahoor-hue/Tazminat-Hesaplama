import Link from "next/link";
import { CROSS_PAGE_LINK_RULES } from "@/config/internalLinks";

export function InternalLink({ href, children }) {
  return (
    <Link href={href} className="text-internal-link">
      {children}
    </Link>
  );
}

export function linkInternalTerms(text, linkedKeys = new Set(), excludeKeys = new Set()) {
  if (!text || typeof text !== "string") return text;

  let parts = [text];
  let changed = false;

  for (const rule of CROSS_PAGE_LINK_RULES) {
    if (linkedKeys.has(rule.key) || excludeKeys.has(rule.key)) continue;

    const nextParts = [];
    let linked = false;

    for (const part of parts) {
      if (typeof part !== "string" || linked) {
        nextParts.push(part);
        continue;
      }

      const index = part.indexOf(rule.term);
      if (index === -1) {
        nextParts.push(part);
        continue;
      }

      linked = true;
      changed = true;
      linkedKeys.add(rule.key);

      if (index > 0) nextParts.push(part.slice(0, index));
      nextParts.push(
        <InternalLink key={`${rule.key}-${index}`} href={rule.href}>
          {rule.term}
        </InternalLink>
      );
      if (index + rule.term.length < part.length) {
        nextParts.push(part.slice(index + rule.term.length));
      }
    }

    parts = nextParts;
  }

  if (!changed) return text;
  if (parts.length === 1) return parts[0];
  return <>{parts}</>;
}
