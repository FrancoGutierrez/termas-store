import React from 'react';
import { ShoppingBag, Flame, Gift, Dices, Search, Settings, ShieldCheck, Sparkles } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenWheel, 
  onOpenGiftChest, 
  onOpenScratch, 
  onOpenAdmin,
  activeCoupon,
  searchQuery,
  setSearchQuery
}) {
  return (
    <header className="sticky top-[40px] z-50 bg-white/90 backdrop-blur-xl border-b border-termo-100 px-4 py-3.5 shadow-sm shadow-termo-900/5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <BrandLogo className="w-11 h-11 drop-shadow-md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-termo-800 font-heading">
                TERMA<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">STORE</span>
              </span>
              <span className="bg-amber-400 text-termo-900 text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Distribuidor Autorizado Perú
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar termas eléctricas, a gas, solares..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-termo-50/70 border border-termo-100 text-slate-800 text-xs pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:border-termo-500 focus:bg-white focus:ring-2 focus:ring-termo-500/20 placeholder-slate-400 transition-all shadow-inner"
          />
        </div>

        {/* Gamification Action Quick Buttons */}
        <div className="flex items-center gap-2.5">
          
          <button 
            onClick={onOpenWheel}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-orange-500 via-[#F03E3E] to-red-700 text-white font-extrabold text-xs px-3.5 py-2 rounded-full hover:brightness-105 shadow-md shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Ruleta de Premios</span>
          </button>

          <button 
            onClick={onOpenGiftChest}
            className="hidden md:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100/80 text-amber-900 font-bold text-xs px-3.5 py-2 rounded-full border border-amber-200 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5 text-amber-600" />
            <span>Cofres VIP</span>
          </button>

          <button 
            onClick={onOpenScratch}
            className="hidden lg:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 font-bold text-xs px-3.5 py-2 rounded-full border border-emerald-200 shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Dices className="w-3.5 h-3.5 text-emerald-600" />
            <span>Raspa y Gana</span>
          </button>

          {/* Active Victory Coupon Pill */}
          {activeCoupon && (
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1.5 rounded-full text-xs font-black shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              <span>{activeCoupon.code} (-{activeCoupon.discountPercent}%)</span>
            </div>
          )}

          {/* Cart Drawer Trigger */}
          <button
            onClick={onOpenCart}
            className="relative bg-termo-700 hover:bg-termo-800 text-white p-2.5 rounded-full shadow-md shadow-termo-700/30 transition-all flex items-center justify-center transform hover:scale-105 cursor-pointer"
            title="Ver Carrito de Compras"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin & Config Panel Modal Toggle */}
          <button
            onClick={onOpenAdmin}
            className="bg-termo-50 hover:bg-termo-100 text-slate-700 p-2.5 rounded-full border border-termo-100 shadow-sm transition-all cursor-pointer"
            title="Panel de Configuración y Precios"
          >
            <Settings className="w-5 h-5 text-termo-700" />
          </button>

        </div>
      </div>
    </header>
  );
}
