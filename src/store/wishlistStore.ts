import {create} from 'zustand';

import {Product} from '../services/productApi';

type WishlistState = {
  items: Product[];

  addToWishlist: (
    product: Product,
  ) => void;

  removeFromWishlist: (
    productId: number,
  ) => void;

  toggleWishlist: (
    product: Product,
  ) => void;

  clearWishlist: () => void;
};

export const useWishlistStore =
  create<WishlistState>(set => ({
    items: [],

    addToWishlist: product =>
      set(state => {
        const exists = state.items.some(
          item => item.id === product.id,
        );

        if (exists) {
          return state;
        }

        return {
          items: [
            ...state.items,
            product,
          ],
        };
      }),

    removeFromWishlist: productId =>
      set(state => ({
        items: state.items.filter(
          item => item.id !== productId,
        ),
      })),

    toggleWishlist: product =>
      set(state => {
        const exists = state.items.some(
          item => item.id === product.id,
        );

        if (exists) {
          return {
            items: state.items.filter(
              item => item.id !== product.id,
            ),
          };
        }

        return {
          items: [
            ...state.items,
            product,
          ],
        };
      }),

    clearWishlist: () =>
      set({
        items: [],
      }),
  }));