import { UserProgress } from "./types";

export const LEVELS = [
  { level: 1, title: "FIP初心者",      min_xp: 0 },
  { level: 2, title: "FIP見習い",      min_xp: 200 },
  { level: 3, title: "FIP担当者",      min_xp: 600 },
  { level: 4, title: "FIPマネージャー", min_xp: 1500 },
  { level: 5, title: "FIPエキスパート", min_xp: 3000 },
];

export const XP_REWARDS: Record<string, number> = {
  flashcard_correct: 10,
  flashcard_first_correct: 20,
  quiz_correct: 20,
  scenario_correct: 25,
  scenario_explanation: 5,
  flow_node_read: 3,
  flow_quiz_correct: 15,
  calc_simulate: 5,
  calc_quiz_correct: 20,
};

export const BADGES: Record<string, { name: string; desc: string; icon: string }> = {
  term_beginner: { name: "用語入門",   desc: "フラッシュカード10枚正解",  icon: "🏅" },
  calc_master:   { name: "計算名人",   desc: "計算問題20問連続正解",      icon: "🔢" },
  market_expert: { name: "市場の達人", desc: "シナリオクイズ全問クリア",  icon: "📈" },
  flow_doctor:   { name: "フロー博士", desc: "フロー図全ノード閲覧",      icon: "🗺️" },
  week_streak:   { name: "一週間継続", desc: "7日連続学習",              icon: "🔥" },
  fip_master:    { name: "FIPマスター",desc: "全モードで高習熟度達成",    icon: "🌟" },
};

export function getLevelInfo(xp: number) {
  let current = LEVELS[0];
  for (const lv of LEVELS) {
    if (xp >= lv.min_xp) current = lv;
  }
  return current;
}

export function getNextLevelInfo(xp: number) {
  const current = getLevelInfo(xp);
  return LEVELS.find((lv) => lv.level === current.level + 1) ?? null;
}

export function getXpProgress(xp: number): number {
  const current = getLevelInfo(xp);
  const next = getNextLevelInfo(xp);
  if (!next) return 1.0;
  const span = next.min_xp - current.min_xp;
  const earned = xp - current.min_xp;
  return Math.min(earned / span, 1.0);
}

export function addXp(
  progress: UserProgress,
  rewardKey: string
): { progress: UserProgress; leveledUp: boolean } {
  const amount = XP_REWARDS[rewardKey] ?? 0;
  const oldLevel = progress.current_level;
  const updated = { ...progress, total_xp: progress.total_xp + amount };
  updated.current_level = getLevelInfo(updated.total_xp).level;
  return { progress: updated, leveledUp: updated.current_level > oldLevel };
}

export function updateStreak(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split("T")[0];
  const updated = { ...progress };
  if (!updated.last_study_date) {
    updated.streak_days = 1;
  } else if (updated.last_study_date === today) {
    // no change
  } else {
    const last = new Date(updated.last_study_date);
    const now = new Date(today);
    const diff = Math.round((now.getTime() - last.getTime()) / 86400000);
    if (diff === 1) {
      updated.streak_days += 1;
    } else {
      updated.streak_days = 1;
    }
  }
  updated.last_study_date = today;
  return updated;
}

export function checkAndAwardBadge(
  progress: UserProgress,
  badgeId: string
): { progress: UserProgress; awarded: boolean } {
  if (progress.badges.includes(badgeId)) return { progress, awarded: false };
  const updated = { ...progress, badges: [...progress.badges, badgeId] };
  return { progress: updated, awarded: true };
}

export function getBadgeInfo(badgeId: string) {
  return BADGES[badgeId] ?? { name: badgeId, desc: "", icon: "🏅" };
}

export function defaultProgress(): UserProgress {
  return {
    total_xp: 0,
    current_level: 1,
    streak_days: 0,
    last_study_date: null,
    badges: [],
  };
}
