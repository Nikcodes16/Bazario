
import React from 'react';

import {
  render,
  fireEvent,
} from '@testing-library/react-native';

import Home from '../src/screens/Home/Home';

// Mock icons.
jest.mock('lucide-react-native', () => ({}));

// Mock FlashList.
jest.mock('@shopify/flash-list', () => {
  const React = require('react');

  return {
    FlashList: ({data, renderItem}: any) => (
      <>
        {data.map((item: any) => (
          <React.Fragment key={item.id}>
            {renderItem({item})}
          </React.Fragment>
        ))}
      </>
    ),
  };
});

// Mock background.
jest.mock('../src/components/BackgroundGradient', () => () => null);

// Mock SearchBar.
jest.mock('../src/components/SearchBar', () => {
  const {Text} = require('react-native');

  return ({onPress, placeholder}: any) => (
    <Text onPress={onPress}>{placeholder}</Text>
  );
});

// Mock ProductCard.
jest.mock('../src/components/ProductCard', () => {
  const {Text} = require('react-native');

  return ({product, onPress}: any) => (
    <Text onPress={onPress}>{product.title}</Text>
  );
});

// Mock product API.
jest.mock('../src/services/productApi', () => ({
  getProducts: jest.fn(),
}));

const mockGetProducts = jest.requireMock(
  '../src/services/productApi',
).getProducts;

// Mock navigation.
jest.mock('@react-navigation/native', () => {
  const mockNavigate = jest.fn();

  return {
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

const mockNavigation = jest.requireMock(
  '@react-navigation/native',
).useNavigation();

const mockProducts = [
  {
    id: 1,
    title: 'Test Product',
    price: 50,
  },
  {
    id: 2,
    title: 'Another Product',
    price: 100,
  },
];

describe('Home Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test loading state.
  it('shows loading state while products load', async () => {
    mockGetProducts.mockReturnValue(
      new Promise(() => {}),
    );

    const rendered: any = await render(<Home />);

    expect(
      rendered.queryByText('Test Product'),
    ).toBeNull();

    expect(
      rendered.queryByText('Failed to load products'),
    ).toBeNull();
  });

  // Test products display.
  it('loads and shows products', async () => {
    mockGetProducts.mockResolvedValue({
      products: mockProducts,
    });

    const rendered: any = await render(<Home />);

    expect(
      await rendered.findByText('Test Product'),
    ).toBeTruthy();

    expect(
      rendered.getByText('Another Product'),
    ).toBeTruthy();

    expect(mockGetProducts).toHaveBeenCalled();
  });

  // Test API error.
  it('shows error when products fail to load', async () => {
    mockGetProducts.mockRejectedValue(
      new Error('API Error'),
    );

    const rendered: any = await render(<Home />);

    expect(
      await rendered.findByText('Failed to load products'),
    ).toBeTruthy();
  });

  // Test navigation.
  it('navigates to Search and Product Details', async () => {
    mockGetProducts.mockResolvedValue({
      products: mockProducts,
    });

    const rendered: any = await render(<Home />);

    expect(
      await rendered.findByText('Test Product'),
    ).toBeTruthy();

    await fireEvent.press(
      rendered.getByText('Search products...'),
    );

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'Search',
      {
        allProducts: mockProducts,
      },
    );

    await fireEvent.press(
      rendered.getByText('Test Product'),
    );

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'ProductDetails',
      {
        productId: 1,
      },
    );
  });
});

