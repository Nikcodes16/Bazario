import {create} from 'zustand';

import {Product} from '../services/productApi';

export type OrderItem = Product & {
  quantity: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  addressData: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  status: string;
  createdAt: string;
};

type OrderState = {
  orders: Order[];

  addOrder: (order: Order) => void;

  clearOrders: () => void;
};

export const useOrderStore = create<OrderState>(set => ({
  orders: [],

  addOrder: order =>
    set(state => ({
      orders: [order, ...state.orders],
    })),

  clearOrders: () =>
    set({
      orders: [],
    }),
}));