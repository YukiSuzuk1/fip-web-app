"use client";
import { useEffect, useState, useCallback } from "react";
import {
  loadProgress,
  saveProgress,
  loadSrsCard,
  saveSrsCard,
  getDueCards,
} from "@/lib/storage";
import { processAnswer, newCard, getBoxLabel, getBoxColor, getMasteryPercent } from "@/lib/srs";
import { addXp, checkAndAwardBadge } from "@/lib/gamification";
import flashcardsData from "@/data/flashcards.json";
import type { Flashcard, SRSCard } from "@/lib/types";

const allCards = flashcardsData as Flashcard[];

type CardState = "front" | "back" | "correct" | "wrong";

export default function FlashcardPage() {
  const [queue, setQueue] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [srsCard, setSrsCard] = useState<SRSCard | null>(null);
  const [cardState, setCardState] = useState<CardState>("front");
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [finished, setFinished] = useState(false);
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState<"due" | "all">("due");

  const cardById = Object.fromEntries(allCards.map((c) => [c.id, c]));

  const loadQueue = useCallback(
    (mode: "due" | "all") => {
      const allIds = allCards.map((c) => c.id);
      const q = mode === "due" ? getDueCards(allIds) : [...allIds];
      // Shuffle
      for (let i = q.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [q[i], q[j]] = [q[j], q[i]];
      }
      setQueue(q);
      setSessionCorrect(0);
      setSessionTotal(0);
      setFinished(false);
      if (q.length === 0) {
        setFinished(true);
        setCurrentCard(null);
      } else {
        const card = cardById[q[0]];
        setCurrentCard(card);
        const sc = loadSrsCard(q[0]) ?? newCard(q[0]);
        setSrsCard(sc);
        setCardState("front");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    loadQueue("due");
  }, [loadQueue]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleAnswer = (correct: boolean) => {
    if (!currentCard || !srsCard || cardState === "front") return;

    const updated = processAnswer(srsCard, correct);
    saveSrsCard(updated);

    let p = loadProgress();
    const isFirst = srsCard.review_count === 0;
    const xpKey = correct ? (isFirst ? "flashcard_first_correct" : "flashcard_correct") : "";
    if (xpKey) {
      const { progress: np, leveledUp } = addXp(p, xpKey);
      p = np;
      if (leveledUp) showToast(`🎉 レベルアップ！ Lv.${p.current_level}`);
    }

    // Badge: 10 correct flashcards
    const totalCorrect = sessionCorrect + (correct ? 1 : 0);
    if (totalCorrect >= 10) {
      const { progress: np2 } = checkAndAwardBadge(p, "term_beginner");
      p = np2;
    }
    saveProgress(p);
    window.dispatchEvent(new Event("xp_update"));

    setSessionTotal((n) => n + 1);
    if (correct) setSessionCorrect((n) => n + 1);
    setCardState(correct ? "correct" : "wrong");
  };

  const handleNext = () => {
    const remaining = queue.slice(1);
    setQueue(remaining);
    if (remaining.length === 0) {
      setFinished(true);
      setCurrentCard(null);
    } else {
      const card = cardById[remaining[0]];
      setCurrentCard(card);
      const sc = loadSrsCard(remaining[0]) ?? newCard(remaining[0]);
      setSrsCard(sc);
      setCardState("front");
    }
  };

  const handleFlip = () => {
    if (cardState === "front") setCardState("back");
  };

  const boxColor = srsCard ? getBoxColor(srsCard.box) : "#95a5a6";
  const boxLabel = srsCard ? getBoxLabel(srsCard.box) : "";

  return (
    <div style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "white",
            border: "1px solid #DBEAFE",
            borderRadius: 12,
            padding: "10px 18px",
            color: "#2563EB",
            fontWeight: "bold",
            fontSize: 15,
            zIndex: 1000,
            boxShadow: "0 4px 12px rgba(37,99,235,0.15)",
          }}
        >
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <div style={{ color: "var(--accent-blue)", fontSize: 20, fontWeight: "bold" }}>
            📇 フラッシュカード
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
            Leitner式間隔反復法（5ボックス）
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {(["due", "all"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setFilter(m); loadQueue(m); }}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: `1px solid ${filter === m ? "#2563EB" : "var(--border-color)"}`,
                backgroundColor: filter === m ? "#DBEAFE" : "var(--bg-card-dark)",
                color: filter === m ? "#2563EB" : "var(--text-secondary)",
                fontSize: 12,
                cursor: "pointer",
                fontWeight: filter === m ? "bold" : "normal",
              }}
            >
              {m === "due" ? "復習のみ" : "全カード"}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {!finished && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-secondary)", marginBottom: 6 }}>
            <span>残り {queue.length}枚</span>
            <span>正解 {sessionCorrect}/{sessionTotal}</span>
          </div>
          <div style={{ height: 6, backgroundColor: "var(--bg-input)", borderRadius: 3, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: sessionTotal > 0 ? `${(sessionCorrect / Math.max(sessionTotal, 1)) * 100}%` : "0%",
                background: "linear-gradient(to right, #e67e22, #f39c12)",
                borderRadius: 3,
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>
      )}

      {/* Finished */}
      {finished && (
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
          <div style={{ color: "#2563EB", fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
            セッション完了！
          </div>
          <div style={{ color: "var(--text-secondary)", marginBottom: 24 }}>
            正解率: {sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0}%
            （{sessionCorrect}/{sessionTotal}）
          </div>
          <button
            onClick={() => loadQueue(filter)}
            style={{
              backgroundColor: "#2563EB",
              color: "white",
              border: "none",
              borderRadius: 7,
              padding: "10px 28px",
              fontSize: 14,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            もう一度
          </button>
        </div>
      )}

      {/* Card */}
      {!finished && currentCard && (
        <div>
          {/* Box indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span
              style={{
                backgroundColor: boxColor + "33",
                color: boxColor,
                border: `1px solid ${boxColor}`,
                borderRadius: 20,
                padding: "2px 12px",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              Box {srsCard?.box} · {boxLabel}
            </span>
            <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>
              習熟度 {getMasteryPercent(srsCard?.box ?? 1)}%
            </span>
            <span style={{ color: "var(--text-muted)", fontSize: 12, marginLeft: "auto" }}>
              {currentCard.category || currentCard.group}
            </span>
          </div>

          {/* Card body */}
          <div
            style={{
              backgroundColor: "#131e36",
              border: `1px solid #1e2a40`,
              borderTop: `4px solid ${boxColor}`,
              borderRadius: 16,
              padding: "28px 32px",
              minHeight: 320,
              cursor: cardState === "front" ? "pointer" : "default",
              transition: "border-top-color 0.3s",
            }}
            onClick={cardState === "front" ? handleFlip : undefined}
          >
            {/* Term */}
            <div
              style={{
                color: "#eef2ff",
                fontSize: 26,
                fontWeight: "bold",
                marginBottom: 20,
                lineHeight: 1.3,
              }}
            >
              {currentCard.term}
            </div>

            {/* Front hint */}
            {cardState === "front" && (
              <div style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 40 }}>
                クリックして答えを確認する
              </div>
            )}

            {/* Back / result */}
            {cardState !== "front" && (
              <div>
                <div
                  style={{
                    color: "#c8d4ea",
                    fontSize: 14,
                    lineHeight: 1.8,
                    marginBottom: currentCard.example ? 16 : 0,
                  }}
                >
                  {currentCard.definition}
                </div>

                {currentCard.example && (
                  <div
                    style={{
                      borderLeft: "3px solid #e67e22",
                      paddingLeft: 12,
                      marginBottom: 16,
                      marginTop: 8,
                    }}
                  >
                    <div style={{ color: "#e67e22", fontSize: 11, fontWeight: "bold", marginBottom: 4 }}>
                      例
                    </div>
                    <div style={{ color: "#9aabb8", fontSize: 13, lineHeight: 1.6 }}>
                      {currentCard.example}
                    </div>
                  </div>
                )}

                {currentCard.related && currentCard.related.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <span style={{ color: "#5d9bcc", fontSize: 12 }}>🔗 </span>
                    {currentCard.related.map((r, i) => (
                      <span
                        key={i}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#182840",
                          color: "#5d9bcc",
                          padding: "2px 10px",
                          borderRadius: 10,
                          fontSize: 12,
                          marginRight: 6,
                          marginBottom: 4,
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, marginTop: 20, justifyContent: "center" }}>
            {cardState === "front" ? (
              <button
                onClick={handleFlip}
                style={{
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  fontSize: 15,
                  fontWeight: "bold",
                  padding: "11px 36px",
                  borderRadius: 22,
                  cursor: "pointer",
                }}
              >
                答えを見る
              </button>
            ) : cardState === "back" ? (
              <>
                <button
                  onClick={() => handleAnswer(false)}
                  style={{
                    backgroundColor: "#6b1a1a",
                    color: "#f0a8a8",
                    border: "1px solid #aa2a2a",
                    fontSize: 15,
                    fontWeight: "bold",
                    padding: "11px 28px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  ✗ 不正解
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  style={{
                    backgroundColor: "#1a6b3a",
                    color: "#a8f0c0",
                    border: "1px solid #2aaa5a",
                    fontSize: 15,
                    fontWeight: "bold",
                    padding: "11px 28px",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  ✓ 正解
                </button>
              </>
            ) : (
              <button
                onClick={handleNext}
                style={{
                  backgroundColor: "#2563EB",
                  color: "white",
                  border: "none",
                  borderRadius: 7,
                  padding: "10px 28px",
                  fontSize: 14,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                次のカードへ →
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
