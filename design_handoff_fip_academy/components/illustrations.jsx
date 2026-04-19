// ═══════════════════════════════════════════════════════════════
// Hero illustrations & placeholder imagery — energy themed
// ═══════════════════════════════════════════════════════════════

// Abstract energy landscape for hero
function HeroEnergyArt() {
  return (
    <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%",maxWidth:420}}>
      <defs>
        <linearGradient id="sunG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.88 0.17 85)" />
          <stop offset="100%" stopColor="oklch(0.72 0.18 60)" />
        </linearGradient>
        <linearGradient id="panelG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.17 230)" />
          <stop offset="100%" stopColor="oklch(0.42 0.14 240)" />
        </linearGradient>
        <linearGradient id="landG" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.65 0.16 155)" />
          <stop offset="100%" stopColor="oklch(0.35 0.10 160)" />
        </linearGradient>
      </defs>

      {/* Sun */}
      <circle cx="290" cy="70" r="44" fill="url(#sunG)" opacity="0.9"/>
      <circle cx="290" cy="70" r="62" fill="oklch(0.85 0.16 85)" opacity="0.15"/>
      <circle cx="290" cy="70" r="80" fill="oklch(0.85 0.16 85)" opacity="0.08"/>

      {/* Wind turbine — stylized */}
      <g transform="translate(80 110)" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.85">
        <line x1="0" y1="0" x2="0" y2="70"/>
        <g transform="rotate(30)">
          <ellipse cx="0" cy="-22" rx="4" ry="22" fill="white"/>
          <ellipse cx="19" cy="11" rx="4" ry="22" fill="white" transform="rotate(120 19 11)"/>
          <ellipse cx="-19" cy="11" rx="4" ry="22" fill="white" transform="rotate(240 -19 11)"/>
        </g>
        <circle cx="0" cy="0" r="4" fill="oklch(0.75 0.17 85)"/>
      </g>

      {/* Secondary turbine */}
      <g transform="translate(40 140) scale(0.7)" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.55">
        <line x1="0" y1="0" x2="0" y2="70"/>
        <ellipse cx="0" cy="-18" rx="3.5" ry="18" fill="white"/>
        <ellipse cx="16" cy="9" rx="3.5" ry="18" fill="white" transform="rotate(120 16 9)"/>
        <ellipse cx="-16" cy="9" rx="3.5" ry="18" fill="white" transform="rotate(240 -16 9)"/>
        <circle cx="0" cy="0" r="3" fill="oklch(0.75 0.17 85)"/>
      </g>

      {/* Ground */}
      <path d="M0 200 Q 90 180 180 196 T 360 190 L 360 240 L 0 240 Z" fill="url(#landG)" opacity="0.85"/>
      <path d="M0 210 Q 110 195 200 208 T 360 205 L 360 240 L 0 240 Z" fill="oklch(0.28 0.08 160)"/>

      {/* Solar panels */}
      <g transform="translate(180 170)">
        <g transform="skewX(-20)">
          <rect x="0" y="0" width="60" height="30" fill="url(#panelG)" stroke="white" strokeWidth="1.5"/>
          <line x1="20" y1="0" x2="20" y2="30" stroke="white" strokeWidth="1"/>
          <line x1="40" y1="0" x2="40" y2="30" stroke="white" strokeWidth="1"/>
          <line x1="0" y1="15" x2="60" y2="15" stroke="white" strokeWidth="1"/>
        </g>
        <line x1="8" y1="30" x2="8" y2="46" stroke="white" strokeWidth="1.5"/>
        <line x1="52" y1="30" x2="52" y2="46" stroke="white" strokeWidth="1.5"/>
      </g>
      <g transform="translate(250 180)">
        <g transform="skewX(-20)">
          <rect x="0" y="0" width="50" height="26" fill="url(#panelG)" stroke="white" strokeWidth="1.2"/>
          <line x1="16" y1="0" x2="16" y2="26" stroke="white" strokeWidth="0.8"/>
          <line x1="34" y1="0" x2="34" y2="26" stroke="white" strokeWidth="0.8"/>
          <line x1="0" y1="13" x2="50" y2="13" stroke="white" strokeWidth="0.8"/>
        </g>
      </g>

      {/* Floating energy particles */}
      <g opacity="0.6">
        <circle cx="150" cy="60" r="2" fill="oklch(0.88 0.17 85)"/>
        <circle cx="220" cy="40" r="1.5" fill="oklch(0.88 0.17 85)"/>
        <circle cx="330" cy="130" r="2" fill="oklch(0.88 0.17 85)"/>
        <circle cx="120" cy="90" r="1" fill="white"/>
        <circle cx="270" cy="120" r="1" fill="white"/>
      </g>

      {/* Power lines */}
      <path d="M20 100 Q 150 80 340 110" stroke="white" strokeWidth="0.6" fill="none" opacity="0.3"/>
      <path d="M20 120 Q 150 100 340 130" stroke="white" strokeWidth="0.6" fill="none" opacity="0.3"/>
    </svg>
  );
}

// Small decorative badges for tiles
function SparkBadge({ color = "oklch(0.62 0.15 155)" }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" style={{position:"absolute",right:-12,top:-12,opacity:0.12}}>
      <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth="1"/>
      <circle cx="40" cy="40" r="20" fill="none" stroke={color} strokeWidth="1"/>
      <circle cx="40" cy="40" r="10" fill={color}/>
    </svg>
  );
}

// Circular progress donut
function Donut({ pct = 72, size = 120, label = "", sub = "" }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <svg viewBox="0 0 120 120" style={{width:size,height:size}}>
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--bg-sunken)" strokeWidth="10"/>
      <circle cx="60" cy="60" r={r} fill="none"
        stroke="url(#donutG)" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform="rotate(-90 60 60)"/>
      <defs>
        <linearGradient id="donutG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.15 155)"/>
          <stop offset="100%" stopColor="oklch(0.78 0.16 85)"/>
        </linearGradient>
      </defs>
      <text x="60" y="58" textAnchor="middle" fontSize="26" fontWeight="700"
            fontFamily="var(--font-display)" fill="var(--ink-900)">{pct}</text>
      <text x="60" y="76" textAnchor="middle" fontSize="11"
            fill="var(--ink-500)">{sub || "%"}</text>
    </svg>
  );
}

// Energy flow animation for quest mode card
function FlowRibbon() {
  return (
    <svg viewBox="0 0 400 80" style={{width:"100%",height:80}}>
      <defs>
        <linearGradient id="ribbonG" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.62 0.15 230)" stopOpacity="0"/>
          <stop offset="50%" stopColor="oklch(0.62 0.15 230)" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="oklch(0.62 0.15 155)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0 40 Q 100 10 200 40 T 400 40" fill="none" stroke="url(#ribbonG)" strokeWidth="3"/>
      <path d="M0 50 Q 100 20 200 50 T 400 50" fill="none" stroke="url(#ribbonG)" strokeWidth="2" opacity="0.5"/>
      {[60,140,220,300,360].map((x,i)=>(
        <circle key={i} cx={x} cy={40 + Math.sin(i)*10} r="2" fill="oklch(0.78 0.16 85)"/>
      ))}
    </svg>
  );
}

Object.assign(window, { HeroEnergyArt, SparkBadge, Donut, FlowRibbon });
