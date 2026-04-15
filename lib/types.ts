// データ型定義

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  example: string;
  related: string[];
  group: string;
  level: number;
  category?: string;
}

export interface QuizChoice {
  label: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  choices: QuizChoice[] | Record<string, string>;
  correct: string;
  explanation: string;
  level: number;
  category?: string;
}

export interface ScenarioQuestion {
  id: string;
  title?: string;
  situation: string;
  question: string;
  choices: QuizChoice[] | Record<string, string>;
  correct: string;
  explanation: string;
  level: number;
  category?: string;
}

export interface FlowNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  node_type: "actor" | "action" | "result";
  connections: string[];
}

export interface FlowData {
  nodes: FlowNode[];
}

// SRS
export interface SRSCard {
  card_id: string;
  box: number; // 1-5
  next_review: string; // ISO date string
  review_count: number;
  correct_count: number;
}

// Gamification
export interface UserProgress {
  total_xp: number;
  current_level: number;
  streak_days: number;
  last_study_date: string | null;
  badges: string[];
}

export interface QuizHistoryEntry {
  question_id: string;
  mode: string;
  is_correct: boolean;
  answered_at: string;
}

// Storage state
export interface AppState {
  user_progress: UserProgress;
  srs_cards: Record<string, SRSCard>;
  quiz_history: QuizHistoryEntry[];
  wrong_answers: Record<string, boolean>; // "id:mode" -> true
}
