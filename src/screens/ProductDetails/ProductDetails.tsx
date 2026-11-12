import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Banknote,
  ChevronLeft,
  Heart,
  MapPin,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import SearchBar from '../../components/SearchBar';
import {getProduct, Product} from '../../services/productApi';
import {useWishlistStore} from '../../store/wishlistStore';
import {useCartStore} from '../../store/cartStore';
import {RootStackParamList} from '../../navigation/navigationTypes';

import {colors} from '../../theme/colors';
import styles from './ProductDetals.styles';
import {usdToInr} from '../../utils/currency';
import ProductShimmer from '../../components/ProductShimmer';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
type Props = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetails'
>;
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
const ProductDetails = ({navigation, route}: Props) => {
  const productId = route.params?.productId;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const wishlistItems = useWishlistStore(
    state => state.items,
  );

  const toggleWishlist = useWishlistStore(
    state => state.toggleWishlist,
  );

  const addToCart = useCartStore(
    state => state.addToCart,
  );

  const cartCount = useCartStore(state =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  const isWishlisted = product
    ? wishlistItems.some(item => item.id === product.id)
    : false;

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setError('Product not found.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const data = await getProduct(productId);
        setProduct(data);
      } catch (err) {
        console.error('Product details error:', err);
        setError('Unable to load product.');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const openCart = () => {
    navigation.navigate('MainTabs', {
      screen: 'Cart',
    } as any);
  };

  const handleWishlist = () => {
    if (!product) {
      return;
    }

    toggleWishlist(product);

    Toast.show({
      type: 'success',
      text1: isWishlisted
        ? 'Removed from Wishlist'
        : 'Added to Wishlist',
      position: 'bottom',
    });
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    addToCart(product);

    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: product.title,
      position: 'bottom',
    });
  };

const handleBuyNow = () => {
  if (!product) {
    return;
  }

  addToCart(product);

  navigation.navigate('Checkout');
};

  if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Skeleton style={styles.shimmerBackButton} />
        <Skeleton style={styles.shimmerSearch} />
        <Skeleton style={styles.shimmerCart} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.skeletonContent}>

        {/* Product Image */}
        <Skeleton style={styles.shimmerProductImage} />

        {/* Product Info */}
        <View style={styles.skeletonInfo}>

          {/* Category + Stock */}
          <View style={styles.skeletonRow}>
            <Skeleton style={styles.shimmerCategory} />
            <Skeleton style={styles.shimmerStock} />
          </View>

          {/* Title */}
          <Skeleton style={styles.shimmerTitle} />
          <Skeleton style={styles.shimmerTitleSmall} />

          {/* Rating */}
          <View style={styles.skeletonRatingRow}>
            <Skeleton style={styles.shimmerRating} />
            <Skeleton style={styles.shimmerRatingText} />
            <Skeleton style={styles.shimmerStockText} />
          </View>

          {/* Price */}
          <View style={styles.skeletonPriceRow}>
            <Skeleton style={styles.shimmerPrice} />
            <Skeleton style={styles.shimmerOldPrice} />
            <Skeleton style={styles.shimmerDiscount} />
          </View>

          <Skeleton style={styles.shimmerTax} />

          {/* Divider */}
          <View style={styles.skeletonDivider} />

          {/* Delivery */}
          <Skeleton style={styles.shimmerSectionTitle} />

          <View style={styles.shimmerCard}>
            <View style={styles.shimmerDeliveryItem}>
              <Skeleton style={styles.shimmerIcon} />

              <View style={styles.shimmerDeliveryInfo}>
                <Skeleton style={styles.shimmerDeliveryTitle} />
                <Skeleton style={styles.shimmerDeliveryText} />
              </View>
            </View>

            <View style={styles.shimmerDeliveryItem}>
              <Skeleton style={styles.shimmerIcon} />

              <View style={styles.shimmerDeliveryInfo}>
                <Skeleton style={styles.shimmerDeliveryTitle} />
                <Skeleton style={styles.shimmerDeliveryText} />
              </View>
            </View>

            <View style={styles.shimmerDeliveryItem}>
              <Skeleton style={styles.shimmerIcon} />

              <View style={styles.shimmerDeliveryInfo}>
                <Skeleton style={styles.shimmerDeliveryTitle} />
                <Skeleton style={styles.shimmerDeliveryText} />
              </View>
            </View>
          </View>

          {/* Why You'll Love It */}
          <Skeleton style={styles.shimmerSectionTitle} />

          <View style={styles.shimmerBenefitsCard}>
            {Array.from({length: 4}).map((_, index) => (
              <View key={index} style={styles.shimmerBenefitItem}>
                <Skeleton style={styles.shimmerBenefitIcon} />
                <Skeleton style={styles.shimmerBenefitText} />
              </View>
            ))}
          </View>

          {/* Description */}
          <Skeleton style={styles.shimmerSectionTitle} />

          <View style={styles.shimmerDescriptionCard}>
            <Skeleton style={styles.shimmerDescriptionLine} />
            <Skeleton style={styles.shimmerDescriptionLine} />
            <Skeleton style={styles.shimmerDescriptionLineShort} />
          </View>

        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomBar}>
        <Skeleton style={styles.shimmerBottomButton} />
        <Skeleton style={styles.shimmerBottomButton} />
      </View>
    </SafeAreaView>
  );
}
  if (error || !product) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>
          {error || 'Product not found.'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.retryButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.retryText}>
            Go Back
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
const hasDiscount =
  !!product.discountPercentage &&
  product.discountPercentage > 0;

const originalPrice = hasDiscount
  ? usdToInr(
      product.price /
        (1 - product.discountPercentage / 100),
    )
  : null;

const currentPrice = usdToInr(product.price);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
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

        <View style={styles.searchWrapper}>
          <SearchBar
            placeholder="Search products..."
            onPress={() =>
              navigation.navigate('Search', {
                allProducts: [product],
              })
            }
          />
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
              <Text style={styles.cartBadgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <SafeAreaView style={styles.contentSafeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  product.images?.[0] ||
                  product.thumbnail,
              }}
              style={styles.productImage}
              resizeMode="contain"
            />

            <View style={styles.hotDeal}>
              <Zap
                size={14}
                color="#FFFFFF"
                fill="#FFFFFF"
              />

              <Text style={styles.hotDealText}>
                HOT DEAL
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.wishlistButton}
              onPress={handleWishlist}>
              <Heart
                size={22}
                color={
                  isWishlisted
                    ? '#EF4444'
                    : '#374151'
                }
                fill={
                  isWishlisted
                    ? '#EF4444'
                    : 'transparent'
                }
                strokeWidth={2.2}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.categoryRow}>
              <View style={styles.categoryChip}>
                <Text style={styles.categoryText}>
                  {product.category}
                </Text>
              </View>

              {product.stock > 0 && (
                <View style={styles.stockChip}>
                  <Text style={styles.stockText}>
                    In Stock
                  </Text>
                </View>
              )}
            </View>

            <Text style={styles.title}>
              {product.title}
            </Text>

            <View style={styles.ratingRow}>
              <View style={styles.ratingBadge}>
                <Star
                  size={15}
                  color="#FFFFFF"
                  fill="#FFFFFF"
                />

                <Text style={styles.ratingText}>
                  {product.rating.toFixed(1)}
                </Text>
              </View>

              <Text style={styles.ratingLabel}>
                Excellent Rating
              </Text>

              <View style={styles.dot} />

              <Text style={styles.stockLabel}>
                {product.stock} available
              </Text>
            </View>

           <View style={styles.priceSection}>
  <View style={styles.priceRow}>
<Text style={styles.currentPrice}>
  ₹{Math.round(currentPrice)}
</Text>

{originalPrice && (
  <Text style={styles.originalPrice}>
    ₹{Math.round(originalPrice)}
  </Text>
)}

    <View style={styles.discountBadge}>
      <Text style={styles.discountText}>
        {Math.round(
          product.discountPercentage,
        )}
        % OFF
      </Text>
    </View>
  </View>

  <Text style={styles.taxText}>
    Inclusive of all taxes
  </Text>
</View>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>
              Delivery Details
            </Text>

            <View style={styles.deliveryCard}>
              <View style={styles.deliveryItem}>
                <View style={styles.deliveryIcon}>
                  <Truck
                    size={21}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryTitle}>
                    Free Delivery
                  </Text>

                  <Text style={styles.deliveryText}>
                    Get it delivered to your doorstep
                  </Text>
                </View>
              </View>

              <View style={styles.deliveryItem}>
                <View style={styles.deliveryIcon}>
                  <MapPin
                    size={21}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryTitle}>
                    Delivery Available
                  </Text>

                  <Text style={styles.deliveryText}>
                    Fast delivery to your location
                  </Text>
                </View>
              </View>

              <View
                style={[
                  styles.deliveryItem,
                  styles.deliveryItemLast,
                ]}>
                <View style={styles.deliveryIcon}>
                  <ShieldCheck
                    size={21}
                    color={colors.primary}
                  />
                </View>

                <View style={styles.deliveryInfo}>
                  <Text style={styles.deliveryTitle}>
                    Secure Delivery
                  </Text>

                  <Text style={styles.deliveryText}>
                    Safe and secure packaging
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              Why You'll Love It
            </Text>

            <View style={styles.benefitsCard}>
              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Truck
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <Text style={styles.benefitText}>
                  Fast & Free Delivery
                </Text>
              </View>

              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <RotateCcw
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <Text style={styles.benefitText}>
                  Easy Returns
                </Text>
              </View>

              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <Banknote
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <Text style={styles.benefitText}>
                  Secure Payments
                </Text>
              </View>

              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <ShieldCheck
                    size={20}
                    color={colors.primary}
                  />
                </View>

                <Text style={styles.benefitText}>
                  Quality Guaranteed
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              Description
            </Text>

            <View style={styles.descriptionCard}>
              <Text style={styles.description}>
                {product.description}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>
              Customer Reviews
            </Text>

            <View style={styles.reviewCard}>
              <View style={styles.reviewTop}>
                <View style={styles.reviewRating}>
                  <Star
                    size={17}
                    color="#F59E0B"
                    fill="#F59E0B"
                  />

                  <Text style={styles.reviewRatingText}>
                    {product.rating.toFixed(1)}
                  </Text>
                </View>

                <Text style={styles.reviewVerified}>
                  Verified Product
                </Text>
              </View>

              <Text style={styles.reviewText}>
                Customers love the quality and value
                of this product.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>
              Product Information
            </Text>

            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Brand
                </Text>

                <Text style={styles.infoValue}>
                  {product.brand || 'Generic'}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Category
                </Text>

                <Text
                  style={styles.infoValue}
                  numberOfLines={1}>
                  {product.category}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>
                  Rating
                </Text>

                <Text style={styles.infoValue}>
                  {product.rating.toFixed(1)} / 5
                </Text>
              </View>

              <View
                style={[
                  styles.infoRow,
                  styles.infoRowLast,
                ]}>
                <Text style={styles.infoLabel}>
                  Available Stock
                </Text>

                <Text style={styles.infoValue}>
                  {product.stock}
                </Text>
              </View>
            </View>

            <View style={styles.bottomSpace} />
          </View>
        </ScrollView>
      </SafeAreaView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.addCartButton}
          onPress={handleAddToCart}>
          <ShoppingCart
            size={20}
            color={colors.primary}
            strokeWidth={2.3}
          />

          <Text style={styles.addCartText}>
            Add to Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.85}
          style={styles.buyNowButton}
          onPress={handleBuyNow}>
          <Zap
            size={19}
            color="#FFFFFF"
            fill="#FFFFFF"
          />

          <Text style={styles.buyNowText}>
            Buy Now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default ProductDetails; 