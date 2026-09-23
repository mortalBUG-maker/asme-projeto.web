import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { YouTubeEmbed } from './YouTubeEmbed';

interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  youtubeId: string;
  details: string[];
}

const servicesData: ServiceItem[] = [
  {
    id: 'apparel',
    tag: 'Camisas & Casacos',
    title: 'Apparel & Overshirts',
    description:
      'Camisas utilitárias em denim bruto, sobreposições pesadas e camisetas boxy confeccionadas com algodão penteado 280g/m².',
    youtubeId: 'geFi-ZpN2ZM',
    details: [
      'Algodão Penteado Premium 280g/m²',
      'Denim Bruto Selvedge Japonês 13oz',
      'Ferragens em Banho Níquel Fosco',
      'Costuras Francesas e Bainha Dupla',
    ],
  },
  {
    id: 'footwear',
    tag: 'Tênis & Calçados',
    title: 'Footwear & Objects',
    description:
      'Silhuetas futuristas esculpidas em couro nobuck encerado com solados anatômicos em EVA e tração urbana multidirecional.',
    youtubeId: 'M4-AIOrZRl8',
    details: [
      'Couro Nobuck com Tratamento Hidrorrepelente',
      'Entressola em EVA Expandido Amortecedor',
      'Palmilha Anatômica com Memória Ortopédica',
      'Design Ergonômico de Alta Densidade',
    ],
  },
];

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="bg-black py-28 md:py-40 px-6 overflow-hidden relative"
    >
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-12 md:mb-16"
        >
          <div>
            <span className="text-white/40 text-xs tracking-widest uppercase font-semibold block mb-2">
              Diretrizes de Produção
            </span>
            <h2 className="text-3xl md:text-5xl text-white tracking-tight font-serif">
              Categorias &amp; Drops Exclusivos
            </h2>
          </div>
          <span className="text-white/40 text-sm hidden md:inline tracking-widest uppercase font-medium">
            Editorial 2026
          </span>
        </motion.div>

        {/* Two-card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelectService?.(service)}
              className="liquid-glass rounded-3xl overflow-hidden group cursor-pointer border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              {/* Card video area: aspect-video with YouTubeEmbed */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                <YouTubeEmbed videoId={service.youtubeId} type="aspect-video" />
              </div>

              {/* Card body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="uppercase tracking-widest text-white/40 text-xs font-semibold">
                      {service.tag}
                    </span>
                    <div className="liquid-glass rounded-full p-2 text-white/80 group-hover:text-white group-hover:bg-white/10 transition-colors flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl mb-3 tracking-tight font-medium">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-white/40">
                  <span>Ver especificações técnicas</span>
                  <span className="text-white/70 group-hover:text-white transition-colors">
                    Ficha técnica &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export type { ServiceItem };
