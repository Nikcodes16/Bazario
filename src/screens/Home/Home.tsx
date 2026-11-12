import React, {useEffect, useRef, useState} from 'react';

import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import {useSafeAreaInsets, SafeAreaView} from 'react-native-safe-area-context';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import {
  DrawerActions,
  useNavigation,
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  Heart,
  Menu,
  ShoppingCart,
} from 'lucide-react-native';

import ProductCard from '../../components/ProductCard';
import SearchBar from '../../components/SearchBar';

import {
  getProducts,
  Product,
} from '../../services/productApi';

import {RootStackParamList} from '../../navigation/navigationTypes';

import styles from './Home.styles';
import {colors} from '../../theme/colors';
import ProductShimmer from '../../components/ProductShimmer';
import {useCartStore} from '../../store/cartStore';

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const banners = [
  {
    id: '1',
    image: require('../../assets/images/clothingBanner.webp'),
    groupId: 'men',
  },
  {
    id: '2',
    image: require('../../assets/images/elecBanner.webp'),
    groupId: 'electronics',
  },
  {
    id: '3',
    image: require('../../assets/images/furnitureBanner.webp'),
    groupId: 'furniture',
  },
  {
    id: '4',
    image: require('../../assets/images/grocerybanner.webp'),
    groupId: 'grocery',
  },
  {
    id: '5',
    image: require('../../assets/images/2264.webp'),
    groupId: 'beauty',
  },
];

const categories = [
  {
    name: 'Men',
    groupId: 'men',
    image: require('../../assets/images/men.webp'),
  },
  {
    name: 'Women',
    groupId: 'women',
    image: require('../../assets/images/women.webp'),
  },
  {
    name: 'Grocery',
    groupId: 'grocery',
    image: require('../../assets/images/grocery.webp'),
  },
  {
    name: 'Beauty',
    groupId: 'beauty',
    image: require('../../assets/images/beauty.webp'),
  },
  {
    name: 'LifeStyle',
    groupId: 'furniture',
    image: require('../../assets/images/furniture.webp'),
  },
  {
    name: 'Electronics',
    groupId: 'electronics',
    image: require('../../assets/images/electronics.webp'),
  },
];

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

const Home = () => {
  const navigation =
    useNavigation<NavigationProp>();

  const insets = useSafeAreaInsets();

 const {width, height} = useWindowDimensions();



// Responsive product columns
const numColumns = width >= 1000 ? 4 : width >= 650 ? 3 : 2;

// Responsive category dimensions
const categoryItemWidth = width / 5;
const categoryCircleSize = Math.min(54, width / 6.5);

  const cartCount = useCartStore(state =>
    state.items.reduce(
      (total, item) =>
        total + item.quantity,
      0,
    ),
  );

  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(false);

 const [activeBanner, setActiveBanner] = useState(0);

const [bannerWidth, setBannerWidth] = useState(width);

const bannerHeight = bannerWidth * 0.21;

const bannerRef = useRef<FlatList>(null);

  const openDrawer = () => {
    let parent = navigation.getParent();

    while (parent) {
      const state = parent.getState();

      if (state?.type === 'drawer') {
        parent.dispatch(
          DrawerActions.openDrawer(),
        );
        return;
      }

      parent = parent.getParent();
    }
  };

  const openWishlist = () => {
    navigation.navigate('MainTabs', {
      screen: 'Wishlist',
    } as any);
  };

  const openCart = () => {
    navigation.navigate('MainTabs', {
      screen: 'Cart',
    } as any);
  };

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        setError(false);

        const data = await getProducts();

        if (mounted) {
          setProducts(data.products);
        }
      } catch (err) {
        console.log('Products Error:', err);

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
  }, []);

 useEffect(() => {
  const timer = setInterval(() => {
    setActiveBanner(currentIndex => {
      const nextIndex =
        currentIndex === banners.length - 1
          ? 0
          : currentIndex + 1;

      bannerRef.current?.scrollToOffset({
        offset: nextIndex * bannerWidth,
        animated: true,
      });

      return nextIndex;
    });
  }, 30000);

  return () => {
    clearInterval(timer);
  };
}, [bannerWidth]);

  if (loading) {
    return (
      <SafeAreaView
        style={styles.shimmerScreen}
        edges={['top', 'left', 'right']}>

        {/* TOP HEADER */}
        <View style={styles.shimmerTopHeader}>
          <Skeleton style={styles.shimmerIcon} />

          <Skeleton style={styles.shimmerLogo} />

          <View style={styles.shimmerHeaderRight}>
            <Skeleton style={styles.shimmerIcon} />
            <Skeleton style={styles.shimmerIcon} />
          </View>
        </View>

        {/* SEARCH */}
        <View style={styles.shimmerSearchContainer}>
          <Skeleton style={styles.shimmerSearch} />
        </View>

        {/* CATEGORY CIRCLES */}
        <View style={styles.shimmerCategories}>
          {Array.from({length: 6}).map((_, index) => (
            <View
              key={index}
              style={styles.shimmerCategoryItem}>

              <Skeleton style={styles.shimmerCircle} />

              <Skeleton style={styles.shimmerCategoryText} />
            </View>
          ))}
        </View>

        {/* BANNER */}
        <View style={styles.shimmerBannerContainer}>
          <Skeleton style={styles.shimmerBanner} />

          <View style={styles.shimmerDots}>
            <Skeleton style={styles.shimmerDot} />
            <Skeleton style={styles.shimmerDot} />
            <Skeleton style={styles.shimmerDot} />
            <Skeleton style={styles.shimmerDot} />
          </View>
        </View>

        {/* SUGGESTED TITLE */}
        <Skeleton style={styles.shimmerSuggestion} />

        {/* PRODUCTS */}
        <View style={styles.shimmerProducts}>
          {Array.from({length: 6}).map((_, index) => (
            <ProductShimmer key={index} />
          ))}
        </View>

      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={styles.loader}
        edges={['top', 'left', 'right']}>
        <Text style={styles.error}>
          Failed to load products
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.container1}>

        {/* TOP HEADER */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            onPress={openDrawer}
            style={styles.headerButton}>
            <Menu
              size={24}
              color={colors.primary}
              strokeWidth={2.2}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Bazario
          </Text>

          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={openWishlist}
              style={styles.headerButton}>
              <Heart
                size={23}
                color={colors.primary}
                strokeWidth={2.2}
              />
            </TouchableOpacity>

            <View style={styles.cartWrapper}>
              <TouchableOpacity
                onPress={openCart}
                style={styles.headerButton}>
                <ShoppingCart
                  size={23}
                  color={colors.primary}
                  strokeWidth={2.2}
                />
              </TouchableOpacity>

              {cartCount > 0 && (
                <View style={styles.headerCartBadge}>
                  <Text style={styles.headerCartBadgeText}>
                    {cartCount > 99 ? '99+' : cartCount}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* SEARCH + CATEGORIES */}
        <View style={styles.header}>
          <SearchBar
            onPress={() =>
              navigation.navigate('Search', {
                allProducts: products,
              })
            }
            placeholder="Search products..."
          />

          {/* RESPONSIVE CATEGORY CIRCLES */}
         <ScrollView
  horizontal
  showsHorizontalScrollIndicator={false}
  style={styles.categoryScroll}
  contentContainerStyle={styles.circleContainer}
>

            {categories.map(item => (
              <TouchableOpacity
                key={item.groupId}
                style={{
                  width: categoryItemWidth,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 0,
                  paddingHorizontal: 0,
                }}
                onPress={() =>
                  navigation.navigate('Category', {
                    groupId: item.groupId,
                  })
                }>

                <View
                  style={{
                    width: categoryCircleSize,
                    height: categoryCircleSize,
                    borderRadius: categoryCircleSize / 2,
                    overflow: 'hidden',
                  }}>
                  <Image
                    source={item.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      resizeMode: 'cover',
                    }}
                  />
                </View>

                <Text
                  style={styles.circleText}
                  numberOfLines={1}>
                  {item.name}
                </Text>

              </TouchableOpacity>
            ))}

          </ScrollView>
        </View>

        {/* PRODUCTS LIST */}
        <FlashList
            key={`products-${numColumns}`}
          data={products}
           numColumns={numColumns}
          keyExtractor={item =>
            item.id.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          columnWrapperStyle={styles.row}
          estimatedItemSize={200}
          ListHeaderComponent={
            <View>

              {/* BANNER */}
             {/* BANNER */}
<View
  style={styles.bannerContainer}
  onLayout={event => {
    const newWidth = event.nativeEvent.layout.width;

    if (newWidth > 0 && newWidth !== bannerWidth) {
      setBannerWidth(newWidth);
    }
  }}
>
  <FlatList
    ref={bannerRef}
    data={banners}
    horizontal
    pagingEnabled
    decelerationRate="fast"
    showsHorizontalScrollIndicator={false}
    scrollEventThrottle={16}
    keyExtractor={item => item.id}
    renderItem={({item}) => (
      <TouchableOpacity
        activeOpacity={0.9}
       style={[
  styles.banner,
  {
    width: bannerWidth,
    height: bannerHeight,
  },
]}
        onPress={() =>
          navigation.navigate('Category', {
            groupId: item.groupId,
          })
        }
      >
       <Image
  source={item.image}
  style={[
    styles.bannerImage,
    {
      height: bannerHeight,
    },
  ]}
/>
      </TouchableOpacity>
    )}
    onMomentumScrollEnd={event => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / bannerWidth,
      );

      setActiveBanner(index);
    }}
    getItemLayout={(_, index) => ({
      length: bannerWidth,
      offset: bannerWidth * index,
      index,
    })}
  />

  <View style={styles.dotsContainer}>
    {banners.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          activeBanner === index && styles.activeDot,
        ]}
      />
    ))}
  </View>
</View>

              {/* SUGGESTED FOR YOU */}
              <Text style={styles.suggestion}>
                Suggested For You
              </Text>

            </View>
          }
          renderItem={({item}) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  productId: item.id,
                })
              }
            />
          )}
        />

      </View>
    </View>
  );
};

export default Home;