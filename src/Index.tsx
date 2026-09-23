import { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { ProductGridSection } from './components/ProductGridSection';
import { AboutSection } from './components/AboutSection';
import { FeaturedVideoSection } from './components/FeaturedVideoSection';
import { PhilosophySection } from './components/PhilosophySection';
import { ServicesSection, type ServiceItem } from './components/ServicesSection';
import { Footer } from './components/Footer';
import {
  ManifestoModal,
  AuthModal,
  ServiceModal,
} from './components/Modals';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { storeProducts } from './data/products';
import type { Product, CartItem } from './types/store';

export default function Index() {
  const [isManifestoOpen, setIsManifestoOpen] = useState(false);
  const [authModal, setAuthModal] = useState<{
    isOpen: boolean;
    mode: 'login' | 'signup';
  }>({
    isOpen: false,
    mode: 'login',
  });

  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [highlightedProductId, setHighlightedProductId] = useState<string | null>(null);

  // Fashion store cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: storeProducts[0],
      selectedSize: 'M',
      quantity: 1,
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeProductForSize, setActiveProductForSize] = useState<Product | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string>('');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Global keyboard shortcut for search (Cmd+K / Ctrl+K or '/')
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleOpenSizeGuide = (product?: Product) => {
    setActiveProductForSize(product || null);
    setIsSizeGuideOpen(true);
  };

  const handleCouponClaimed = (code: string) => {
    setAppliedCoupon(code);
  };

  // Redirect from search to a specific product
  const handleSelectProductFromSearch = (product: Product) => {
    setSelectedCategory('todos');
    setHighlightedProductId(product.id);

    // Scroll to vitrine / product element
    setTimeout(() => {
      const el = document.getElementById(product.id) || document.getElementById('vitrine');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    // Clear highlight after 3.5s
    setTimeout(() => {
      setHighlightedProductId(null);
    }, 3500);
  };

  // Redirect from search to a specific category
  const handleSelectCategoryFromSearch = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setTimeout(() => {
      document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-neutral-900 border-b border-white/5 py-2 px-4 text-center text-[11px] text-white/70 tracking-wider uppercase font-medium flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>
          Frete Grátis acima de R$ 399 · Pressione <kbd className="font-mono bg-white/10 px-1 rounded text-white font-semibold">⌘K</kbd> para buscar produtos
        </span>
      </div>

      {/* Section 1: Hero (Fashion Proposta de Valor & 10% OFF & Search Launcher) */}
      <HeroSection
        onOpenManifesto={() => setIsManifestoOpen(true)}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalItemsCount}
        onOpenSizeGuide={() => handleOpenSizeGuide()}
        onOpenSearch={() => setIsSearchOpen(true)}
        onCouponClaimed={handleCouponClaimed}
      />

      {/* Section 2: Vitrine Digital de Produtos (Product Grid, CEP & Provador & Categorias) */}
      <ProductGridSection
        onAddToCart={handleAddToCart}
        onOpenSizeGuide={handleOpenSizeGuide}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        highlightedProductId={highlightedProductId}
        onOpenSearchModal={() => setIsSearchOpen(true)}
      />

      {/* Section 3: The Atelier / About */}
      <AboutSection />

      {/* Section 4: Corte & Matéria-Prima (Featured Video) */}
      <FeaturedVideoSection
        onExploreMore={() => {
          document.getElementById('vitrine')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Section 5: Streetwear x Alfaiataria (Philosophy) */}
      <PhilosophySection />

      {/* Section 6: Categorias & Drops Exclusivos (Services) */}
      <ServicesSection
        onSelectService={(service) => setSelectedService(service)}
      />

      {/* Footer com Selos de Confiança, Troca Grátis e Links */}
      <Footer
        onOpenManifesto={() => setIsManifestoOpen(true)}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onOpenSizeGuide={() => handleOpenSizeGuide()}
      />

      {/* Interactive Search Modal with Predictive Autocomplete & History */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProductFromSearch}
        onSelectCategory={handleSelectCategoryFromSearch}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        couponCode={appliedCoupon}
        onApplyCoupon={(code) => setAppliedCoupon(code)}
      />

      {/* Interactive Size Guide Modal (Provador Virtual) */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        product={activeProductForSize}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Manifesto Modal */}
      <ManifestoModal
        isOpen={isManifestoOpen}
        onClose={() => setIsManifestoOpen(false)}
      />

      {/* Login & Membership Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
        onSwitchMode={(mode) => setAuthModal({ isOpen: true, mode })}
      />

      {/* Ficha Técnica de Categoria Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
}
