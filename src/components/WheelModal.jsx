import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Trophy, CheckCircle2, RotateCw } from 'lucide-react';
import { sounds } from '../utils/audio';

const WHEEL_SECTORS = [
  { id: 0, label: "38% OFF", sub: "+ ENVÍO GRATIS", icon: "💎", bg: "#EA580C", text: "#FFFFFF", couponCode: "GANADOR_VIP_38", discountPercent: 38 },
  { id: 1, label: "TIRO EXTRA", sub: "100% SUERTE", icon: "🔄", bg: "#F59E0B", text: "#000000", isRetry: true },
  { id: 2, label: "MONTAJE S/0", sub: "INSTALACIÓN", icon: "🛠️", bg: "#10B981", text: "#FFFFFF", couponCode: "MONTAJE_FREE", discountPercent: 35 },
  { id: 3, label: "50% OFF", sub: "EN TERMAS", icon: "⚡", bg: "#3B82F6", text: "#FFFFFF", couponCode: "SUPER_PREMIO_50", discountPercent: 50 },
  { id: 4, label: "BONO S/ 150", sub: "EN TU PEDIDO", icon: "💵", bg: "#8B5CF6", text: "#FFFFFF", couponCode: "BONO_ESPECIAL_150", discountPercent: 40 },
  { id: 5, label: "45% OFF", sub: "EN SOLARES", icon: "☀️", bg: "#F97316", text: "#FFFFFF", couponCode: "SOLAR_PREMIUM_45", discountPercent: 45 },
  { id: 6, label: "KIT GRATIS", sub: "DE CONEXIÓN", icon: "🎁", bg: "#06B6D4", text: "#FFFFFF", couponCode: "KIT_CONEXION_FREE", discountPercent: 35 },
  { id: 7, label: "CUPÓN VIP", sub: "DIAMANTE", icon: "👑", bg: "#EC4899", text: "#FFFFFF", couponCode: "DIAMANTE_VIP", discountPercent: 42 },
];

export default function WheelModal({ isOpen, onClose, onWinCoupon }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [messageToast, setMessageToast] = useState(null);
  const [pointerBounce, setPointerBounce] = useState(false);
  const [activeWinningIndex, setActiveWinningIndex] = useState(null);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#FFD700', '#FF5500', '#10B981', '#3B82F6', '#FFFFFF']
    });
  };

  const handleSpin = () => {
    if (isSpinning) return;

    sounds.init();
    setIsSpinning(true);
    setMessageToast(null);
    setWonPrize(null);
    setActiveWinningIndex(null);

    // Guaranteed Victory Sequence:
    // Spin 0: Lands on sector index 1 ("TIRO EXTRA 🔄")
    // Spin 1: Lands on sector index 0 ("38% OFF + ENVÍO GRATIS")
    let targetSectorIndex = spinCount === 0 ? 1 : 0;

    const numSectors = 8;
    const sectorAngle = 360 / numSectors; // 45 deg

    // Sector 0 center is at 22.5 deg. At 12 o'clock (270 deg):
    let targetDeg = (270 - (targetSectorIndex + 0.5) * sectorAngle);
    if (targetDeg < 0) targetDeg += 360;

    const extraTurns = (5 + spinCount * 2) * 360;
    
    const currentNorm = rotation % 360;
    let distanceToTarget = targetDeg - currentNorm;
    if (distanceToTarget <= 0) distanceToTarget += 360;

    const finalRotation = rotation + extraTurns + distanceToTarget;
    setRotation(finalRotation);

    // Flapper Ticker Animation + Audio
    let tickCounter = 0;
    const tickInterval = setInterval(() => {
      setPointerBounce(prev => !prev);
      sounds.playTick();
      tickCounter++;
      if (tickCounter > 28) {
        clearInterval(tickInterval);
      }
    }, 130);

    setTimeout(() => {
      clearInterval(tickInterval);
      setIsSpinning(false);
      setPointerBounce(false);
      setSpinCount(prev => prev + 1);
      setActiveWinningIndex(targetSectorIndex);

      const sector = WHEEL_SECTORS[targetSectorIndex];

      if (sector.isRetry) {
        setMessageToast("⚡ ¡CASI! El sistema te regaló +1 TIRO EXTRA CON DOBLE SUERTE.");
      } else {
        setWonPrize(sector);
        sounds.playWinFanfare();
        triggerConfetti();
        onWinCoupon({
          code: sector.couponCode,
          discountPercent: sector.discountPercent,
          title: `${sector.label} ${sector.sub}`
        });
      }
    }, 4200);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card border-2 border-amber-300 text-center max-w-md p-6 relative bg-white shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 mb-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 border border-amber-300 px-3.5 py-1 rounded-full text-[11px] font-black text-amber-900">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            RULETA OFICIAL DE LA FORTUNA
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-heading">
            ¡Gira y Reclama tu Descuento!
          </h2>
          <p className="text-slate-500 text-xs">
            {spinCount === 0 
              ? "Tienes 2 tiros disponibles. ¡Todos los giros tienen premio garantizado!" 
              : "¡Último tiro decisivo con probabilidad diamante activada!"}
          </p>
        </div>

        {/* WHEEL CONTAINER */}
        <div className="relative w-[340px] h-[340px] mx-auto my-3 flex items-center justify-center">
          
          {/* Outer Glowing Halo */}
          <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

          {/* PHYSICAL NEEDLE / FLAPPER AT TOP (12 O'CLOCK) */}
          <div 
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none transition-transform duration-100"
            style={{
              transform: `translateX(-50%) ${pointerBounce ? 'rotate(-16deg) scale(1.08)' : 'rotate(0deg)'}`,
              transformOrigin: 'top center'
            }}
          >
            {/* Top golden base hinge */}
            <div className="w-7 h-4 bg-gradient-to-b from-amber-300 to-amber-600 rounded-t-md shadow-md border border-amber-200" />
            {/* Sharp needle pointing into wheel rim */}
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[26px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" />
            {/* Red tip accent for clear visibility */}
            <div className="w-2 h-2 rounded-full bg-red-600 -mt-7 shadow-sm" />
          </div>

          {/* SVG WHEEL */}
          <div
            className="w-[320px] h-[320px] rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.15)]"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4.2s cubic-bezier(0.12, 0.88, 0.22, 1)' : 'none'
            }}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full rounded-full"
            >
              <defs>
                {/* 3D Metallic Gold Outer Rim Gradient */}
                <radialGradient id="goldRim" cx="50%" cy="50%" r="50%">
                  <stop offset="90%" stopColor="#78350F" />
                  <stop offset="94%" stopColor="#F59E0B" />
                  <stop offset="97%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#B45309" />
                </radialGradient>

                {/* Center Hub Gradient */}
                <radialGradient id="centerKnob" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="60%" stopColor="#D97706" />
                  <stop offset="100%" stopColor="#78350F" />
                </radialGradient>
              </defs>

              {/* 1. Outer Golden Rim */}
              <circle cx="200" cy="200" r="198" fill="#FFF" stroke="url(#goldRim)" strokeWidth="12" />

              {/* 2. Golden Rivets / Pegs around Rim (16 Pegs) */}
              {[...Array(16)].map((_, i) => {
                const angle = (i * 360 / 16) * (Math.PI / 180);
                const px = 200 + Math.cos(angle) * 192;
                const py = 200 + Math.sin(angle) * 192;
                return (
                  <g key={i}>
                    <circle cx={px} cy={py} r="4.5" fill="#FDE68A" stroke="#92400E" strokeWidth="1.5" />
                  </g>
                );
              })}

              {/* 3. The 8 Slices */}
              <g transform="translate(200, 200)">
                {WHEEL_SECTORS.map((sector, index) => {
                  const startAngle = (index * 45 - 22.5) * (Math.PI / 180);
                  const endAngle = ((index + 1) * 45 - 22.5) * (Math.PI / 180);
                  const r = 185;

                  const x1 = Math.cos(startAngle) * r;
                  const y1 = Math.sin(startAngle) * r;
                  const x2 = Math.cos(endAngle) * r;
                  const y2 = Math.sin(endAngle) * r;

                  const midAngleDeg = index * 45;

                  return (
                    <g key={sector.id}>
                      {/* Pie Path */}
                      <path
                        d={`M 0 0 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`}
                        fill={sector.bg}
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        opacity={activeWinningIndex === index ? "1" : "0.96"}
                      />

                      {/* Text & Icon inside Sector */}
                      <g transform={`rotate(${midAngleDeg}) translate(115, 0)`}>
                        <text
                          x="0"
                          y="-8"
                          fill={sector.text}
                          fontSize="13"
                          fontWeight="900"
                          fontFamily="Outfit, sans-serif"
                          textAnchor="middle"
                          transform="rotate(90)"
                          className="select-none"
                        >
                          {sector.label}
                        </text>
                        <text
                          x="0"
                          y="6"
                          fill={sector.text}
                          fontSize="8.5"
                          fontWeight="700"
                          fontFamily="sans-serif"
                          textAnchor="middle"
                          opacity="0.95"
                          transform="rotate(90)"
                          className="select-none"
                        >
                          {sector.sub}
                        </text>
                        <text
                          x="0"
                          y="22"
                          fontSize="12"
                          textAnchor="middle"
                          transform="rotate(90)"
                        >
                          {sector.icon}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* 4. Center Gold Hub with Spin Button */}
                <circle cx="0" cy="0" r="42" fill="url(#centerKnob)" stroke="#FFFFFF" strokeWidth="3" />
                <circle cx="0" cy="0" r="32" fill="#FFFFFF" />
                <text
                  x="0"
                  y="5"
                  fill="#D97706"
                  fontSize="12"
                  fontWeight="900"
                  fontFamily="Outfit, sans-serif"
                  textAnchor="middle"
                  className="select-none tracking-wider cursor-pointer"
                  onClick={handleSpin}
                >
                  {isSpinning ? "..." : "GIRAR"}
                </text>
              </g>
            </svg>
          </div>

        </div>

        {/* Retry Alert Box */}
        {messageToast && (
          <div className="bg-amber-100 border border-amber-300 text-amber-900 p-3 rounded-2xl text-xs font-bold my-2 animate-bounce">
            {messageToast}
          </div>
        )}

        {/* WIN PRIZE CARD */}
        {wonPrize ? (
          <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-orange-50 border-2 border-emerald-400 p-4 rounded-2xl space-y-2 mt-2 shadow-lg animate-fadeIn text-slate-900">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🏆</span>
              <h3 className="text-lg font-black text-slate-900 font-heading">¡PREMIO MÁXIMO GANADO!</h3>
            </div>
            <p className="text-xl font-black text-orange-600 font-heading">
              {wonPrize.label} {wonPrize.sub}
            </p>
            <p className="text-xs text-slate-600">
              Cupón <span className="text-emerald-700 font-extrabold">{wonPrize.couponCode}</span> activado en tu carrito de compras.
            </p>
            <button
              onClick={onClose}
              className="w-full btn-temu-primary text-xs py-3 font-black mt-2 shadow-md cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              ¡APLICAR A MI COMPRA AHORA!
            </button>
          </div>
        ) : (
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="w-full btn-temu-primary py-3.5 text-sm font-black justify-center gap-2 mt-2 cursor-pointer"
          >
            {isSpinning ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-yellow-200" />
                GIRANDO RULETA...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-200" />
                {spinCount === 0 ? "¡GIRAR RULETA AHORA (TIRO #1)!" : "¡GIRAR TIRO FINAL EXTRA!"}
              </>
            )}
          </button>
        )}

        <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 mt-3">
          <span>✓ Seguro y Verificado</span>
          <span>•</span>
          <span>Descuento Directo al Checkout</span>
        </div>

      </div>
    </div>
  );
}
