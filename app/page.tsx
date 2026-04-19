"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { loadProgress, getSrsStats, getQuizStats, saveProgress } from "@/lib/storage";
import { getLevelInfo, getXpProgress, updateStreak } from "@/lib/gamification";
import flashcardsData from "@/data/flashcards.json";

const flashcards = flashcardsData as { id: string }[];

const FEATURE_CARDS = [
  {
    href: "/flashcard",
    emoji: "📚",
    label: "学習パス",
    desc: "基礎から体系的にFIP制度を学ぶ",
    accent: "var(--grass)",
    accentSoft: "var(--grass-soft)",
    accentDeep: "var(--grass-deep)",
  },
  {
    href: "/quiz",
    emoji: "❓",
    label: "用語クイズ",
    desc: "電力事業の重要用語を確認する",
    accent: "var(--grid)",
    accentSoft: "var(--grid-soft)",
    accentDeep: "var(--grid-deep)",
  },
  {
    href: "/scenario",
    emoji: "⚡",
    label: "実践クエスト",
    desc: "シナリオで実際の課題に挑戦する",
    accent: "var(--solar)",
    accentSoft: "var(--solar-soft)",
    accentDeep: "var(--solar-deep)",
  },
  {
    href: "/flow",
    emoji: "🔗",
    label: "制度フロー",
    desc: "FIP認定から精算までの流れを把握",
    accent: "var(--violet)",
    accentSoft: "var(--violet-soft)",
    accentDeep: "var(--violet)",
  },
];

const PATH_NODES = [
  { state: "done",    label: "FIPとは",       href: "/flashcard" },
  { state: "done",    label: "価格の仕組み",  href: "/flashcard" },
  { state: "done",    label: "認定手続き",    href: "/flashcard" },
  { state: "current", label: "バランシング",  href: "/flashcard" },
  { state: "locked",  label: "精算制度",      href: "/flashcard" },
  { state: "locked",  label: "実践クエスト",  href: "/scenario" },
];

const NEWS_ITEMS = [
  { category: "新機能",   accent: "var(--grid)",  accentSoft: "var(--grid-soft)",  date: "4/15", title: "新しいクイズセットを追加しました" },
  { category: "お知らせ", accent: "var(--grass)", accentSoft: "var(--grass-soft)", date: "4/10", title: "学習ゲームキャンペーン開催！" },
  { category: "FIP情報",  accent: "var(--solar)", accentSoft: "var(--solar-soft)", date: "4/5",  title: "FIP制度の重要な改定について" },
  { category: "新機能",   accent: "var(--grid)",  accentSoft: "var(--grid-soft)",  date: "3/30", title: "学習進捗の改善機能を追加" },
];

export default function HomePage() {
  const [masteredPct, setMasteredPct] = useState(0);
  const [quizStats, setQuizStats] = useState({ total: 0, correct: 0, accuracy: 0 });

  useEffect(() => {
    let p = loadProgress();
    p = updateStreak(p);
    saveProgress(p);

    const allIds = flashcards.map((c) => c.id);
    const srs = getSrsStats(allIds);
    setMasteredPct(srs.total > 0 ? Math.round((srs.mastered / srs.total) * 100) : 0);
    setQuizStats(getQuizStats("quiz"));

    window.dispatchEvent(new Event("xp_update"));
  }, []);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, var(--grass-shade) 0%, var(--grass-deep) 45%, var(--grass) 100%)",
        borderRadius: "var(--radius-lg)",
        padding: "36px 40px",
        marginBottom: 24,
        position: "relative",
        overflow: "hidden",
        minHeight: 200,
        display: "flex",
        alignItems: "center",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute", right: -40, top: -40,
          width: 280, height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, oklch(0.72 0.17 150 / 0.35) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Text */}
        <div style={{ flex: 1, zIndex: 1, position: "relative" }}>
          <div style={{ color: "oklch(0.85 0.08 155)", fontSize: 12, marginBottom: 8, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            FIP太陽光発電制度 学習アプリ
          </div>
          <h1 style={{
            color: "white",
            fontSize: "clamp(22px, 3vw, 32px)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            margin: "0 0 24px 0",
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}>
            再エネの未来を、<br />ゲームで学ぶ。
          </h1>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link href="/flashcard">
              <button style={{
                background: "white",
                color: "var(--grass-deep)",
                border: "none",
                borderRadius: "var(--radius-full)",
                padding: "11px 22px",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 4px 0 oklch(0.30 0.08 160 / 0.4)",
                transition: "transform 0.1s, box-shadow 0.1s",
                display: "flex", alignItems: "center", gap: 8,
              }}
                onMouseDown={e => { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = "0 2px 0 oklch(0.30 0.08 160 / 0.4)"; }}
                onMouseUp={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 0 oklch(0.30 0.08 160 / 0.4)"; }}
              >
                📘 学習をはじめる
              </button>
            </Link>
            <Link href="/quiz">
              <button style={{
                background: "transparent",
                color: "white",
                border: "2px solid rgba(255,255,255,0.5)",
                borderRadius: "var(--radius-full)",
                padding: "11px 22px",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                transition: "background 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                ❓ クイズに挑戦
              </button>
            </Link>
          </div>
        </div>

        {/* Illustration */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "38%", pointerEvents: "none" }}>
          <HeroIllustration />
        </div>
      </div>

      {/* ── Feature Cards (4col) ── */}
      <div className="grid-4col" style={{ marginBottom: 28 }}>
        {FEATURE_CARDS.map(({ href, emoji, label, desc, accent, accentSoft, accentDeep }) => (
          <Link key={href + label} href={href} style={{ textDecoration: "none" }}>
            <div
              className="feature-card"
              style={{ height: "100%" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
            >
              <div style={{
                width: 46, height: 46, borderRadius: "var(--radius-sm)",
                background: accentSoft,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
              }}>
                {emoji}
              </div>
              <div style={{ fontWeight: 700, color: "var(--ink-900)", fontSize: 14, marginTop: 4 }}>
                {label}
              </div>
              <div style={{ color: "var(--ink-500)", fontSize: 12, lineHeight: 1.5 }}>
                {desc}
              </div>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end" }}>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: accentSoft, color: accent,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: "bold",
                }}>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Learning Path ── */}
      <div style={{
        background: "var(--bg-elev)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "24px 28px",
        marginBottom: 24,
      }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 700, color: "var(--ink-900)", fontSize: 16 }}>学習パス</div>
          <div style={{ color: "var(--ink-500)", fontSize: 12, marginTop: 4 }}>
            ステップごとにFIP制度を習得しよう
          </div>
        </div>

        {/* Path nodes row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, overflowX: "auto" }}>
          {PATH_NODES.map(({ state, label, href }, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              {/* Node */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <Link href={href}>
                  <div className={`path-node ${state}`} title={label}>
                    {state === "done"    && <CheckIcon />}
                    {state === "current" && <PlayIcon />}
                    {state === "locked"  && <LockIcon />}
                  </div>
                </Link>
                <div style={{
                  fontSize: 11,
                  fontWeight: state === "current" ? 700 : 500,
                  color: state === "locked" ? "var(--ink-400)" : state === "current" ? "var(--solar-deep)" : "var(--grass-deep)",
                  textAlign: "center", maxWidth: 72, lineHeight: 1.3,
                }}>
                  {label}
                </div>
              </div>

              {/* Connector */}
              {i < PATH_NODES.length - 1 && (
                <div style={{
                  width: 48, height: 3, flexShrink: 0, marginBottom: 20,
                  background: i < PATH_NODES.findIndex(n => n.state === "current")
                    ? "var(--grass)"
                    : "var(--ink-200)",
                  borderRadius: 2,
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Row: Progress + News ── */}
      <div className="grid-2col">

        {/* Progress */}
        <div style={{
          background: "var(--bg-elev)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)", padding: "22px",
        }}>
          <div style={{ fontWeight: 700, color: "var(--ink-900)", fontSize: 15, marginBottom: 18 }}>
            学習進捗
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <DonutChart pct={masteredPct} />
            <div style={{ flex: 1 }}>
              <ProgressStat label="学習達成率" value={`${quizStats.accuracy}%`} pct={quizStats.accuracy} />
              <div style={{ marginTop: 12 }}>
                <ProgressStat label="企業平均" value="70%" pct={70} muted />
              </div>
            </div>
          </div>
        </div>

        {/* News */}
        <div style={{
          background: "var(--bg-elev)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)", padding: "22px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 700, color: "var(--ink-900)", fontSize: 15 }}>お知らせ</span>
            <span style={{ color: "var(--grass)", fontSize: 12, cursor: "pointer" }}>すべてみる</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {NEWS_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                paddingBottom: i < NEWS_ITEMS.length - 1 ? 12 : 0,
                borderBottom: i < NEWS_ITEMS.length - 1 ? "1px solid var(--border)" : "none",
              }}>
                <span style={{
                  fontSize: 10, fontWeight: 600,
                  color: item.accent, background: item.accentSoft,
                  padding: "2px 7px", borderRadius: "var(--radius-full)",
                  whiteSpace: "nowrap", marginTop: 2, flexShrink: 0,
                }}>
                  {item.category}
                </span>
                <div>
                  <div style={{ color: "var(--ink-400)", fontSize: 10, marginBottom: 2 }}>{item.date}</div>
                  <div style={{ color: "var(--ink-900)", fontSize: 12, lineHeight: 1.4 }}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero Illustration ── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg"
         style={{ width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
      {/* Sun */}
      <circle cx="220" cy="50" r="38" fill="oklch(0.78 0.16 85 / 0.2)" />
      <circle cx="220" cy="50" r="24" fill="oklch(0.78 0.16 85 / 0.45)" />
      <circle cx="220" cy="50" r="15" fill="oklch(0.90 0.12 85 / 0.80)" />

      {/* Power tower */}
      <g stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" fill="none">
        <line x1="160" y1="20" x2="155" y2="120" />
        <line x1="176" y1="20" x2="181" y2="120" />
        <line x1="148" y1="36" x2="188" y2="36" />
        <line x1="150" y1="58" x2="186" y2="58" />
        <line x1="153" y1="80" x2="183" y2="80" />
        <line x1="156" y1="36" x2="160" y2="58" />
        <line x1="180" y1="36" x2="176" y2="58" />
        <line x1="160" y1="58" x2="155" y2="80" />
        <line x1="176" y1="58" x2="181" y2="80" />
        <path d="M 148 36 Q 75 52 0 46" />
        <path d="M 188 36 Q 234 44 280 38" />
      </g>

      {/* Buildings */}
      <rect x="0"   y="110" width="36" height="90" fill="oklch(0.30 0.08 160 / 0.6)"  rx="2" />
      <rect x="10"  y="88"  width="22" height="112" fill="oklch(0.30 0.08 160 / 0.55)" rx="2" />
      <rect x="40"  y="70"  width="30" height="130" fill="oklch(0.30 0.08 160 / 0.62)" rx="2" />
      <rect x="76"  y="90"  width="24" height="110" fill="oklch(0.30 0.08 160 / 0.50)" rx="2" />
      <rect x="104" y="65"  width="34" height="135" fill="oklch(0.30 0.08 160 / 0.60)" rx="2" />

      {/* Windows */}
      {[12,17,22].flatMap(x => [95,107,119,131].map(y =>
        <rect key={`w1-${x}-${y}`} x={x} y={y} width="4" height="4" fill="rgba(255,255,255,0.3)" rx="0.5" />
      ))}
      {[44,50,56,62].flatMap(x => [76,88,100,112].map(y =>
        <rect key={`w2-${x}-${y}`} x={x} y={y} width="4" height="4" fill="rgba(255,255,255,0.3)" rx="0.5" />
      ))}

      {/* Ground */}
      <rect x="0" y="175" width="280" height="25" fill="oklch(0.25 0.07 160 / 0.45)" rx="2" />

      {/* Solar panels */}
      {[0, 24].map((dy, i) => (
        <g key={i} transform={`translate(236, ${105 + dy}) rotate(-8)`}>
          <rect x="0" y="0" width="36" height="17" fill="oklch(0.62 0.15 230 / 0.75)"
                stroke="rgba(255,255,255,0.45)" strokeWidth="1" rx="1" />
          <line x1="0" y1="8.5" x2="36" y2="8.5" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          {[9, 18, 27].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="17" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          ))}
        </g>
      ))}

      {/* Lightning bolt */}
      <path d="M 262 60 L 254 76 L 261 76 L 252 94 L 271 74 L 263 74 Z"
            fill="oklch(0.78 0.16 85 / 0.9)" />
    </svg>
  );
}

/* ── Donut Chart ── */
function DonutChart({ pct }: { pct: number }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg viewBox="0 0 100 100" style={{ width: 86, height: 86, flexShrink: 0 }}>
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--grass-soft)" strokeWidth="10" />
      <circle
        cx="50" cy="50" r={r}
        fill="none"
        stroke="var(--grass)"
        strokeWidth="10"
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill="var(--ink-900)">
        {pct}
      </text>
      <text x="50" y="61" textAnchor="middle" fontSize="10" fill="var(--ink-400)">%習得</text>
    </svg>
  );
}

/* ── Progress Stat ── */
function ProgressStat({ label, value, pct, muted }: { label: string; value: string; pct: number; muted?: boolean }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 11, color: "var(--ink-500)" }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-700)" }}>{value}</span>
      </div>
      <div className="xp-progress-track">
        <div
          className="xp-progress-fill"
          style={{
            width: `${pct}%`,
            background: muted ? "var(--ink-300)" : undefined,
          }}
        />
      </div>
    </div>
  );
}

/* ── Path node icons ── */
function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
         stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
         stroke="var(--ink-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
