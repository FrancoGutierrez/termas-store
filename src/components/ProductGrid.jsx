import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: '🔥 Todas las Termas' },
  { id: 'electric', label: '⚡ Eléctricas Digitales' },
  { id: 'gas', label: '🔥 a Gas Instantáneas' },
  { id: 'solar', label: '☀️ Solares Presurizadas' },
  { id: 'portable', label: '🎒 Termos Portátiles' },
  { id: 'ducha', label: '💧 Duchas Eléctricas' },
  { id: 'hybrid', label: '🏆 Híbridas Inverter' }
];

export default function ProductGrid({ products, activeCoupon, onOpenDetail, onAddToCart, searchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 py-12 space-y-8 scroll-mt-28">
      
      {/* Category Tabs Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-termo-100 pb-6">
        <div>
          <div className="flex items-center gap-2 text-orange-600 font-extrabold text-xs uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            CATÁLOGO OFICIAL Y GARANTÍA CERTIFICADA
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-termo-900 font-heading tracking-tight">
            Selecciona tu Terma con Precio de Victoria Aplicado
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Los cupones ganados en la ruleta se descuentan automáticamente al añadir al carrito.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-termo-700 text-white shadow-md shadow-termo-700/25 scale-105"
                  : "bg-white text-slate-700 hover:bg-termo-50 hover:text-termo-900 border border-termo-100 shadow-xs"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white/60 rounded-3xl border border-termo-100 space-y-3">
          <p className="text-5xl">🔍</p>
          <h3 className="text-lg font-bold text-slate-800 font-heading">No se encontraron productos</h3>
          <p className="text-slate-500 text-xs">Prueba con otra palabra de búsqueda o restablece la categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              activeCoupon={activeCoupon}
              onOpenDetail={onOpenDetail}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

    </section>
  );
}
