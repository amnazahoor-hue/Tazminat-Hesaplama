"use client";

import { useCallback, useEffect, useState } from "react";
import { capitalizeHeadingText, detectHeadingLocale } from "@/utils/capitalizeHeading";

export function useHeadingLocale() {
  const [locale, setLocale] = useState(HEADING_LOCALE_TR_FALLBACK);

  useEffect(() => {
    const sync = () => setLocale(detectHeadingLocale());
    sync();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang", "class"]
    });

    return () => observer.disconnect();
  }, []);

  return locale;
}

const HEADING_LOCALE_TR_FALLBACK = "tr-TR";

export function useCapitalizeHeadingText() {
  const locale = useHeadingLocale();

  return useCallback((text) => capitalizeHeadingText(text, locale), [locale]);
}
