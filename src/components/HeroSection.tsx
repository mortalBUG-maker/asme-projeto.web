import React, { useState } from 'react';
import { Globe, ArrowRight, Instagram, Twitter, Check, ShoppingBag, Ruler, Tag, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { YouTubeEmbed } from './YouTubeEmbed';

interface HeroSectionProps {
  onOpenManifesto: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenCart: () => void;
  cartCount: number;
  onOpenSizeGuide: () => void;
  onOpenSearch: () => void;
  onCouponClaimed?: (code: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenManifesto,
  onOpenAuth,
  onOpenCart,
  cartCount,
  onOpenSizeGuide,
  onOpenSearch,
  onCouponClaimed,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    if (onCouponClaimed) {
      onCouponClaimed('ASME10');
    }
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 4500);
  };

  return (
    <section className="min-h-screen overflow-hidden relative flex flex-col bg-black justify-between">
      {/* Background YouTube video (ID: 5i0vYvWcaGo): covers the entire viewport */}
      <YouTubeEmbed videoId="5i0vYvWcaGo" type="viewport-cover" />

      {/* Subtle bottom vignette to blend seamlessly into Section 2 */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-[5]" />

      {/* Navbar (relative z-20, px-6 py-6) */}
      <header className="relative z-20 px-6 py-6 w-full">
        <nav className="liquid-glass rounded-full pill max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Left: Brand + Real Fashion Categories */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-2 group">
              <Globe className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-white font-semibold text-lg tracking-tight">
                Asme
              </span>
            </a>

            {/* Fashion Navigation Links: [New In, Camisas, Tênis, Manifesto] */}
            <div className="hidden md:flex items-center gap-7 ml-7">
              <a
                href="#vitrine"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('vitrine')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-1"
              >
                <span>New In</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </a>
              <a
                href="#vitrine"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('vitrine')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Camisas
              </a>
              <a
                href="#vitrine"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('vitrine')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                Tênis
              </a>
              <button
                type="button"
                onClick={onOpenManifesto}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Manifesto
              </button>
            </div>
          </div>

          {/* Right: Search + Provador + Cart + Account */}
          <div className="flex items-center gap-2.5">
            {/* Search Launcher Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="liquid-glass rounded-full px-3 py-1.5 text-xs text-white/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10 hover:border-white/25"
              title="Buscar produtos com sugestões e histórico (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-white/70" />
              <span className="hidden sm:inline">Buscar</span>
              <kbd className="hidden lg:inline text-[9px] font-mono bg-white/10 px-1 py-0.5 rounded text-white/60">
                ⌘K
              </kbd>
            </button>

            {/* Quick Size Guide launcher button */}
            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="hidden lg:flex items-center gap-1.5 text-xs text-white/70 hover:text-white liquid-glass rounded-full px-3 py-1.5 transition-colors cursor-pointer"
              title="Abrir Provador Virtual"
            >
              <Ruler className="w-3.5 h-3.5 text-emerald-400" />
              <span>Provador</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="liquid-glass rounded-full px-3 py-1.5 text-white text-sm font-medium hover:bg-white/10 transition-colors cursor-pointer relative flex items-center gap-2"
              aria-label="Abrir sacola de compras"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Sacola</span>
              {cartCount > 0 && (
                <span className="bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Login button */}
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="text-white text-xs md:text-sm font-medium hover:text-white/80 transition-colors cursor-pointer px-2 py-1"
            >
              Login
            </button>
          </div>
        </nav>
      </header>

      {/* Hero content: Fashion Headline & 10% OFF Lead Capture */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center transform -translate-y-[8%] md:-translate-y-[16%]">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5 mb-6 border border-white/15">
          <Tag className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-white text-xs uppercase tracking-widest font-medium">
            Drop 01 · 10% OFF na Primeira Compra
          </span>
        </div>

        {/* Fashion Contemporary Headline */}
        <h1
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight mb-6 select-none leading-tight md:leading-none"
        >
          Wear your truth, define your <em className="italic">era</em>.
        </h1>

        {/* Email input: 10% OFF Offer */}
        <div className="max-w-xl w-full mb-5">
          <form
            onSubmit={handleEmailSubmit}
            className="liquid-glass rounded-full pill pl-6 pr-2 py-2 flex items-center gap-3 relative border border-white/20"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail para resgatar 10% OFF"
              className="text-white placeholder:text-white/50 bg-transparent flex-1 focus:outline-none text-xs sm:text-sm md:text-base"
            />
            <button
              type="submit"
              aria-label="Resgatar cupom de 10% OFF"
              className="bg-white rounded-full px-4 py-3 text-black hover:bg-neutral-200 transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5 font-semibold text-xs uppercase tracking-wider"
            >
              {isSubscribed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Resgatado</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Pegar 10% OFF</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Feedback notice */}
          <AnimatePresence>
            {isSubscribed && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-3 liquid-glass rounded-2xl p-2.5 text-xs text-white/95 font-medium tracking-wide flex items-center justify-center gap-2 border border-emerald-500/30"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>
                  Cupom <strong>ASME10</strong> aplicado! 10% OFF pronto para uso na sua sacola.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <p className="text-white/80 text-xs sm:text-sm leading-relaxed px-4 max-w-lg mb-6">
          Cadastre-se para receber 10% OFF na sua primeira compra, frete prioritário e acesso exclusivo aos novos lançamentos de camisas e tênis.
        </p>

        {/* Action Buttons: Ver Coleção, Buscar & Provador Virtual */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#vitrine"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('vitrine')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-black font-semibold text-xs uppercase tracking-widest px-8 py-3 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer shadow-lg"
          >
            Ver Coleção
          </a>

          <button
            type="button"
            onClick={onOpenSearch}
            className="liquid-glass rounded-full px-6 py-3 text-white text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-white/70" />
            <span>Buscar Produtos</span>
          </button>

          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="liquid-glass rounded-full px-6 py-3 text-white text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-2"
          >
            <Ruler className="w-4 h-4 text-emerald-400" />
            <span>Provador Virtual</span>
          </button>
        </div>
      </div>

      {/* Social icons footer (relative z-10, flex justify-center gap-4 pb-12) */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <Instagram className="w-5 h-5" />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Global Storefront"
          className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center"
        >
          <Globe className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
