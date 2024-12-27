import React from 'react';
import { Habit } from '../types/habit';
import { HabitGrid } from './HabitGrid';
import { Target } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onToggleDate: (habitId: string, date: string) => void;
}

export function HabitCard({ habit, onToggleDate }: HabitCardProps) {
  const completedThisWeek = habit.completedDates.filter((date) => {
    const now = new Date();
    const dateObj = new Date(date);
    const diff = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 3600 * 24));
    return diff <= 7;
  }).length;

  const progress = (completedThisWeek / habit.weeklyGoal) * 100;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{habit.name}</h3>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {completedThisWeek}/{habit.weeklyGoal}
          </span>
        </div>
      </div>

      <HabitGrid
        habit={habit}
        onToggleDate={(date) => onToggleDate(habit.id, date)}
      />

      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            habit.color === 'blue' ? 'bg-blue-500' :
            habit.color === 'green' ? 'bg-green-500' :
            habit.color === 'purple' ? 'bg-purple-500' :
            habit.color === 'pink' ? 'bg-pink-500' :
            habit.color === 'yellow' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}