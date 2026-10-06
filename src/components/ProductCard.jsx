import React from 'react';
import { ShoppingBag, Eye, Star, Flame, CheckCircle2 } from 'lucide-react';

export default function ProductCard({ product, activeCoupon, onOpenDetail, onAddToCart }) {
  const discountPercent = activeCoupon ? activeCoupon.discountPercent : product.discountPercent;
  const calculatedPrice = Math.round(product.originalPrice * (1 - discountPercent / 100));
  const finalPrice = Math.min(calculatedPrice, product.normalPrice);
  const totalSavings = product.originalPrice - finalPrice;

  return (
    <div className="group bg-white border border-amber-200/70 hover:border-orange-400 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      
      {/* Product Image & Floating Badges */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          <span className="badge-temu text-[10px] font-black">{product.badge}</span>
          {activeCoupon && (
            <span className="badge-gold text-[10px] font-black animate-pulse">
              🎉 ¡CUPÓN GANADO (-{discountPercent}%)!
            </span>
          )}
        </div>

        {/* Bottom image pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-800 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-100 shadow-sm">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Envío Gratis
          </span>
          <span className="flex items-center gap-1 text-orange-600 font-extrabold">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            Solo {product.inStock} disponibles
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2.5">
          {/* Brand & Reviews */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-orange-600 font-extrabold uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-extrabold text-[11px] text-slate-800">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenDetail(product)}
            className="text-slate-900 font-extrabold text-base leading-snug line-clamp-2 hover:text-orange-600 cursor-pointer transition-colors font-heading"
          >
            {product.name}
          </h3>

          {/* Key Specs Pills */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-slate-200">
              {product.specs[0]?.split('(')[0] || 'Alta Capacidad'}
            </span>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-emerald-200">
              A+++ Eficiencia
            </span>
            <span className="bg-blue-50 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-blue-200">
              10 Años Garantía
            </span>
          </div>
        </div>

        {/* Pricing Breakdown Section */}
        <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/70 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Precio de Lista Oficial:</span>
            <span className="text-slate-400 line-through font-medium">
              S/ {product.originalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <span className="text-xs text-slate-700 font-extrabold flex items-center gap-1">
              🏆 Tu Precio Ganado:
            </span>
            <span className="text-2xl font-black text-slate-900 font-heading">
              <span className="text-orange-600 text-lg mr-0.5">S/</span>
              {finalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-[11px] font-black px-2.5 py-1 rounded-xl text-center shadow-xs">
            🎉 ¡AHORRAS S/ {totalSavings.toLocaleString('es-PE')} (-{discountPercent}%)!
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-12 gap-2 pt-1">
          <button
            onClick={() => onOpenDetail(product)}
            className="col-span-4 btn-glass text-xs py-2.5 flex items-center justify-center gap-1 font-bold"
            title="Ver Ficha Técnica"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            Detalles
          </button>

          <button
            onClick={() => onAddToCart(product, finalPrice)}
            className="col-span-8 btn-temu-primary text-xs py-2.5 justify-center font-black"
          >
            <ShoppingBag className="w-4 h-4" />
            ¡COMPRAR CON MI CUPÓN!
          </button>
        </div>

      </div>

    </div>
  );
}
