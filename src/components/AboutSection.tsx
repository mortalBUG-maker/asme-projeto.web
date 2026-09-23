import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="about"
      className="bg-black pt-28 md:pt-36 pb-10 md:pb-14 px-6 overflow-hidden relative"
    >
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Label */}
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/40 text-xs md:text-sm tracking-widest uppercase mb-8 font-medium flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          The Atelier · Visão Têxtil
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
        >
          Tailored{' '}
          <span
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            className="italic text-white/60 font-normal"
          >
            silhouettes
          </span>{' '}
          for
          <br className="hidden md:inline" /> minds that{' '}
          <span
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            className="italic text-white/60 font-normal"
          >
            dare, dress, and inspire.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-white/60 text-sm md:text-base max-w-2xl leading-relaxed"
        >
          Criamos peças que transcendem a efemeridade das tendências rápidas.
          Da densidade das malhas pesadas de 280g aos tênis de geometria escultural,
          cada detalhe foi projetado para valorizar a presença de quem veste.
        </motion.p>
      </div>
    </section>
  );
};
