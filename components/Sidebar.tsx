"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/",           label: "📇 ホーム",           key: "" },
  { href: "/flashcard",  label: "📇 フラッシュカード",  key: "flashcard" },
  { href: "/quiz",       label: "❓ 択一クイズ",        key: "quiz" },
  { href: "/scenario",   label: "📖 シナリオクイズ",    key: "scenario" },
  { href: "/calculator", label: "🧮 計算シミュレーター", key: "calculator" },
  { href: "/flow",       label: "🗺️ フロー図学習",      key: "flow" },
  { href: "/progress",   label: "📊 進捗・実績",        key: "progress" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // className="app-sidebar" controls display via CSS (hidden on mobile)
    // NO inline display/height/position — CSS class handles those
    <aside className="app-sidebar">
      <div className="sidebar-logo">⚡ FIP学習ゲーム</div>

      <nav style={{ flex: 1, paddingTop: 8 }}>
        {NAV_ITEMS.map(({ href, label, key }) => {
          const active =
            key === "" ? pathname === "/" : pathname.startsWith(`/${key}`);
          return (
            <Link
              key={href}
              href={href}
              className={`sidebar-link${active ? " active" : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">FIP制度学習アプリ</div>
    </aside>
  );
}
