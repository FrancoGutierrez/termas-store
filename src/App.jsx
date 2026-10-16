import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BannerTemuTimer from './components/BannerTemuTimer';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import WheelModal from './components/WheelModal';
import GiftChestModal from './components/GiftChestModal';
import ScratchCardModal from './components/ScratchCardModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import WinnerToast from './components/WinnerToast';
import AdminPanelModal from './components/AdminPanelModal';

import { getProducts, getGameSettings, getActivePrizeSession } from './utils/storage';
import { sounds } from './utils/audio';

export default function App() {
  const [products, setProducts] = useState(() => getProducts());
  const [gameSettings, setGameSettings] = useState(() => getGameSettings());
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCoupon, setActiveCoupon] = useState(() => getActivePrizeSession()); // { code, discountPercent, title, userName, userPhone }
  const [cartItems, setCartItems] = useState([]); // [{ product, qty, price }]
  
  // Modals state
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [isGiftChestOpen, setIsGiftChestOpen] = useState(false);
  const [isScratchOpen, setIsScratchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Auto open wheel modal on first visit if no active prize exists
  useEffect(() => {
    const active = getActivePrizeSession();
    if (active) {
      setActiveCoupon(active);
      return; // Anti-refresh lock: do not reopen wheel
    }

    const hasSeenWheel = sessionStorage.getItem('terma_has_seen_wheel');
    if (!hasSeenWheel) {
      const timer = setTimeout(() => {
        setIsWheelOpen(true);
        sessionStorage.setItem('terma_has_seen_wheel', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);


  const handleWinCoupon = (coupon) => {
    setActiveCoupon(coupon);

    // Recalculate cart prices with newly won coupon
    setCartItems(prev => prev.map(item => {
      const calculatedPrice = Math.round(item.product.originalPrice * (1 - coupon.discountPercent / 100));
      const finalPrice = Math.min(calculatedPrice, item.product.normalPrice);
      return { ...item, price: finalPrice };
    }));
  };

  // Cierra cualquier modal de juego y lleva al cliente al catálogo de termas
  const goToProducts = () => {
    setIsWheelOpen(false);
    setIsGiftChestOpen(false);
    setIsScratchOpen(false);
    // Esperar a que el modal se desmonte antes de hacer scroll
    setTimeout(() => {
      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleAddToCart = (product, price) => {
    sounds.playTick();
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { product, qty: 1, price }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev => prev.map(i => i.product.id === productId ? { ...i, qty: newQty } : i));
  };

  const handleRemoveCartItem = (productId) => {
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.qty, 0);

  return (
    <div className="min-h-screen bg-transparent text-slate-800 font-sans flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      
      <div>
        {/* Top Sticky Countdown Banner */}
        <BannerTemuTimer onOpenWheel={() => setIsWheelOpen(true)} />

        {/* Main Header Bar */}
        <Header
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWheel={() => setIsWheelOpen(true)}
          onOpenGiftChest={() => setIsGiftChestOpen(true)}
          onOpenScratch={() => setIsScratchOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          activeCoupon={activeCoupon}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Conversion Hero Banner */}
        <HeroBanner
          onOpenWheel={() => setIsWheelOpen(true)}
          onOpenGiftChest={() => setIsGiftChestOpen(true)}
        />

        {/* Main Filterable Product Catalog */}
        <main>
          <ProductGrid
            products={products}
            activeCoupon={activeCoupon}
            onOpenDetail={(product) => setSelectedProduct(product)}
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
          />
        </main>
      </div>

      {/* Floating Winner Notification Toast */}
      <WinnerToast />

      {/* Modals & Slide-overs */}
      <WheelModal
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
        onWinCoupon={handleWinCoupon}
        onGoToProducts={goToProducts}
      />

      <GiftChestModal
        isOpen={isGiftChestOpen}
        onClose={() => setIsGiftChestOpen(false)}
        onWinCoupon={handleWinCoupon}
        onGoToProducts={goToProducts}
      />

      <ScratchCardModal
        isOpen={isScratchOpen}
        onClose={() => setIsScratchOpen(false)}
        onWinCoupon={handleWinCoupon}
        onGoToProducts={goToProducts}
      />

      <ProductDetailModal
        product={selectedProduct}
        activeCoupon={activeCoupon}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        activeCoupon={activeCoupon}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        activeCoupon={activeCoupon}
        onOrderSuccess={handleOrderSuccess}
      />

      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        setProducts={setProducts}
        gameSettings={gameSettings}
        setGameSettings={setGameSettings}
      />

      {/* Modern Footer */}
      <footer className="relative bg-termo-900 text-termo-200 py-10 px-4 mt-16 text-xs">
        {/* Franjas del logo */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600" />
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-base font-heading">TERMASTORE <span className="text-amber-400">PRO</span></span>
            <span>• © 2026 Todos los derechos reservados</span>
          </div>

          <div className="flex items-center gap-4 text-termo-200">
            <span>Envío Nacional Garantizado</span>
            <span>•</span>
            <span>Atención 24/7 por WhatsApp</span>
            <span>•</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-amber-400 underline hover:text-amber-300 font-bold cursor-pointer"
            >
              ⚙️ Panel de Configuración
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
