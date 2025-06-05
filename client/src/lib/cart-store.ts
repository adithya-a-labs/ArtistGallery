import { create } from 'zustand';
import { apiRequest } from './queryClient';

interface CartStore {
  isCartOpen: boolean;
  cartCount: number;
  toggleCart: () => void;
  setCartCount: (count: number) => void;
  incrementCartCount: () => void;
  addToCart: (paintingId: number) => Promise<void>;
  refreshCartCount: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  isCartOpen: false,
  cartCount: 0,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setCartCount: (count: number) => set({ cartCount: count }),
  incrementCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  addToCart: async (paintingId: number) => {
    await apiRequest('POST', '/api/cart', { paintingId, quantity: 1 });
    // Immediately increment the cart count for instant feedback
    get().incrementCartCount();
  },
  refreshCartCount: async () => {
    try {
      const res = await fetch('/api/cart', { credentials: 'include' });
      if (res.ok) {
        const cartItems = await res.json();
        get().setCartCount(cartItems.length);
      }
    } catch (error) {
      console.error('Failed to refresh cart count:', error);
    }
  },
}));
