import api from './api';

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
};

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await api.get('/products');

  return response.data;
};

export const getProduct = async (
  id: number,
): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data;
};

export const searchProducts = async (
  query: string,
): Promise<ProductsResponse> => {
  const response = await api.get('/products/search', {
    params: {
      q: query.trim(),
    },
  });

  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await api.get('/products/category-list');

  return response.data;
};

export const getProductsByCategory = async (
  category: string,
): Promise<ProductsResponse> => {
  const response = await api.get(
    `/products/category/${category}`,
  );

  return response.data;
};