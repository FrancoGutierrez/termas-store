import React from 'react';
import { X, Star, ShieldCheck, CheckCircle2, ShoppingBag, Zap, Award } from 'lucide-react';

export default function ProductDetailModal({ product, activeCoupon, onClose, onAddToCart }) {
  if (!product) return null;

  const discountPercent = activeCoupon ? activeCoupon.discountPercent : product.discountPercent;
  const calculatedPrice = Math.round(product.originalPrice * (1 - discountPercent / 100));
  const finalPrice = Math.min(calculatedPrice, product.normalPrice);
  const totalSavings = product.originalPrice - finalPrice;

  return (
    <div className="modal-overlay">
      <div className="modal-card max-w-3xl p-6 sm:p-8 relative bg-white border-2 border-amber-300 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-2 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Photo & Badges */}
          <div className="md:col-span-5 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-amber-200 shadow-md relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-3 left-3 badge-temu">{product.badge}</span>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/70 space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Garantía Oficial de Fábrica por 10 Años</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Eficiencia Energética A+++ (Ahorro Certificado)</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700">
                <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Norma Técnica de Seguridad Anti-Fugas ELCB</span>
              </div>
            </div>
          </div>

          {/* Right Product Details */}
          <div className="md:col-span-7 space-y-5">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-orange-600 font-extrabold uppercase tracking-wider">{product.brand}</span>
                <span>•</span>
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-extrabold text-slate-800">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} opiniones)</span>
                </div>
              </div>

              <h2 className="text-2xl font-black text-slate-900 font-heading">{product.name}</h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications List */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
                ESPECIFICACIONES TÉCNICAS:
              </h4>
              <ul className="space-y-2">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Box */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-300 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Precio Regular de Lista:</span>
                <span className="line-through font-semibold text-slate-400">S/ {product.originalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-sm text-slate-800 font-bold flex items-center gap-1">
                  🏆 Tu Precio de Victoria:
                </span>
                <span className="text-3xl font-black text-slate-900 font-heading">
                  <span className="text-orange-600 text-xl mr-0.5">S/</span>
                  {finalPrice.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <div className="bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs font-black p-2 rounded-xl text-center shadow-xs">
                🎉 ¡Felicidades! Ahorras S/ {totalSavings.toLocaleString('es-PE')} (-{discountPercent}%)
              </div>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={() => {
                onAddToCart(product, finalPrice);
                onClose();
              }}
              className="w-full btn-temu-primary py-3.5 text-sm sm:text-base font-black justify-center shadow-xl shadow-orange-500/25 gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              ¡AÑADIR A MI CARRITO CON DESCUENTO!
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
