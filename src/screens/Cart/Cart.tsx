import React from 'react';

import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  CompositeScreenProps,
} from '@react-navigation/native';

import {
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {
  MainTabParamList,
  RootStackParamList,
} from '../../navigation/navigationTypes';

import {
  CartItem,
  useCartStore,
} from '../../store/cartStore';

import {SafeAreaView} from 'react-native-safe-area-context';
import {formatINR} from '../../utils/currency';

import {
  Minus,
  Plus,
  Trash2,
  ChevronLeft,
} from 'lucide-react-native';

import styles from './Cart.styles';





type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Cart'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Cart = ({navigation}: Props) => {
  const items = useCartStore(
    state => state.items,
  );

  const increaseQuantity = useCartStore(
    state => state.increaseQuantity,
  );

  const decreaseQuantity = useCartStore(
    state => state.decreaseQuantity,
  );

  const removeFromCart = useCartStore(
    state => state.removeFromCart,
  );

  const clearCart = useCartStore(
    state => state.clearCart,
  );

  const total = items.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0,
  );

  const totalItems = items.reduce(
    (sum, item) =>
      sum + item.quantity,
    0,
  );

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearCart,
        },
      ],
    );
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  const renderItem = ({
    item,
  }: {
    item: CartItem;
  }) => {
    return (
      <View style={styles.cartItem}>
        {/* Product Image */}
        <Image
          source={{
            uri: item.thumbnail,
          }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Product Content */}
        <View style={styles.itemContent}>
          <Text
            style={styles.itemTitle}
            numberOfLines={2}>
            {item.title}
          </Text>

          {/* Price in Rupees */}
         <Text style={styles.price}>
  {formatINR(item.price)}
</Text>

          {/* Bottom Row */}
          <View style={styles.bottomRow}>
            {/* Quantity */}
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                testID={`decrease-${item.id}`}
                style={styles.quantityButton}
                activeOpacity={0.7}
                onPress={() =>
                  decreaseQuantity(item.id)
                }>
                <Minus
                  size={16}
                  color="#111827"
                  strokeWidth={2}
                />
              </TouchableOpacity>

              <Text style={styles.quantity}>
                {item.quantity}
              </Text>

              <TouchableOpacity
                testID={`increase-${item.id}`}
                style={styles.quantityButton}
                activeOpacity={0.7}
                onPress={() =>
                  increaseQuantity(item.id)
                }>
                <Plus
                  size={16}
                  color="#111827"
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>

            {/* Delete */}
            <TouchableOpacity
              testID={`remove-${item.id}`}
              activeOpacity={0.7}
              onPress={() =>
                removeFromCart(item.id)
              }>
              <Trash2
                size={20}
                color="#EF4444"
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}>

      {/* =========================
          HEADER
      ========================= */}
      
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

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Cart
            </Text>
          </View>
        </View>

       
      </View>

      {/* =========================
          EMPTY CART
      ========================= */}
      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>
            🛒
          </Text>

          <Text style={styles.emptyTitle}>
            Your cart is empty
          </Text>

          <Text style={styles.emptyText}>
            Add some products to your cart
            and they will appear here.
          </Text>
        </View>
      ) : (
        <>
          {/* =========================
              CART LIST
          ========================= */}
          <FlatList
            data={items}
            keyExtractor={item =>
              item.id.toString()
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              styles.list
            }
            ListHeaderComponent={
              <View style={styles.listHeader}>
                 {/* Only item count */}
        {items.length > 0 && (
          <Text style={styles.subtitle}>
            {totalItems}{' '}
            {totalItems === 1
              ? 'item'
              : 'items'}
          </Text>
        )}

                <TouchableOpacity
                  testID="clear-cart"
                  activeOpacity={0.75}
                  onPress={handleClearCart}>
                  <Text style={styles.clearText}>
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />

          {/* =========================
              CHECKOUT
          ========================= */}
          <View
            style={styles.checkoutContainer}>

            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>
                  Total
                </Text>

                <Text style={styles.itemCount}>
                  {totalItems}{' '}
                  {totalItems === 1
                    ? 'item'
                    : 'items'}
                </Text>
              </View>

              {/* Total in Rupees */}
             <Text style={styles.total}>
  {formatINR(total)}
</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              activeOpacity={0.8}
              onPress={handleCheckout}>
              <Text style={styles.checkoutText}>
                Proceed to Checkout
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
export default Cart;



