import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Ruler, Check, Truck, Sparkles, Search, X } from 'lucide-react';
import { storeProducts, searchCategories } from '../data/products';
import type { Product } from '../types/store';

interface ProductGridSectionProps {
  onAddToCart: (product: Product, size: string) => void;
  onOpenSizeGuide: (product: Product) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  highlightedProductId: string | null;
  onOpenSearchModal: () => void;
}

export const ProductGridSection: React.FC<ProductGridSectionProps> = ({
  onAddToCart,
  onOpenSizeGuide,
  selectedCategory,
  onSelectCategory,
  highlightedProductId,
  onOpenSearchModal,
}) => {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    'prod-1': 'M',
    'prod-2': 'G',
    'prod-3': '41',
    'prod-4': 'M',
  });
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // In-page search query (syncable with search modal)
  const [inlineQuery, setInlineQuery] = useState('');

  // Simulação rápida de frete na vitrine
  const [cepInput, setCepInput] = useState('');
  const [shippingQuote, setShippingQuote] = useState<{
    city: string;
    pac: string;
    sedex: string;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  // Filter products based on selectedCategory and inlineQuery
  const filteredProducts = storeProducts.filter((product) => {
    const matchesCat =
      selectedCategory === 'todos' || product.category === selectedCategory;

    const term = inlineQuery.trim().toLowerCase();
    if (!term) return matchesCat;

    const matchesName = product.name.toLowerCase().includes(term);
    const matchesDesc = product.description.toLowerCase().includes(term);
    const matchesBadge = product.badge?.toLowerCase().includes(term);

    return matchesCat && (matchesName || matchesDesc || matchesBadge);
  });

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: Product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    onAddToCart(product, chosenSize);
    setAddedItemNotice(product.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1500);
  };

  const handleQuickCep = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = cepInput.replace(/\D/g, '');
    if (clean.length < 8) return;

    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      setShippingQuote({
        city: clean.startsWith('0') ? 'São Paulo, SP' : 'Envio Brasil Nacional',
        pac: '5 a 7 dias úteis · R$ 19,90 (Grátis acima de R$ 399)',
        sedex: '1 a 2 dias úteis · R$ 32,50',
      });
    }, 500);
  };

  return (
    <section id="vitrine" className="bg-black py-24 md:py-32 px-6 overflow-hidden relative">
      {/* Subtle radial ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-white/40 text-xs tracking-widest uppercase font-semibold">
                Vitrine Digital · Drop 01
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-white tracking-tight">
              Essenciais do Vestir Contemporâneo
            </h2>
          </div>

          {/* Inline Quick Search Button/Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSearchModal}
              className="liquid-glass rounded-full px-4 py-2.5 text-xs text-white/80 hover:text-white flex items-center gap-2 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Busca inteligente com previsão</span>
              <kbd className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/60">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* BARRA DE CATEGORIAS INTEGRADA À PESQUISA */}
        <div className="liquid-glass rounded-2xl p-3 md:p-4 mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-white/10">
          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mr-1 shrink-0">
              Filtrar:
            </span>
            {searchCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all shrink-0 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-white text-black shadow-lg font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Inline Filter Input with Clear */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={inlineQuery}
              onChange={(e) => setInlineQuery(e.target.value)}
              placeholder="Filtrar por nome..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
            {inlineQuery && (
              <button
                onClick={() => setInlineQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => {
            const currentSize = selectedSizes[product.id] || product.sizes[0];
            const isAdded = addedItemNotice === product.id;
            const isHighlighted = highlightedProductId === product.id;

            return (
              <div
                id={product.id}
                key={product.id}
                className={`liquid-glass rounded-3xl overflow-hidden flex flex-col justify-between group border transition-all duration-500 ${
                  isHighlighted
                    ? 'border-emerald-400 ring-2 ring-emerald-400/40 shadow-[0_0_30px_rgba(52,211,153,0.25)] scale-[1.02]'
                    : 'border-white/5 hover:border-white/20'
                }`}
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span className="liquid-glass text-white text-[10px] uppercase tracking-widest font-mono font-semibold px-2.5 py-1 rounded-full border border-white/20">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Size Guide Floating Button */}
                  <button
                    type="button"
                    onClick={() => onOpenSizeGuide(product)}
                    className="absolute top-4 right-4 liquid-glass rounded-full p-2 text-white/80 hover:text-white hover:bg-white/20 transition-all shadow-md cursor-pointer flex items-center gap-1.5 px-2.5 py-1"
                    title="Abrir Provador Virtual"
                  >
                    <Ruler className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] uppercase tracking-wider font-medium hidden sm:inline">
                      Provador
                    </span>
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-white/40 uppercase tracking-widest block mb-1">
                      {product.categoryLabel}
                    </span>
                    <h3 className="text-sm md:text-base font-medium text-white tracking-tight leading-snug mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    {/* Size Selector + Provador link */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-white/50 text-[11px] uppercase tracking-wider">
                          Tamanho: <strong className="text-white font-mono">{currentSize}</strong>
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenSizeGuide(product)}
                          className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Ruler className="w-3 h-3" />
                          <span>Guia</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => handleSelectSize(product.id, s)}
                            className={`min-w-8 h-8 px-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                              currentSize === s
                                ? 'bg-white text-black font-bold shadow-md'
                                : 'bg-white/5 text-white/70 hover:bg-white/15 border border-white/10'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price & Add to Cart */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-base md:text-lg font-semibold text-white font-mono">
                            {formatCurrency(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-white/40 line-through font-mono">
                              {formatCurrency(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-emerald-400 block">
                          em até 3x sem juros
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        className={`liquid-glass rounded-full px-4 py-2.5 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                          isAdded
                            ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400'
                            : 'text-white hover:bg-white/15 hover:border-white/30'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Adicionado</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Adicionar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search Feedback */}
        {filteredProducts.length === 0 && (
          <div className="liquid-glass rounded-3xl p-12 text-center my-6 space-y-3">
            <Search className="w-8 h-8 text-white/30 mx-auto" />
            <h4 className="text-lg font-medium text-white">Nenhum produto com esses filtros</h4>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              Experimente alterar a categoria selecionada ou limpar a busca.
            </p>
            <button
              onClick={() => {
                onSelectCategory('todos');
                setInlineQuery('');
              }}
              className="bg-white text-black font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Resetar Filtros
            </button>
          </div>
        )}

        {/* Simulação de Frete Integrada (Banner Box) */}
        <div className="mt-14 liquid-glass rounded-3xl p-6 md:p-8 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Column 1: Info */}
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Entrega Rápida em Todo o Brasil
              </span>
              <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
                Simulador de Frete e Prazos
              </h3>
              <p className="text-xs text-white/50 leading-relaxed">
                Frete grátis em pedidos a partir de R$ 399. Envio com seguro total e rastreio via WhatsApp.
              </p>
            </div>

            {/* Column 2: Input */}
            <div>
              <form onSubmit={handleQuickCep} className="flex gap-2">
                <div className="relative flex-1">
                  <Truck className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={9}
                    value={cepInput}
                    onChange={(e) => setCepInput(e.target.value)}
                    placeholder="Digite seu CEP (ex: 01310-100)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-3 py-3 text-xs md:text-sm text-white placeholder:text-white/30 font-mono focus:outline-none focus:border-white/30"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isCalculating}
                  className="bg-white text-black font-semibold text-xs px-5 py-3 rounded-2xl hover:bg-neutral-200 transition-colors cursor-pointer shrink-0"
                >
                  {isCalculating ? 'Calculando...' : 'Calcular'}
                </button>
              </form>
            </div>

            {/* Column 3: Result Preview */}
            <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-xs">
              {shippingQuote ? (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-white font-medium">
                    <span>Destino: {shippingQuote.city}</span>
                    <span className="text-emerald-400">Verificado</span>
                  </div>
                  <div className="text-white/70 space-y-0.5 text-[11px]">
                    <p>• {shippingQuote.pac}</p>
                    <p>• {shippingQuote.sedex}</p>
                  </div>
                </div>
              ) : (
                <div className="text-white/40 text-center py-1">
                  Insira o CEP acima para simular prazos de entrega do seu endereço.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
