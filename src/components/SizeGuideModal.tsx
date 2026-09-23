import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check, Ruler, Info } from 'lucide-react';
import type { Product } from '../types/store';

interface SizeGuideModalProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  product,
  onClose,
  onSelectSize,
}) => {
  const [height, setHeight] = useState<number>(178);
  const [weight, setWeight] = useState<number>(75);
  const [fitPreference, setFitPreference] = useState<'slim' | 'regular' | 'oversized'>('oversized');

  // Intelligent sizing logic simulation
  const calculateRecommendedSize = () => {
    const isFootwear = product?.category === 'tenis';

    if (isFootwear) {
      if (height < 165) return '39';
      if (height < 172) return '40';
      if (height < 180) return '41';
      if (height < 186) return '42';
      return '43';
    }

    // Apparel logic
    const bmi = weight / ((height / 100) * (height / 100));
    let base = 'M';

    if (bmi < 20) base = 'P';
    else if (bmi < 24.5) base = 'M';
    else if (bmi < 28) base = 'G';
    else base = 'GG';

    // Adjust based on fit preference
    if (fitPreference === 'oversized') {
      if (base === 'P') return 'M';
      if (base === 'M') return 'G';
      if (base === 'G') return 'GG';
      return 'GG';
    } else if (fitPreference === 'slim') {
      if (base === 'GG') return 'G';
      if (base === 'G') return 'M';
      if (base === 'M') return 'P';
      return 'P';
    }

    return base;
  };

  const recommendedSize = calculateRecommendedSize();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl liquid-glass rounded-3xl p-6 md:p-10 text-white border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 liquid-glass rounded-full p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Fechar provador"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white/40 text-xs tracking-widest uppercase font-semibold">
                Provador Virtual &amp; Size Guide
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-serif tracking-tight mb-2">
              Descubra seu caimento ideal
            </h3>
            <p className="text-white/60 text-xs md:text-sm mb-6">
              {product ? `Para: ${product.name}` : 'Recomendação biométrica com base em proporções anatômicas'}
            </p>

            {/* Interactive Calculator */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-white/80 font-medium flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-white/60" />
                  Seus dados corporais
                </span>
                <span className="text-xs text-white/40">Atualização em tempo real</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Altura */}
                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Altura</span>
                    <span className="font-mono text-white font-medium">{height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="150"
                    max="210"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-white h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Peso */}
                <div>
                  <div className="flex justify-between text-xs text-white/70 mb-1">
                    <span>Peso</span>
                    <span className="font-mono text-white font-medium">{weight} kg</span>
                  </div>
                  <input
                    type="range"
                    min="45"
                    max="130"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full accent-white h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Caimento preferido */}
              <div>
                <label className="block text-xs text-white/70 mb-2">
                  Caimento preferido
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['slim', 'regular', 'oversized'] as const).map((fit) => (
                    <button
                      key={fit}
                      type="button"
                      onClick={() => setFitPreference(fit)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium uppercase tracking-wider border transition-all cursor-pointer ${
                        fitPreference === fit
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {fit === 'slim' ? 'Slim Ajustado' : fit === 'regular' ? 'Regular' : 'Oversized Boxy'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Resultado Recomendado */}
              <div className="liquid-glass rounded-xl p-4 flex items-center justify-between border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white text-black font-semibold flex items-center justify-center text-base shrink-0">
                    {recommendedSize}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>96% de assertividade</span>
                    </div>
                    <p className="text-white text-xs md:text-sm font-medium">
                      Recomendamos o tamanho <strong className="text-white font-bold">{recommendedSize}</strong> para um visual {fitPreference}.
                    </p>
                  </div>
                </div>

                {onSelectSize && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectSize(recommendedSize);
                      onClose();
                    }}
                    className="liquid-glass rounded-full px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    Usar este tamanho
                  </button>
                )}
              </div>
            </div>

            {/* Tabela de medidas de referência */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-white/60 mb-3 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Guia de Medidas (cm)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-white/70 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 uppercase">
                      <th className="py-2 px-3">Tamanho</th>
                      <th className="py-2 px-3">Tórax</th>
                      <th className="py-2 px-3">Comprimento</th>
                      <th className="py-2 px-3">Ombro a Ombro</th>
                      <th className="py-2 px-3">Manga</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { size: 'P', chest: '104 - 108', length: '72', shoulder: '52', sleeve: '22' },
                      { size: 'M', chest: '110 - 114', length: '74', shoulder: '54', sleeve: '23' },
                      { size: 'G', chest: '116 - 120', length: '76', shoulder: '56', sleeve: '24' },
                      { size: 'GG', chest: '122 - 128', length: '78', shoulder: '58', sleeve: '25' },
                    ].map((row) => (
                      <tr
                        key={row.size}
                        className={row.size === recommendedSize ? 'bg-white/10 font-semibold text-white' : ''}
                      >
                        <td className="py-2 px-3 font-medium flex items-center gap-1.5">
                          {row.size}
                          {row.size === recommendedSize && (
                            <Check className="w-3 h-3 text-emerald-400 inline" />
                          )}
                        </td>
                        <td className="py-2 px-3 font-mono">{row.chest}</td>
                        <td className="py-2 px-3 font-mono">{row.length}</td>
                        <td className="py-2 px-3 font-mono">{row.shoulder}</td>
                        <td className="py-2 px-3 font-mono">{row.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rodapé modal */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
              <span>Primeira troca grátis em até 30 dias após a entrega.</span>
              <button
                onClick={onClose}
                className="liquid-glass rounded-full px-5 py-2 text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
              >
                Concluir
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
