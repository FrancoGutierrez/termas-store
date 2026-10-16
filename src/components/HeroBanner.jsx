import React from 'react';
import { Flame, Sparkles, Gift, ShieldCheck, Truck, CheckCircle2, Award } from 'lucide-react';

export default function HeroBanner({ onOpenWheel, onOpenGiftChest }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-termo-100/60 via-amber-50/40 to-transparent border-b border-termo-100 py-12 px-4">
      
      {/* Soft ambient glow bubbles (sol + azul) */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-termo-300/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: Value Proposition */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-termo-700 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-wide shadow-md shadow-termo-700/20">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span>🎉 PROGRAMA EXCLUSIVO DE DESCUENTOS Y FORTUNA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-termo-900 leading-[1.15] tracking-tight font-heading">
            Agua Caliente Inteligente con <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-[#F03E3E] to-red-700">
              Precios Directos de Fábrica
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl font-normal leading-relaxed">
            Gira nuestra <strong className="text-orange-600 font-bold">Ruleta de Premios</strong> o abre los <strong className="text-termo-700 font-bold">Cofres VIP</strong> para desbloquear cupones de hasta <strong className="text-orange-600 font-black">50% de descuento</strong>, envío gratis e instalación oficial en termas eléctricas, solares y a gas.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
            <button
              onClick={onOpenWheel}
              className="btn-temu-primary text-sm sm:text-base px-7 py-3.5 shadow-xl shadow-orange-500/25 flex items-center gap-2.5 cursor-pointer"
            >
              <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
              <span>¡GIRAR RULETA (2 TIROS GRATIS)!</span>
            </button>

            <button
              onClick={onOpenGiftChest}
              className="btn-temu-gold text-sm sm:text-base px-6 py-3.5 flex items-center gap-2 cursor-pointer"
            >
              <Gift className="w-4 h-4" />
              <span>ABRIR COFRES DE ORO</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 grid grid-cols-3 gap-3 border-t border-termo-100 max-w-xl mx-auto lg:mx-0 text-left">
            <div className="flex items-center gap-2.5 bg-white/80 p-2.5 rounded-2xl border border-termo-100 shadow-sm">
              <div className="p-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">10 Años</p>
                <p className="text-[10px] text-slate-500">Garantía Total</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/80 p-2.5 rounded-2xl border border-termo-100 shadow-sm">
              <div className="p-1.5 rounded-xl bg-amber-50 border border-amber-200">
                <Truck className="w-4 h-4 text-amber-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Envío Express</p>
                <p className="text-[10px] text-slate-500">A todo el Perú</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-white/80 p-2.5 rounded-2xl border border-termo-100 shadow-sm">
              <div className="p-1.5 rounded-xl bg-termo-50 border border-termo-200">
                <Award className="w-4 h-4 text-termo-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">Certificado A+++</p>
                <p className="text-[10px] text-slate-500">Ahorro Energía</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Wheel Feature Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-md bg-white/95 border border-termo-100 rounded-3xl p-6 shadow-xl shadow-termo-900/10 text-center space-y-4">
            
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-termo-700 text-white font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
              <span className="text-amber-300">★</span> PREMIO GARANTIZADO DE BIENVENIDA <span className="text-amber-300">★</span>
            </div>

            <div className="pt-2">
              <div 
                onClick={onOpenWheel}
                className="w-28 h-28 mx-auto rounded-full bg-gradient-to-b from-amber-400 via-orange-500 to-red-600 p-1 shadow-lg shadow-orange-500/25 flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform"
              >
                <div className="w-full h-full bg-termo-50 rounded-full flex flex-col items-center justify-center text-slate-900 p-2 border border-termo-100">
                  <span className="text-4xl animate-bounce">🎯</span>
                  <span className="text-[9px] font-black text-orange-600 tracking-wider">¡GIRAR AHORA!</span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-termo-900 font-extrabold text-lg font-heading">
                Todos los Clientes Ganan Cupones
              </h3>
              <p className="text-slate-500 text-xs">
                El sistema asigna un cupón de fábrica al instante para aplicar en tu compra.
              </p>
            </div>

            {/* Progress / Status */}
            <div className="bg-termo-50/70 rounded-2xl p-3.5 text-left space-y-2 border border-termo-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-700 font-medium">Cupones entregados hoy:</span>
                <span className="text-orange-600 font-black">2,418 reclamos</span>
              </div>
              <div className="w-full bg-termo-100 h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 h-full w-[92%]" />
              </div>
              <p className="text-[11px] text-emerald-700 font-bold text-right flex items-center justify-end gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ¡Disponibilidad activa para tu ciudad!
              </p>
            </div>

            <button
              onClick={onOpenWheel}
              className="w-full btn-temu-primary py-3.5 text-xs font-black tracking-wide cursor-pointer"
            >
              ¡RECLAMAR MI PREMIO DE FACTURACIÓN!
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
