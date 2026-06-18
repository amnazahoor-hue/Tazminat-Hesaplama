import { IMAGES, getImageMeta } from "@/config/images";

/** Above-the-fold brand logo — native img for reliable LCP eager loading. */
export default function BrandLogo({ className, width = 88, height = 88 }) {
  const meta = getImageMeta(IMAGES.logo);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={IMAGES.logo}
      alt={meta?.alt ?? "Tazminat Hesaplama logosu"}
      title={meta?.title ?? "Tazminat Hesaplama"}
      width={width}
      height={height}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className={className}
    />
  );
}
