export type EffortLevel = 'light' | 'medium' | 'heavy';

export interface Goal {
  id: string;
  title: string;
  description?: string;
  effort: EffortLevel;
  frequency: 'once' | 'daily' | 'weekly';
  createdAt: string;
  completed: boolean;
  completedDates: string[];
}

export interface Streak {
  goalId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate?: string;
}

export interface ProgressEntry {
  date: string;
  goalsCompleted: number;
  totalGoals: number;
}

export interface AppState {
  goals: Goal[];
  streaks: Record<string, Streak>;
  progress: ProgressEntry[];
  hasSeenOnboarding: boolean;
}

export interface MotivationalQuote {
  text: string;
  author: string;
}
