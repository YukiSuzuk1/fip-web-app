"use client";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/storage";
import { getLevelInfo, getXpProgress, getNextLevelInfo } from "@/lib/gamification";

export default function Header() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [levelTitle, setLevelTitle] = useState("FIP初心者");
  const [streak, setStreak] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const p = loadProgress();
      setXp(p.total_xp);
      setStreak(p.streak_days);
      const lv = getLevelInfo(p.total_xp);
      setLevel(lv.level);
      setLevelTitle(lv.title);
      setProgress(getXpProgress(p.total_xp));
    };
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("xp_update", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("xp_update", refresh);
    };
  }, []);

  return (
    <header
      style={{
        backgroundColor: "var(--bg-sidebar)",
        borderBottom: "1px solid var(--border-color)",
        padding: "6px 24px",
        display: "flex",
        alignItems: "center",
        gap: 24,
        height: 50,
        flexShrink: 0,
      }}
    >
      <span style={{ color: "var(--accent)", fontWeight: "bold", fontSize: 15 }}>
        ⚡ {xp.toLocaleString()} XP
      </span>
      <span style={{ color: "var(--accent-blue)", fontSize: 13 }}>
        Lv.{level} {levelTitle}
      </span>
      <div style={{ flex: 1, maxWidth: 180, position: "relative" }}>
        <div
          style={{
            height: 6,
            backgroundColor: "var(--bg-input)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.round(progress * 100)}%`,
              background: "linear-gradient(to right, #e67e22, #f39c12)",
              borderRadius: 3,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>
      {streak > 0 && (
        <span style={{ color: "#e74c3c", fontSize: 13 }}>
          🔥 {streak}日連続
        </span>
      )}
    </header>
  );
}
