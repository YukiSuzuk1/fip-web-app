"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/flashcard", label: "知る",       key: "flashcard", icon: "🔍" },
  { href: "/flow",      label: "理解する",   key: "flow",      icon: "📖" },
  { href: "/quiz",      label: "試す",       key: "quiz",      icon: "✏️" },
  { href: "/progress",  label: "習慣化する", key: "progress",  icon: "📊" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {NAV_ITEMS.map(({ href, icon, label, key }) => {
        const active = pathname.startsWith(`/${key}`);
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
