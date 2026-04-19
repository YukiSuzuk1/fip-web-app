"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/",          label: "ホーム",   key: "",          icon: HomeIcon },
  { href: "/flashcard", label: "学習",     key: "flashcard", icon: BookIcon },
  { href: "/quiz",      label: "クイズ",   key: "quiz",      icon: QuizIcon },
  { href: "/scenario",  label: "クエスト", key: "scenario",  icon: QuestIcon },
  { href: "/progress",  label: "実績",     key: "progress",  icon: TrophyIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ href, label, key, icon: Icon }) => {
        const active = key === "" ? pathname === "/" : pathname.startsWith(`/${key}`);
        return (
          <Link
            key={`${href}-${key}`}
            href={href}
            className={`bottom-nav-item${active ? " active" : ""}`}
          >
            <span className="bottom-nav-icon">
              <Icon active={active} />
            </span>
            <span className="bottom-nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/* ── Inline SVG Icons ── */
function HomeIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );
}

function BookIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
    </svg>
  );
}

function QuizIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

function TrophyIcon({ active }: { active: boolean }) {
  const color = active ? "var(--grass)" : "var(--ink-400)";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21"/>
      <line x1="12" y1="17" x2="12" y2="11"/>
      <path d="M7 4H4l1 6a4 4 0 004 4 4 4 0 004-4l1-6h-3"/>
      <path d="M7 4h10"/>
    </svg>
  );
}
