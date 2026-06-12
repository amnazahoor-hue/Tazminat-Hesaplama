export default function AboutOfferingsIllustration() {
  return (
    <div className="about-offerings-visual" aria-hidden="true">
      <span className="about-offerings-visual-glow" />
      <svg className="about-offerings-art" viewBox="0 0 320 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="abo-purple" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="abo-lime" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d9f99d" />
            <stop offset="1" stopColor="#c6f24e" />
          </linearGradient>
          <linearGradient id="abo-panel" x1="40" y1="60" x2="280" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#eef2ff" />
          </linearGradient>
          <filter id="abo-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#4f46e5" floodOpacity="0.2" />
          </filter>
        </defs>

        <circle cx="160" cy="180" r="118" stroke="rgba(79,70,229,0.1)" strokeWidth="1.5" strokeDasharray="6 10" />
        <circle cx="160" cy="180" r="96" stroke="rgba(198,242,78,0.22)" strokeWidth="1" />

        <g className="about-offerings-float about-offerings-float--calc" filter="url(#abo-soft)">
          <rect x="72" y="68" width="176" height="208" rx="22" fill="url(#abo-panel)" stroke="rgba(79,70,229,0.14)" strokeWidth="1.5" />
          <rect x="92" y="88" width="88" height="12" rx="6" fill="url(#abo-purple)" fillOpacity="0.88" />
          <rect x="92" y="110" width="136" height="8" rx="4" fill="rgba(79,70,229,0.1)" />
          <rect x="92" y="126" width="118" height="8" rx="4" fill="rgba(79,70,229,0.08)" />
          <rect x="92" y="150" width="136" height="54" rx="14" fill="rgba(79,70,229,0.06)" stroke="rgba(79,70,229,0.1)" />
          <rect x="104" y="164" width="52" height="8" rx="4" fill="rgba(79,70,229,0.12)" />
          <rect x="104" y="180" width="72" height="8" rx="4" fill="rgba(79,70,229,0.1)" />
          <rect x="104" y="196" width="44" height="8" rx="4" fill="rgba(79,70,229,0.08)" />
          <rect x="92" y="216" width="136" height="44" rx="12" fill="url(#abo-purple)" fillOpacity="0.12" />
          <text x="160" y="244" textAnchor="middle" fill="#4338ca" fontSize="14" fontWeight="800" fontFamily="system-ui, sans-serif">
            ₺ 128.450
          </text>
          <rect x="104" y="252" width="112" height="10" rx="5" fill="url(#abo-lime)" />
        </g>

        <g className="about-offerings-float about-offerings-float--coin">
          <circle cx="248" cy="98" r="26" fill="url(#abo-lime)" />
          <circle cx="248" cy="98" r="20" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
          <text x="248" y="104" textAnchor="middle" fill="#365314" fontSize="15" fontWeight="800" fontFamily="system-ui, sans-serif">
            ₺
          </text>
        </g>

        <g className="about-offerings-float about-offerings-float--doc">
          <rect x="44" y="228" width="78" height="96" rx="14" fill="#ffffff" stroke="rgba(79,70,229,0.12)" strokeWidth="1.2" />
          <rect x="56" y="244" width="42" height="6" rx="3" fill="rgba(79,70,229,0.18)" />
          <rect x="56" y="258" width="54" height="5" rx="2.5" fill="rgba(79,70,229,0.1)" />
          <rect x="56" y="270" width="48" height="5" rx="2.5" fill="rgba(79,70,229,0.08)" />
          <rect x="56" y="288" width="54" height="22" rx="8" fill="rgba(198,242,78,0.45)" />
        </g>

        <g className="about-offerings-float about-offerings-float--chart">
          <rect x="214" y="248" width="72" height="72" rx="16" fill="rgba(255,255,255,0.92)" stroke="rgba(79,70,229,0.12)" strokeWidth="1.2" />
          <rect x="228" y="292" width="10" height="16" rx="3" fill="rgba(79,70,229,0.18)" />
          <rect x="244" y="280" width="10" height="28" rx="3" fill="url(#abo-purple)" fillOpacity="0.55" />
          <rect x="260" y="268" width="10" height="40" rx="3" fill="url(#abo-lime)" />
        </g>

        <circle className="about-offerings-spark about-offerings-spark--1" cx="58" cy="118" r="4" fill="#c6f24e" />
        <circle className="about-offerings-spark about-offerings-spark--2" cx="286" cy="196" r="3" fill="rgba(79,70,229,0.35)" />
      </svg>
    </div>
  );
}
