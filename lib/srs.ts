import { SRSCard } from "./types";

const BOX_INTERVALS: Record<number, number> = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
const MAX_BOX = 5;

export function processAnswer(card: SRSCard, isCorrect: boolean): SRSCard {
  const updated = { ...card };
  updated.review_count += 1;
  if (isCorrect) {
    updated.correct_count += 1;
    updated.box = Math.min(updated.box + 1, MAX_BOX);
  } else {
    updated.box = 1;
  }
  const interval = BOX_INTERVALS[updated.box];
  const next = new Date();
  next.setDate(next.getDate() + interval);
  updated.next_review = next.toISOString().split("T")[0];
  return updated;
}

export function getMasteryPercent(box: number): number {
  return ({ 1: 0, 2: 25, 3: 50, 4: 75, 5: 100 } as Record<number, number>)[box] ?? 0;
}

export function getBoxLabel(box: number): string {
  return (
    ({ 1: "未習得", 2: "初級", 3: "中級", 4: "上級", 5: "マスター" } as Record<number, string>)[box] ?? "?"
  );
}

export function getBoxColor(box: number): string {
  return (
    ({ 1: "#e74c3c", 2: "#e67e22", 3: "#f1c40f", 4: "#2ecc71", 5: "#27ae60" } as Record<number, string>)[box] ??
    "#95a5a6"
  );
}

export function isDue(card: SRSCard): boolean {
  const today = new Date().toISOString().split("T")[0];
  return card.next_review <= today;
}

export function newCard(card_id: string): SRSCard {
  return {
    card_id,
    box: 1,
    next_review: new Date().toISOString().split("T")[0],
    review_count: 0,
    correct_count: 0,
  };
}
