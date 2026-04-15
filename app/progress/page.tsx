"use client";
import { useEffect, useState } from "react";
import { loadState } from "@/lib/storage";
import { getLevelInfo, getXpProgress, getNextLevelInfo, LEVELS, BADGES, getBadgeInfo } from "@/lib/gamification";
import { getBoxLabel, getBoxColor } from "@/lib/srs";
import flashcardsData from "@/data/flashcards.json";
import quizData from "@/data/quiz_questions.json";
import scenarioData from "@/data/scenarios.json";

export default function ProgressPage() {
  const [state, setState] = useState<ReturnType<typeof loadState> | null>(null);

  useEffect(() => {
    setState(loadState());
    const handler = () => setState(loadState());
    window.addEventListener("xp_update", handler);
    return () => window.removeEventListener("xp_update", handler);
  }, []);

  if (!state) return null;

  const { user_progress: p, srs_cards, quiz_history } = state;
  const xp = p.total_xp;
  const lv = getLevelInfo(xp);
  const nextLv = getNextLevelInfo(xp);
  const prog = getXpProgress(xp);

  // SRS stats
  const allCardIds = (flashcardsData as { id: string }[]).map((c) => c.id);
  const boxCounts = [0, 0, 0, 0, 0, 0]; // index 0 unused, 1-5
  for (const id of allCardIds) {
    const card = srs_cards[id];
    const box = card?.box ?? 1;
    boxCounts[box] = (boxCounts[box] || 0) + 1;
  }

  // Quiz stats
  const quizIds = new Set((quizData as { id: string }[]).map((q) => q.id));
  const scenarioIds = new Set((scenarioData as { id: string }[]).map((s) => s.id));

  const quizHistory = quiz_history.filter((h) => h.mode === "quiz");
  const scenarioHistory = quiz_history.filter((h) => h.mode === "scenario");

  const quizAcc =
    quizHistory.length > 0
      ? Math.round((quizHistory.filter((h) => h.is_correct).length / quizHistory.length) * 100)
      : null;
  const scenarioAcc =
    scenarioHistory.length > 0
      ? Math.round((scenarioHistory.filter((h) => h.is_correct).length / scenarioHistory.length) * 100)
      : null;

  // Recent history (last 20)
  const recentHistory = [...quiz_history].reverse().slice(0, 20);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: "var(--accent)", fontSize: 20, fontWeight: "bold" }}>📊 進捗・実績</div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
          学習履歴・XP・バッジ・正答率
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Level & XP */}
        <div
          style={{
            background: "linear-gradient(135deg, #16213e, #1a2d50)",
            border: "1px solid #2a4070",
            borderRadius: 12,
            padding: "20px",
          }}
        >
          <div style={{ color: "var(--accent)", fontSize: 22, fontWeight: "bold", marginBottom: 4 }}>
            Lv.{lv.level} {lv.title}
          </div>
          <div style={{ color: "#7090b0", fontSize: 13, marginBottom: 16 }}>
            {xp.toLocaleString()} XP{nextLv ? ` / ${nextLv.min_xp.toLocaleString()} XP` : " (最大)"}
          </div>
          <div
            style={{
              height: 8,
              backgroundColor: "var(--bg-input)",
              borderRadius: 4,
              overflow: "hidden",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${Math.round(prog * 100)}%`,
                background: "linear-gradient(to right, #e67e22, #f39c12)",
                borderRadius: 4,
              }}
            />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16 }}>
            <Stat label="連続学習" value={`${p.streak_days}日`} color="var(--accent-red)" />
            <Stat label="バッジ" value={`${p.badges.length}/${Object.keys(BADGES).length}`} color="var(--accent)" />
          </div>
          {/* Level roadmap */}
          <div style={{ marginTop: 16 }}>
            <div style={{ color: "var(--text-secondary)", fontSize: 12, marginBottom: 8 }}>レベルロードマップ</div>
            <div style={{ display: "flex", gap: 4 }}>
              {LEVELS.map((lvInfo) => (
                <div
                  key={lvInfo.level}
                  style={{
                    flex: 1,
                    padding: "4px 2px",
                    borderRadius: 4,
                    backgroundColor: lv.level >= lvInfo.level ? "#1a3a6e" : "#0f1e38",
                    border: `1px solid ${lv.level >= lvInfo.level ? "var(--accent)" : "var(--border-color)"}`,
                    textAlign: "center",
                    fontSize: 10,
                    color: lv.level >= lvInfo.level ? "var(--accent)" : "var(--text-muted)",
                  }}
                >
                  Lv.{lvInfo.level}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Stats */}
        <div
          style={{
            backgroundColor: "var(--bg-card-dark)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: "20px",
          }}
        >
          <div style={{ color: "#5dade2", fontWeight: "bold", marginBottom: 16 }}>正答率サマリー</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <AccuracyBar
              label="択一クイズ"
              acc={quizAcc}
              total={quizHistory.length}
            />
            <AccuracyBar
              label="シナリオクイズ"
              acc={scenarioAcc}
              total={scenarioHistory.length}
            />
          </div>
        </div>
      </div>

      {/* SRS Distribution */}
      <div
        style={{
          backgroundColor: "var(--bg-card-dark)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: "20px",
          marginBottom: 20,
        }}
      >
        <div style={{ color: "var(--accent)", fontWeight: "bold", marginBottom: 16 }}>
          フラッシュカード習熟度分布
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {[1, 2, 3, 4, 5].map((box) => (
            <div key={box} style={{ textAlign: "center" }}>
              <div
                style={{
                  height: 80,
                  backgroundColor: "var(--bg-input)",
                  borderRadius: 6,
                  overflow: "hidden",
                  position: "relative",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: `${(boxCounts[box] / allCardIds.length) * 100}%`,
                    backgroundColor: getBoxColor(box),
                    transition: "height 0.5s",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {boxCounts[box]}
                </div>
              </div>
              <div style={{ color: getBoxColor(box), fontSize: 12, fontWeight: "bold" }}>
                Box{box}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: 11 }}>
                {getBoxLabel(box)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Badges */}
      <div
        style={{
          backgroundColor: "var(--bg-card-dark)",
          border: "1px solid var(--border-color)",
          borderRadius: 12,
          padding: "20px",
          marginBottom: 20,
        }}
      >
        <div style={{ color: "var(--accent)", fontWeight: "bold", marginBottom: 16 }}>バッジ</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {Object.entries(BADGES).map(([id, info]) => {
            const earned = p.badges.includes(id);
            return (
              <div
                key={id}
                style={{
                  backgroundColor: earned ? "#1a2d50" : "#0f1624",
                  border: `1px solid ${earned ? "#3a7ab8" : "var(--border-color)"}`,
                  borderRadius: 10,
                  padding: "12px",
                  opacity: earned ? 1 : 0.5,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>{info.icon}</div>
                <div style={{ color: earned ? "#d0d8e8" : "#4a5568", fontWeight: "bold", fontSize: 13 }}>
                  {info.name}
                </div>
                <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>
                  {info.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent History */}
      {recentHistory.length > 0 && (
        <div
          style={{
            backgroundColor: "var(--bg-card-dark)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: "20px",
          }}
        >
          <div style={{ color: "var(--accent)", fontWeight: "bold", marginBottom: 16 }}>
            最近の回答履歴（直近20件）
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {recentHistory.map((h, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 12px",
                  backgroundColor: "var(--bg-input)",
                  borderRadius: 6,
                  fontSize: 12,
                }}
              >
                <span style={{ color: "var(--text-secondary)" }}>
                  {h.mode === "quiz" ? "❓" : "📖"} {h.question_id}
                </span>
                <span style={{ color: h.is_correct ? "#27ae60" : "#e74c3c", fontWeight: "bold" }}>
                  {h.is_correct ? "正解" : "不正解"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div style={{ color: "var(--text-muted)", fontSize: 11 }}>{label}</div>
      <div style={{ color, fontWeight: "bold", fontSize: 16 }}>{value}</div>
    </div>
  );
}

function AccuracyBar({
  label,
  acc,
  total,
}: {
  label: string;
  acc: number | null;
  total: number;
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: "var(--text-secondary)" }}>{label}</span>
        <span style={{ color: "#d0d8e8" }}>
          {acc !== null ? `${acc}%（${total}回）` : "未受験"}
        </span>
      </div>
      <div
        style={{
          height: 8,
          backgroundColor: "var(--bg-input)",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${acc ?? 0}%`,
            background: acc !== null && acc >= 70 ? "linear-gradient(to right, #27ae60, #2ecc71)" : "linear-gradient(to right, #e67e22, #f39c12)",
            borderRadius: 4,
          }}
        />
      </div>
    </div>
  );
}
