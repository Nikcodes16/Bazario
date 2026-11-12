
import React from 'react';

import {
  render,
  fireEvent,
} from '@testing-library/react-native';

import OrderSuccess from '../src/screens/Orders/OrderSuccess';

// Mock icons.
jest.mock('lucide-react-native', () => ({
  Check: () => null,
  Home: () => null,
  ShoppingBag: () => null,
}));

// Mock navigation.
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock route params.
const mockRoute = {
  params: {
    addressData: {
      name: 'Test User',
      phone: '9999999999',
      address: 'Test Street',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
    },
    paymentMethod: 'cod',
    total: 110,
  },
};

describe('OrderSuccess Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test success message.
  it('shows success message and order details', async () => {
    const rendered: any = await render(
      <OrderSuccess
        navigation={mockNavigation}
        route={mockRoute}
      />,
    );

    expect(
      rendered.getByText('Order Placed Successfully!'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Order Details'),
    ).toBeTruthy();

    expect(
      rendered.getAllByText('$110.00').length,
    ).toBeGreaterThan(0);
  });

  // Test address and payment.
  it('shows delivery address and payment method', async () => {
    const rendered: any = await render(
      <OrderSuccess
        navigation={mockNavigation}
        route={mockRoute}
      />,
    );

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
      rendered.getByText('Delivery Address'),
    ).toBeTruthy();
  });

  // Test orders navigation.
  it('navigates to Orders', async () => {
    const rendered: any = await render(
      <OrderSuccess
        navigation={mockNavigation}
        route={mockRoute}
      />,
    );

    fireEvent.press(
      rendered.getByText('My Orders'),
    );

    expect(
      mockNavigation.navigate,
    ).toHaveBeenCalledWith('Orders');
  });

  // Test continue shopping.
  it('navigates to Home when continuing shopping', async () => {
    const rendered: any = await render(
      <OrderSuccess
        navigation={mockNavigation}
        route={mockRoute}
      />,
    );

    fireEvent.press(
      rendered.getByText('Continue Shopping'),
    );

    expect(
      mockNavigation.navigate,
    ).toHaveBeenCalledWith(
      'MainTabs',
      {
        screen: 'Home',
      },
    );
  });
});

