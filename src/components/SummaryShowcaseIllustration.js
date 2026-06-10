export default function SummaryShowcaseIllustration() {
  return (
    <div className="summary-3d-scene" aria-hidden="true">
      <div className="summary-3d-glow summary-3d-glow--lime" />
      <div className="summary-3d-glow summary-3d-glow--white" />

      <div className="summary-3d-stage">
        <svg className="summary-3d-art" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sum3d-sky" x1="60" y1="40" x2="360" y2="380" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="sum3d-doc-front" x1="118" y1="118" x2="302" y2="318" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="1" stopColor="#eef2ff" stopOpacity="0.88" />
            </linearGradient>
            <linearGradient id="sum3d-doc-top" x1="118" y1="92" x2="302" y2="132" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#dbeafe" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="sum3d-doc-side" x1="302" y1="118" x2="338" y2="318" gradientUnits="userSpaceOnUse">
              <stop stopColor="#c7d2fe" />
              <stop offset="1" stopColor="#818cf8" stopOpacity="0.72" />
            </linearGradient>
            <linearGradient id="sum3d-card-front" x1="72" y1="228" x2="188" y2="332" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.92" />
              <stop offset="1" stopColor="#f5f3ff" stopOpacity="0.78" />
            </linearGradient>
            <linearGradient id="sum3d-lime" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#d9f99d" />
              <stop offset="1" stopColor="#c6f24e" />
            </linearGradient>
            <linearGradient id="sum3d-purple" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
            <filter id="sum3d-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#312e81" floodOpacity="0.35" />
            </filter>
            <filter id="sum3d-soft" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#4f46e5" floodOpacity="0.28" />
            </filter>
          </defs>

          <ellipse cx="210" cy="356" rx="118" ry="18" fill="#1e1b4b" fillOpacity="0.22" className="summary-3d-shadow-oval" />

          <circle className="summary-3d-orbit summary-3d-orbit--outer" cx="210" cy="196" r="156" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="8 14" />
          <circle className="summary-3d-orbit summary-3d-orbit--inner" cx="210" cy="196" r="132" stroke="rgba(198,242,78,0.16)" strokeWidth="1" />

          <g className="summary-3d-float summary-3d-float--coin" filter="url(#sum3d-soft)">
            <circle cx="318" cy="118" r="28" fill="url(#sum3d-lime)" />
            <circle cx="318" cy="118" r="22" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
            <text x="318" y="124" textAnchor="middle" fill="#1a2e05" fontSize="16" fontWeight="800" fontFamily="system-ui, sans-serif">
              ₺
            </text>
          </g>

          <g className="summary-3d-float summary-3d-float--shield" filter="url(#sum3d-soft)">
            <path
              d="M86 148c0-18 24-28 24-28s24 10 24 28v34c0 16-24 28-24 28s-24-12-24-28v-34z"
              fill="url(#sum3d-purple)"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.5"
            />
            <path d="M86 156l18 14 30-36" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          <g className="summary-3d-stack" filter="url(#sum3d-shadow)">
            <path d="M128 118 L302 118 L338 152 L164 152 Z" fill="url(#sum3d-doc-top)" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
            <path d="M302 118 L338 152 L338 318 L302 284 Z" fill="url(#sum3d-doc-side)" stroke="rgba(79,70,229,0.18)" strokeWidth="1.2" />
            <rect x="118" y="132" width="184" height="186" rx="16" fill="url(#sum3d-doc-front)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
            <rect x="142" y="156" width="92" height="14" rx="7" fill="url(#sum3d-purple)" fillOpacity="0.85" />
            <rect x="142" y="178" width="136" height="8" rx="4" fill="rgba(79,70,229,0.12)" />
            <rect x="142" y="194" width="118" height="8" rx="4" fill="rgba(79,70,229,0.1)" />
            <rect x="142" y="210" width="128" height="8" rx="4" fill="rgba(79,70,229,0.08)" />
            <rect x="142" y="238" width="136" height="52" rx="14" fill="rgba(79,70,229,0.08)" stroke="rgba(79,70,229,0.12)" strokeWidth="1" />
            <path d="M158 262h96" stroke="rgba(79,70,229,0.18)" strokeWidth="2" strokeLinecap="round" />
            <path d="M158 272h72" stroke="rgba(79,70,229,0.12)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="164" cy="262" r="10" fill="url(#sum3d-lime)" />
            <path d="M160 262l2.5 2.5 6-6" stroke="#1a2e05" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <text x="182" y="266" fill="#312e81" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif">
              Kıdem Tazminatı
            </text>
          </g>

          <g className="summary-3d-float summary-3d-float--card" filter="url(#sum3d-soft)">
            <path d="M72 248 L188 248 L204 264 L88 264 Z" fill="#ffffff" fillOpacity="0.72" />
            <path d="M188 248 L204 264 L204 332 L188 316 Z" fill="#c7d2fe" fillOpacity="0.55" />
            <rect x="72" y="264" width="116" height="68" rx="14" fill="url(#sum3d-card-front)" stroke="rgba(255,255,255,0.42)" strokeWidth="1.2" />
            <rect x="88" y="280" width="44" height="32" rx="8" fill="url(#sum3d-purple)" fillOpacity="0.9" />
            <rect x="96" y="288" width="12" height="8" rx="2" fill="#ffffff" fillOpacity="0.85" />
            <rect x="110" y="288" width="12" height="8" rx="2" fill="#ffffff" fillOpacity="0.65" />
            <rect x="96" y="300" width="12" height="8" rx="2" fill="#ffffff" fillOpacity="0.65" />
            <rect x="110" y="300" width="12" height="8" rx="2" fill="url(#sum3d-lime)" />
            <rect x="142" y="284" width="34" height="6" rx="3" fill="rgba(79,70,229,0.16)" />
            <rect x="142" y="296" width="28" height="6" rx="3" fill="rgba(79,70,229,0.12)" />
            <rect x="142" y="308" width="36" height="6" rx="3" fill="rgba(79,70,229,0.1)" />
          </g>

          <g className="summary-3d-float summary-3d-float--badge">
            <rect x="286" y="248" width="92" height="34" rx="17" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.28)" strokeWidth="1.2" />
            <circle cx="304" cy="265" r="8" fill="url(#sum3d-lime)" />
            <path d="M301 265l2 2 5-5" stroke="#1a2e05" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <text x="318" y="269" fill="#ffffff" fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">
              Doğrulandı
            </text>
          </g>

          <circle className="summary-3d-spark summary-3d-spark--1" cx="352" cy="196" r="5" fill="#c6f24e" />
          <circle className="summary-3d-spark summary-3d-spark--2" cx="68" cy="208" r="4" fill="rgba(255,255,255,0.55)" />
          <circle className="summary-3d-spark summary-3d-spark--3" cx="248" cy="88" r="3" fill="rgba(255,255,255,0.42)" />
        </svg>
      </div>
    </div>
  );
}
