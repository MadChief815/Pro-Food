import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthStackStore = create((set, get) => ({
  // Terms and Services Tick (Register Screen)
  isChecked: false,
  setIsChecked: (valueOrFn) =>
    set((state) => ({
      isChecked:
        typeof valueOrFn === 'function'
          ? valueOrFn(state.isChecked)
          : valueOrFn,
    })),

  // Uploaded Image URI
  uploadedImage: null,
  setUploadedImage: async (uri) => {
    try {
      await AsyncStorage.setItem('uploadedImage', uri);
      set({ uploadedImage: uri });
    } catch (e) {
      console.error('Failed to save image URI to storage:', e);
    }
  },

  // Load from storage
  loadUploadedImage: async () => {
    try {
      const uri = await AsyncStorage.getItem('uploadedImage');
      if (uri) set({ uploadedImage: uri });
    } catch (e) {
      console.error('Failed to load image URI from storage:', e);
    }
  },

  // Orders State
  orders: [],
  addOrder: (order) =>
    set((state) => ({
      orders: [...state.orders, order],
    })),
  getOrders: () => get().orders,
}));

export default AuthStackStore;
