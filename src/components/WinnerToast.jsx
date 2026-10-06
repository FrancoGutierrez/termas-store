import React, { useState, useEffect } from 'react';
import { WINNER_LOCATIONS } from '../data/initialProducts';
import { Sparkles, Trophy, X } from 'lucide-react';

export default function WinnerToast() {
  const [currentWinner, setCurrentWinner] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show a winner toast every 12 seconds
    const interval = setInterval(() => {
      const randomWinner = WINNER_LOCATIONS[Math.floor(Math.random() * WINNER_LOCATIONS.length)];
      setCurrentWinner(randomWinner);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  if (!visible || !currentWinner) return null;

  return (
    <div className="winner-toast">
      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-black font-black text-sm flex-shrink-0 shadow-md">
        🏆
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-xs text-slate-300">
          <strong className="text-white truncate">{currentWinner.name}</strong>
          <span className="text-slate-500">de</span>
          <span className="text-amber-400 font-bold">{currentWinner.city}</span>
        </div>
        <p className="text-xs font-black text-emerald-400 truncate">
          ¡Ganó: {currentWinner.prize}!
        </p>
        <span className="text-[10px] text-slate-500 block">{currentWinner.time}</span>
      </div>

      <button
        onClick={() => setVisible(false)}
        className="text-slate-500 hover:text-white p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
