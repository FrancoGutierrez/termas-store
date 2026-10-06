import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  activeCoupon, 
  onProceedCheckout 
}) {
  if (!isOpen) return null;

  const totalOriginal = cartItems.reduce((acc, item) => acc + item.product.originalPrice * item.qty, 0);
  const totalFinal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalSavings = totalOriginal - totalFinal;

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-amber-200 shadow-2xl flex flex-col justify-between p-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-amber-200/70 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-orange-50 text-orange-600 rounded-xl border border-orange-200">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 font-heading">Tu Carrito de Compra</h2>
                <p className="text-[11px] text-slate-500">Precios promocionales aplicados</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3.5">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <p className="text-6xl">🛒</p>
                <p className="text-slate-800 font-bold text-base font-heading">Tu carrito está vacío</p>
                <p className="text-slate-500 text-xs">Gira la ruleta o explora las termas para añadir productos con descuento.</p>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-amber-50/50 border border-amber-200/70 p-3.5 rounded-2xl flex gap-3.5 items-center justify-between shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-amber-200 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-slate-900 text-xs font-bold truncate font-heading">{item.product.name}</h4>
                    
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-slate-400 line-through text-[11px]">
                        S/ {item.product.originalPrice.toLocaleString('es-PE')}
                      </span>
                      <span className="text-orange-600 font-black">
                        S/ {item.price.toLocaleString('es-PE')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.qty - 1)}
                        className="w-6 h-6 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center font-bold cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs text-slate-800 font-extrabold px-1.5">{item.qty}</span>
                      <button
                        onClick={() => onUpdateQty(item.product.id, item.qty + 1)}
                        className="w-6 h-6 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg flex items-center justify-center font-bold cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-red-500 p-2 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Applied Coupon Banner */}
          {activeCoupon && cartItems.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl text-xs space-y-1 mb-4 shadow-xs">
              <div className="flex items-center justify-between font-extrabold text-emerald-800">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Cupón Ganador Activado:
                </span>
                <span>{activeCoupon.code}</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                ¡{activeCoupon.discountPercent}% de ahorro directo asignado a tu compra!
              </p>
            </div>
          )}

          {/* Pricing Summary Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-amber-200/70 pt-4 space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal Precio Regular:</span>
                  <span className="line-through">S/ {totalOriginal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-extrabold">
                  <span>Descuento Ganado en Ruleta:</span>
                  <span>- S/ {totalSavings.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Envío Express a Domicilio:</span>
                  <span className="text-emerald-700 font-extrabold">¡GRATIS!</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2.5 border-t border-amber-200/70">
                  <span>Total Final a Pagar:</span>
                  <span className="text-orange-600 text-xl font-heading">
                    S/ {totalFinal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <button
                onClick={onProceedCheckout}
                className="w-full btn-temu-primary py-3.5 text-sm font-black justify-center gap-2 shadow-lg shadow-orange-500/25 cursor-pointer"
              >
                <span>PROCESAR COMPRA CON DESCUENTO</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pago Seguro al Recibir (Yape, Plin, Tarjeta)</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
