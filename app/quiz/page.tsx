"use client";
import { useEffect, useState } from "react";
import {
  loadProgress,
  saveProgress,
  saveQuizHistory,
  addToWrongList,
  removeFromWrongList,
  getQuizStats,
} from "@/lib/storage";
import { addXp } from "@/lib/gamification";
import quizData from "@/data/quiz_questions.json";
import type { QuizQuestion } from "@/lib/types";

const allQuestions = quizData as QuizQuestion[];

function normalizeChoices(choices: QuizQuestion["choices"]): { label: string; text: string }[] {
  if (Array.isArray(choices)) return choices as { label: string; text: string }[];
  return Object.entries(choices as Record<string, string>).map(([label, text]) => ({ label, text }));
}

type Phase = "select" | "quiz" | "result";

export default function QuizPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [levelFilter, setLevelFilter] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [stats, setStats] = useState({ total: 0, correct: 0, accuracy: 0 });

  useEffect(() => {
    setStats(getQuizStats("quiz"));
  }, []);

  const startQuiz = (level: number | null) => {
    let qs = [...allQuestions];
    if (level !== null) qs = qs.filter((q) => q.level === level);
    // Shuffle
    for (let i = qs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qs[i], qs[j]] = [qs[j], qs[i]];
    }
    setQuestions(qs);
    setCurrentIdx(0);
    setSelected(null);
    setAnswered(false);
    setSessionCorrect(0);
    setLevelFilter(level);
    setPhase("quiz");
  };

  const handleSelect = (label: string) => {
    if (answered) return;
    setSelected(label);
    setAnswered(true);

    const q = questions[currentIdx];
    const correct = label === q.correct;

    saveQuizHistory({
      question_id: q.id,
      mode: "quiz",
      is_correct: correct,
      answered_at: new Date().toISOString(),
    });

    if (correct) {
      removeFromWrongList(q.id, "quiz");
      let p = loadProgress();
      const { progress: np } = addXp(p, "quiz_correct");
      saveProgress(np);
      window.dispatchEvent(new Event("xp_update"));
      setSessionCorrect((n) => n + 1);
    } else {
      addToWrongList(q.id, "quiz");
    }
    setStats(getQuizStats("quiz"));
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const q = questions[currentIdx];
  const choices = q ? normalizeChoices(q.choices) : [];

  return (
    <div style={{ maxWidth: 740, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: "var(--accent)", fontSize: 20, fontWeight: "bold" }}>❓ 択一クイズ</div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
          全{allQuestions.length}問 · Lv.1〜5
          {stats.total > 0 && ` · 通算正答率 ${stats.accuracy}%（${stats.correct}/${stats.total}）`}
        </div>
      </div>

      {/* Level Select */}
      {phase === "select" && (
        <div>
          <div style={{ color: "#7090b0", fontSize: 13, marginBottom: 16 }}>レベルを選択してください</div>
          <div className="grid-3col" style={{ gap: 12 }}>
            <LevelCard
              label="全レベル"
              count={allQuestions.length}
              color="var(--accent)"
              onClick={() => startQuiz(null)}
            />
            {[1, 2, 3, 4, 5].map((lv) => (
              <LevelCard
                key={lv}
                label={`Lv.${lv}`}
                count={allQuestions.filter((q) => q.level === lv).length}
                color={["#95a5a6", "#3498db", "#f1c40f", "#e67e22", "#e74c3c"][lv - 1]}
                onClick={() => startQuiz(lv)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quiz */}
      {phase === "quiz" && q && (
        <div>
          {/* Progress */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
            <span>{currentIdx + 1} / {questions.length}問</span>
            <span>正解 {sessionCorrect}問</span>
          </div>
          <div style={{ height: 4, backgroundColor: "var(--bg-input)", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${((currentIdx) / questions.length) * 100}%`,
                background: "linear-gradient(to right, #e67e22, #f39c12)",
                borderRadius: 2,
              }}
            />
          </div>

          {/* Question */}
          <div
            style={{
              backgroundColor: "var(--bg-card-dark)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              padding: "20px 24px",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span
                style={{
                  backgroundColor: "#1a2d50",
                  color: "var(--text-secondary)",
                  borderRadius: 4,
                  padding: "2px 10px",
                  fontSize: 12,
                }}
              >
                {q.category || `Lv.${q.level}`}
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: 12 }}>Lv.{q.level}</span>
            </div>
            <div style={{ color: "#eef2ff", fontSize: 16, lineHeight: 1.7 }}>{q.question}</div>
          </div>

          {/* Choices */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
            {choices.map(({ label, text }) => {
              let bg = "#131e36";
              let border = "2px solid #1e2d4a";
              let color = "#d0d8e8";
              if (answered) {
                if (label === q.correct) {
                  bg = "#1a4a2a"; border = "2px solid #27ae60"; color = "#a8f0c0";
                } else if (label === selected) {
                  bg = "#4a1a1a"; border = "2px solid #e74c3c"; color = "#f0a8a8";
                }
              } else if (label === selected) {
                border = "2px solid var(--accent-blue)";
              }
              return (
                <button
                  key={label}
                  onClick={() => handleSelect(label)}
                  style={{
                    backgroundColor: bg,
                    color,
                    border,
                    borderRadius: 9,
                    padding: "14px 18px",
                    textAlign: "left",
                    fontSize: 14,
                    minHeight: 56,
                    cursor: answered ? "default" : "pointer",
                    transition: "all 0.2s",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: 8 }}>{label}.</span>
                  {text}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {answered && (
            <div
              style={{
                backgroundColor: selected === q.correct ? "#0e2318" : "#1e0f0f",
                border: `1px solid ${selected === q.correct ? "#27ae60" : "#c0392b"}`,
                borderRadius: 10,
                padding: "14px 18px",
                marginBottom: 16,
                fontSize: 14,
                lineHeight: 1.7,
                color: "#c8d4ea",
              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: 6, color: selected === q.correct ? "#27ae60" : "#e74c3c" }}>
                {selected === q.correct ? "✓ 正解！" : `✗ 不正解（正解: ${q.correct}）`}
              </div>
              {q.explanation}
            </div>
          )}

          {answered && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: "#1a2d50",
                  color: "#d0d8e8",
                  border: "1px solid #2a4070",
                  borderRadius: 7,
                  padding: "10px 32px",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                {currentIdx + 1 >= questions.length ? "結果を見る" : "次の問題 →"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Result */}
      {phase === "result" && (
        <div
          style={{
            backgroundColor: "var(--bg-card-dark)",
            border: "1px solid var(--border-color)",
            borderRadius: 16,
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
          <div style={{ color: "var(--accent)", fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
            クイズ完了！
          </div>
          <div style={{ color: "#c8d4ea", fontSize: 20, marginBottom: 8 }}>
            {sessionCorrect} / {questions.length} 正解
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: 16, marginBottom: 24 }}>
            正答率: {questions.length > 0 ? Math.round((sessionCorrect / questions.length) * 100) : 0}%
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={() => startQuiz(levelFilter)}
              style={{
                backgroundColor: "#1a2d50",
                color: "#d0d8e8",
                border: "1px solid #2a4070",
                borderRadius: 7,
                padding: "10px 24px",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              もう一度
            </button>
            <button
              onClick={() => setPhase("select")}
              style={{
                backgroundColor: "#1a2d50",
                color: "#d0d8e8",
                border: "1px solid #2a4070",
                borderRadius: 7,
                padding: "10px 24px",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              レベル選択に戻る
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function LevelCard({
  label,
  count,
  color,
  onClick,
}: {
  label: string;
  count: number;
  color: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: "var(--bg-card-dark)",
        border: `1px solid var(--border-color)`,
        borderTop: `4px solid ${color}`,
        borderRadius: 10,
        padding: "16px",
        cursor: "pointer",
        textAlign: "center",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.backgroundColor = "#1a2740";
        el.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.backgroundColor = "var(--bg-card-dark)";
        el.style.borderColor = "var(--border-color)";
      }}
    >
      <div style={{ color, fontSize: 18, fontWeight: "bold" }}>{label}</div>
      <div style={{ color: "var(--text-secondary)", fontSize: 12, marginTop: 4 }}>{count}問</div>
    </div>
  );
}
