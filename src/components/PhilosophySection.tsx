import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { YouTubeEmbed } from './YouTubeEmbed';

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-16 md:mb-24"
        >
          Streetwear{' '}
          <span
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            className="italic text-white/40"
          >
            x
          </span>{' '}
          Alfaiataria
        </motion.h2>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: YouTube Video in 4:3 container */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl overflow-hidden aspect-[4/3] w-full border border-white/10 relative shadow-2xl bg-neutral-950"
          >
            <YouTubeEmbed videoId="OaVsCM0Zeio" type="aspect-4-3" />
          </motion.div>

          {/* Right Column: Two text blocks with divider */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center space-y-8 md:space-y-10"
          >
            {/* Block 1 */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Arquitetura Têxtil
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Cada silhueta foi pensada como um bloco arquitetônico.
                O algodão puro de alta gramatura (280g/m²) garante que a camisa
                mantenha sua estrutura e caimento boxy sem grudar no corpo, oferecendo
                conforto térmico e presença visual única.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* Block 2 */}
            <div>
              <p className="text-white/40 text-xs tracking-widest uppercase mb-4 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Atitude &amp; Longevidade
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                Não produzimos peças para uma única estação. Da escolha de zíperes
                YKK e botões metálicos maciços até o desenvolvimento de tênis com
                solados ergonômicos, nossa missão é vestir quem busca autenticidade
                em cada passo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
