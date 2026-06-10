export default function TickMark({ className = "", size = "md" }) {
  const sizeClass = size === "sm" ? " tick-mark--sm" : "";
  const extraClass = className ? ` ${className}` : "";

  return <span className={`tick-mark${sizeClass}${extraClass}`} aria-hidden="true" />;
}
