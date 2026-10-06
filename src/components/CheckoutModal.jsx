import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Truck, QrCode, CreditCard, DollarSign, Send } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function CheckoutModal({ isOpen, onClose, cartItems, activeCoupon, onOrderSuccess }) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('yape');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Lima',
    notes: ''
  });
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const totalOriginal = cartItems.reduce((acc, item) => acc + item.product.originalPrice * item.qty, 0);
  const totalFinal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalSavings = totalOriginal - totalFinal;

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Por favor completa tu nombre, teléfono y dirección de entrega.");
      return;
    }

    const generatedId = `TERMA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');

    sounds.playWinFanfare();
    confetti({ particleCount: 160, spread: 90, origin: { y: 0.5 } });
    onOrderSuccess();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card max-w-xl p-6 sm:p-7 relative bg-white border-2 border-amber-300 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-900 border border-orange-300 px-3 py-1 rounded-full text-[11px] font-black">
                <Truck className="w-3.5 h-3.5 text-orange-600" />
                FINALIZAR PEDIDO CON PRECIO GANADO
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                Datos de Envío e Instalación
              </h2>
              <p className="text-slate-500 text-xs">
                Despachamos tu terma en 24 a 48 horas con técnicos certificados.
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Carlos Mendoza Ramos"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-amber-50/50 border border-amber-200 text-slate-800 text-xs p-3 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">WhatsApp / Celular *</label>
                  <input
                    type="tel"
                    required
                    placeholder="987 654 321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-amber-50/50 border border-amber-200 text-slate-800 text-xs p-3 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Ciudad de Entrega *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-amber-50/50 border border-amber-200 text-slate-800 text-xs p-3 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="Lima">Lima Metropolitana</option>
                    <option value="Arequipa">Arequipa</option>
                    <option value="Trujillo">Trujillo</option>
                    <option value="Cusco">Cusco</option>
                    <option value="Chiclayo">Chiclayo</option>
                    <option value="Huancayo">Huancayo</option>
                    <option value="Piura">Piura</option>
                    <option value="Ica">Ica</option>
                    <option value="Otra Ciudad">Otra Ciudad del Perú</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Dirección de Entrega Exacta *</label>
                <input
                  type="text"
                  required
                  placeholder="Av. Las Camelias 450 - Dpto 301, San Isidro"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-amber-50/50 border border-amber-200 text-slate-800 text-xs p-3 rounded-xl focus:border-orange-500 focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Payment Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-orange-600 uppercase tracking-wider">
                MÉTODO DE PAGO PREFERIDO:
              </label>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('yape')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'yape'
                      ? "bg-purple-50 border-purple-400 text-purple-900 shadow-sm"
                      : "bg-amber-50/40 border-amber-200 text-slate-600 hover:border-orange-300"
                  }`}
                >
                  <QrCode className="w-5 h-5 text-purple-600" />
                  <span className="text-xs font-bold">Yape / Plin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? "bg-blue-50 border-blue-400 text-blue-900 shadow-sm"
                      : "bg-amber-50/40 border-amber-200 text-slate-600 hover:border-orange-300"
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-bold">Tarjeta Cr/Déb</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-3 rounded-xl border text-left flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    paymentMethod === 'cash'
                      ? "bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm"
                      : "bg-amber-50/40 border-amber-200 text-slate-600 hover:border-orange-300"
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold">Contraentrega</span>
                </button>
              </div>
            </div>

            {/* Total Box */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-300 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs text-slate-600 block font-medium">Total con Ahorro de Victoria:</span>
                <span className="text-xs text-emerald-700 font-extrabold">Ahorraste: -S/ {totalSavings.toLocaleString('es-PE')}</span>
              </div>
              <span className="text-2xl font-black text-orange-600 font-heading">
                S/ {totalFinal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button
              type="submit"
              className="w-full btn-temu-primary py-3.5 text-sm font-black justify-center shadow-xl shadow-orange-500/25 gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>CONFIRMAR PEDIDO Y COORDINAR ENTREGA</span>
            </button>

          </form>
        ) : (
          <div className="text-center py-6 space-y-5 animate-fadeIn">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 text-3xl shadow-md">
              ✓
            </div>

            <div className="space-y-1">
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest">
                ¡PEDIDO REGISTRADO CON ÉXITO!
              </span>
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                ¡Felicidades por tu Compra con Descuento!
              </h2>
              <p className="text-slate-500 text-xs">
                Orden <strong className="text-slate-900 font-mono">{orderId}</strong> registrada para <strong>{formData.name}</strong>.
              </p>
            </div>

            <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-left space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-amber-200/60 pb-2">
                <span className="text-slate-500">Cliente:</span>
                <span className="text-slate-900 font-bold">{formData.name} ({formData.phone})</span>
              </div>
              <div className="flex justify-between border-b border-amber-200/60 pb-2">
                <span className="text-slate-500">Destino:</span>
                <span className="text-slate-900 font-bold">{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between border-b border-amber-200/60 pb-2">
                <span className="text-slate-500">Descuento Ganado:</span>
                <span className="text-emerald-700 font-extrabold">- S/ {totalSavings.toLocaleString('es-PE')}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm font-black">
                <span className="text-slate-600">Total a Pagar:</span>
                <span className="text-orange-600 font-heading">S/ {totalFinal.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  const msg = encodeURIComponent(`Hola TermaStore Pro, mi código de pedido es ${orderId}. Quisiera confirmar la hora de entrega de mi terma.`);
                  window.open(`https://wa.me/51987654321?text=${msg}`, '_blank');
                }}
                className="flex-1 btn-temu-gold text-xs py-3.5 justify-center gap-2 font-black shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>CONFIRMAR POR WHATSAPP</span>
              </button>

              <button
                onClick={() => {
                  setStep('form');
                  onClose();
                }}
                className="btn-glass text-xs py-3 px-5 font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
