"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/",           label: "ホーム",      key: "",          icon: HomeIcon },
  { href: "/flashcard",  label: "学習",        key: "flashcard", icon: BookIcon },
  { href: "/scenario",   label: "クエスト",    key: "scenario",  icon: TargetIcon },
  { href: "/progress",   label: "ランキング",  key: "progress",  icon: TrophyIcon },
  { href: "/quiz",       label: "問題集",      key: "quiz",      icon: ListIcon },
  { href: "/",           label: "お知らせ",    key: "notice",    icon: BellIcon },
  { href: "/",           label: "設定",        key: "settings",  icon: GearIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #2563EB, #3B82F6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                    fill="white" stroke="white" strokeWidth="0.5"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: "bold", color: "#2563EB", lineHeight: 1.1 }}>FIP</div>
            <div style={{ fontSize: 11, color: "#64748B", lineHeight: 1.1 }}>Learning</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, paddingTop: 8 }}>
        {NAV_ITEMS.map(({ href, label, key, icon: Icon }) => {
          const active = key === "" ? pathname === "/" : pathname.startsWith(`/${key}`);
          return (
            <Link
              key={`${href}-${key}`}
              href={href}
              className={`sidebar-link${active ? " active" : ""}`}
            >
              <Icon active={active} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">FIP制度学習アプリ</div>
    </aside>
  );
}

/* ── Inline SVG Icons ── */
function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2563EB" : "#94A3B8"} strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2563EB" : "#94A3B8"} strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
    </svg>
  );
}

function TargetIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2563EB" : "#94A3B8"} strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  );
}

function TrophyIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2563EB" : "#94A3B8"} strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21"/>
      <line x1="12" y1="17" x2="12" y2="11"/>
      <path d="M7 4H4l1 6a4 4 0 004 4 4 4 0 004-4l1-6h-3"/>
      <path d="M7 4h10"/>
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2563EB" : "#94A3B8"} strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
      <line x1="9" y1="6" x2="20" y2="6"/>
      <line x1="9" y1="12" x2="20" y2="12"/>
      <line x1="9" y1="18" x2="20" y2="18"/>
      <circle cx="4" cy="6" r="1.5" fill={active ? "#2563EB" : "#94A3B8"} stroke="none"/>
      <circle cx="4" cy="12" r="1.5" fill={active ? "#2563EB" : "#94A3B8"} stroke="none"/>
      <circle cx="4" cy="18" r="1.5" fill={active ? "#2563EB" : "#94A3B8"} stroke="none"/>
    </svg>
  );
}

function BellIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2563EB" : "#94A3B8"} strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  );
}

function GearIcon({ active }: { active: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke={active ? "#2563EB" : "#94A3B8"} strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  );
}
