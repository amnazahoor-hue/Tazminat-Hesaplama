"use client";

import { useCallback, useMemo, useRef } from "react";
import { CROSS_PAGE_LINK_RULES, PAGE_LINK_POLICY } from "@/config/internalLinks";
import { linkInternalTerms } from "@/utils/linkInternalTerms";

export function usePageInternalLinks(pagePath) {
  const linkedKeysRef = useRef(new Set());
  const policy = PAGE_LINK_POLICY[pagePath] ?? { maxLinks: 0, allowedKeys: [] };

  const excludeKeys = useMemo(() => {
    const allowed = new Set(policy.allowedKeys);
    return new Set(CROSS_PAGE_LINK_RULES.map((rule) => rule.key).filter((key) => !allowed.has(key)));
  }, [policy.allowedKeys]);

  const linkText = useCallback(
    (text) => {
      if (!text || typeof text !== "string") return text;
      if (linkedKeysRef.current.size >= policy.maxLinks) return text;
      return linkInternalTerms(text, linkedKeysRef.current, excludeKeys);
    },
    [excludeKeys, policy.maxLinks]
  );

  return linkText;
}
