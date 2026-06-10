export default function CalcCta({
  as: Tag = "a",
  children,
  className = "",
  size = "default",
  ...props
}) {
  const sizeClass = size === "large" ? " calc-cta--lg" : "";

  return (
    <Tag className={`calc-cta${sizeClass}${className ? ` ${className}` : ""}`} {...props}>
      {children}
      <span className="calc-cta-icon" aria-hidden="true">
        ↗
      </span>
    </Tag>
  );
}
