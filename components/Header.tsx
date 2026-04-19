"use client";
import { useEffect, useState } from "react";
import { loadProgress } from "@/lib/storage";
import { getLevelInfo, getXpProgress } from "@/lib/gamification";

export default function Header() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [streak] = useState(12); // TODO: load from storage when streak tracking is added

  useEffect(() => {
    const refresh = () => {
      const p = loadProgress();
      setXp(p.total_xp);
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
      {/* 検索ピル */}
      <div className="topbar-search">
        <SearchIcon />
        <span>用語・クイズを検索</span>
        <kbd>⌘K</kbd>
      </div>

      <div style={{ flex: 1 }} />

      {/* 連続学習ストリーク */}
      <div className="streak-pill">
        <FireIcon />
        {streak}日
      </div>

      {/* XPピル: Lv + バー + ポイント */}
      <div className="xp-pill">
        <span className="xp-level">Lv.{level}</span>
        <div className="xp-bar-wrap">
          <div
            className="xp-bar-fill"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
        <div className="xp-count">
          <StarIcon />
          {xp.toLocaleString()}
        </div>
      </div>

      {/* アバター */}
      <button className="topbar-avatar">YS</button>
    </header>
  );
}

/* ── Inline SVG Icons ── */
function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/>
      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function FireIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2c0 0-5 5-5 10a5 5 0 0010 0c0-5-5-10-5-10zm0 14a3 3 0 01-3-3c0-2.5 3-6 3-6s3 3.5 3 6a3 3 0 01-3 3z"/>
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
