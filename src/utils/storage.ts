import { CART_STORAGE_KEY } from '@/data/products';

export function loadCartIds(): number[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((id) => typeof id === 'number');
  } catch {
    return [];
  }
}

export function saveCartIds(ids: number[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(ids));
}
