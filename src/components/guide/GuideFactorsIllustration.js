export default function GuideFactorsIllustration() {
  const points = [
    { x: 200, y: 58, label: "Hizmet Süresi", short: "Süre" },
    { x: 322, y: 132, label: "Brüt Maaş", short: "Brüt" },
    { x: 286, y: 286, label: "Bonuslar", short: "Bonus" },
    { x: 114, y: 286, label: "Yan Haklar", short: "Fayda" },
    { x: 78, y: 132, label: "Fesih Nedeni", short: "Fesih" }
  ];

  const radarPath = `${points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")} Z`;

  return (
    <div className="guide-factors-illustration guide-illustration-shell" aria-hidden="true">
      <span className="guide-illustration-glow guide-illustration-glow--purple" />
      <span className="guide-illustration-glow guide-illustration-glow--lime" />
      <svg className="guide-factors-illustration-art" viewBox="0 0 400 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gf-sky" x1="30" y1="20" x2="370" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffffff" stopOpacity="0.24" />
            <stop offset="1" stopColor="#eef2ff" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="gf-lime" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#d9f99d" />
            <stop offset="1" stopColor="#c6f24e" />
          </linearGradient>
          <linearGradient id="gf-purple" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="gf-radar" x1="200" y1="80" x2="200" y2="300" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c3aed" stopOpacity="0.34" />
            <stop offset="1" stopColor="#c6f24e" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="gf-glass" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="1" stopColor="#eef2ff" stopOpacity="0.84" />
          </linearGradient>
          <filter id="gf-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#312e81" floodOpacity="0.2" />
          </filter>
          <filter id="gf-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#4f46e5" floodOpacity="0.16" />
          </filter>
        </defs>

        <rect width="400" height="420" fill="url(#gf-sky)" rx="24" />
        <ellipse cx="200" cy="392" rx="104" ry="14" fill="#4f46e5" fillOpacity="0.1" />

        {[92, 118, 144].map((r) => (
          <circle key={r} cx="200" cy="196" r={r} stroke="rgba(79,70,229,0.08)" strokeWidth="1" fill="none" />
        ))}

        {points.map((p) => (
          <line key={`axis-${p.short}`} x1="200" y1="196" x2={p.x} y2={p.y} stroke="rgba(79,70,229,0.12)" strokeWidth="1.5" strokeDasharray="4 6" />
        ))}

        <path d={radarPath} fill="url(#gf-radar)" stroke="url(#gf-purple)" strokeWidth="2" className="guide-factors-radar" />

        <g filter="url(#gf-shadow)" className="guide-illustration-float guide-illustration-float--slow">
          <circle cx="200" cy="196" r="48" fill="url(#gf-glass)" stroke="rgba(79,70,229,0.16)" strokeWidth="1.5" />
          <circle cx="200" cy="196" r="30" fill="url(#gf-lime)" fillOpacity="0.22" />
          <text x="200" y="188" textAnchor="middle" fill="#4338ca" fontSize="12" fontWeight="800" fontFamily="system-ui, sans-serif">
            Tazminat
          </text>
          <text x="200" y="206" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">
            Etki Alanı
          </text>
        </g>

        {[
          { point: points[0], icon: "⏱", tone: "purple" },
          { point: points[1], icon: "₺", tone: "lime" },
          { point: points[2], icon: "↗", tone: "purple" },
          { point: points[3], icon: "◆", tone: "purple" },
          { point: points[4], icon: "!", tone: "alert" }
        ].map(({ point, icon, tone }) => (
          <g key={point.short} className="guide-factors-node">
            <circle
              cx={point.x}
              cy={point.y}
              r="24"
              fill={tone === "lime" ? "url(#gf-lime)" : tone === "alert" ? "#fff1f2" : "url(#gf-purple)"}
              stroke={tone === "alert" ? "#fca5a5" : "rgba(255,255,255,0.24)"}
              strokeWidth="1.5"
              filter="url(#gf-soft)"
            />
            <text
              x={point.x}
              y={point.y + 4}
              textAnchor="middle"
              fill={tone === "lime" ? "#1a2e05" : tone === "alert" ? "#dc2626" : "#ffffff"}
              fontSize="12"
              fontWeight="800"
              fontFamily="system-ui, sans-serif"
            >
              {icon}
            </text>
            <rect
              x={point.x - 38}
              y={point.y + 30}
              width="76"
              height="22"
              rx="11"
              fill="url(#gf-glass)"
              stroke="rgba(79,70,229,0.1)"
            />
            <text x={point.x} y={point.y + 45} textAnchor="middle" fill="#475569" fontSize="9" fontWeight="700" fontFamily="system-ui, sans-serif">
              {point.short}
            </text>
          </g>
        ))}

        <g className="guide-illustration-float guide-illustration-float--doc" filter="url(#gf-soft)">
          <rect x="286" y="318" width="92" height="54" rx="14" fill="url(#gf-glass)" stroke="rgba(79,70,229,0.12)" />
          <text x="332" y="340" textAnchor="middle" fill="#4338ca" fontSize="9" fontWeight="800" fontFamily="system-ui, sans-serif">
            Brüt × Süre
          </text>
          <text x="332" y="356" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="600" fontFamily="ui-monospace, monospace">
            + bonus + fayda
          </text>
        </g>
      </svg>
    </div>
  );
}
