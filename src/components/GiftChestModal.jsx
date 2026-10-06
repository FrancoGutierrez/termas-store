import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Gift, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function GiftChestModal({ isOpen, onClose, onWinCoupon }) {
  const [openedIndex, setOpenedIndex] = useState(null);
  const [wonPrize, setWonPrize] = useState(null);

  if (!isOpen) return null;

  const handleOpenChest = (index) => {
    if (openedIndex !== null) return;

    sounds.playChestOpen();
    setOpenedIndex(index);

    const prize = {
      code: "CAJA_ORO_40",
      discountPercent: 40,
      title: "BONO CAJA DE ORO: 40% OFF + ENVÍO EXPRÉS"
    };

    setTimeout(() => {
      setWonPrize(prize);
      sounds.playWinFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onWinCoupon(prize);
    }, 600);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card border-2 border-amber-300 text-center max-w-lg p-6 relative bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-black">
            <Gift className="w-4 h-4 text-amber-600" />
            CAJAS MISTERIOSAS DE ORO
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-heading">¡Selecciona 1 Caja y Descubre tu Regalo!</h2>
          <p className="text-slate-500 text-xs">Cada caja contiene un cupón especial directo para tu terma.</p>
        </div>

        <div className="grid grid-cols-3 gap-4 my-6">
          {[0, 1, 2].map((idx) => {
            const isOpened = openedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleOpenChest(idx)}
                disabled={openedIndex !== null}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${
                  isOpened
                    ? "bg-amber-100/80 border-amber-400 scale-105"
                    : "bg-amber-50/50 border-amber-200 hover:border-orange-400 hover:bg-amber-100/60 hover:scale-105 shadow-sm"
                }`}
              >
                <div className="text-5xl animate-bounce">
                  {isOpened ? "🎁" : "📦"}
                </div>
                <span className="text-xs font-black text-amber-900">
                  {isOpened ? "¡ABIERTA!" : `CAJA #${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>

        {wonPrize && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 p-4 rounded-2xl space-y-3 animate-fadeIn text-slate-900">
            <h3 className="text-lg font-black text-slate-900 font-heading">🎉 ¡HAS REVELADO EL REGALO DE ORO!</h3>
            <p className="text-xl font-black text-orange-600 font-heading">{wonPrize.title}</p>
            <p className="text-xs text-slate-600">
              Cupón <span className="text-emerald-700 font-extrabold">{wonPrize.code}</span> cargado con éxito.
            </p>
            <button
              onClick={onClose}
              className="btn-temu-primary text-xs py-2.5 px-6 mx-auto flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              USAR MI REGALO EN EL CARRITO
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
