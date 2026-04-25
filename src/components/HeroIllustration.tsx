export default function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hg1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12"/>
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="hg2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.5"/>
        </linearGradient>
        <linearGradient id="chartLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10b981"/>
          <stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12"/>
        </filter>
      </defs>

      {/* Background glow blobs */}
      <ellipse cx="200" cy="220" rx="220" ry="180" fill="url(#hg1)" filter="url(#blur)"/>
      <ellipse cx="420" cy="180" rx="130" ry="100" fill="url(#hg2)" filter="url(#blur)"/>

      {/* ── Browser window ── */}
      <rect x="20" y="24" width="370" height="284" rx="14" fill="#0d0d1a" stroke="#6366f1" strokeOpacity="0.18" strokeWidth="1"/>
      {/* Toolbar */}
      <rect x="20" y="24" width="370" height="44" rx="14" fill="#13132a"/>
      <rect x="20" y="52" width="370" height="16" fill="#13132a"/>
      {/* Traffic lights */}
      <circle cx="48" cy="46" r="5.5" fill="#f43f5e" fillOpacity="0.9"/>
      <circle cx="67" cy="46" r="5.5" fill="#f59e0b" fillOpacity="0.9"/>
      <circle cx="86" cy="46" r="5.5" fill="#10b981" fillOpacity="0.9"/>
      {/* URL bar */}
      <rect x="108" y="36" width="220" height="20" rx="10" fill="#1e1e3a" stroke="#6366f1" strokeOpacity="0.2" strokeWidth="1"/>
      <text x="121" y="50" fontSize="9" fill="#64748b" fontFamily="monospace">freestudio.com.tr</text>
      {/* Refresh icon */}
      <path d="M340 44 q4-4 8,0 q4,8-4,8" stroke="#64748b" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* Website nav inside browser */}
      <rect x="36" y="82" width="28" height="8" rx="4" fill="url(#barGrad)"/>
      <rect x="74" y="84" width="36" height="5" rx="2.5" fill="#334155"/>
      <rect x="118" y="84" width="36" height="5" rx="2.5" fill="#334155"/>
      <rect x="162" y="84" width="36" height="5" rx="2.5" fill="#334155"/>
      <rect x="310" y="80" width="60" height="14" rx="7" fill="#6366f1" fillOpacity="0.75"/>

      {/* Hero headline bars */}
      <rect x="36" y="110" width="180" height="18" rx="5" fill="#6366f1" fillOpacity="0.55"/>
      <rect x="36" y="134" width="145" height="14" rx="4" fill="#8b5cf6" fillOpacity="0.35"/>
      {/* Subtext lines */}
      <rect x="36" y="158" width="200" height="7" rx="3.5" fill="#334155"/>
      <rect x="36" y="170" width="180" height="7" rx="3.5" fill="#1e293b"/>
      <rect x="36" y="182" width="160" height="7" rx="3.5" fill="#1e293b"/>
      {/* CTA buttons */}
      <rect x="36" y="200" width="86" height="26" rx="9" fill="#6366f1" fillOpacity="0.85"/>
      <rect x="130" y="200" width="76" height="26" rx="9" fill="none" stroke="#6366f1" strokeOpacity="0.4" strokeWidth="1"/>

      {/* Right image area inside browser */}
      <rect x="250" y="106" width="122" height="108" rx="10" fill="#1a1a30" stroke="#6366f1" strokeOpacity="0.12" strokeWidth="1"/>
      {/* Abstract shapes inside */}
      <circle cx="311" cy="160" r="34" fill="#6366f1" fillOpacity="0.08"/>
      <circle cx="288" cy="142" r="22" fill="#8b5cf6" fillOpacity="0.12"/>
      <circle cx="334" cy="148" r="18" fill="#06b6d4" fillOpacity="0.1"/>
      <path d="M265 180 L285 155 L305 165 L325 145 L345 155 L365 140" stroke="url(#barGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

      {/* Feature cards row inside browser */}
      <rect x="36" y="250" width="96" height="40" rx="8" fill="#1a1a30" stroke="#6366f1" strokeOpacity="0.12" strokeWidth="1"/>
      <rect x="140" y="250" width="96" height="40" rx="8" fill="#1a1a30" stroke="#8b5cf6" strokeOpacity="0.12" strokeWidth="1"/>
      <rect x="244" y="250" width="128" height="40" rx="8" fill="#1a1a30" stroke="#06b6d4" strokeOpacity="0.12" strokeWidth="1"/>
      {/* Card content */}
      <rect x="44" y="258" width="32" height="5" rx="2.5" fill="#6366f1" fillOpacity="0.5"/>
      <rect x="44" y="268" width="60" height="4" rx="2" fill="#334155"/>
      <rect x="44" y="278" width="50" height="4" rx="2" fill="#1e293b"/>
      <rect x="148" y="258" width="32" height="5" rx="2.5" fill="#8b5cf6" fillOpacity="0.5"/>
      <rect x="148" y="268" width="60" height="4" rx="2" fill="#334155"/>
      <rect x="148" y="278" width="50" height="4" rx="2" fill="#1e293b"/>
      <rect x="252" y="258" width="32" height="5" rx="2.5" fill="#06b6d4" fillOpacity="0.5"/>
      <rect x="252" y="268" width="60" height="4" rx="2" fill="#334155"/>
      <rect x="252" y="278" width="50" height="4" rx="2" fill="#1e293b"/>

      {/* ── Mobile phone (floating, rotated) ── */}
      <g transform="rotate(7, 415, 185)">
        <rect x="365" y="52" width="100" height="195" rx="22" fill="#0d0d1a" stroke="#6366f1" strokeOpacity="0.3" strokeWidth="1.5"/>
        {/* Notch */}
        <rect x="398" y="62" width="34" height="7" rx="3.5" fill="#13132a"/>
        {/* Screen bg */}
        <rect x="374" y="76" width="82" height="158" rx="10" fill="#111128"/>
        {/* App header */}
        <rect x="374" y="76" width="82" height="22" rx="10" fill="#1a1a30"/>
        <rect x="374" y="88" width="82" height="10" fill="#1a1a30"/>
        <rect x="381" y="82" width="20" height="7" rx="3.5" fill="#6366f1" fillOpacity="0.5"/>
        <rect x="418" y="84" width="30" height="5" rx="2.5" fill="#334155"/>
        {/* App icons grid */}
        <rect x="381" y="106" width="20" height="20" rx="6" fill="#6366f1" fillOpacity="0.3"/>
        <rect x="407" y="106" width="20" height="20" rx="6" fill="#8b5cf6" fillOpacity="0.3"/>
        <rect x="433" y="106" width="10" height="20" rx="3" fill="#06b6d4" fillOpacity="0.3"/>
        <rect x="381" y="132" width="20" height="20" rx="6" fill="#f59e0b" fillOpacity="0.3"/>
        <rect x="407" y="132" width="20" height="20" rx="6" fill="#10b981" fillOpacity="0.3"/>
        <rect x="433" y="132" width="10" height="20" rx="3" fill="#f43f5e" fillOpacity="0.3"/>
        {/* Content lines */}
        <rect x="381" y="162" width="60" height="5" rx="2.5" fill="#334155"/>
        <rect x="381" y="172" width="45" height="4" rx="2" fill="#1e293b"/>
        <rect x="381" y="182" width="55" height="4" rx="2" fill="#1e293b"/>
        {/* Button */}
        <rect x="381" y="196" width="62" height="16" rx="8" fill="#6366f1" fillOpacity="0.6"/>
        {/* Home indicator */}
        <rect x="405" y="222" width="26" height="3" rx="1.5" fill="#334155"/>
      </g>

      {/* ── Metrics card (bottom right) ── */}
      <rect x="395" y="298" width="158" height="82" rx="14" fill="#0d0d1a" stroke="#10b981" strokeOpacity="0.22" strokeWidth="1"/>
      <circle cx="420" cy="323" r="16" fill="#10b981" fillOpacity="0.1"/>
      <path d="M414 323 L418 319 L420 323 L426 319" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <rect x="444" y="312" width="72" height="7" rx="3.5" fill="#1e293b"/>
      <rect x="444" y="324" width="44" height="13" rx="4" fill="#10b981" fillOpacity="0.2"/>
      <text x="447" y="334" fontSize="9" fill="#10b981" fontWeight="700" fontFamily="sans-serif">+24.8%</text>
      {/* Sparkline */}
      <polyline
        points="403,365 416,356 428,361 440,349 452,354 464,343 476,339 488,346 500,334 514,328 537,322"
        stroke="url(#chartLine)" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* End dot */}
      <circle cx="537" cy="322" r="3.5" fill="#06b6d4"/>

      {/* ── Success badge (bottom left) ── */}
      <rect x="6" y="312" width="168" height="54" rx="14" fill="#0d0d1a" stroke="#6366f1" strokeOpacity="0.2" strokeWidth="1"/>
      <circle cx="32" cy="339" r="14" fill="#6366f1" fillOpacity="0.12"/>
      <text x="24" y="344" fontSize="16" fill="#6366f1">★</text>
      <rect x="52" y="328" width="90" height="7" rx="3.5" fill="#1e293b"/>
      <rect x="52" y="340" width="56" height="6" rx="3" fill="#10b981" fillOpacity="0.25"/>
      <text x="54" y="347" fontSize="8" fill="#10b981" fontWeight="600" fontFamily="sans-serif">Müşteri Memnuniyeti %98</text>

      {/* ── Notification card ── */}
      <rect x="165" y="390" width="164" height="50" rx="12" fill="#0d0d1a" stroke="#f59e0b" strokeOpacity="0.18" strokeWidth="1"/>
      <circle cx="190" cy="415" r="13" fill="#f59e0b" fillOpacity="0.1"/>
      <path d="M184 415 L188 419 L197 410" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="210" y="406" width="80" height="6" rx="3" fill="#1e293b"/>
      <rect x="210" y="418" width="60" height="5" rx="2.5" fill="#f59e0b" fillOpacity="0.2"/>
      <text x="212" y="424" fontSize="8" fill="#f59e0b" fontFamily="sans-serif">Proje Teslim Edildi ✓</text>

      {/* ── Decorative dots grid (top right) ── */}
      {Array.from({ length: 5 }, (_, row) =>
        Array.from({ length: 4 }, (_, col) => (
          <circle
            key={`d-${row}-${col}`}
            cx={478 + col * 16}
            cy={22 + row * 16}
            r="1.8"
            fill="#6366f1"
            fillOpacity={0.04 + (row + col) * 0.012}
          />
        ))
      )}

      {/* ── Connecting lines decoration ── */}
      <path d="M390 310 Q380 290 390 270" stroke="#6366f1" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="4 4"/>
      <path d="M170 390 Q160 370 180 355" stroke="#f59e0b" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="4 4"/>
    </svg>
  );
}
