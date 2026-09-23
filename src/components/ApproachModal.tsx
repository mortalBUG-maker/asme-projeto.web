import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Compass, ShieldCheck, Zap } from 'lucide-react';

interface ApproachModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApproachModal: React.FC<ApproachModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl liquid-glass rounded-3xl p-8 md:p-12 text-white border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 liquid-glass rounded-full p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-white/40 text-xs tracking-widest uppercase font-semibold">
              Exploration & Methodology
            </span>

            <h3 className="text-3xl md:text-4xl font-serif mt-2 mb-4 tracking-tight">
              Curiosity-Driven Architecture
            </h3>

            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-8">
              Every project starts with a foundational question, and every answer
              opens a new door to innovation. We operate through four distinct
              phases of creative and analytical rigor.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="liquid-glass rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <Compass className="w-5 h-5 text-white/80" />
                  <h4 className="font-medium text-white text-base">
                    01. First-Principles Inquiry
                  </h4>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  We discard inherited industry assumptions and audit raw user
                  realities to uncover the root dynamics of the challenge.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-white/80" />
                  <h4 className="font-medium text-white text-base">
                    02. Kinetic Prototyping
                  </h4>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Ideas are tested immediately in code, video, and tangible media
                  rather than endless static slide presentations.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-5 h-5 text-white/80" />
                  <h4 className="font-medium text-white text-base">
                    03. Material Polish
                  </h4>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Crafting refined physics, micro-interactions, typography, and
                  liquid glass elements that elevate the experience.
                </p>
              </div>

              <div className="liquid-glass rounded-2xl p-5 border border-white/5">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-white/80" />
                  <h4 className="font-medium text-white text-base">
                    04. Scaled Impact
                  </h4>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Deploying resilient production systems that move people, drive
                  measurable business results, and stand the test of time.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-white/40 text-xs">
                Asme Strategic Framework
              </span>
              <button
                onClick={onClose}
                className="liquid-glass rounded-full px-6 py-2.5 text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
              >
                Close View
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
