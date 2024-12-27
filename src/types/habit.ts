export interface Habit {
  id: string;
  name: string;
  color: string;
  completedDates: string[];
  weeklyGoal: number;
}

export type HabitMap = Record<string, Habit>;