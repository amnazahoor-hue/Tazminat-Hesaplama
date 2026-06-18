import { IMAGES, LOGO_INTRINSIC, getImageMeta } from "@/config/images";

/** Above-the-fold brand logo — native img for reliable LCP eager loading. */
export default function BrandLogo({ className, width = LOGO_INTRINSIC.width, height = LOGO_INTRINSIC.height }) {
  const meta = getImageMeta(IMAGES.logo);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={IMAGES.logo}
      alt={meta?.alt ?? "Kıdem Tazminatı logosu"}
      title={meta?.title ?? "Kıdem Tazminatı"}
      width={width}
      height={height}
      loading="eager"
      fetchPriority="high"
      decoding="async"
      className={className}
    />
  );
}
