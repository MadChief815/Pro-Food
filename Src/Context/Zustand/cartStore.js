import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = 'cart-items';

export const useCartStore = create((set, get) => ({
  cartItems: [],

  // Load from AsyncStorage (call this in useEffect or startup)
  loadCart: async () => {
    try {
      const json = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (json) {
        const savedItems = JSON.parse(json);
        set({ cartItems: savedItems });
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
  },

  addToCart: async (item) => {
    const current = get().cartItems;
    const exists = current.some(i => i.id === item.id);
    if (!exists) {
      const updated = [...current, item];
      set({ cartItems: updated });
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
    }
  },

  removeFromCart: async (itemId) => {
    const updated = get().cartItems.filter(i => i.id !== itemId);
    set({ cartItems: updated });
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
  },

  toggleCartItem: async (item) => {
    const exists = get().cartItems.some(i => i.id === item.id);
    if (exists) {
      await get().removeFromCart(item.id);
    } else {
      await get().addToCart(item);
    }
  },

  updateQuantity: async (itemId, newQuantity) => {
    const updated = get().cartItems.map(i =>
      i.id === itemId ? { ...i, quantity: newQuantity } : i
    );
    set({ cartItems: updated });
    await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
  },
}));
