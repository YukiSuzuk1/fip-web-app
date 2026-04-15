"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadProgress, getSrsStats, getQuizStats, saveProgress } from "@/lib/storage";
import { getLevelInfo, getXpProgress, getNextLevelInfo, updateStreak } from "@/lib/gamification";
import flashcardsData from "@/data/flashcards.json";

const flashcards = flashcardsData as { id: string }[];

const MODES = [
  { href: "/flashcard",  icon: "📇", label: "フラッシュカード",   desc: "55枚・Leitner式間隔反復" },
  { href: "/quiz",       icon: "❓", label: "択一クイズ",         desc: "40問・Lv.1〜5" },
  { href: "/scenario",   icon: "📖", label: "シナリオクイズ",     desc: "19問・実務計算" },
  { href: "/calculator", icon: "🧮", label: "計算シミュレーター", desc: "リアルタイム計算体験" },
  { href: "/flow",       icon: "🗺️", label: "フロー図学習",       desc: "制度の全体フロー把握" },
  { href: "/progress",   icon: "📊", label: "進捗・実績",         desc: "XP・バッジ・正答率" },
];

export default function HomePage() {
  const [xp, setXp] = useState(0);
  const [levelTitle, setLevelTitle] = useState("FIP初心者");
  const [levelNum, setLevelNum] = useState(1);
  const [progressPct, setProgressPct] = useState(0);
  const [streak, setStreak] = useState(0);
  const [srsStats, setSrsStats] = useState({ total: 0, mastered: 0, dueToday: 0 });
  const [quizStats, setQuizStats] = useState({ total: 0, correct: 0, accuracy: 0 });
  const [nextXp, setNextXp] = useState<number | null>(null);

  useEffect(() => {
    let p = loadProgress();
    p = updateStreak(p);
    saveProgress(p);

    const lv = getLevelInfo(p.total_xp);
    const nextLv = getNextLevelInfo(p.total_xp);
    setXp(p.total_xp);
    setLevelTitle(lv.title);
    setLevelNum(lv.level);
    setStreak(p.streak_days);
    setProgressPct(Math.round(getXpProgress(p.total_xp) * 100));
    setNextXp(nextLv ? nextLv.min_xp : null);

    const allIds = flashcards.map((c) => c.id);
    setSrsStats(getSrsStats(allIds));
    setQuizStats(getQuizStats("quiz"));

    window.dispatchEvent(new Event("xp_update"));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      {/* Welcome Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #16213e 0%, #1a2d50 100%)",
          border: "1px solid #2a4070",
          borderRadius: 14,
          padding: "20px 24px",
          marginBottom: 24,
        }}
      >
        <div style={{ color: "#c0d0e8", fontSize: 14, marginBottom: 4 }}>おかえりなさい！</div>
        <div style={{ color: "var(--accent)", fontSize: 22, fontWeight: "bold", marginBottom: 12 }}>
          Lv.{levelNum} {levelTitle}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <div
            style={{
              flex: 1,
              height: 8,
              backgroundColor: "var(--bg-input)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progressPct}%`,
                background: "linear-gradient(to right, #e67e22, #f39c12)",
                borderRadius: 4,
              }}
            />
          </div>
          <span style={{ color: "#7090b0", fontSize: 12, whiteSpace: "nowrap" }}>
            {xp.toLocaleString()} XP{nextXp ? ` / ${nextXp.toLocaleString()} XP` : ""}
          </span>
        </div>
        {streak > 0 && (
          <div style={{ color: "#e74c3c", fontSize: 14, fontWeight: "bold" }}>
            🔥 {streak}日連続学習中！
          </div>
        )}
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <StatCard value={`${srsStats.mastered}/${srsStats.total}`} label="カードマスター数" />
        <StatCard value={srsStats.dueToday.toString()} label="本日の復習カード" />
        <StatCard
          value={quizStats.total > 0 ? `${quizStats.accuracy}%` : "−"}
          label="クイズ正答率"
        />
      </div>

      {/* CTA */}
      {srsStats.dueToday > 0 && (
        <Link href="/flashcard" style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "linear-gradient(to right, #1a3560, #16213e)",
              border: "1px solid #2a5090",
              borderLeft: "4px solid var(--accent-blue)",
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 24,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ color: "var(--accent)", fontWeight: "bold" }}>
                📇 {srsStats.dueToday}枚のカードが復習待ちです
              </div>
              <div style={{ color: "#7090b0", fontSize: 12, marginTop: 4 }}>
                フラッシュカードで今すぐ学習 →
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Mode Grid */}
      <div style={{ color: "#7090b0", fontSize: 13, marginBottom: 12 }}>学習モードを選択</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 14,
        }}
      >
        {MODES.map(({ href, icon, label, desc }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div
              style={{
                backgroundColor: "var(--bg-card-dark)",
                border: "1px solid var(--border-color)",
                borderRadius: 12,
                padding: "16px",
                cursor: "pointer",
                transition: "border-color 0.2s, background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--accent)";
                el.style.backgroundColor = "#1a2740";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "var(--border-color)";
                el.style.backgroundColor = "var(--bg-card-dark)";
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontWeight: "bold", color: "#d0d8f0", fontSize: 14 }}>{label}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 4 }}>{desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-card-dark)",
        border: "1px solid var(--border-color)",
        borderRadius: 12,
        padding: "16px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 26, fontWeight: "bold", color: "var(--accent)" }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>{label}</div>
    </div>
  );
}
