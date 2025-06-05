import { create } from 'zustand';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { apiRequest } from './queryClient';

interface CartStore {
  isCartOpen: boolean;
  cartCount: number;
  toggleCart: () => void;
  setCartCount: (count: number) => void;
  addToCart: (paintingId: number) => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  isCartOpen: false,
  cartCount: 0,
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setCartCount: (count: number) => set({ cartCount: count }),
  addToCart: async (paintingId: number) => {
    await apiRequest('POST', '/api/cart', { paintingId, quantity: 1 });
    // The cart count will be updated by the cart query
  },
}));

// Hook to manage cart count based on cart items
export function useCartCount() {
  const { setCartCount } = useCartStore();
  const queryClient = useQueryClient();

  const { data: cartItems = [] } = useQuery({
    queryKey: ['/api/cart'],
    queryFn: async () => {
      const res = await fetch('/api/cart', { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  // Update cart count whenever cart items change
  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems.length, setCartCount]);

  return cartItems.length;
}
