import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Product,
} from '../services/productApi';

export type CartItem =
  Product & {
    quantity: number;
  };

type CartState = {
  items: CartItem[];

  addToCart: (
    product: Product,
  ) => void;

  removeFromCart: (
    productId: number,
  ) => void;

  increaseQuantity: (
    productId: number,
  ) => void;

  decreaseQuantity: (
    productId: number,
  ) => void;

  clearCart: () => void;
};

export const useCartStore =
  create<CartState>()(
    persist(
      set => ({
        items: [],

        addToCart: product =>
          set(state => {
            const existing =
              state.items.find(
                item =>
                  item.id ===
                  product.id,
              );

            if (existing) {
              return {
                items:
                  state.items.map(
                    item =>
                      item.id ===
                      product.id
                        ? {
                            ...item,
                            quantity:
                              item.quantity +
                              1,
                          }
                        : item,
                  ),
              };
            }

            return {
              items: [
                ...state.items,
                {
                  ...product,
                  quantity: 1,
                },
              ],
            };
          }),

        removeFromCart:
          productId =>
            set(state => ({
              items:
                state.items.filter(
                  item =>
                    item.id !==
                    productId,
                ),
            })),

        increaseQuantity:
          productId =>
            set(state => ({
              items:
                state.items.map(
                  item =>
                    item.id ===
                    productId
                      ? {
                          ...item,
                          quantity:
                            item.quantity +
                            1,
                        }
                      : item,
                ),
            })),

        decreaseQuantity:
          productId =>
            set(state => ({
              items:
                state.items
                  .map(item =>
                    item.id ===
                    productId
                      ? {
                          ...item,
                          quantity:
                            item.quantity -
                            1,
                        }
                      : item,
                  )
                  .filter(
                    item =>
                      item.quantity >
                      0,
                  ),
            })),

        clearCart: () =>
          set({
            items: [],
          }),
      }),

      {
        name: 'bazario-cart-storage',

        storage:
          createJSONStorage(
            () => AsyncStorage,
          ),
      },
    ),
  );