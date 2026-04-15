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
    <aside
      style={{
        width: 200,
        minWidth: 200,
        backgroundColor: "var(--bg-sidebar)",
        borderRight: "2px solid var(--accent)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <div
        style={{
          color: "var(--accent)",
          fontSize: 15,
          fontWeight: "bold",
          padding: "20px 18px 16px",
          borderBottom: "1px solid var(--border-color)",
          lineHeight: 1.3,
        }}
      >
        ⚡ FIP学習ゲーム
      </div>

      <nav style={{ flex: 1, paddingTop: 8 }}>
        {NAV_ITEMS.map(({ href, label, key }) => {
          const active =
            key === ""
              ? pathname === "/"
              : pathname.startsWith(`/${key}`);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "block",
                padding: "12px 18px",
                fontSize: 13,
                color: active ? "var(--accent)" : "var(--text-secondary)",
                backgroundColor: active ? "#1c2d4e" : "transparent",
                borderLeft: active ? "3px solid var(--accent)" : "3px solid transparent",
                fontWeight: active ? "bold" : "normal",
                textDecoration: "none",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#1a2540";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#c0d0e8";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                }
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          padding: "12px 18px",
          fontSize: 11,
          color: "var(--text-muted)",
          borderTop: "1px solid var(--border-color)",
        }}
      >
        FIP制度学習アプリ
      </div>
    </aside>
  );
}
