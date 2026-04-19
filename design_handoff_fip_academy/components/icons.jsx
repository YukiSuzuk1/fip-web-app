// ═══════════════════════════════════════════════════════════════
// SVG Icon set — energy/learning themed, geometric
// ═══════════════════════════════════════════════════════════════

const stroke = (props = {}) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  ...props,
});

const Icon = ({ children, size = 20, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...rest}>
    {children}
  </svg>
);

const IconHome = (p) => (<Icon {...p}><g {...stroke()}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"/></g></Icon>);
const IconBook = (p) => (<Icon {...p}><g {...stroke()}><path d="M4 4h7a3 3 0 0 1 3 3v13"/><path d="M20 4h-3a3 3 0 0 0-3 3"/><path d="M4 4v16h10"/></g></Icon>);
const IconQuest = (p) => (<Icon {...p}><g {...stroke()}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></g></Icon>);
const IconQuiz = (p) => (<Icon {...p}><g {...stroke()}><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M8 9h8M8 13h5"/><circle cx="16.5" cy="13.5" r="0.5" fill="currentColor"/></g></Icon>);
const IconFlow = (p) => (<Icon {...p}><g {...stroke()}><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3h12V9M12 12v3"/></g></Icon>);
const IconTrophy = (p) => (<Icon {...p}><g {...stroke()}><path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 4H4v2a3 3 0 0 0 3 3"/><path d="M17 4h3v2a3 3 0 0 1-3 3"/><path d="M9 20h6M12 14v6"/></g></Icon>);
const IconChart = (p) => (<Icon {...p}><g {...stroke()}><path d="M3 21h18"/><rect x="5" y="13" width="3" height="6" rx="0.5"/><rect x="11" y="8" width="3" height="11" rx="0.5"/><rect x="17" y="4" width="3" height="15" rx="0.5"/></g></Icon>);
const IconFire = (p) => (<Icon {...p}><g {...stroke()}><path d="M12 3s4 4 4 8a4 4 0 1 1-8 0c0-2 2-3 2-5 0-1 2-3 2-3z"/><path d="M12 14s2 1 2 3a2 2 0 1 1-4 0c0-1 1-1.5 1-2.5z"/></g></Icon>);
const IconBolt = (p) => (<Icon {...p}><g {...stroke()}><path d="m13 3-9 12h7l-1 6 9-12h-7z"/></g></Icon>);
const IconSun = (p) => (<Icon {...p}><g {...stroke()}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></g></Icon>);
const IconWind = (p) => (<Icon {...p}><g {...stroke()}><path d="M3 8h10a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h8a2 2 0 1 1-2 2"/></g></Icon>);
const IconLeaf = (p) => (<Icon {...p}><g {...stroke()}><path d="M20 4c0 10-7 16-16 16 0-10 7-16 16-16z"/><path d="M4 20 16 8"/></g></Icon>);
const IconBell = (p) => (<Icon {...p}><g {...stroke()}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10 20a2 2 0 0 0 4 0"/></g></Icon>);
const IconGear = (p) => (<Icon {...p}><g {...stroke()}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9 1.65 1.65 0 0 0 4.27 7.18l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09c0 .66.39 1.25 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.26.61.85 1 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></g></Icon>);
const IconSearch = (p) => (<Icon {...p}><g {...stroke()}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></g></Icon>);
const IconArrow = (p) => (<Icon {...p}><g {...stroke()}><path d="M5 12h14M13 6l6 6-6 6"/></g></Icon>);
const IconCheck = (p) => (<Icon {...p}><g {...stroke()}><path d="M5 12.5 9.5 17 19 7"/></g></Icon>);
const IconLock = (p) => (<Icon {...p}><g {...stroke()}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></g></Icon>);
const IconStar = (p) => (<Icon {...p}><g {...stroke()}><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/></g></Icon>);
const IconPlug = (p) => (<Icon {...p}><g {...stroke()}><path d="M9 3v4M15 3v4"/><path d="M7 7h10v5a5 5 0 0 1-10 0z"/><path d="M12 17v4"/></g></Icon>);
const IconGrid = (p) => (<Icon {...p}><g {...stroke()}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></g></Icon>);
const IconMap = (p) => (<Icon {...p}><g {...stroke()}><path d="m3 6 6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v16M15 6v16"/></g></Icon>);
const IconCalc = (p) => (<Icon {...p}><g {...stroke()}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M16 12h.5M8 16h2M12 16h2M16 16h.5"/></g></Icon>);

Object.assign(window, {
  IconHome, IconBook, IconQuest, IconQuiz, IconFlow, IconTrophy, IconChart,
  IconFire, IconBolt, IconSun, IconWind, IconLeaf, IconBell, IconGear,
  IconSearch, IconArrow, IconCheck, IconLock, IconStar, IconPlug, IconGrid,
  IconMap, IconCalc,
});
