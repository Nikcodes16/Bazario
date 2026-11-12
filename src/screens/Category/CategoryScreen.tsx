
import React, {useEffect, useState} from 'react';
import {
  
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChevronLeft, ShoppingCart} from 'lucide-react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RouteProp} from '@react-navigation/native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ProductShimmer from '../../components/ProductShimmer';
import BackgroundGradient from '../../components/BackgroundGradient';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';

import {
  getProductsByCategory,
  Product,
} from '../../services/productApi';

import {RootStackParamList} from '../../navigation/navigationTypes';
import {colors} from '../../theme/colors';
import {useCartStore} from '../../store/cartStore';
import styles from './Cartegory.styles';

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type CategoryRouteProp =
  RouteProp<RootStackParamList, 'Category'>;

type CategoryItem = {
  name: string;
  slug: string;
  image: any;
};

type CategoryGroup = {
  title: string;
  banner: any;
  categories: CategoryItem[];
};
const Skeleton = ({style}: {style?: any}) => {
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      style={style}
      shimmerColors={[
        'rgba(255,255,255,0.18)',
        'rgba(255,255,255,0.40)',
        'rgba(255,255,255,0.18)',
      ]}
    />
  );
};
const categoryGroups: Record<string, CategoryGroup> = {
  men: {
    title: 'Men',
    banner: require('../../assets/images/clothingBanner.webp'),
    categories: [
      {
        name: 'Shirts',
        slug: 'mens-shirts',
        image: require('../../assets/images/shirt.webp'),
      },
      {
        name: 'Shoes',
        slug: 'mens-shoes',
        image: require('../../assets/images/shoes.webp'),
      },
      {
        name: 'Watches',
        slug: 'mens-watches',
        image: require('../../assets/images/watch.webp'),
      },
      {
        name: 'Sunglasses',
        slug: 'sunglasses',
       image: require('../../assets/images/sunglasses.webp'),
      },
    ],
  },

  women: {
    title: 'Women',
    banner: require('../../assets/images/clothingBanner.webp'),
    categories: [
      {
        name: 'Bags',
        slug: 'womens-bags',
        image: require('../../assets/images/bag.webp'),
      },
      {
        name: 'Dresses',
        slug: 'womens-dresses',
       image: require('../../assets/images/dresses.webp'),
      },
      {
        name: 'Jewellery',
        slug: 'womens-jewellery',
       image: require('../../assets/images/jewellery.webp'),
      },
      {
        name: 'Shoes',
        slug: 'womens-shoes',
       image: require('../../assets/images/womenShoes.webp'),
      },
      {
        name: 'Watches',
        slug: 'womens-watches',
       image: require('../../assets/images/womenWatch.webp'),
      },
      {
        name: 'Sunglasses',
        slug: 'sunglasses',
       image: require('../../assets/images/sunglasses.webp'),
      },
    ],
  },

  electronics: {
    title: 'Electronics',
    banner: require('../../assets/images/elecBanner.webp'),
    categories: [
      {
        name: 'Smartphones',
        slug: 'smartphones',
       image: require('../../assets/images/phone.webp'),
      },
      {
        name: 'Laptops',
        slug: 'laptops',
        image: require('../../assets/images/laptop.webp'),
      },
      {
        name: 'Tablets',
        slug: 'tablets',
        image: require('../../assets/images/tablet.webp'),
      },
      {
        name: 'Accessories',
        slug: 'mobile-accessories',
      image: require('../../assets/images/accessories.webp'),
      },
    ],
  },

  beauty: {
    title: 'Beauty',
    banner: require('../../assets/images/clothingBanner.webp'),
    categories: [
      {
        name: 'MakeUp',
        slug: 'beauty',
        image: require('../../assets/images/makeup.webp'),
      },
      {
        name: 'Fragrances',
        slug: 'fragrances',
       image: require('../../assets/images/fragrance.webp'),
      },
      {
        name: 'Skin Care',
        slug: 'skin-care',
       image: require('../../assets/images/skincare.webp'),
      },
    ],
  },

  grocery: {
    title: 'Grocery',
    banner: require('../../assets/images/grocery.webp'),
    categories: [
      {
        name: 'Groceries',
        slug: 'groceries',
        image: require('../../assets/images/grocery.webp'),
      },
    ],
  },

  furniture: {
    title: 'Home & Lifestyle',
    banner: require('../../assets/images/furnitureBanner.webp'),
    categories: [
      {
        name: 'Furniture',
        slug: 'furniture',
        image: require('../../assets/images/furniture.webp'),
      },
      {
        name: 'Home Decoration',
        slug: 'home-decoration',
        image: require('../../assets/images/homedecor.webp'),
      },
      {
        name: 'Kitchen Accessories',
        slug: 'kitchen-accessories',
        image: require('../../assets/images/kitchen.webp'),
      },
    ],
  },
};

const CategoryScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CategoryRouteProp>();

  const groupId = route.params?.groupId || 'men';
  const group =
    categoryGroups[groupId] || categoryGroups.men;

  const [categoryProducts, setCategoryProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

  const cartCount = useCartStore(state =>
    state.items.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    ),
  );

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const firstCategory =
          group.categories[0]?.slug;

        if (!firstCategory) {
          if (mounted) {
            setCategoryProducts([]);
            setLoading(false);
          }
          return;
        }

        const data =
          await getProductsByCategory(
            firstCategory,
          );

        if (mounted) {
          setCategoryProducts(data.products);
        }
      } catch (err) {
        console.log(
          'Category Products Error:',
          err,
        );

        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      mounted = false;
    };
  }, [groupId]);

  const openCart = () => {
    navigation.navigate('MainTabs', {
      screen: 'Cart',
    } as any);
  };

  const openProduct = (productId: number) => {
    navigation.navigate(
      'ProductDetails',
      {
        productId,
      },
    );
  };

  const openCategory = (
    category: CategoryItem,
  ) => {
    navigation.navigate(
      'ProductListing',
      {
        category: category.slug,
        categoryName: category.name,
      },
    );
  };

if (loading) {
  return (
    <View style={styles.container}>
      <BackgroundGradient />

      <SafeAreaView
        style={styles.content}
        edges={['top', 'left', 'right']}>

        {/* HEADER SHIMMER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Skeleton style={styles.shimmerBackButton} />

            <Skeleton style={styles.shimmerTitle} />
          </View>

          <Skeleton style={styles.shimmerCartButton} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.shimmerScrollContent}>

          {/* SEARCH SHIMMER */}
          <Skeleton style={styles.shimmerSearch} />

          {/* BANNER SHIMMER */}
          <Skeleton style={styles.shimmerBanner} />

          {/* SHOP BY CATEGORY */}
          <Skeleton style={styles.shimmerSectionTitle} />

          {/* CATEGORY CIRCLES */}
          <View style={styles.shimmerCategoryRow}>
            {Array.from({length: 5}).map((_, index) => (
              <View
                key={index}
                style={styles.shimmerCategoryItem}>

                <Skeleton style={styles.shimmerCategoryCircle} />

                <Skeleton style={styles.shimmerCategoryName} />
              </View>
            ))}
          </View>

          {/* POPULAR HEADER */}
          <View style={styles.shimmerSectionHeader}>
            <Skeleton style={styles.shimmerPopularTitle} />
            <Skeleton style={styles.shimmerSeeAll} />
          </View>

          {/* POPULAR PRODUCTS */}
          <View style={styles.shimmerProductRow}>
            {Array.from({length: 4}).map((_, index) => (
              <View
                key={index}
                style={styles.productItem}>
                <ProductShimmer />
              </View>
            ))}
          </View>

          {/* YOU MAY ALSO LIKE */}
          <Skeleton style={styles.shimmerSectionTitle} />

          <View style={styles.shimmerProductRow}>
            {Array.from({length: 4}).map((_, index) => (
              <View
                key={index}
                style={styles.productItem}>
                <ProductShimmer />
              </View>
            ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

  if (error) {
    return (
      <View style={styles.container}>
        <BackgroundGradient />

        <SafeAreaView
          style={styles.loader}
          edges={[
            'top',
            'left',
            'right',
          ]}>
          <Text style={styles.error}>
            Failed to load products
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackgroundGradient />

      <SafeAreaView
        style={styles.content}
        edges={[
          'top',
          'left',
          'right',
        ]}>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.backButton}
              onPress={() =>
                navigation.goBack()
              }>
              <ChevronLeft
                size={21}
                color="#FFFFFF"
                strokeWidth={2.5}
              />
            </TouchableOpacity>

            <Text style={styles.title}>
              {group.title}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.cartButton}
            onPress={openCart}>
            <ShoppingCart
              size={22}
              color={colors.primary}
              strokeWidth={2.3}
            />

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text
                  style={
                    styles.cartBadgeText
                  }>
                  {cartCount > 99
                    ? '99+'
                    : cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }>

          <SearchBar
            placeholder={`Search in ${group.title}...`}
            onPress={() =>
              navigation.navigate(
                'Search',
                {
                  allProducts:
                    categoryProducts,
                } as any,
              )
            }
          />

          <View
            style={
              styles.bannerContainer
            }>
            <Image
              source={group.banner}
              style={styles.banner}
              resizeMode="cover"
            />
          </View>

          <Text
            style={styles.sectionTitle}>
            Shop by Category
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.categoryRow
            }>

            {group.categories.map(
              category => (
                <TouchableOpacity
                  key={category.slug}
                  style={
                    styles.categoryItem
                  }
                  activeOpacity={0.8}
                  onPress={() =>
                    openCategory(category)
                  }>

                  <View
                    style={
                      styles.categoryCircle
                    }>
                    <Image
                      source={
                        category.image
                      }
                      style={
                        styles.categoryImage
                      }
                      resizeMode="cover"
                    />
                  </View>

                <Text
  style={styles.categoryName}
  numberOfLines={1}
  ellipsizeMode="tail">
  {category.name}
</Text>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>

          <View
            style={styles.sectionHeader}>
            <Text
              style={styles.sectionTitle}>
              Popular in {group.title}
            </Text>

            <TouchableOpacity
              onPress={() =>
                openCategory(
                  group.categories[0],
                )
              }>
              <Text
                style={styles.seeAll}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={styles.productRow}>
            {categoryProducts
              .slice(0, 4)
              .map(product => (
                <View
                  key={product.id}
                  style={
                    styles.productItem
                  }>
                  <ProductCard
                    product={product}
                    onPress={() =>
                      openProduct(
                        product.id,
                      )
                    }
                  />
                </View>
              ))}
          </View>

          <Text
            style={styles.sectionTitle}>
            You May Also Like
          </Text>

          <View
            style={styles.productRow}>
            {categoryProducts
              .slice(4, 8)
              .map(product => (
                <View
                  key={product.id}
                  style={
                    styles.productItem
                  }>
                  <ProductCard
                    product={product}
                    onPress={() =>
                      openProduct(
                        product.id,
                      )
                    }
                  />
                </View>
              ))}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};



export default CategoryScreen;

