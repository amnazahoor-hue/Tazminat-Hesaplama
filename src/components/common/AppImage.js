import Image from "next/image";
import { getImageMeta } from "@/config/images";

/**
 * Lazy-loads by default. Pass `priority` only for above-the-fold / LCP images.
 * Resolves `alt` and `title` from IMAGE_META when omitted.
 */
export default function AppImage({ priority = false, loading, alt, title, src, ...props }) {
  const meta = getImageMeta(src);
  const resolvedAlt = alt ?? meta?.alt ?? "";
  const resolvedTitle = title ?? meta?.title ?? resolvedAlt;

  return (
    <Image
      {...props}
      src={src}
      alt={resolvedAlt}
      title={resolvedTitle}
      priority={priority}
      loading={priority ? "eager" : loading ?? "lazy"}
    />
  );
}
