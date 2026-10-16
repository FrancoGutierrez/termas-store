import React, { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Dices, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ScratchCardModal({ isOpen, onClose, onWinCoupon, onGoToProducts }) {
  const canvasRef = useRef(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Draw metallic scratch surface
    ctx.fillStyle = '#94A3B8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 15px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ RASPA AQUÍ CON EL MOUSE O DEDO ✨', canvas.width / 2, canvas.height / 2 + 5);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleScratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    sounds.playTick();

    setScratchedPercent(prev => {
      const next = prev + 5;
      if (next >= 50 && !isRevealed) {
        setIsRevealed(true);
        sounds.playWinFanfare();
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
        onWinCoupon({
          code: "RASPA_VIP_45",
          discountPercent: 45,
          title: "RASPA Y GANA: 45% OFF EN TERMAS"
        });
      }
      return next;
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card border-2 border-emerald-300 text-center max-w-lg p-6 relative bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-4">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1 rounded-full text-xs font-black">
            <Dices className="w-4 h-4 text-emerald-600" />
            RASPA Y GANA EXCLUSIVO VIP
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">¡Raspa la Tarjeta y Revela tu Premio!</h2>
        </div>

        <div className="relative w-full max-w-[320px] h-[160px] mx-auto my-4 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-lg bg-gradient-to-br from-amber-400 to-orange-500 flex flex-col items-center justify-center text-slate-950 font-black p-4">
          
          {/* Underneath Hidden Prize */}
          <div className="text-center">
            <span className="text-3xl">🏆 🏆 🏆</span>
            <p className="text-xl font-extrabold text-slate-950 font-heading">¡45% OFF GANADO!</p>
            <p className="text-xs font-bold text-slate-900">CUPÓN: RASPA_VIP_45</p>
          </div>

          {/* Canvas Scratch Layer */}
          <canvas
            ref={canvasRef}
            width={320}
            height={160}
            onMouseDown={() => setIsScratching(true)}
            onMouseUp={() => setIsScratching(false)}
            onMouseMove={(e) => isScratching && handleScratch(e)}
            onTouchMove={handleScratch}
            className="absolute inset-0 cursor-pointer touch-none"
          />
        </div>

        {isRevealed && (
          <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl space-y-2 animate-fadeIn text-slate-900">
            <h3 className="text-lg font-black text-slate-900 font-heading">🎉 ¡FELICIDADES! COMPLETOTE EL RASPA Y GANA</h3>
            <p className="text-xs text-slate-600">Cupón de 45% OFF activado para tu compra.</p>
            <button
              onClick={onGoToProducts || onClose}
              className="btn-temu-primary text-xs py-2 px-6 mx-auto flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              USAR MI CUPÓN RASPADO
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
