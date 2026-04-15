"use client";
import { useState } from "react";
import {
  loadProgress,
  saveProgress,
  saveQuizHistory,
  addToWrongList,
  removeFromWrongList,
} from "@/lib/storage";
import { addXp } from "@/lib/gamification";
import scenarioData from "@/data/scenarios.json";
import type { ScenarioQuestion } from "@/lib/types";

const allScenarios = scenarioData as ScenarioQuestion[];

function normalizeChoices(choices: ScenarioQuestion["choices"]): { label: string; text: string }[] {
  if (Array.isArray(choices)) return choices as { label: string; text: string }[];
  return Object.entries(choices as Record<string, string>).map(([label, text]) => ({ label, text }));
}

type Phase = "list" | "quiz" | "result";

export default function ScenarioPage() {
  const [phase, setPhase] = useState<Phase>("list");
  const [questions, setQuestions] = useState<ScenarioQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  const startAll = () => {
    const shuffled = [...allScenarios];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setQuestions(shuffled);
    setCurrentIdx(0);
    setSelected(null);
    setAnswered(false);
    setShowExplanation(false);
    setSessionCorrect(0);
    setPhase("quiz");
  };

  const handleSelect = (label: string) => {
    if (answered) return;
    setSelected(label);
    setAnswered(true);

    const q = questions[currentIdx];
    const correct = label === q.correct;

    saveQuizHistory({ question_id: q.id, mode: "scenario", is_correct: correct, answered_at: new Date().toISOString() });

    if (correct) {
      removeFromWrongList(q.id, "scenario");
      let p = loadProgress();
      const { progress: np } = addXp(p, "scenario_correct");
      saveProgress(np);
      window.dispatchEvent(new Event("xp_update"));
      setSessionCorrect((n) => n + 1);
    } else {
      addToWrongList(q.id, "scenario");
    }
  };

  const handleExplanation = () => {
    setShowExplanation(true);
    let p = loadProgress();
    const { progress: np } = addXp(p, "scenario_explanation");
    saveProgress(np);
    window.dispatchEvent(new Event("xp_update"));
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
      setShowExplanation(false);
    }
  };

  const q = questions[currentIdx];
  const choices = q ? normalizeChoices(q.choices) : [];

  return (
    <div style={{ maxWidth: 760, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: "var(--accent)", fontSize: 20, fontWeight: "bold" }}>📖 シナリオクイズ</div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
          全{allScenarios.length}問 · 実際の数値を使った計算・応用問題
        </div>
      </div>

      {/* List */}
      {phase === "list" && (
        <div>
          <button
            onClick={startAll}
            style={{
              backgroundColor: "#1a3a6e",
              color: "var(--accent)",
              border: "1px solid #3a6aae",
              borderRadius: 22,
              padding: "12px 40px",
              fontSize: 15,
              fontWeight: "bold",
              cursor: "pointer",
              marginBottom: 28,
            }}
          >
            シナリオクイズを開始
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {allScenarios.map((s, i) => (
              <div
                key={s.id}
                style={{
                  backgroundColor: "var(--bg-card-dark)",
                  border: "1px solid var(--border-color)",
                  borderRadius: 10,
                  padding: "14px 18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)", fontSize: 12, marginRight: 8 }}>#{i + 1}</span>
                  <span style={{ color: "#d0d8e8", fontSize: 14 }}>
                    {(s as { title?: string }).title || s.question.substring(0, 40) + "…"}
                  </span>
                </div>
                <span
                  style={{
                    color: ["#95a5a6", "#3498db", "#f1c40f", "#e67e22", "#e74c3c"][s.level - 1],
                    fontSize: 12,
                  }}
                >
                  Lv.{s.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quiz */}
      {phase === "quiz" && q && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>
            <span>{currentIdx + 1} / {questions.length}問</span>
            <span>正解 {sessionCorrect}問</span>
          </div>
          <div style={{ height: 4, backgroundColor: "var(--bg-input)", borderRadius: 2, marginBottom: 20, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(currentIdx / questions.length) * 100}%`,
                background: "linear-gradient(to right, #e67e22, #f39c12)",
                borderRadius: 2,
              }}
            />
          </div>

          {/* Situation */}
          <div
            style={{
              backgroundColor: "#0f1e38",
              border: "1px solid #1e2d4a",
              borderLeft: "4px solid #3498db",
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 14,
              fontSize: 13,
              lineHeight: 1.8,
              color: "#c0d4ea",
              whiteSpace: "pre-wrap",
            }}
          >
            <div style={{ color: "#5dade2", fontWeight: "bold", marginBottom: 8, fontSize: 11 }}>
              【状況説明】
            </div>
            {q.situation}
          </div>

          {/* Question */}
          <div
            style={{
              backgroundColor: "var(--bg-card-dark)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              padding: "18px 22px",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>
                {(q as { category?: string }).category || "シナリオ"}
              </span>
              <span style={{ color: ["#95a5a6", "#3498db", "#f1c40f", "#e67e22", "#e74c3c"][q.level - 1], fontSize: 12 }}>
                Lv.{q.level}
              </span>
            </div>
            <div style={{ color: "#eef2ff", fontSize: 15, lineHeight: 1.7 }}>{q.question}</div>
          </div>

          {/* Choices */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14 }}>
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
              }
              return (
                <button
                  key={label}
                  onClick={() => handleSelect(label)}
                  style={{
                    backgroundColor: bg, color, border,
                    borderRadius: 9, padding: "12px 16px",
                    textAlign: "left", fontSize: 14,
                    cursor: answered ? "default" : "pointer",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ fontWeight: "bold", marginRight: 8 }}>{label}.</span>
                  {text}
                </button>
              );
            })}
          </div>

          {answered && !showExplanation && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  color: selected === q.correct ? "#27ae60" : "#e74c3c",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {selected === q.correct ? "✓ 正解！" : `✗ 不正解（正解: ${q.correct}）`}
              </div>
              <button
                onClick={handleExplanation}
                style={{
                  backgroundColor: "transparent",
                  color: "#5dade2",
                  border: "1px solid #2a5070",
                  borderRadius: 6,
                  padding: "4px 14px",
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                解説を見る (+5 XP)
              </button>
            </div>
          )}

          {showExplanation && (
            <div
              style={{
                backgroundColor: selected === q.correct ? "#0e2318" : "#1e0f0f",
                border: `1px solid ${selected === q.correct ? "#27ae60" : "#c0392b"}`,
                borderRadius: 10,
                padding: "14px 18px",
                marginBottom: 14,
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
                  backgroundColor: "#1a2d50", color: "#d0d8e8",
                  border: "1px solid #2a4070", borderRadius: 7,
                  padding: "10px 32px", fontSize: 14, cursor: "pointer",
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
            borderRadius: 16, padding: "40px", textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎉</div>
          <div style={{ color: "var(--accent)", fontSize: 22, fontWeight: "bold", marginBottom: 8 }}>
            シナリオクイズ完了！
          </div>
          <div style={{ color: "#c8d4ea", fontSize: 20, marginBottom: 24 }}>
            {sessionCorrect} / {questions.length} 正解（
            {Math.round((sessionCorrect / questions.length) * 100)}%）
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={startAll}
              style={{
                backgroundColor: "#1a2d50", color: "#d0d8e8",
                border: "1px solid #2a4070", borderRadius: 7,
                padding: "10px 24px", fontSize: 14, cursor: "pointer",
              }}
            >
              もう一度
            </button>
            <button
              onClick={() => setPhase("list")}
              style={{
                backgroundColor: "#1a2d50", color: "#d0d8e8",
                border: "1px solid #2a4070", borderRadius: 7,
                padding: "10px 24px", fontSize: 14, cursor: "pointer",
              }}
            >
              問題一覧へ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
