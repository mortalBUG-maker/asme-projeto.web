import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { YouTubeEmbed } from './YouTubeEmbed';
import { Sparkles } from 'lucide-react';

interface FeaturedVideoSectionProps {
  onExploreMore?: () => void;
}

export const FeaturedVideoSection: React.FC<FeaturedVideoSectionProps> = ({
  onExploreMore,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-black pt-6 md:pt-10 pb-20 md:pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden aspect-video w-full border border-white/10 shadow-2xl bg-neutral-950"
        >
          {/* Featured Video (YouTube ID: oA3mA-rsKWo) */}
          <YouTubeEmbed videoId="oA3mA-rsKWo" type="aspect-video" />

          {/* Gradient overlay on video */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-6 z-10">
            {/* Left Card: Fashion Cut & Craft */}
            <div className="liquid-glass rounded-2xl p-6 md:p-8 max-w-md border border-white/15">
              <div className="flex items-center gap-1.5 text-white/50 text-xs tracking-widest uppercase mb-3 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Corte &amp; Matéria-Prima</span>
              </div>
              <p className="text-white text-sm md:text-base leading-relaxed">
                Cada peça nasce do encontro entre a estrutura da alfaiataria e a
                liberdade do streetwear contemporâneo. Fibras nobres, caimento
                escultural e costuras preparadas para anos de uso.
              </p>
            </div>

            {/* Right Button */}
            <motion.a
              href="#vitrine"
              onClick={(e) => {
                e.preventDefault();
                if (onExploreMore) {
                  onExploreMore();
                } else {
                  document
                    .getElementById('vitrine')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-xs uppercase tracking-widest font-semibold hover:bg-white/10 transition-colors self-start md:self-auto cursor-pointer shadow-lg whitespace-nowrap"
            >
              Explorar Coleção
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
