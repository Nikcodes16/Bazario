import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ChevronLeft,
  SlidersHorizontal,
  ShoppingCart,
} from 'lucide-react-native';

import {
  getProductsByCategory,
  Product,
} from '../../services/productApi';

import ProductShimmer from '../../components/ProductShimmer';
import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';

import {useCartStore} from '../../store/cartStore';
import {colors} from '../../theme/colors';

import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  navigation: any;
  route: any;
};


const Skeleton = ({style}: {style?: any}) => {
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      shimmerColors={['#E8EEF2', '#F7FAFC', '#E8EEF2']}
      duration={1200}
      style={style}
    />
  );
};


const ProductListingScreen = ({
  navigation,
  route,
}: Props) => {
  const category = route?.params?.category || '';

  const categoryName =
    route?.params?.categoryName || category;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  const cartCount = useCartStore(state =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  const loadProducts = useCallback(async () => {
    if (!category) {
      setProducts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response =
        await getProductsByCategory(category);

      setProducts(response.products);
    } catch (err) {
      console.error('Products error:', err);

      setError('Unable to load products.');
    } finally {
      setLoading(false);
    }
  }, [category]);


  useEffect(() => {
    loadProducts();
  }, [loadProducts]);


  const openCart = () => {
    navigation.navigate('MainTabs', {
      screen: 'Cart',
    });
  };


  const openProduct = (productId: number) => {
    navigation.navigate('ProductDetails', {
      productId,
    });
  };

  const openSearch = () => {
    navigation.navigate('Search', {
      allProducts: products,
    });
  };


  const renderProduct = ({
    item,
  }: {
    item: Product;
  }) => {
    return (
      <View style={styles.productItem}>
        <ProductCard
          product={item}
          onPress={() => openProduct(item.id)}
        />
      </View>
    );
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>

          {/* Back Button */}
          <Skeleton
            style={styles.shimmerBackButton}
          />

          {/* Search */}
          <Skeleton
            style={styles.shimmerSearch}
          />

          {/* Cart */}
          <Skeleton
            style={styles.shimmerCart}
          />

        </View>

        <View style={styles.shimmerFilterRow}>

          <Skeleton
            style={styles.shimmerFilter}
          />

          <Skeleton
            style={styles.shimmerFilter}
          />

          <Skeleton
            style={styles.shimmerFilter}
          />

          <Skeleton
            style={styles.shimmerFilterIcon}
          />

        </View>

        <View style={styles.shimmerResultRow}>

          <Skeleton
            style={styles.shimmerResult}
          />

        </View>

       <View style={styles.shimmerContainer}>
  {Array.from({length: 6}).map((_, index) => (
    <View key={index} style={styles.shimmerProductItem}>
      <ProductShimmer />
    </View>
  ))}
</View>

      </SafeAreaView>
    );
  }


  if (error) {
    return (
      <SafeAreaView style={styles.center}>

        <Text style={styles.error}>
          {error}
        </Text>

        <TouchableOpacity
          style={styles.retry}
          activeOpacity={0.8}
          onPress={loadProducts}>
          <Text style={styles.retryText}>
            Retry
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>



      <View style={styles.header}>

        {/* Back */}

        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>

          <ChevronLeft
            size={22}
            color="white"
            strokeWidth={2.5}
          />

        </TouchableOpacity>

        {/* Search */}

        <View style={styles.searchWrapper}>

          <SearchBar
            placeholder={`Search in ${categoryName}...`}
            onPress={openSearch}
          />

        </View>

        {/* Cart */}

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

              <Text style={styles.cartBadgeText}>
                {cartCount > 99
                  ? '99+'
                  : cartCount}
              </Text>

            </View>
          )}

        </TouchableOpacity>

      </View>

 

      <View style={styles.filterRow}>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterButton}>

          <Text style={styles.filterText}>
            Price
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterButton}>

          <Text style={styles.filterText}>
            Rating
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterButton}>

          <Text style={styles.filterText}>
            Sort
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.filterIconButton}>

          <SlidersHorizontal
            size={17}
            color={colors.primary}
            strokeWidth={2.2}
          />

        </TouchableOpacity>

      </View>


      <View style={styles.resultRow}>

        <Text style={styles.resultText}>
          {products.length} Products
        </Text>

      </View>


      {products.length === 0 ? (

        <View style={styles.emptyContainer}>

          <Text style={styles.emptyTitle}>
            No products found
          </Text>

          <Text style={styles.emptyText}>
            There are no products available in this
            category.
          </Text>

        </View>

      ) : (


        <FlatList
          data={products}
          keyExtractor={item =>
            item.id.toString()
          }
          renderItem={renderProduct}
          numColumns={2}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />

      )}

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#EAF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#D9EDF8',
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  searchWrapper: {
    flex: 1,
    marginLeft: 5,
  },

  cartButton: {
    width: 40,
    height: 40,
    marginLeft: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 3,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#EAF6FF',
  },

  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },

  /* =========================
     FILTER
  ========================= */

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  filterButton: {
    flex: 1,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.primary,
  },

  filterIconButton: {
    width: 38,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* =========================
     RESULT
  ========================= */

  resultRow: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },

  resultText: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#777777',
  },

  /* =========================
     PRODUCT LIST
  ========================= */

  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 5,
  },

  row: {
    justifyContent: 'space-between',
  },

  productItem: {
    width: '48%',
    marginBottom: 15,
  },

  /* =========================
     CENTER
  ========================= */

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  /* =========================
     ERROR
  ========================= */

  error: {
    fontSize: 15,
    color: '#D33D3D',
    fontFamily: 'Poppins-Medium',
  },

  retry: {
    marginTop: 15,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },

  retryText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },

  /* =========================
     EMPTY
  ========================= */

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
  },

  emptyText: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: '#777777',
    textAlign: 'center',
  },

  /* =========================
     SHIMMER
  ========================= */

  shimmerBackButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },

  shimmerSearch: {
    flex: 1,
    height: 40,
    borderRadius: 20,
  },

  shimmerCart: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },

  shimmerFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },

  shimmerFilter: {
    flex: 1,
    height: 36,
    borderRadius: 18,
  },

  shimmerFilterIcon: {
    width: 38,
    height: 36,
    borderRadius: 18,
  },

  shimmerResultRow: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },

  shimmerResult: {
    width: 90,
    height: 15,
    borderRadius: 5,
  },
  shimmerProductItem: {
  width: '48%',
  marginBottom: 15,
},

  shimmerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },

});

export default ProductListingScreen;