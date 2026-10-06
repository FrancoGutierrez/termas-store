import React, { useState } from 'react';
import { X, Settings, ShoppingBag, HelpCircle, Save, Plus, Edit2, Trash2, RotateCcw, Download, CheckCircle2, Flame } from 'lucide-react';
import { saveProducts, resetProductsToDefault, saveGameSettings } from '../utils/storage';

export default function AdminPanelModal({ 
  isOpen, 
  onClose, 
  products, 
  setProducts, 
  gameSettings, 
  setGameSettings 
}) {
  const [activeTab, setActiveTab] = useState('guide'); // 'guide' | 'products' | 'settings'
  const [editingProduct, setEditingProduct] = useState(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    let updated;
    if (isNewProduct) {
      updated = [...products, { ...editingProduct, id: `terma-${Date.now()}` }];
    } else {
      updated = products.map(p => p.id === editingProduct.id ? editingProduct : p);
    }
    setProducts(updated);
    saveProducts(updated);
    setEditingProduct(null);
    showNotification("¡Producto guardado y actualizado con éxito!");
  };

  const handleDeleteProduct = (id) => {
    if (confirm("¿Estás seguro de eliminar esta terma del catálogo?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      saveProducts(updated);
      showNotification("Producto eliminado.");
    }
  };

  const handleResetDefaults = () => {
    if (confirm("¿Deseas restaurar la lista inicial de termas predeterminadas?")) {
      const restored = resetProductsToDefault();
      setProducts(restored);
      showNotification("Catálogo restaurado a valores por defecto.");
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    saveGameSettings(gameSettings);
    showNotification("Ajustes del sistema guardados correctamente.");
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ products, gameSettings }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `termas_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card max-w-4xl p-6 sm:p-7 relative bg-white border-2 border-amber-300 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200/60 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl border border-amber-300">
              <Settings className="w-6 h-6 animate-spin" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 font-heading">
                Panel de Administración & Estrategia de Precios
              </h2>
              <p className="text-xs text-slate-500">
                Gestiona tus productos, fija tus precios reales y personaliza las reglas de victoria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1.5 rounded-full bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMsg && (
          <div className="bg-emerald-100 border border-emerald-400 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-black mb-4 flex items-center gap-2 shadow-xs animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3 mb-6">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'guide'
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-amber-50"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            📘 Guía Estratégica
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'products'
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-amber-50"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            🛍️ Editar Termas ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-amber-50"
            }`}
          >
            <Settings className="w-4 h-4" />
            ⚙️ Ajustes de Tienda
          </button>
        </div>

        {/* TAB 1: TUTORIAL GUIDE */}
        {activeTab === 'guide' && (
          <div className="space-y-6 text-slate-700 text-xs leading-relaxed max-h-[62vh] overflow-y-auto pr-2">
            
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 p-5 rounded-2xl space-y-2">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2 font-heading">
                <Flame className="w-5 h-5 text-orange-600" />
                El Secreto: Cómo Cobrar tu Precio Normal con la Euforia de la Victoria
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Las grandes plataformas no reducen sus márgenes reales; crean una experiencia gamificada donde el cliente siente que ha vencido a la suerte y ganado un premio extraordinario.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-amber-50/50 p-4.5 rounded-2xl border border-amber-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black">1</div>
                <h4 className="font-bold text-slate-900 text-sm font-heading">1. Tu Precio Normal Real</h4>
                <p className="text-slate-600 text-[11px]">
                  Fijas la cantidad exacta que quieres ganar por la terma (ejemplo: <strong>S/ 799.00</strong>). Este es tu precio objetivo de ganancia.
                </p>
              </div>

              <div className="bg-amber-50/50 p-4.5 rounded-2xl border border-amber-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">2</div>
                <h4 className="font-bold text-slate-900 text-sm font-heading">2. Precio de Lista Inflado (MSRP)</h4>
                <p className="text-slate-600 text-[11px]">
                  En la ficha colocas un precio de lista referencial más alto (ejemplo: <strong>S/ 1,399.00</strong>) que se muestra tachado.
                </p>
              </div>

              <div className="bg-amber-50/50 p-4.5 rounded-2xl border border-amber-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">3</div>
                <h4 className="font-bold text-slate-900 text-sm font-heading">3. El Descuento de la Ruleta</h4>
                <p className="text-slate-600 text-[11px]">
                  Cuando el cliente gira la ruleta y gana un 43% de descuento, el total a pagar queda exactamente en tus <strong>S/ 799.00</strong>. ¡El comprador siente que se ahorró S/ 600 y tú cobras tu precio completo!
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-sm font-black text-slate-900 flex items-center gap-2 font-heading">
                🛠️ ¿Cómo Modificar Productos y Precios en el Futuro?
              </h4>
              <ul className="space-y-2.5 text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Desde esta misma pantalla:</strong> Ve a la pestaña <em>"🛍️ Editar Termas"</em> arriba. Puedes cambiar el nombre, precio de lista, precio objetivo normal, stock e imagen de cada terma. Se guarda de inmediato en tu navegador.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>En el Código Fuente:</strong> Si deseas editar los productos por defecto de manera permanente en el repositorio, abre el archivo <code className="bg-amber-100 px-2 py-0.5 rounded text-amber-900">src/data/initialProducts.js</code> y modifica los valores numéricos.</span>
                </li>
              </ul>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={handleExportJSON}
                  className="btn-glass text-xs py-2.5 px-4 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-orange-600" />
                  <span>Descargar Respaldo JSON de Catálogo</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="space-y-4 max-h-[62vh] overflow-y-auto pr-2">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 font-heading">Catálogo de Termas Actuales</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingProduct({
                      name: '',
                      category: 'electric',
                      brand: 'Veluxe Aura',
                      originalPrice: 1299,
                      normalPrice: 749,
                      discountPercent: 42,
                      rating: 4.9,
                      reviewsCount: 65,
                      image: '/images/terma_electrica_smart.jpg',
                      badge: '⚡ NUEVO',
                      inStock: 5,
                      specs: ['Capacidad: 50L', 'Potencia: 2000W'],
                      description: 'Descripción detallada de la terma'
                    });
                    setIsNewProduct(true);
                  }}
                  className="btn-temu-primary text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Terma</span>
                </button>
                <button
                  onClick={handleResetDefaults}
                  className="btn-glass text-xs py-2 px-3 flex items-center gap-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                  title="Restaurar valores de fábrica"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restaurar</span>
                </button>
              </div>
            </div>

            {/* Editing Product Form */}
            {editingProduct && (
              <form onSubmit={handleSaveProduct} className="bg-amber-50/50 p-4.5 rounded-2xl border-2 border-amber-300 space-y-4 my-3 animate-fadeIn">
                <h4 className="text-sm font-black text-slate-900 font-heading">
                  {isNewProduct ? "Añadir Nueva Terma" : `Editar: ${editingProduct.name}`}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Nombre de la Terma</label>
                    <input
                      type="text"
                      required
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full bg-white border border-amber-200 text-slate-900 p-2.5 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Categoría</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                      className="w-full bg-white border border-amber-200 text-slate-900 p-2.5 rounded-xl cursor-pointer"
                    >
                      <option value="electric">⚡ Eléctrica</option>
                      <option value="gas">🔥 a Gas</option>
                      <option value="solar">☀️ Solar</option>
                      <option value="portable">🎒 Portátil</option>
                      <option value="ducha">💧 Ducha</option>
                      <option value="hybrid">🏆 Híbrida</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Precio Inflado Lista (MSRP)</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.originalPrice}
                      onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white border border-amber-200 text-slate-900 p-2.5 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Precio Normal Objetivo (Tu Ganancia)</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.normalPrice}
                      onChange={(e) => setEditingProduct({ ...editingProduct, normalPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white border border-amber-200 text-slate-900 p-2.5 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Stock Disponible</label>
                    <input
                      type="number"
                      value={editingProduct.inStock}
                      onChange={(e) => setEditingProduct({ ...editingProduct, inStock: parseInt(e.target.value) || 1 })}
                      className="w-full bg-white border border-amber-200 text-slate-900 p-2.5 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Ruta de Imagen</label>
                    <input
                      type="text"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                      className="w-full bg-white border border-amber-200 text-slate-900 p-2.5 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="btn-glass text-xs py-2 px-4 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-temu-primary text-xs py-2 px-6 font-black cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </button>
                </div>
              </form>
            )}

            {/* List Table */}
            <div className="space-y-2">
              {products.map(p => (
                <div key={p.id} className="bg-amber-50/40 p-3 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-xl border border-amber-200" />
                    <div>
                      <h4 className="font-bold text-slate-900 line-clamp-1 font-heading">{p.name}</h4>
                      <div className="flex gap-3 text-[11px] text-slate-500">
                        <span>Lista: <s className="text-slate-400">S/ {p.originalPrice}</s></span>
                        <span>Precio Real: <strong className="text-orange-600">S/ {p.normalPrice}</strong></span>
                        <span>Stock: <strong className="text-emerald-700">{p.inStock}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setIsNewProduct(false);
                      }}
                      className="p-2 bg-white hover:bg-slate-100 text-amber-700 rounded-xl border border-amber-200 cursor-pointer shadow-xs"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-2 bg-white hover:bg-slate-100 text-red-500 rounded-xl border border-red-200 cursor-pointer shadow-xs"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: GAME SETTINGS */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="space-y-4 max-h-[62vh] overflow-y-auto pr-2 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Nombre de la Tienda</label>
              <input
                type="text"
                value={gameSettings.storeName}
                onChange={(e) => setGameSettings({ ...gameSettings, storeName: e.target.value })}
                className="w-full bg-white border border-amber-200 text-slate-900 p-3 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Símbolo de Moneda</label>
              <input
                type="text"
                value={gameSettings.currencySymbol}
                onChange={(e) => setGameSettings({ ...gameSettings, currencySymbol: e.target.value })}
                className="w-full bg-white border border-amber-200 text-slate-900 p-3 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Número de WhatsApp de Ventas</label>
              <input
                type="text"
                value={gameSettings.whatsappNumber}
                onChange={(e) => setGameSettings({ ...gameSettings, whatsappNumber: e.target.value })}
                className="w-full bg-white border border-amber-200 text-slate-900 p-3 rounded-xl focus:border-orange-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="btn-temu-primary text-xs py-3.5 px-6 justify-center w-full font-black cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" />
              GUARDAR CONFIGURACIÓN GENERAL
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
