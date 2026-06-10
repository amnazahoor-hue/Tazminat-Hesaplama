export default function StaticSceneFallback({ variant = "intro" }) {
  if (variant === "steps") {
    return (
      <div className="guide-scene-fallback guide-scene-fallback--steps" aria-hidden="true">
        <span className="guide-scene-fallback-steps-calc">
          <span className="guide-scene-fallback-calculator-screen">561,000 ₺</span>
          <span className="guide-scene-fallback-calculator-keys" />
        </span>
        <span className="guide-scene-fallback-steps-flow" aria-hidden="true">
          <span>₺</span>
          <span>⏱</span>
          <span>×</span>
          <span>+</span>
          <span className="is-final">✓</span>
        </span>
        <span className="guide-scene-fallback-steps-payslip">4857</span>
        <span className="guide-scene-fallback-scale guide-scene-fallback-scale--steps" aria-hidden="true" />
        <span className="guide-scene-fallback-steps-formula">Brüt × Süre + İhbar</span>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="guide-scene-fallback guide-scene-fallback--featured guide-illustration-shell" aria-hidden="true">
        <span className="guide-illustration-glow guide-illustration-glow--purple" />
        <span className="guide-illustration-glow guide-illustration-glow--lime" />
        <span className="guide-scene-fallback-featured-book">
          <span className="guide-scene-fallback-featured-book-badge">2026</span>
          <strong>Tazminat Kılavuzu</strong>
          <small>İş Kanunu 4857</small>
        </span>
        <span className="guide-scene-fallback-featured-calc">
          <span className="guide-scene-fallback-calculator-screen">561,000 ₺</span>
          <span className="guide-scene-fallback-calculator-keys" />
        </span>
        <span className="guide-scene-fallback-scale guide-scene-fallback-scale--featured" aria-hidden="true" />
        <span className="guide-scene-fallback-shield">4857</span>
        <span className="guide-scene-fallback-coin-stack guide-scene-fallback-coin-stack--featured">
          <span />
          <span />
          <span className="is-top">₺</span>
        </span>
      </div>
    );
  }

  return (
    <div className="guide-scene-fallback guide-scene-fallback--intro guide-illustration-shell" aria-hidden="true">
      <span className="guide-illustration-glow guide-illustration-glow--lime" />
      <span className="guide-scene-fallback-calculator">
        <span className="guide-scene-fallback-calculator-screen">561,000 ₺</span>
        <span className="guide-scene-fallback-calculator-keys" />
        <span className="guide-scene-fallback-calculator-action">HESAPLA</span>
      </span>
      <span className="guide-scene-fallback-payslip">
        <span className="guide-scene-fallback-payslip-title">Tazminat Hesabı</span>
        <span className="guide-scene-fallback-payslip-line guide-scene-fallback-payslip-line--accent" />
        <span className="guide-scene-fallback-payslip-line" />
        <span className="guide-scene-fallback-payslip-line" />
        <span className="guide-scene-fallback-payslip-badge">4857</span>
      </span>
      <span className="guide-scene-fallback-scale" aria-hidden="true" />
      <span className="guide-scene-fallback-coin-stack">
        <span />
        <span />
        <span className="is-top">₺</span>
      </span>
    </div>
  );
}
