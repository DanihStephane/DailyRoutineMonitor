import React from 'react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Check } from 'lucide-react';
import { Habit } from '../types/habit';

interface HabitGridProps {
  habit: Habit;
  onToggleDate: (date: string) => void;
}

export function HabitGrid({ habit, onToggleDate }: HabitGridProps) {
  const today = new Date();
  const start = startOfWeek(today, { locale: fr });
  const end = endOfWeek(today, { locale: fr });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="flex gap-2">
      {days.map((day) => {
        const dateStr = format(day, 'yyyy-MM-dd');
        const isCompleted = habit.completedDates.includes(dateStr);
        const isPast = day <= today;
        const colorClass = 
          habit.color === 'blue' ? 'bg-blue-500' :
          habit.color === 'green' ? 'bg-green-500' :
          habit.color === 'purple' ? 'bg-purple-500' :
          habit.color === 'pink' ? 'bg-pink-500' :
          habit.color === 'yellow' ? 'bg-yellow-500' :
          'bg-red-500';

        return (
          <button
            key={dateStr}
            onClick={() => isPast && onToggleDate(dateStr)}
            disabled={!isPast}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              isCompleted
                ? `${colorClass} text-white`
                : 'bg-gray-100 hover:bg-gray-200'
            } ${!isPast && 'opacity-50 cursor-not-allowed'}`}
          >
            {isCompleted ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="text-sm">{format(day, 'dd')}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}