import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import type { ServiceItem } from './ServicesSection';

interface ManifestoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoModal: React.FC<ManifestoModalProps> = ({
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
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
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
              O Manifesto Asme · Moda &amp; Expressão
            </span>

            <h3 className="text-3xl md:text-5xl font-serif mt-3 mb-6 tracking-tight leading-tight">
              Dress what moves <em className="italic text-white/80">you</em>.
            </h3>

            <div className="space-y-5 text-white/70 text-sm md:text-base leading-relaxed">
              <p>
                Rejeitamos a moda descartável e as fórmulas genéricas. Vestir-se não é cobrir o corpo;
                é a declaração pública de como você se relaciona com a cidade, a arquitetura e o tempo.
              </p>
              <p>
                A verdadeira elegância urbana não precisa gritar. Ela vive na densidade do algodão puro
                280g/m², na costura ombro a ombro milimetricamente desenhada para não deformar, e no conforto
                de um tênis que une amortecimento ergonômico a uma silhueta escultural.
              </p>
              <p>
                Operamos na fronteira onde a disciplina da alfaiataria encontra a espontaneidade do streetwear.
                Peças numeradas, drops conscientes e matéria-prima feita para durar anos, não semanas.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-white/40 text-xs">Asme Atelier &copy; 2026</span>
              <button
                onClick={onClose}
                className="liquid-glass rounded-full px-6 py-2 text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
              >
                Fechar Manifesto
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface AuthModalProps {
  isOpen: boolean;
  mode: 'login' | 'signup';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'signup') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSwitchMode,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

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
            className="relative z-10 w-full max-w-md liquid-glass rounded-3xl p-8 text-white border border-white/10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 liquid-glass rounded-full p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-xl font-medium">
                  {mode === 'login' ? 'Bem-vindo de volta!' : 'Conta criada com sucesso!'}
                </h4>
                <p className="text-white/60 text-sm">
                  Acesso aos drops e histórico de compras liberado.
                </p>
              </div>
            ) : (
              <div>
                <span className="uppercase tracking-widest text-white/40 text-xs font-semibold">
                  Membros Asme
                </span>
                <h3 className="text-2xl font-serif mt-2 mb-2 tracking-tight">
                  {mode === 'login' ? 'Acessar Conta' : 'Criar Conta de Membro'}
                </h3>
                <p className="text-white/60 text-xs mb-6">
                  {mode === 'login'
                    ? 'Acompanhe seus pedidos, rastreio e lista de desejos.'
                    : 'Ganhe 10% OFF na primeira compra e convites para lançamentos.'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1.5">
                      Senha
                    </label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black font-semibold text-sm py-3 rounded-full hover:bg-neutral-200 transition-colors mt-2 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{mode === 'login' ? 'Entrar na Conta' : 'Cadastrar e Resgatar 10%'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-white/10 text-center text-xs text-white/60">
                  {mode === 'login' ? (
                    <p>
                      Ainda não é membro?{' '}
                      <button
                        onClick={() => onSwitchMode('signup')}
                        className="text-white underline hover:text-white/80 cursor-pointer font-medium"
                      >
                        Cadastre-se com 10% OFF
                      </button>
                    </p>
                  ) : (
                    <p>
                      Já possui conta?{' '}
                      <button
                        onClick={() => onSwitchMode('login')}
                        className="text-white underline hover:text-white/80 cursor-pointer font-medium"
                      >
                        Fazer login
                      </button>
                    </p>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {service && (
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
            className="relative z-10 w-full max-w-xl liquid-glass rounded-3xl p-8 md:p-10 text-white border border-white/10 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 liquid-glass rounded-full p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="uppercase tracking-widest text-white/40 text-xs font-semibold">
              {service.tag} · Especificações
            </span>

            <h3 className="text-3xl font-serif mt-2 mb-4 tracking-tight">
              {service.title}
            </h3>

            <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
              {service.description}
            </p>

            <div className="space-y-3 mb-8">
              <span className="text-xs uppercase tracking-widest text-white/40 block font-medium">
                Padrões Construtivos &amp; Materiais
              </span>
              <ul className="space-y-2">
                {service.details.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-white/80"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="liquid-glass rounded-full px-6 py-2.5 text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors font-medium cursor-pointer"
              >
                Fechar Ficha Técnica
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
