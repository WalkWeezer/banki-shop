export type BuyButtonState = 'idle' | 'processing' | 'inCart';

export interface Product {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  oldPrice: number | null;
  isSold: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
