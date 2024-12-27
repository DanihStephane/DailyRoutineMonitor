import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewHabitFormProps {
  onAdd: (name: string, color: string, weeklyGoal: number) => void;
  onClose: () => void;
}

const COLORS = ['blue', 'green', 'purple', 'pink', 'yellow', 'red'];

export function NewHabitForm({ onAdd, onClose }: NewHabitFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const [weeklyGoal, setWeeklyGoal] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), color, weeklyGoal);
      onClose();
    }
  };

  const getColorClass = (c: string) => {
    switch (c) {
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'purple': return 'bg-purple-500';
      case 'pink': return 'bg-pink-500';
      case 'yellow': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold mb-6">Nouvelle habitude</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'habitude
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Méditation"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Couleur
            </label>
            <div className="flex gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full ${getColorClass(c)} ${
                    color === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Objectif hebdomadaire
            </label>
            <input
              type="number"
              min="1"
              max="7"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}