import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { HabitCard } from './components/HabitCard';
import { NewHabitForm } from './components/NewHabitForm';
import type { Habit, HabitMap } from './types/habit';

function App() {
  const [habits, setHabits] = useState<HabitMap>({});
  const [showNewHabitForm, setShowNewHabitForm] = useState(false);

  const handleAddHabit = (name: string, color: string, weeklyGoal: number) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      color,
      completedDates: [],
      weeklyGoal,
    };
    setHabits((prev) => ({ ...prev, [newHabit.id]: newHabit }));
  };

  const handleToggleDate = (habitId: string, date: string) => {
    setHabits((prev) => {
      const habit = prev[habitId];
      const newCompletedDates = habit.completedDates.includes(date)
        ? habit.completedDates.filter((d) => d !== date)
        : [...habit.completedDates, date];

      return {
        ...prev,
        [habitId]: {
          ...habit,
          completedDates: newCompletedDates,
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">HabitFlow</h1>
          <button
            onClick={() => setShowNewHabitForm(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Nouvelle habitude
          </button>
        </div>

        <div className="grid gap-6">
          {Object.values(habits).map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleDate={handleToggleDate}
            />
          ))}

          {Object.keys(habits).length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>Commencez par ajouter une nouvelle habitude !</p>
            </div>
          )}
        </div>
      </div>

      {showNewHabitForm && (
        <NewHabitForm
          onAdd={handleAddHabit}
          onClose={() => setShowNewHabitForm(false)}
        />
      )}
    </div>
  );
}

export default App;