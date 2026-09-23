import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Truck, Check, Tag } from 'lucide-react';
import type { CartItem } from '../types/store';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  couponCode?: string;
  onApplyCoupon?: (code: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  couponCode = '',
  onApplyCoupon,
}) => {
  const [inputCep, setInputCep] = useState('');
  const [shippingResult, setShippingResult] = useState<{
    service: string;
    price: number;
    days: string;
  } | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
  const [shippingError, setShippingError] = useState('');

  const [couponInput, setCouponInput] = useState(couponCode);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(couponCode ? 0.1 : 0);
  const [couponFeedback, setCouponFeedback] = useState<string>(
    couponCode ? 'Cupom ASME10 aplicado (-10%)' : ''
  );

  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Formatação em BRL
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = subtotal * appliedDiscount;
  const shippingCost =
    subtotal >= 399 && shippingResult
      ? 0
      : shippingResult
      ? shippingResult.price
      : 0;

  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleCalculateCep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanCep = inputCep.replace(/\D/g, '');
    if (cleanCep.length < 8) {
      setShippingError('Digite um CEP válido com 8 dígitos.');
      return;
    }

    setShippingError('');
    setIsCalculatingShipping(true);

    setTimeout(() => {
      setIsCalculatingShipping(false);
      // Simulação baseada no primeiro dígito do CEP
      if (cleanCep.startsWith('0') || cleanCep.startsWith('1')) {
        setShippingResult({
          service: 'SEDEX Express SP/Sudeste',
          price: subtotal >= 399 ? 0 : 19.9,
          days: '1 a 2 dias úteis',
        });
      } else {
        setShippingResult({
          service: 'PAC Convencional Nacional',
          price: subtotal >= 399 ? 0 : 28.5,
          days: '4 a 6 dias úteis',
        });
      }
    }, 600);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (clean === 'ASME10' || clean === '10OFF' || clean === 'PRIMEIRACOMPRA') {
      setAppliedDiscount(0.1);
      setCouponFeedback('Cupom de 10% OFF aplicado com sucesso!');
      if (onApplyCoupon) onApplyCoupon(clean);
    } else {
      setCouponFeedback('Cupom inválido ou expirado.');
    }
  };

  const handleCheckout = () => {
    setCheckoutComplete(true);
    setTimeout(() => {
      setCheckoutComplete(false);
      onClose();
    }, 2800);
  };

  const freeShippingThreshold = 399;
  const progressToFreeShipping = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md liquid-glass border-l border-white/10 bg-black/95 text-white flex flex-col justify-between shadow-2xl p-6 md:p-8"
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-medium tracking-tight">Sua Sacola</h3>
                    <span className="text-xs text-white/50 bg-white/10 rounded-full px-2 py-0.5 font-mono">
                      {items.reduce((acc, i) => acc + i.quantity, 0)}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="liquid-glass rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Free shipping bar */}
                <div className="py-3 border-b border-white/10 text-xs">
                  <div className="flex items-center justify-between text-white/70 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-400" />
                      {subtotal >= freeShippingThreshold ? (
                        <strong className="text-emerald-400 font-semibold">
                          Parabéns! Você ganhou Frete Grátis.
                        </strong>
                      ) : (
                        <span>
                          Faltam{' '}
                          <strong className="text-white font-semibold">
                            {formatCurrency(freeShippingThreshold - subtotal)}
                          </strong>{' '}
                          para frete grátis
                        </span>
                      )}
                    </span>
                    <span className="font-mono">{Math.round(progressToFreeShipping)}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto my-4 pr-1 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-white/20" />
                    <p className="text-white/60 text-sm font-medium">Sua sacola está vazia</p>
                    <p className="text-white/40 text-xs max-w-xs">
                      Explore nossa seleção de camisas, tênis e peças essenciais para compor seu estilo.
                    </p>
                    <button
                      onClick={onClose}
                      className="liquid-glass rounded-full px-6 py-2 text-xs uppercase tracking-widest text-white hover:bg-white/10 transition-colors mt-2 cursor-pointer"
                    >
                      Explorar Coleção
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="liquid-glass rounded-2xl p-3.5 flex gap-3 border border-white/5 relative group"
                    >
                      {/* Product thumbnail */}
                      <div className="w-18 h-22 rounded-xl overflow-hidden bg-neutral-900 shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product info */}
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs md:text-sm font-medium text-white line-clamp-1">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                              className="text-white/40 hover:text-white transition-colors p-1"
                              title="Remover item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[11px] text-white/50 uppercase tracking-wider block">
                            Tam: <span className="text-white font-mono">{item.selectedSize}</span>
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity stepper */}
                          <div className="flex items-center gap-2 liquid-glass rounded-full px-2 py-0.5 border border-white/10 text-xs">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                              className="hover:text-white text-white/60 transition-colors p-0.5"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                              className="hover:text-white text-white/60 transition-colors p-0.5"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Item total */}
                          <span className="font-mono text-xs md:text-sm font-semibold text-white">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Summary & Calculations */}
              {items.length > 0 && (
                <div className="pt-3 border-t border-white/10 space-y-3">
                  {/* CEP calculation section */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        Calcular Frete
                      </span>
                      {shippingResult && (
                        <span className="text-emerald-400 font-mono text-[11px]">
                          {shippingResult.days}
                        </span>
                      )}
                    </div>
                    <form onSubmit={handleCalculateCep} className="flex gap-2">
                      <input
                        type="text"
                        maxLength={9}
                        value={inputCep}
                        onChange={(e) => setInputCep(e.target.value)}
                        placeholder="CEP (ex: 01310-100)"
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 font-mono"
                      />
                      <button
                        type="submit"
                        disabled={isCalculatingShipping}
                        className="liquid-glass rounded-xl px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        {isCalculatingShipping ? '...' : 'Calcular'}
                      </button>
                    </form>
                    {shippingError && (
                      <p className="text-[11px] text-rose-400">{shippingError}</p>
                    )}
                  </div>

                  {/* Cupom de desconto */}
                  <div className="space-y-1">
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-3 h-3 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Cupom (use ASME10)"
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-white/30 uppercase tracking-wider focus:outline-none focus:border-white/30 font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="liquid-glass rounded-xl px-3 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        Aplicar
                      </button>
                    </form>
                    {couponFeedback && (
                      <p className={`text-[11px] ${appliedDiscount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {couponFeedback}
                      </p>
                    )}
                  </div>

                  {/* Subtotal breakdown */}
                  <div className="space-y-1 text-xs text-white/70 pt-2 border-t border-white/5">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono">{formatCurrency(subtotal)}</span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Desconto (10% OFF)</span>
                        <span className="font-mono">- {formatCurrency(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span className="font-mono">
                        {shippingResult
                          ? shippingCost === 0
                            ? 'GRÁTIS'
                            : formatCurrency(shippingCost)
                          : 'A calcular'}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span className="font-mono text-base">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  {checkoutComplete ? (
                    <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 text-center space-y-1">
                      <Check className="w-6 h-6 text-emerald-400 mx-auto" />
                      <p className="text-xs font-semibold text-white">Pedido #2026 Confirmado!</p>
                      <p className="text-[11px] text-white/70">
                        Enviamos os detalhes do pagamento e rastreio para o seu e-mail.
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleCheckout}
                      className="w-full bg-white text-black font-semibold text-sm py-3.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Finalizar Compra</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
