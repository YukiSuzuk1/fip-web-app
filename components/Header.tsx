"use client";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/storage";
import { getLevelInfo, getXpProgress } from "@/lib/gamification";

export default function Header() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [xpGain, setXpGain] = useState(0);

  useEffect(() => {
    const refresh = () => {
      const p = loadProgress();
      const prevXp = Number(sessionStorage.getItem("prev_xp") ?? p.total_xp);
      const gained = Math.max(0, p.total_xp - prevXp);
      setXp(p.total_xp);
      setXpGain(gained);
      const lv = getLevelInfo(p.total_xp);
      setLevel(lv.level);
      setProgress(getXpProgress(p.total_xp));
      sessionStorage.setItem("prev_xp", String(p.total_xp));
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
    <header className="app-header">
      {/* Level + progress bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
        <span style={{
          fontSize: 12, fontWeight: "bold", color: "#2563EB",
          whiteSpace: "nowrap", background: "#DBEAFE",
          padding: "2px 8px", borderRadius: 20,
        }}>
          Lv.{level}
        </span>
        <div style={{
          flex: 1, maxWidth: 140, height: 6,
          backgroundColor: "#DBEAFE", borderRadius: 3, overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            width: `${Math.round(progress * 100)}%`,
            background: "linear-gradient(to right, #F59E0B, #FBBF24)",
            borderRadius: 3,
            transition: "width 0.5s ease",
          }} />
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* XP display */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 16 }}>⭐</span>
        <span style={{
          fontSize: 14, fontWeight: "bold", color: "#1E293B",
        }}>
          {xp.toLocaleString()}
        </span>
      </div>

      {/* XP gain badge */}
      {xpGain > 0 && (
        <div style={{
          background: "#D1FAE5", color: "#059669",
          fontSize: 11, fontWeight: "bold",
          padding: "2px 8px", borderRadius: 20,
          whiteSpace: "nowrap",
        }}>
          +{xpGain}pt
        </div>
      )}

      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: "linear-gradient(135deg, #2563EB, #60A5FA)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
    </header>
  );
}
