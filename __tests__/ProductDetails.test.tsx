
import React from 'react';

import {
  render,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';

import Toast from 'react-native-toast-message';

import ProductDetails from '../src/screens/ProductDetails/ProductDetails';

import {getProduct} from '../src/services/productApi';

// Mock product API.
jest.mock('../src/services/productApi', () => ({
  getProduct: jest.fn(),
}));

// Mock icons.
jest.mock('lucide-react-native', () => ({
  ArrowLeft: () => null,
  Heart: () => null,
  ShoppingCart: () => null,
  Star: () => null,
  Zap: () => null,
}));

// Mock Toast.
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

// Mock wishlist store.
jest.mock('../src/store/wishlistStore', () => ({
  useWishlistStore: (selector: any) =>
    selector({
      items: [],
      toggleWishlist: jest.fn(),
    }),
}));

// Mock cart store.
const mockAddToCart = jest.fn();

jest.mock('../src/store/cartStore', () => ({
  useCartStore: (selector: any) =>
    selector({
      addToCart: mockAddToCart,
    }),
}));

// Mock product.
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'Test product description',
  category: 'electronics',
  thumbnail: 'https://example.com/product.jpg',
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
};

// Mock navigation.
const navigation = {
  goBack: jest.fn(),
  navigate: jest.fn(),
};

// Mock route.
const route = {
  params: {
    productId: 1,
  },
};

describe('ProductDetails Screen', () => {
  // Reset mocks.
  beforeEach(() => {
    jest.clearAllMocks();

    (getProduct as jest.Mock).mockResolvedValue(
      mockProduct,
    );
  });

  // Test product loading.
  it('loads and displays product details', async () => {
    const rendered = await render(
      <ProductDetails
        navigation={navigation as any}
        route={route as any}
      />,
    );

    await waitFor(() => {
      expect(
        rendered.getByText('Test Product'),
      ).toBeTruthy();
    });

    expect(
      rendered.getByText('$29.99'),
    ).toBeTruthy();

    expect(getProduct).toHaveBeenCalledWith(1);
  });

  // Test add to cart.
  it('adds product to cart', async () => {
    const rendered = await render(
      <ProductDetails
        navigation={navigation as any}
        route={route as any}
      />,
    );

    await waitFor(() => {
      expect(
        rendered.getByTestId('add-to-cart-button'),
      ).toBeTruthy();
    });

    fireEvent.press(
      rendered.getByTestId('add-to-cart-button'),
    );

    expect(
      mockAddToCart,
    ).toHaveBeenCalledWith(mockProduct);

    expect(
      Toast.show,
    ).toHaveBeenCalled();
  });

  // Test buy now.
  it('adds product and navigates to Checkout', async () => {
    const rendered = await render(
      <ProductDetails
        navigation={navigation as any}
        route={route as any}
      />,
    );

    await waitFor(() => {
      expect(
        rendered.getByTestId('buy-now-button'),
      ).toBeTruthy();
    });

    fireEvent.press(
      rendered.getByTestId('buy-now-button'),
    );

    expect(
      mockAddToCart,
    ).toHaveBeenCalledWith(mockProduct);

    expect(
      navigation.navigate,
    ).toHaveBeenCalledWith('Checkout');
  });

  // Test API error.
  it('shows error when product loading fails', async () => {
    (getProduct as jest.Mock).mockRejectedValue(
      new Error('API error'),
    );

    const rendered = await render(
      <ProductDetails
        navigation={navigation as any}
        route={route as any}
      />,
    );

    await waitFor(() => {
      expect(
        rendered.getByText(
          'Unable to load product.',
        ),
      ).toBeTruthy();
    });
  });
});

