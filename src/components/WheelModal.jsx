import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { X, Sparkles, Trophy, CheckCircle2, RotateCw, Gift, Clock, Phone, User, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';
import { getActivePrizeSession, saveActivePrizeSession, saveLead } from '../utils/storage';

const WHEEL_SECTORS = [
  { id: 0, label: "38% OFF", sub: "+ ENVÍO GRATIS", icon: "💎", bg: "#FF4D12", text: "#FFFFFF", couponCode: "GANADOR_VIP_38", discountPercent: 38 },
  { id: 1, label: "TIRO EXTRA", sub: "100% SUERTE", icon: "🔄", bg: "#FFD633", text: "#172966", isRetry: true },
  { id: 2, label: "MONTAJE S/0", sub: "INSTALACIÓN", icon: "🛠️", bg: "#1D3A9E", text: "#FFFFFF", couponCode: "MONTAJE_FREE", discountPercent: 35 },
  { id: 3, label: "50% OFF", sub: "EN TERMAS", icon: "⚡", bg: "#F03E3E", text: "#FFFFFF", couponCode: "SUPER_PREMIO_50", discountPercent: 50 },
  { id: 4, label: "BONO S/ 150", sub: "EN TU PEDIDO", icon: "💵", bg: "#3459D1", text: "#FFFFFF", couponCode: "BONO_ESPECIAL_150", discountPercent: 40 },
  { id: 5, label: "45% OFF", sub: "EN SOLARES", icon: "☀️", bg: "#D41C1C", text: "#FFFFFF", couponCode: "SOLAR_PREMIUM_45", discountPercent: 45 },
  { id: 6, label: "KIT GRATIS", sub: "DE CONEXIÓN", icon: "🎁", bg: "#172966", text: "#FFFFFF", couponCode: "KIT_CONEXION_FREE", discountPercent: 35 },
  { id: 7, label: "CUPÓN VIP", sub: "DIAMANTE", icon: "👑", bg: "#F5BF00", text: "#172966", couponCode: "DIAMANTE_VIP", discountPercent: 42 },
];

export default function WheelModal({ isOpen, onClose, onWinCoupon, onGoToProducts }) {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);
  const [messageToast, setMessageToast] = useState(null);
  const [pointerBounce, setPointerBounce] = useState(false);
  const [activeWinningIndex, setActiveWinningIndex] = useState(null);

  // Lead capture state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [claimSuccess, setClaimSuccess] = useState(false);
  const [activeSession, setActiveSession] = useState(() => getActivePrizeSession());

  useEffect(() => {
    if (isOpen) {
      const existing = getActivePrizeSession();
      setActiveSession(existing);
    }
  }, [isOpen]);


  if (!isOpen) return null;

  const triggerConfetti = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#FFD633', '#FF4D12', '#F03E3E', '#1D3A9E', '#FFFFFF']
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
      }
    }, 4200);
  };

  const handleClaimPrize = (e) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) {
      alert("Por favor completa tu Nombre y WhatsApp para activar tu descuento.");
      return;
    }

    const session = {
      code: wonPrize.couponCode,
      discountPercent: wonPrize.discountPercent,
      title: `${wonPrize.label} ${wonPrize.sub}`,
      userName: leadName.trim(),
      userPhone: leadPhone.trim(),
      expiresAt: Date.now() + (15 * 60 * 1000) // 15 minutos
    };

    saveActivePrizeSession(session);
    saveLead({
      name: leadName.trim(),
      phone: leadPhone.trim(),
      couponCode: wonPrize.couponCode,
      discountPercent: wonPrize.discountPercent,
      prizeTitle: `${wonPrize.label} ${wonPrize.sub}`
    });

    onWinCoupon(session);
    setClaimSuccess(true);
    setActiveSession(session);
    sounds.playWinFanfare();
    triggerConfetti();

    setTimeout(() => {
      // Tras activar el cupón, llevar al cliente directo a las termas
      if (onGoToProducts) onGoToProducts();
      else onClose();
    }, 1200);
  };


  return (
    <div className="modal-overlay">
      <div className="modal-card border-2 border-termo-200 text-center max-w-md p-6 relative bg-white shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {activeSession ? (
          <div className="py-4 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 bg-gradient-to-b from-amber-400 via-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto text-3xl shadow-lg border-2 border-white">
              🔒
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-[11px] font-black">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                DESCUENTO YA RESERVADO EN TU CUENTA
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                ¡Tu Cupón está Activo!
              </h2>
              <p className="text-slate-600 text-xs">
                Hola <strong className="text-slate-900">{activeSession.userName || "Cliente VIP"}</strong>, ya ganaste tu beneficio exclusivo.
              </p>
            </div>

            <div className="bg-gradient-to-r from-termo-50 to-amber-50 p-4 rounded-2xl border-2 border-termo-200 text-center space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Premio Ganado:</span>
              <p className="text-xl font-black text-orange-600 font-heading">
                {activeSession.title || `${activeSession.discountPercent}% OFF + Envío Gratis`}
              </p>
              <div className="inline-block bg-white px-3 py-1 rounded-lg border border-termo-200 font-mono text-xs font-black text-termo-900">
                CÓDIGO: {activeSession.code}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-bold text-termo-800 bg-termo-50 p-2.5 rounded-xl border border-termo-100">
              <Clock className="w-4 h-4 animate-pulse text-orange-600" />
              <span>Los precios de las termas ya tienen tu descuento aplicado.</span>
            </div>

            <button
              onClick={onGoToProducts || onClose}
              className="w-full btn-temu-primary py-3.5 text-xs font-black justify-center gap-2 shadow-lg cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              ¡VER TERMAS CON MI DESCUENTO AHORA!
            </button>
          </div>
        ) : (
          <>
            {/* Modal Header */}
            <div className="space-y-1.5 mb-3">
              <div className="inline-flex items-center gap-1.5 bg-termo-700 px-3.5 py-1 rounded-full text-[11px] font-black text-white">
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                RULETA OFICIAL DE LA FORTUNA
              </div>
              <h2 className="text-2xl font-black text-termo-900 tracking-tight font-heading">
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
          <div className="absolute inset-0 rounded-full bg-termo-400/20 blur-xl pointer-events-none" />

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
                {/* Outer Rim Gradient (azul de marca con brillo sol) */}
                <radialGradient id="goldRim" cx="50%" cy="50%" r="50%">
                  <stop offset="90%" stopColor="#0E1A42" />
                  <stop offset="94%" stopColor="#1D3A9E" />
                  <stop offset="97%" stopColor="#3459D1" />
                  <stop offset="100%" stopColor="#172966" />
                </radialGradient>

                {/* Center Hub Gradient (sol) */}
                <radialGradient id="centerKnob" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF6C7" />
                  <stop offset="60%" stopColor="#FFD633" />
                  <stop offset="100%" stopColor="#D69E00" />
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
                    <circle cx={px} cy={py} r="4.5" fill="#FFD633" stroke="#0E1A42" strokeWidth="1.5" />
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
                  fill="#1D3A9E"
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

        {/* WIN PRIZE CARD WITH LEAD CAPTURE */}
        {wonPrize ? (
          <div className="bg-gradient-to-r from-emerald-50 via-amber-50 to-orange-50 border-2 border-emerald-400 p-4 rounded-2xl space-y-3 mt-2 shadow-lg animate-fadeIn text-slate-900">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🏆</span>
              <h3 className="text-base font-black text-slate-900 font-heading">¡PREMIO MÁXIMO GANADO!</h3>
            </div>
            <p className="text-xl font-black text-orange-600 font-heading">
              {wonPrize.label} {wonPrize.sub}
            </p>

            {!claimSuccess ? (
              <form onSubmit={handleClaimPrize} className="space-y-2.5 pt-1 text-left">
                <p className="text-[11px] text-slate-700 text-center font-medium">
                  👉 Ingresa tu Nombre y WhatsApp para <strong className="text-emerald-700 font-bold">activar tu cupón</strong> en el catálogo:
                </p>
                
                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-700 flex items-center gap-1">
                    <User className="w-3 h-3 text-orange-600" /> Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-black uppercase text-slate-700 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" /> WhatsApp / Celular *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. 987 654 321"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-temu-primary text-xs py-3.5 font-black justify-center gap-2 mt-1 shadow-lg cursor-pointer"
                >
                  <Gift className="w-4 h-4" />
                  ¡RECLAMAR MI DESCUENTO Y ACTIVAR CUPÓN!
                </button>
              </form>
            ) : (
              <div className="space-y-2 pt-2 text-center">
                <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-black">
                  <CheckCircle2 className="w-4 h-4" />
                  ¡Cupón activado para {leadName}! Redirigiendo a las ofertas...
                </div>
              </div>
            )}
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
      </>
    )}

      </div>
    </div>
  );
}
