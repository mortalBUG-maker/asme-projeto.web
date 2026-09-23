import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Clock,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  CornerDownLeft,
  Trash2,
} from 'lucide-react';
import { storeProducts, searchCategories, searchKeywords } from '../data/products';
import type { Product } from '../types/store';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [lastSearch, setLastSearch] = useState<string>('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [prediction, setPrediction] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  // Load saved last search & recent searches from localStorage
  useEffect(() => {
    try {
      const savedLast = localStorage.getItem('asme_last_search');
      if (savedLast) setLastSearch(savedLast);

      const savedRecent = localStorage.getItem('asme_recent_searches');
      if (savedRecent) {
        setRecentSearches(JSON.parse(savedRecent));
      } else {
        setRecentSearches(['Camisa Oversized', 'Tênis', 'Drop 01']);
      }
    } catch {
      // fallback in case of storage restrictions
    }
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Predictive typing logic: finds best candidate starting with query
  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setPrediction('');
      return;
    }

    // Look for matching product names first
    const productMatch = storeProducts.find((p) =>
      p.name.toLowerCase().includes(trimmed)
    );

    if (productMatch) {
      const name = productMatch.name;
      const index = name.toLowerCase().indexOf(trimmed);
      if (index === 0) {
        // Starts with query: prediction is the remaining suffix
        setPrediction(name.slice(trimmed.length));
        return;
      }
    }

    // Look in keywords / categories
    const keywordMatch = searchKeywords.find((k) =>
      k.toLowerCase().startsWith(trimmed)
    );
    if (keywordMatch) {
      setPrediction(keywordMatch.slice(trimmed.length));
      return;
    }

    setPrediction('');
  }, [query]);

  // Save search to history
  const persistSearch = (term: string) => {
    const clean = term.trim();
    if (!clean) return;

    try {
      localStorage.setItem('asme_last_search', clean);
      setLastSearch(clean);

      setRecentSearches((prev) => {
        const filtered = prev.filter((item) => item.toLowerCase() !== clean.toLowerCase());
        const updated = [clean, ...filtered].slice(0, 5);
        localStorage.setItem('asme_recent_searches', JSON.stringify(updated));
        return updated;
      });
    } catch {
      // ignore
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('asme_last_search');
      localStorage.removeItem('asme_recent_searches');
      setLastSearch('');
      setRecentSearches([]);
    } catch {
      // ignore
    }
  };

  const handleApplyAutocomplete = () => {
    if (prediction) {
      setQuery((prev) => prev + prediction);
      setPrediction('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && prediction) {
      e.preventDefault();
      handleApplyAutocomplete();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const finalTerm = prediction ? query + prediction : query;
      persistSearch(finalTerm);

      // If matches a single category, redirect to it
      const matchedCat = searchCategories.find(
        (c) => c.label.toLowerCase().includes(finalTerm.toLowerCase()) || c.id === finalTerm.toLowerCase()
      );
      if (matchedCat && matchedCat.id !== 'todos') {
        onSelectCategory(matchedCat.id);
        onClose();
        return;
      }

      // If matches a product
      const matchedProd = storeProducts.find((p) =>
        p.name.toLowerCase().includes(finalTerm.toLowerCase())
      );
      if (matchedProd) {
        onSelectProduct(matchedProd);
        onClose();
      }
    }
  };

  // Filter products based on search term & selected category
  const filteredProducts = storeProducts.filter((product) => {
    const matchesCategory =
      activeCategory === 'todos' || product.category === activeCategory;

    const term = query.trim().toLowerCase();
    if (!term) return matchesCategory;

    const matchesName = product.name.toLowerCase().includes(term);
    const matchesDesc = product.description.toLowerCase().includes(term);
    const matchesCatLabel = product.categoryLabel.toLowerCase().includes(term);
    const matchesBadge = product.badge?.toLowerCase().includes(term);

    return matchesCategory && (matchesName || matchesDesc || matchesCatLabel || matchesBadge);
  });

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Search Palette Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl liquid-glass rounded-3xl p-5 md:p-8 text-white border border-white/15 shadow-2xl overflow-hidden"
          >
            {/* Top Row: Search Input + Close */}
            <div className="relative flex items-center gap-3 pb-4 border-b border-white/10">
              <Search className="w-5 h-5 text-white/50 shrink-0" />

              {/* Input wrapper with ghost predictive text */}
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Buscar camisas, tênis, alfaiataria..."
                  className="w-full bg-transparent text-base md:text-lg text-white placeholder:text-white/30 focus:outline-none tracking-tight font-medium"
                />

                {/* Predictive ghost text overlay */}
                {prediction && (
                  <div
                    onClick={handleApplyAutocomplete}
                    className="absolute left-0 top-0 bottom-0 pointer-events-auto cursor-pointer flex items-center select-none text-base md:text-lg"
                    style={{
                      paddingLeft: `${query.length * 9.5 + 2}px`,
                    }}
                  >
                    <span className="text-white/30 italic">
                      {prediction}
                    </span>
                    <span className="ml-2 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/50 border border-white/10">
                      Tab ⇥
                    </span>
                  </div>
                )}
              </div>

              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setPrediction('');
                  }}
                  className="text-white/40 hover:text-white transition-colors p-1"
                  title="Limpar texto"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="liquid-glass rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Fechar busca"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* BARRA DE CATEGORIAS INTEGRADA */}
            <div className="pt-4 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mr-1 shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Categorias:
              </span>
              {searchCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      if (cat.id !== 'todos') {
                        persistSearch(cat.label);
                      }
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide uppercase transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-md font-semibold'
                        : 'liquid-glass text-white/70 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* SEÇÃO: ÚLTIMA PESQUISA & HISTÓRICO RECENTE */}
            <div className="py-3 border-y border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/40 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-white/50" />
                  {lastSearch ? (
                    <span>
                      Última pesquisa:{' '}
                      <button
                        onClick={() => {
                          setQuery(lastSearch);
                          persistSearch(lastSearch);
                        }}
                        className="text-emerald-400 font-medium underline hover:text-emerald-300 ml-1 cursor-pointer"
                      >
                        {lastSearch}
                      </button>
                    </span>
                  ) : (
                    <span>Pesquisas frequentes:</span>
                  )}
                </span>

                {/* Recent search pills */}
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      persistSearch(term);
                    }}
                    className="liquid-glass text-white/70 hover:text-white px-2.5 py-0.5 rounded-lg border border-white/10 text-[11px] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {recentSearches.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-white/30 hover:text-white/60 transition-colors text-[10px] uppercase tracking-wider flex items-center gap-1 cursor-pointer ml-auto"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Limpar</span>
                </button>
              )}
            </div>

            {/* RESULTADOS DA BUSCA EM TEMPO REAL */}
            <div className="pt-4 max-h-[50vh] overflow-y-auto space-y-2 pr-1">
              <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                <span>
                  {filteredProducts.length}{' '}
                  {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </span>
                <span className="text-[11px] hidden sm:inline">
                  Pressione <kbd className="font-mono bg-white/10 px-1 rounded text-white/80">Enter</kbd> para selecionar
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <Search className="w-8 h-8 text-white/20 mx-auto" />
                  <p className="text-white/70 text-sm">Nenhum produto encontrado para "{query}"</p>
                  <p className="text-white/40 text-xs">
                    Tente buscar por "Camisa", "Tênis", "Calça" ou explore as categorias acima.
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      persistSearch(query || product.name);
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="liquid-glass rounded-2xl p-3 flex items-center justify-between border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all group cursor-pointer"
                  >
                    {/* Left: Thumbnail + Title */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-16 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
                            {product.categoryLabel}
                          </span>
                          {product.badge && (
                            <span className="text-[9px] uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-mono">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-medium text-white group-hover:text-emerald-300 transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-white/40 line-clamp-1 max-w-md">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Price + Action CTA */}
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="font-mono text-sm font-semibold text-white">
                        {formatCurrency(product.price)}
                      </span>
                      <div className="liquid-glass rounded-full p-2 text-white/60 group-hover:text-white group-hover:bg-white/20 transition-all flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Redirect to Category Footer */}
            {activeCategory !== 'todos' && (
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                <span>Deseja ver todos os produtos da seção {activeCategory}?</span>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(activeCategory);
                    onClose();
                  }}
                  className="text-white hover:text-emerald-400 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                >
                  <span>Ir para vitrine de {activeCategory}</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
