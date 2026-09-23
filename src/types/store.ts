export interface Product {
  id: string;
  name: string;
  category: 'camisas' | 'tenis' | 'calcas' | 'acessorios';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  sizes: string[];
  description: string;
  isNew?: boolean;
  badge?: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}
