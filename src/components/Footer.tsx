import React from 'react';
import { Globe, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface FooterProps {
  onOpenManifesto: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenSizeGuide?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenManifesto,
  onOpenAuth,
  onOpenSizeGuide,
}) => {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-white/10 text-xs text-white/70">
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-white font-medium">Frete Grátis Acima de R$ 399</p>
              <p className="text-white/40">Entrega rápida para todo o território nacional</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-white font-medium">Primeira Troca Grátis</p>
              <p className="text-white/40">Até 30 dias para trocas ou devoluções descomplicadas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-white font-medium">Checkout 100% Seguro</p>
              <p className="text-white/40">Criptografia de ponta a ponta e Pix com 5% de desconto</p>
            </div>
          </div>
        </div>

        {/* Navigation & Brand */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-white" />
            <span className="font-semibold text-white text-lg tracking-tight">
              Asme
            </span>
            <span className="text-white/30 text-xs ml-2">
              · Contemporary Fashion Atelier &copy; {new Date().getFullYear()}
            </span>
          </div>

          {/* Quick Fashion Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-white/60">
            <a
              href="#vitrine"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('vitrine')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
            >
              New In
            </a>
            <a
              href="#vitrine"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('vitrine')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-white transition-colors"
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
              className="hover:text-white transition-colors"
            >
              Tênis
            </a>
            {onOpenSizeGuide && (
              <button
                type="button"
                onClick={onOpenSizeGuide}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Provador Virtual
              </button>
            )}
            <button
              onClick={onOpenManifesto}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Manifesto
            </button>
            <button
              onClick={() => onOpenAuth('login')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Minha Conta
            </button>
          </div>

          {/* Quiet baseline tag */}
          <p className="text-xs text-white/40 font-mono">
            Drop 01 · Authentic Streetwear
          </p>
        </div>
      </div>
    </footer>
  );
};
