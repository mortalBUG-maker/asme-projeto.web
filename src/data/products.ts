import type { Product } from '../types/store';

export const storeProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Oversized Boxy Heavy Tee (280g)',
    category: 'camisas',
    categoryLabel: 'Camisas & Tops',
    price: 249,
    originalPrice: 289,
    image: '/src/assets/images/product_oversized_tee_1790176064437.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    description: '100% algodão penteado encorpado 280g/m² com gola canelada de 3cm e costura reforçada ombro a ombro.',
    isNew: true,
    badge: 'Drop 01',
  },
  {
    id: 'prod-2',
    name: 'Raw Indigo Utility Overshirt',
    category: 'camisas',
    categoryLabel: 'Camisas & Casacos',
    price: 589,
    image: '/src/assets/images/product_denim_overshirt_1790176085605.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Denim bruto japonês 13oz não lavado, ferragens em banho prata fosco e bolsos utilitários frontais chanfrados.',
    isNew: true,
    badge: 'Limited Run',
  },
  {
    id: 'prod-3',
    name: 'Cyber Runner V1 Low Sneaker',
    category: 'tenis',
    categoryLabel: 'Footwear & Tênis',
    price: 790,
    originalPrice: 890,
    image: '/src/assets/images/product_luxury_sneakers_1790176097540.jpg',
    sizes: ['39', '40', '41', '42', '43'],
    description: 'Couro nobuck encerado e malha respirável técnica, entressola em EVA expandido esculpido e solado tratorado.',
    isNew: true,
    badge: 'Destaque',
  },
  {
    id: 'prod-4',
    name: 'Wide-Leg Relaxed Pleated Trouser',
    category: 'calcas',
    categoryLabel: 'Alfaiataria & Calças',
    price: 480,
    image: '/src/assets/images/product_tailored_trouser_1790176108553.jpg',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Sarja de lã fria e viscose com pregas duplas frontais, caimento fluido amplo e cós com elástico interno discreto.',
    isNew: false,
    badge: 'Iconic',
  },
];

export const searchCategories = [
  { id: 'todos', label: 'Todos os Itens' },
  { id: 'camisas', label: 'Camisas & Tops' },
  { id: 'tenis', label: 'Tênis' },
  { id: 'calcas', label: 'Calças & Alfaiataria' },
];

export const searchKeywords = [
  'Camisa Oversized',
  'Tênis Cyber Runner',
  'Denim Overshirt',
  'Calça Wide Leg',
  'Algodão 280g',
  'Drop 01',
  'Alfaiataria',
  'Tênis',
  'Camisas',
];
