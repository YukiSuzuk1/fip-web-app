"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/",          label: "ホーム",           key: "",          icon: HomeIcon },
  { href: "/flashcard", label: "学習パス",          key: "flashcard", icon: BookIcon,   count: 24 },
  { href: "/quiz",      label: "用語クイズ",        key: "quiz",      icon: QuizIcon,   count: 128 },
  { href: "/scenario",  label: "クエスト",          key: "scenario",  icon: QuestIcon },
  { href: "/flow",      label: "制度フロー",        key: "flow",      icon: FlowIcon },
  { href: "/progress",  label: "実績・進捗",        key: "progress",  icon: TrophyIcon },
];

const UTIL_ITEMS = [
  { href: "/", label: "お知らせ", key: "notice",   icon: BellIcon },
  { href: "/", label: "設定",     key: "settings", icon: GearIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (key: string) =>
    key === "" ? pathname === "/" : pathname.startsWith(`/${key}`);

  return (
    <aside className="app-sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-mark">
          <svg
            width="28" height="28" viewBox="0 0 24 24"
            fill="none" stroke="white" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ position: "relative", zIndex: 1 }}
          >
            <path d="M13 2 4 14h7l-1 8 10-12h-7z" />
          </svg>
        </div>
        <div>
          <div className="sidebar-brand-title">FIP Academy</div>
          <div className="sidebar-brand-sub">Power · Learning</div>
        </div>
      </div>

      {/* LEARN セクション */}
      <div className="sidebar-section-label">LEARN</div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV_ITEMS.map(({ href, label, key, icon: Icon, count }) => {
          const active = isActive(key);
          return (
            <Link
              key={`${href}-${key}`}
              href={href}
              className={`sidebar-link${active ? " active" : ""}`}
            >
              <Icon active={active} />
              <span>{label}</span>
              {count !== undefined && (
                <span className="sidebar-count">{count}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ACCOUNT セクション */}
      <div className="sidebar-section-label">ACCOUNT</div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {UTIL_ITEMS.map(({ href, label, key, icon: Icon }) => {
          const active = isActive(key) && key !== "";
          return (
            <Link
              key={key}
              href={href}
              className={`sidebar-link${active ? " active" : ""}`}
            >
              <Icon active={active} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ユーザーカード */}
      <div className="sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 2px" }}>
          <div
            className="topbar-avatar"
            style={{ width: 36, height: 36, fontSize: 13, flexShrink: 0 }}
          >
            YY
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-900)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              鈴木　勇輝
            </div>
            <div style={{ fontSize: 11, color: "var(--ink-500)" }}>
              研修中
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ── Inline SVG Icons ── */
function HomeIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
    </svg>
  );
}

function QuizIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}

function QuestIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function FlowIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1"/>
      <rect x="15" y="3" width="6" height="6" rx="1"/>
      <rect x="9" y="15" width="6" height="6" rx="1"/>
      <path d="M6 9v3a3 3 0 003 3h6a3 3 0 003-3V9"/>
      <line x1="12" y1="12" x2="12" y2="15"/>
    </svg>
  );
}

function TrophyIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21"/>
      <line x1="12" y1="17" x2="12" y2="11"/>
      <path d="M7 4H4l1 6a4 4 0 004 4 4 4 0 004-4l1-6h-3"/>
      <path d="M7 4h10"/>
    </svg>
  );
}

function BellIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}

function GearIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  );
}
