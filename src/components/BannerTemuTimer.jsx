import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles } from 'lucide-react';

export default function BannerTemuTimer({ onOpenWheel }) {
  const [timeLeft, setTimeLeft] = useState(599); // 09:59

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <div className="temu-banner-timer">
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-yellow-300 animate-pulse" />
        <span>⚡ ¡DESCUENTO DE BIENVENIDA REVELADO PARA TU CIUDAD!</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-yellow-400" />
        <span>EXPIRA EN:</span>
        <span className="timer-box">{minutes}:{seconds}</span>
      </div>
      <button 
        onClick={onOpenWheel}
        className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black hover:bg-yellow-300 transition-all flex items-center gap-1 shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        ¡RECLAMAR CUPÓN DE VICTORIA!
      </button>
    </div>
  );
}
