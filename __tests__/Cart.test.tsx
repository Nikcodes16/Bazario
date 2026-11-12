
import React from 'react';
import { Alert } from 'react-native';

import {
  render,
  fireEvent,
} from '@testing-library/react-native';

// Mock icons to avoid rendering icon components.
jest.mock('lucide-react-native', () => ({
  Minus: () => null,
  Plus: () => null,
  Trash2: () => null,
}));

// Mock cart store actions.
const mockIncreaseQuantity = jest.fn();
const mockDecreaseQuantity = jest.fn();
const mockRemoveFromCart = jest.fn();
const mockClearCart = jest.fn();

// Mock product data.
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test product description',
  category: 'test',
  thumbnail: 'https://example.com/test.jpg',
  quantity: 2,
};

// Mock second product for multiple-item tests.
const mockProduct2 = {
  id: 2,
  title: 'Second Product',
  price: 10.5,
  description: 'Second product description',
  category: 'test',
  thumbnail: 'https://example.com/test2.jpg',
  quantity: 3,
};

// Store mock cart items.
let mockCartItems = [mockProduct];

// Mock the cart store.
jest.mock('../src/store/cartStore', () => ({
  useCartStore: (selector: any) =>
    selector({
      items: mockCartItems,
      increaseQuantity: mockIncreaseQuantity,
      decreaseQuantity: mockDecreaseQuantity,
      removeFromCart: mockRemoveFromCart,
      clearCart: mockClearCart,
    }),
}));

import Cart from '../src/screens/Cart/Cart';

describe('Cart Screen', () => {
  // Mock navigation object.
  const navigation = {
    navigate: jest.fn(),
  };

  // Reset data and mocks before each test.
  beforeEach(() => {
    mockCartItems = [mockProduct];
    jest.clearAllMocks();
  });

  // Test that Cart renders successfully.
  it('renders Cart screen successfully', async () => {
    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(rendered).toBeTruthy();
  });

  // Test that Cart header is displayed.
  it('displays Cart header', async () => {
    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('Cart'),
    ).toBeTruthy();
  });

  // Test that product title is displayed.
  it('shows product when cart has an item', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('Test Product'),
    ).toBeTruthy();
  });

  // Test that product price is displayed.
  it('shows product price', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('$29.99'),
    ).toBeTruthy();
  });

  // Test that product quantity is displayed.
  it('shows product quantity', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('2'),
    ).toBeTruthy();
  });

  // Test plural item count.
  it('shows correct plural item count', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getAllByText('2 items').length,
    ).toBeGreaterThan(0);
  });

  // Test singular item count.
  it('shows singular item when total quantity is 1', async () => {
    mockCartItems = [
      {
        ...mockProduct,
        quantity: 1,
      },
    ];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getAllByText('1 item').length,
    ).toBeGreaterThan(0);

    expect(
      rendered.queryByText('1 items'),
    ).toBeNull();
  });

  // Test empty cart state.
  it('shows empty cart state when cart has no items', async () => {
    mockCartItems = [];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('Your cart is empty'),
    ).toBeTruthy();

    expect(
      rendered.getByText(
        'Add some products to your cart and they will appear here.',
      ),
    ).toBeTruthy();
  });

  // Test that item count is hidden for empty cart.
  it('does not show item count when cart is empty', async () => {
    mockCartItems = [];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.queryByText('0 items'),
    ).toBeNull();

    expect(
      rendered.queryByText('0 item'),
    ).toBeNull();
  });

  // Test that Clear All is displayed.
  it('shows Clear All button when cart has items', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByTestId('clear-cart'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Clear All'),
    ).toBeTruthy();
  });

  // Test that Clear All is hidden for empty cart.
  it('does not show Clear All button when cart is empty', async () => {
    mockCartItems = [];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.queryByTestId('clear-cart'),
    ).toBeNull();

    expect(
      rendered.queryByText('Clear All'),
    ).toBeNull();
  });

  // Test increase quantity button.
  it('calls increaseQuantity when plus button is pressed', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    const plusButton =
      rendered.getByTestId('increase-1');

    fireEvent.press(plusButton);

    expect(
      mockIncreaseQuantity,
    ).toHaveBeenCalledTimes(1);

    expect(
      mockIncreaseQuantity,
    ).toHaveBeenCalledWith(1);
  });

  // Test decrease quantity button.
  it('calls decreaseQuantity when minus button is pressed', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    const minusButton =
      rendered.getByTestId('decrease-1');

    fireEvent.press(minusButton);

    expect(
      mockDecreaseQuantity,
    ).toHaveBeenCalledTimes(1);

    expect(
      mockDecreaseQuantity,
    ).toHaveBeenCalledWith(1);
  });

  // Test remove product button.
  it('calls removeFromCart when remove button is pressed', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    const removeButton =
      rendered.getByTestId('remove-1');

    fireEvent.press(removeButton);

    expect(
      mockRemoveFromCart,
    ).toHaveBeenCalledTimes(1);

    expect(
      mockRemoveFromCart,
    ).toHaveBeenCalledWith(1);
  });

  // Test checkout section visibility.
  it('shows checkout section when cart has items', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('Total'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Proceed to Checkout'),
    ).toBeTruthy();
  });

  // Test checkout section is hidden when empty.
  it('does not show checkout section when cart is empty', async () => {
    mockCartItems = [];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.queryByText('Proceed to Checkout'),
    ).toBeNull();

    expect(
      rendered.queryByText('Total'),
    ).toBeNull();
  });

  // Test total calculation for one product.
  it('calculates and displays total correctly', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('$59.98'),
    ).toBeTruthy();
  });

  // Test total calculation for multiple products.
  it('calculates total correctly for multiple products', async () => {
    mockCartItems = [
      mockProduct,
      mockProduct2,
    ];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('$91.48'),
    ).toBeTruthy();
  });

  // Test total quantity for multiple products.
  it('calculates total item quantity correctly for multiple products', async () => {
    mockCartItems = [
      mockProduct,
      mockProduct2,
    ];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getAllByText('5 items').length,
    ).toBeGreaterThan(0);
  });

  // Test that multiple products are rendered.
  it('renders multiple cart products', async () => {
    mockCartItems = [
      mockProduct,
      mockProduct2,
    ];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('Test Product'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Second Product'),
    ).toBeTruthy();
  });

  // Test second product price.
  it('renders second product price correctly', async () => {
    mockCartItems = [
      mockProduct,
      mockProduct2,
    ];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    expect(
      rendered.getByText('$10.5'),
    ).toBeTruthy();
  });

  // Test increase button for second product.
  it('calls increaseQuantity with correct id for second product', async () => {
    mockCartItems = [
      mockProduct,
      mockProduct2,
    ];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    const plusButton =
      rendered.getByTestId('increase-2');

    fireEvent.press(plusButton);

    expect(
      mockIncreaseQuantity,
    ).toHaveBeenCalledTimes(1);

    expect(
      mockIncreaseQuantity,
    ).toHaveBeenCalledWith(2);
  });

  // Test decrease button for second product.
  it('calls decreaseQuantity with correct id for second product', async () => {
    mockCartItems = [
      mockProduct,
      mockProduct2,
    ];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    const minusButton =
      rendered.getByTestId('decrease-2');

    fireEvent.press(minusButton);

    expect(
      mockDecreaseQuantity,
    ).toHaveBeenCalledTimes(1);

    expect(
      mockDecreaseQuantity,
    ).toHaveBeenCalledWith(2);
  });

  // Test remove button for second product.
  it('calls removeFromCart with correct id for second product', async () => {
    mockCartItems = [
      mockProduct,
      mockProduct2,
    ];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    const removeButton =
      rendered.getByTestId('remove-2');

    fireEvent.press(removeButton);

    expect(
      mockRemoveFromCart,
    ).toHaveBeenCalledTimes(1);

    expect(
      mockRemoveFromCart,
    ).toHaveBeenCalledWith(2);
  });

  // Test clear cart confirmation alert.
  it('shows clear cart confirmation alert', async () => {
    mockCartItems = [mockProduct];

    const alertSpy = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(() => {});

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    const clearButton =
      rendered.getByTestId('clear-cart');

    fireEvent.press(clearButton);

    expect(
      alertSpy,
    ).toHaveBeenCalledTimes(1);

    expect(
      alertSpy.mock.calls[0][0],
    ).toBe('Clear Cart');

    expect(
      alertSpy.mock.calls[0][1],
    ).toBe(
      'Are you sure you want to remove all items?',
    );

    alertSpy.mockRestore();
  });

  // Test clear cart confirmation action.
  it('calls clearCart when clear cart is confirmed', async () => {
    mockCartItems = [mockProduct];

    const alertSpy = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(() => {});

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    fireEvent.press(
      rendered.getByTestId('clear-cart'),
    );

    const buttons =
      alertSpy.mock.calls[0][2];

    const confirmButton =
      buttons?.find(
        button => button.text === 'Clear',
      );

    expect(confirmButton).toBeTruthy();

    confirmButton?.onPress?.();

    expect(
      mockClearCart,
    ).toHaveBeenCalledTimes(1);

    alertSpy.mockRestore();
  });

  // Test that cancelling clear does not clear cart.
  it('does not call clearCart when clear cart is cancelled', async () => {
    mockCartItems = [mockProduct];

    const alertSpy = jest
      .spyOn(Alert, 'alert')
      .mockImplementation(() => {});

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    fireEvent.press(
      rendered.getByTestId('clear-cart'),
    );

    const buttons =
      alertSpy.mock.calls[0][2];

    const cancelButton =
      buttons?.find(
        button => button.text === 'Cancel',
      );

    expect(cancelButton).toBeTruthy();

    cancelButton?.onPress?.();

    expect(
      mockClearCart,
    ).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  // Test checkout navigation.
  it('navigates to Checkout when checkout button is pressed', async () => {
    mockCartItems = [mockProduct];

    const rendered = await render(
      <Cart
        navigation={navigation as any}
        route={{} as any}
      />,
    );

    const checkoutButton =
      rendered.getByText(
        'Proceed to Checkout',
      );

    fireEvent.press(checkoutButton);

    expect(
      navigation.navigate,
    ).toHaveBeenCalledTimes(1);

    expect(
      navigation.navigate,
    ).toHaveBeenCalledWith(
      'Checkout',
    );
  });
});

