export type Language = "english" | "mixed" | "swahili";

export interface UserState {
  points: number;
  level: number;
  badges: string[];
  language: Language | null;
  unlockedTopics: string[];
  completedLevels: number[];
  email?: string;
}

export interface Topic {
  id: string;
  title: string;
  icon: string;
  isLocked: boolean;
}

export interface LessonStep {
  type: "challenge" | "explanation" | "analogy" | "reinforcement" | "complete";
  content: Record<Language, string>;
  question?: {
    text: string;
    options: string[];
    correct: string;
  };
}

export type GameType = "speed-drill" | "true-false" | "word-scramble" | "match-pair";

export interface Game {
  id: string;
  type: GameType;
  title: string;
  description: string;
  icon: string;
  pointsPerCorrect: number;
  content: any;
}

export interface Challenge {
  code: string;
  questions: {
    text: string;
    options: string[];
    correct: string;
  }[];
}
