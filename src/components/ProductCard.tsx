import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ArrowDown, Heart} from 'lucide-react-native';
import {useWishlistStore} from '../store/wishlistStore';
import {colors} from '../theme/colors';

import {Product} from '../services/productApi';

type Props = {
  product: Product;
  onPress?: () => void;
};

const ProductCard = ({product, onPress}: Props) => {
  const USD_TO_INR = 90;
  const hasDiscount =
    !!product.discountPercentage &&
    product.discountPercentage > 0;

 const originalPrice = hasDiscount
  ? (product.price /
      (1 - product.discountPercentage! / 100)) *
    USD_TO_INR
  : null;
const {toggleWishlist, items} = useWishlistStore();

const isWishlisted = items.some(
  item => item.id === product.id,
);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.imageCard}>
        <Image
          source={{uri: product.thumbnail}}
          style={styles.image}
          resizeMode="cover"
        />

       <TouchableOpacity
  activeOpacity={0.8}
  style={styles.heartButton}
  onPress={() => toggleWishlist(product)}>
  <Heart
    size={19}
    color={isWishlisted ? '#EF4444' : '#333333'}
    fill={isWishlisted ? '#EF4444' : 'transparent'}
    strokeWidth={2.2}
  />
</TouchableOpacity>

        {product.rating && product.rating > 4 && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingStar}>★</Text>

            <Text style={styles.ratingText}>
              {product.rating.toFixed(1)}
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.info}>
        <Text
          style={styles.title}
          numberOfLines={1}
          ellipsizeMode="tail">
          {product.title}
        </Text>

     <View style={styles.priceRow}>
  <View style={styles.discountOriginal}>
    {hasDiscount && (
      <View style={styles.discount}>
        <ArrowDown
          size={14}
          color="#16A34A"
          strokeWidth={2.8}
        />

        <Text style={styles.discountText}>
          {Math.round(product.discountPercentage!)}%
        </Text>
      </View>
    )}

    {originalPrice && (
      <Text style={styles.originalPrice}>
        ₹{Math.round(originalPrice)}
      </Text>
    )}
  </View>

  <Text style={styles.price}>
    ₹{Math.round(product.price * USD_TO_INR)}
  </Text>
</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 16,
  },

  imageCard: {
    width: '100%',
    aspectRatio: 0.85,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },

  ratingBadge: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    height: 24,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },

  ratingStar: {
    fontSize: 12,
    lineHeight: 14,
    color: '#22C55E',
    marginRight: 3,
    marginBottom: 2,
  },

  ratingText: {
    fontSize: 11,
    lineHeight: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#333333',
  },

  info: {
    paddingTop: 8,
    paddingHorizontal: 2,
  },

  title: {
    fontSize: 14,
    lineHeight: 20,
    height: 20,
    fontFamily: 'Poppins-Medium',
    color: colors.text,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
  },

  discountOriginal: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },

  discount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 7,
  },

  discountText: {
    marginLeft: 1,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#16A34A',
  },

  originalPrice: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
    textDecorationLine: 'line-through',
    textDecorationColor: 'black',
    marginRight: 7,
  },

  price: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    fontWeight: '700',
    color: colors.primary,
    flexShrink: 0,
  },
});
export default ProductCard;