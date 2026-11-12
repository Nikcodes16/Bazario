
import React from 'react';

import {
  render,
  fireEvent,
} from '@testing-library/react-native';

import Payment from '../src/screens/Payment/Payment';

// Mock icons.
jest.mock('lucide-react-native', () => ({
  ArrowLeft: () => null,
  Check: () => null,
  CreditCard: () => null,
  MapPin: () => null,
  ChevronRight: () => null,
}));

// Mock cart items.
const mockCartItems = [
  {
    id: 1,
    title: 'Test Product',
    price: 50,
    quantity: 2,
  },
];

let mockCurrentCartItems = mockCartItems;
let mockSavedAddress: any = null;

// Mock store functions.
const mockClearCart = jest.fn();
const mockAddOrder = jest.fn();

// Mock cart store.
jest.mock('../src/store/cartStore', () => ({
  useCartStore: (selector: any) =>
    selector({
      get items() {
        return mockCurrentCartItems;
      },
      clearCart: mockClearCart,
    }),
}));

// Mock address store.
jest.mock('../src/store/addressStore', () => ({
  useAddressStore: (selector: any) =>
    selector({
      get address() {
        return mockSavedAddress;
      },
    }),
}));

// Mock order store.
jest.mock('../src/store/orderStore', () => ({
  useOrderStore: (selector: any) =>
    selector({
      addOrder: mockAddOrder,
    }),
}));

// Mock navigation.
const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

describe('Payment Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockCurrentCartItems = mockCartItems;

    mockSavedAddress = {
      name: 'Test User',
      phone: '9999999999',
      address: 'Test Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    };
  });

  // Test payment screen content.
  it('shows address, payment method and order summary', async () => {
    const rendered: any = await render(
      <Payment navigation={mockNavigation as any} />,
    );

    expect(
      rendered.getByText('Payment'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Test User'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Cash on Delivery'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Order Summary'),
    ).toBeTruthy();
  });

  // Test price calculation.
  it('shows correct subtotal, delivery and total', async () => {
    const rendered: any = await render(
      <Payment navigation={mockNavigation as any} />,
    );

    expect(
      rendered.getByText('$100.00'),
    ).toBeTruthy();

    expect(
      rendered.getByText('$10.00'),
    ).toBeTruthy();

    expect(
      rendered.getAllByText('$110.00').length,
    ).toBeGreaterThan(0);
  });

  // Test placing order.
  it('places order and navigates to success', async () => {
    const rendered: any = await render(
      <Payment navigation={mockNavigation as any} />,
    );

    fireEvent.press(
      rendered.getByText('Place Order'),
    );

    expect(
      mockAddOrder,
    ).toHaveBeenCalledWith(
      expect.objectContaining({
        items: mockCartItems,
        total: 110,
        paymentMethod: 'cod',
        addressData: mockSavedAddress,
        status: 'Placed',
      }),
    );

    expect(
      mockClearCart,
    ).toHaveBeenCalled();

    expect(
      mockNavigation.navigate,
    ).toHaveBeenCalledWith(
      'OrderSuccess',
      expect.objectContaining({
        addressData: mockSavedAddress,
        paymentMethod: 'cod',
        total: 110,
      }),
    );
  });

  // Test missing address.
  it('navigates to Address when address is missing', async () => {
    mockSavedAddress = null;

    const rendered: any = await render(
      <Payment navigation={mockNavigation as any} />,
    );

    expect(
      rendered.getByText('+ Add Delivery Address'),
    ).toBeTruthy();

    fireEvent.press(
      rendered.getByText('+ Add Delivery Address'),
    );

    expect(
      mockNavigation.navigate,
    ).toHaveBeenCalledWith('Address');

    expect(
      mockAddOrder,
    ).not.toHaveBeenCalled();

    expect(
      mockClearCart,
    ).not.toHaveBeenCalled();
  });
});

