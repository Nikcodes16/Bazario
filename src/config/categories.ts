export type CategoryGroup = {
  id: string;
  name: string;
  categories: string[];
};

export const categoryGroups: CategoryGroup[] = [
  {
    id: 'men',
    name: 'Men',
    categories: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  },
  {
    id: 'women',
    name: 'Women',
    categories: [
      'womens-bags',
      'womens-dresses',
      'womens-jewellery',
      'womens-shoes',
      'womens-watches',
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    categories: [
      'smartphones',
      'laptops',
      'tablets',
      'mobile-accessories',
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty',
    categories: ['beauty', 'fragrances', 'skin-care'],
  },
  {
    id: 'grocery',
    name: 'Grocery',
    categories: ['groceries'],
  },
];