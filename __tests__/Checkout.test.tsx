
import React from 'react';

import {
  render,
  fireEvent,
} from '@testing-library/react-native';

import Checkout from '../src/screens/Checkout/Checkout';

// Mock icons.
jest.mock('lucide-react-native', () => ({
  ArrowLeft: () => null,
  ChevronRight: () => null,
  MapPin: () => null,
  CreditCard: () => null,
  ShoppingBag: () => null,
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

// Mock cart store.
jest.mock('../src/store/cartStore', () => ({
  useCartStore: (selector: any) =>
    selector({
      get items() {
        return mockCurrentCartItems;
      },
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

// Mock navigation.
const mockNavigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

describe('Checkout Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockCurrentCartItems = mockCartItems;
    mockSavedAddress = null;
  });

  // Test cart and total.
  it('shows cart items and total price', async () => {
    const rendered: any = await render(
      <Checkout navigation={mockNavigation as any} />,
    );

    expect(
      rendered.getByText('Test Product'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Qty: 2'),
    ).toBeTruthy();

    expect(
      rendered.getAllByText('$100.00').length,
    ).toBeGreaterThan(0);

    expect(
      rendered.getAllByText('$110.00').length,
    ).toBeGreaterThan(0);
  });

  // Test empty cart.
  it('does not continue when cart is empty', async () => {
    mockCurrentCartItems = [];

    const rendered: any = await render(
      <Checkout navigation={mockNavigation as any} />,
    );

    expect(
      rendered.getByText('Your cart is empty.'),
    ).toBeTruthy();

    fireEvent.press(
      rendered.getByText('Continue'),
    );

    expect(
      mockNavigation.navigate,
    ).not.toHaveBeenCalled();
  });

  // Test saved address.
  it('navigates to Payment when address is saved', async () => {
    mockSavedAddress = {
      name: 'Test User',
      phone: '9999999999',
      address: 'Test Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    };

    const rendered: any = await render(
      <Checkout navigation={mockNavigation as any} />,
    );

    fireEvent.press(
      rendered.getByText('Continue'),
    );

    expect(
      mockNavigation.navigate,
    ).toHaveBeenCalledWith('Payment');
  });

  // Test missing address.
  it('navigates to Address when address is missing', async () => {
    const rendered: any = await render(
      <Checkout navigation={mockNavigation as any} />,
    );

    fireEvent.press(
      rendered.getByText('Continue'),
    );

    expect(
      mockNavigation.navigate,
    ).toHaveBeenCalledWith('Address');
  });
});

