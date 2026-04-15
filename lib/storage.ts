"use client";
import { AppState, SRSCard, QuizHistoryEntry, UserProgress } from "./types";
import { defaultProgress } from "./gamification";

const KEY = "fip_app_state";

function defaultState(): AppState {
  return {
    user_progress: defaultProgress(),
    srs_cards: {},
    quiz_history: [],
    wrong_answers: {},
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...JSON.parse(raw) };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadProgress(): UserProgress {
  return loadState().user_progress;
}

export function saveProgress(progress: UserProgress): void {
  const state = loadState();
  saveState({ ...state, user_progress: progress });
}

export function loadSrsCard(cardId: string): SRSCard | null {
  const state = loadState();
  return state.srs_cards[cardId] ?? null;
}

export function saveSrsCard(card: SRSCard): void {
  const state = loadState();
  saveState({ ...state, srs_cards: { ...state.srs_cards, [card.card_id]: card } });
}

export function saveSrsCards(cards: Record<string, SRSCard>): void {
  const state = loadState();
  saveState({ ...state, srs_cards: { ...state.srs_cards, ...cards } });
}

export function getSrsStats(allCardIds: string[]): { total: number; mastered: number; dueToday: number } {
  const state = loadState();
  const today = new Date().toISOString().split("T")[0];
  let mastered = 0;
  let dueToday = 0;
  for (const id of allCardIds) {
    const card = state.srs_cards[id];
    if (!card) { dueToday++; continue; }
    if (card.box === 5) mastered++;
    if (card.next_review <= today) dueToday++;
  }
  return { total: allCardIds.length, mastered, dueToday };
}

export function getDueCards(allCardIds: string[]): string[] {
  const state = loadState();
  const today = new Date().toISOString().split("T")[0];
  const due: string[] = [];
  const unregistered: string[] = [];
  for (const id of allCardIds) {
    const card = state.srs_cards[id];
    if (!card) { unregistered.push(id); continue; }
    if (card.next_review <= today) due.push(id);
  }
  return [...unregistered, ...due];
}

export function saveQuizHistory(entry: QuizHistoryEntry): void {
  const state = loadState();
  saveState({ ...state, quiz_history: [...state.quiz_history, entry] });
}

export function getQuizStats(mode: string): { total: number; correct: number; accuracy: number } {
  const state = loadState();
  const filtered = state.quiz_history.filter((h) => h.mode === mode);
  const correct = filtered.filter((h) => h.is_correct).length;
  const total = filtered.length;
  return { total, correct, accuracy: total > 0 ? Math.round((correct / total) * 1000) / 10 : 0 };
}

export function addToWrongList(questionId: string, mode: string): void {
  const state = loadState();
  saveState({ ...state, wrong_answers: { ...state.wrong_answers, [`${questionId}:${mode}`]: true } });
}

export function removeFromWrongList(questionId: string, mode: string): void {
  const state = loadState();
  const wa = { ...state.wrong_answers };
  delete wa[`${questionId}:${mode}`];
  saveState({ ...state, wrong_answers: wa });
}

export function getWrongList(mode?: string): { question_id: string; mode: string }[] {
  const state = loadState();
  return Object.keys(state.wrong_answers)
    .filter((k) => !mode || k.endsWith(`:${mode}`))
    .map((k) => {
      const [question_id, m] = k.split(":");
      return { question_id, mode: m };
    });
}

export function clearAllData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
