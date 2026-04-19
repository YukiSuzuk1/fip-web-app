"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadProgress, getSrsStats, getQuizStats, saveProgress } from "@/lib/storage";
import { getLevelInfo, getXpProgress, updateStreak } from "@/lib/gamification";
import flashcardsData from "@/data/flashcards.json";

const flashcards = flashcardsData as { id: string }[];

const FEATURE_CARDS = [
  {
    href: "/scenario",
    iconBg: "#D1FAE5",
    iconColor: "#059669",
    icon: <TargetSVG />,
    label: "クエストモード",
    desc: "クイズに挑戦して、情報量を増やそう",
  },
  {
    href: "/progress",
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    icon: <TrophySVG />,
    label: "ランキング",
    desc: "全国の学習者のスコアを比べよう",
  },
  {
    href: "/quiz",
    iconBg: "#DBEAFE",
    iconColor: "#2563EB",
    icon: <span style={{ fontSize: 18, fontWeight: "bold", fontFamily: "serif", color: "#2563EB" }}>Aa</span>,
    label: "用語クイズ",
    desc: "電力事業の重要用語をわかりやすく解説",
  },
];

const NEWS_ITEMS = [
  { category: "新機能", categoryColor: "#2563EB", categoryBg: "#DBEAFE", date: "4/15", title: "新しいテストを追加しました" },
  { category: "お知らせ", categoryColor: "#059669", categoryBg: "#D1FAE5", date: "4/10", title: "学習ゲームキャンペーン開催！" },
  { category: "FIP情報", categoryColor: "#D97706", categoryBg: "#FEF3C7", date: "4/5",  title: "FIP制度の重要な改定について" },
  { category: "新機能", categoryColor: "#2563EB", categoryBg: "#DBEAFE", date: "3/30", title: "学習進捗の改善機能を追加" },
];

const LEARNING_STEPS = [
  { href: "/flashcard", icon: "🔍", label: "知る",       desc: "基礎知識を身につける" },
  { href: "/flow",      icon: "📖", label: "理解する",   desc: "制度の仕組みを学ぶ" },
  { href: "/quiz",      icon: "✏️", label: "試す",       desc: "問題を解いて確かめる" },
  { href: "/progress",  icon: "📊", label: "習慣化する", desc: "継続して力をつける" },
];

export default function HomePage() {
  const [progressPct, setProgressPct] = useState(0);
  const [srsStats, setSrsStats] = useState({ total: 0, mastered: 0, dueToday: 0 });
  const [quizStats, setQuizStats] = useState({ total: 0, correct: 0, accuracy: 0 });
  const [masteredPct, setMasteredPct] = useState(0);

  useEffect(() => {
    let p = loadProgress();
    p = updateStreak(p);
    saveProgress(p);

    setProgressPct(Math.round(getXpProgress(p.total_xp) * 100));

    const allIds = flashcards.map((c) => c.id);
    const srs = getSrsStats(allIds);
    setSrsStats(srs);
    setMasteredPct(srs.total > 0 ? Math.round((srs.mastered / srs.total) * 100) : 0);
    setQuizStats(getQuizStats("quiz"));

    window.dispatchEvent(new Event("xp_update"));
  }, []);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>

      {/* ── Hero Banner ── */}
      <div style={{
        background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 55%, #3B82F6 100%)",
        borderRadius: 18,
        padding: "28px 32px",
        marginBottom: 20,
        position: "relative",
        overflow: "hidden",
        minHeight: 180,
        display: "flex",
        alignItems: "center",
      }}>
        {/* Text side */}
        <div style={{ flex: 1, zIndex: 1, position: "relative" }}>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, marginBottom: 6 }}>
            電力の未来を学び、理解を深めよう
          </div>
          <h1 style={{
            color: "white", fontSize: 28, fontWeight: "bold",
            margin: "0 0 20px 0", lineHeight: 1.3,
          }}>
            FIP制度<br />学習ゲーム
          </h1>
          <Link href="/flashcard" style={{ textDecoration: "none" }}>
            <button style={{
              background: "white",
              color: "#2563EB",
              border: "none",
              borderRadius: 12,
              padding: "12px 22px",
              fontWeight: "bold",
              fontSize: 14,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}>
              <span style={{ fontSize: 18 }}>📘</span>
              学習をはじめる
              <span style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 24, height: 24, borderRadius: "50%",
                background: "#2563EB", color: "white", fontSize: 12, fontWeight: "bold",
              }}>→</span>
            </button>
          </Link>
        </div>

        {/* Illustration */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: "42%", overflow: "hidden",
        }}>
          <HeroIllustration />
        </div>
      </div>

      {/* ── Feature Cards (3col) ── */}
      <div className="grid-3col" style={{ marginBottom: 20 }}>
        {FEATURE_CARDS.map(({ href, iconBg, icon, label, desc }) => (
          <Link key={href} href={href} className="feature-card" style={{ textDecoration: "none" }}>
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: iconBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 14,
            }}>
              {icon}
            </div>
            <div style={{ fontWeight: "bold", color: "var(--text-primary)", fontSize: 14, marginBottom: 6 }}>
              {label}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.5, marginBottom: 14 }}>
              {desc}
            </div>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "flex-end",
            }}>
              <span style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "#EFF6FF", color: "#2563EB",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, fontWeight: "bold",
              }}>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Bottom Row: Progress + News ── */}
      <div className="grid-2col" style={{ marginBottom: 20 }}>

        {/* Learning Progress */}
        <div style={{
          background: "white", borderRadius: 16, padding: "20px",
          border: "1px solid var(--border-color)",
          boxShadow: "0 2px 8px rgba(37,99,235,0.06)",
        }}>
          <div style={{ fontWeight: "bold", color: "var(--text-primary)", fontSize: 15, marginBottom: 16 }}>
            学習進捗
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {/* Donut chart */}
            <DonutChart pct={masteredPct} />
            {/* Stats */}
            <div style={{ flex: 1 }}>
              <ProgressStat
                label="学習達成率"
                value={`${quizStats.accuracy}%`}
                pct={quizStats.accuracy}
                color="#2563EB"
              />
              <div style={{ marginTop: 12 }}>
                <ProgressStat
                  label="企業平均"
                  value="70%"
                  pct={70}
                  color="#10B981"
                />
              </div>
            </div>
          </div>
        </div>

        {/* News */}
        <div style={{
          background: "white", borderRadius: 16, padding: "20px",
          border: "1px solid var(--border-color)",
          boxShadow: "0 2px 8px rgba(37,99,235,0.06)",
        }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 14,
          }}>
            <span style={{ fontWeight: "bold", color: "var(--text-primary)", fontSize: 15 }}>お知らせ</span>
            <span style={{ color: "#2563EB", fontSize: 12, cursor: "pointer" }}>すべてみる</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {NEWS_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 8,
                paddingBottom: i < NEWS_ITEMS.length - 1 ? 10 : 0,
                borderBottom: i < NEWS_ITEMS.length - 1 ? "1px solid #F1F5F9" : "none",
              }}>
                <span style={{
                  fontSize: 10, fontWeight: "bold",
                  color: item.categoryColor, background: item.categoryBg,
                  padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap",
                  marginTop: 1,
                }}>{item.category}</span>
                <div>
                  <div style={{ color: "#94A3B8", fontSize: 10, marginBottom: 2 }}>{item.date}</div>
                  <div style={{ color: "var(--text-primary)", fontSize: 12, lineHeight: 1.4 }}>
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Learning Steps (desktop) ── */}
      <div style={{
        background: "white", borderRadius: 16,
        border: "1px solid var(--border-color)",
        boxShadow: "0 2px 8px rgba(37,99,235,0.06)",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        overflow: "hidden",
      }}>
        {LEARNING_STEPS.map(({ href, icon, label, desc }, i) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div style={{
              padding: "18px 16px",
              borderRight: i < LEARNING_STEPS.length - 1 ? "1px solid #F1F5F9" : "none",
              textAlign: "center",
              transition: "background 0.15s",
              cursor: "pointer",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#EFF6FF")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontWeight: "bold", color: "#1E293B", fontSize: 13, marginBottom: 4 }}>
                {label}
              </div>
              <div style={{ color: "#64748B", fontSize: 11, lineHeight: 1.4 }}>{desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Hero Illustration SVG ── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 280 180" xmlns="http://www.w3.org/2000/svg"
         style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      {/* Sun glow */}
      <circle cx="230" cy="45" r="35" fill="rgba(251,191,36,0.2)" />
      <circle cx="230" cy="45" r="22" fill="rgba(252,211,77,0.5)" />
      <circle cx="230" cy="45" r="14" fill="rgba(253,230,138,0.85)" />

      {/* Power tower */}
      <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" fill="none">
        <line x1="168" y1="22" x2="163" y2="115" />
        <line x1="182" y1="22" x2="187" y2="115" />
        <line x1="155" y1="38" x2="195" y2="38" />
        <line x1="157" y1="58" x2="193" y2="58" />
        <line x1="159" y1="78" x2="191" y2="78" />
        <line x1="163" y1="38" x2="168" y2="58" />
        <line x1="187" y1="38" x2="182" y2="58" />
        <line x1="168" y1="58" x2="163" y2="78" />
        <line x1="182" y1="58" x2="187" y2="78" />
        {/* Wires */}
        <path d="M 155 38 Q 80 55 0 50" />
        <path d="M 195 38 Q 240 45 280 40" />
      </g>

      {/* Buildings */}
      <rect x="0"   y="95"  width="38" height="85" fill="rgba(30,58,138,0.5)"  rx="2" />
      <rect x="12"  y="78"  width="22" height="102" fill="rgba(30,58,138,0.45)" rx="2" />
      <rect x="42"  y="62"  width="32" height="118" fill="rgba(30,58,138,0.52)" rx="2" />
      <rect x="78"  y="82"  width="24" height="98"  fill="rgba(30,58,138,0.42)" rx="2" />
      <rect x="106" y="58"  width="36" height="122" fill="rgba(30,58,138,0.5)"  rx="2" />
      <rect x="146" y="88"  width="20" height="92"  fill="rgba(30,58,138,0.38)" rx="2" />

      {/* Windows */}
      {[14,19,24].flatMap(x => [82,92,102,112].map(y =>
        <rect key={`w${x}${y}`} x={x} y={y} width="4" height="4"
              fill="rgba(255,255,255,0.35)" rx="0.5" />
      ))}
      {[46,52,58,64].flatMap(x => [67,77,87,97].map(y =>
        <rect key={`w2${x}${y}`} x={x} y={y} width="4" height="4"
              fill="rgba(255,255,255,0.35)" rx="0.5" />
      ))}
      {[110,118,126,134].flatMap(x => [63,73,83,93].map(y =>
        <rect key={`w3${x}${y}`} x={x} y={y} width="4" height="4"
              fill="rgba(255,255,255,0.35)" rx="0.5" />
      ))}

      {/* Ground */}
      <rect x="0" y="160" width="280" height="20" fill="rgba(30,58,138,0.35)" rx="2" />

      {/* Solar panels */}
      {[0, 22].map(dy => (
        <g key={dy} transform={`translate(242, ${100 + dy}) rotate(-8)`}>
          <rect x="0" y="0" width="34" height="16"
                fill="rgba(37,99,235,0.65)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" rx="1" />
          <line x1="0" y1="8" x2="34" y2="8" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <line x1="8.5" y1="0" x2="8.5" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <line x1="17"  y1="0" x2="17"  y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          <line x1="25.5" y1="0" x2="25.5" y2="16" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}

/* ── Donut Chart ── */
function DonutChart({ pct }: { pct: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg viewBox="0 0 100 100" style={{ width: 90, height: 90, flexShrink: 0 }}>
      <circle cx="50" cy="50" r={r} fill="none" stroke="#DBEAFE" strokeWidth="10" />
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke="#2563EB"
        strokeWidth="10"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1E293B">
        {pct}
      </text>
      <text x="50" y="62" textAnchor="middle" fontSize="10" fill="#64748B">%</text>
    </svg>
  );
}

/* ── Progress Stat ── */
function ProgressStat({
  label, value, pct, color,
}: { label: string; value: string; pct: number; color: string }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: "#64748B" }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: "bold", color: "#1E293B" }}>{value}</span>
      </div>
      <div style={{ height: 5, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: color, borderRadius: 3,
          transition: "width 0.6s ease",
        }} />
      </div>
    </div>
  );
}

/* ── Feature Card Icons ── */
function TargetSVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function TrophySVG() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="8 21 12 17 16 21" />
      <line x1="12" y1="17" x2="12" y2="11" />
      <path d="M7 4h10l-1 7a5 5 0 01-8 0L7 4z" />
      <path d="M7 4H4l1 5a4 4 0 003 3" />
      <path d="M17 4h3l-1 5a4 4 0 01-3 3" />
    </svg>
  );
}
