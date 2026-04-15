"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/",           icon: "🏠", label: "ホーム",    key: "" },
  { href: "/flashcard",  icon: "📇", label: "カード",    key: "flashcard" },
  { href: "/quiz",       icon: "❓", label: "クイズ",    key: "quiz" },
  { href: "/scenario",   icon: "📖", label: "シナリオ",  key: "scenario" },
  { href: "/calculator", icon: "🧮", label: "計算",      key: "calculator" },
  { href: "/flow",       icon: "🗺️", label: "フロー",    key: "flow" },
  { href: "/progress",   icon: "📊", label: "進捗",      key: "progress" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ href, icon, label, key }) => {
        const active = key === "" ? pathname === "/" : pathname.startsWith(`/${key}`);
        return (
          <Link
            key={href}
            href={href}
            className={`bottom-nav-item${active ? " active" : ""}`}
          >
            <span className="bottom-nav-icon">{icon}</span>
            <span className="bottom-nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
