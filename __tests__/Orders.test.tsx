
import React from 'react';

import {
  render,
} from '@testing-library/react-native';

import Orders from '../src/screens/Orders/Orders';

// Mock icons.
jest.mock('lucide-react-native', () => ({
  Package: () => null,
  MapPin: () => null,
  CreditCard: () => null,
}));

// Mock order.
const mockOrder = {
  id: 'ORD-12345',
  createdAt: '2026-09-07T10:00:00.000Z',
  status: 'Placed',
  items: [
    {
      id: 1,
      title: 'Test Product',
      price: 50,
      quantity: 2,
    },
  ],
  total: 110,
  paymentMethod: 'cod',
  addressData: {
    name: 'Test User',
    phone: '9999999999',
    address: 'Test Street',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
  },
};

let mockOrders: any[] = [];

// Mock order store.
jest.mock('../src/store/orderStore', () => ({
  useOrderStore: (selector: any) =>
    selector({
      get orders() {
        return mockOrders;
      },
    }),
}));

describe('Orders Screen', () => {
  beforeEach(() => {
    mockOrders = [];
  });

  // Test empty state.
  it('shows empty state when there are no orders', async () => {
    const rendered: any = await render(
      <Orders />,
    );

    expect(
      rendered.getByText('My Orders'),
    ).toBeTruthy();

    expect(
      rendered.getByText('0 orders'),
    ).toBeTruthy();

    expect(
      rendered.getByText('No orders yet'),
    ).toBeTruthy();

    expect(
      rendered.getByText(
        'Your placed orders will appear here.',
      ),
    ).toBeTruthy();
  });

  // Test order list.
  it('shows orders and order count', async () => {
    mockOrders = [mockOrder];

    const rendered: any = await render(
      <Orders />,
    );

    expect(
      rendered.getByText('1 order'),
    ).toBeTruthy();

    expect(
      rendered.getByText('ORD-12345'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Placed'),
    ).toBeTruthy();
  });

  // Test order details.
  it('shows product, address and total details', async () => {
    mockOrders = [mockOrder];

    const rendered: any = await render(
      <Orders />,
    );

    expect(
      rendered.getByText('Test Product'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Qty: 2'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Test User'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Test Street'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Cash on Delivery'),
    ).toBeTruthy();

    expect(
      rendered.getAllByText('$110.00').length,
    ).toBeGreaterThan(0);
  });

  // Test online payment.
  it('shows Online Payment for online orders', async () => {
    mockOrders = [
      {
        ...mockOrder,
        paymentMethod: 'online',
      },
    ];

    const rendered: any = await render(
      <Orders />,
    );

    expect(
      rendered.getByText('Online Payment'),
    ).toBeTruthy();
  });
});

