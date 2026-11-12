import React, {useState} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  ChevronRight,
} from 'lucide-react-native';

import {colors} from '../../theme/colors';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {useCartStore} from '../../store/cartStore';
import {useOrderStore} from '../../store/orderStore';
import {useAddressStore} from '../../store/addressStore';

import {
  formatINR,
  usdToInr,
} from '../../utils/currency';

import {
  showOrderNotification,
} from '../../utils/notificationService';

const Payment = ({navigation}: any) => {
  const items = useCartStore(
    state => state.items,
  );

  const clearCart = useCartStore(
    state => state.clearCart,
  );

  const addressData = useAddressStore(
    state => state.address,
  );

  const addOrder = useOrderStore(
    state => state.addOrder,
  );

  const [paymentMethod, setPaymentMethod] =
    useState('cod');

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0,
  );

  const subtotalInr = usdToInr(subtotal);

  const delivery =
    subtotalInr > 9000 ? 0 : 900;

  const total =
    subtotalInr + delivery;

 const handlePlaceOrder = async (): Promise<void> => {
    if (!items.length) {
      return;
    }

    if (!addressData) {
      navigation.navigate('Address');
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,

      items: [...items],

      total,

      paymentMethod,

      addressData,

      status: 'Placed',

      createdAt:
        new Date().toISOString(),
    };

    addOrder(order);
    
    await showOrderNotification(order.id);

    clearCart();

    navigation.navigate(
      'OrderSuccess',
      {
        addressData,
        paymentMethod,
        total,
      },
    );
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          onPress={() =>
            navigation.goBack()
          }>

          <ArrowLeft
            size={22}
            color="#111827"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Payment
        </Text>

        <View
          style={styles.headerSpace}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }>

        <View style={styles.section}>
          <View
            style={
              styles.sectionTitleRow
            }>

            <MapPin
              size={20}
              color="#111827"
            />

            <Text
              style={
                styles.sectionTitle
              }>
              Delivery Address
            </Text>

          </View>

          {addressData ? (
            <View
              style={
                styles.addressCard
              }>

              <Text
                style={
                  styles.addressName
                }>
                {addressData.name}
              </Text>

              <Text
                style={
                  styles.addressText
                }>
                {addressData.phone}
              </Text>

              <Text
                style={
                  styles.addressText
                }>
                {addressData.address}
              </Text>

              <Text
                style={
                  styles.addressText
                }>
                {addressData.city},{' '}
                {addressData.state} -{' '}
                {addressData.pincode}
              </Text>

            </View>
          ) : (
            <TouchableOpacity
              style={
                styles.addAddressButton
              }
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(
                  'Address',
                )
              }>

              <Text
                style={
                  styles.addAddressText
                }>
                + Add Delivery Address
              </Text>

            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <View
            style={
              styles.sectionTitleRow
            }>

            <CreditCard
              size={20}
              color={colors.primary}
            />

            <Text
              style={
                styles.sectionTitle
              }>
              Payment Method
            </Text>

          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.paymentCard,
              paymentMethod === 'cod' &&
                styles.selectedCard,
            ]}
            onPress={() =>
              setPaymentMethod('cod')
            }>

            <View
              style={
                styles.paymentIcon
              }>

              <CreditCard
                size={20}
                color={colors.primary}
              />

            </View>

            <View
              style={
                styles.paymentContent
              }>

              <Text
                style={
                  styles.paymentTitle
                }>
                Cash on Delivery
              </Text>

              <Text
                style={
                  styles.paymentSubtitle
                }>
                Pay when your order arrives
              </Text>

            </View>

            {paymentMethod === 'cod' && (
              <View
                style={
                  styles.checkCircle
                }>

                <Check
                  size={16}
                  color="#FFFFFF"
                />

              </View>
            )}

          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text
            style={
              styles.sectionTitle
            }>
            Order Summary
          </Text>

          <View
            style={
              styles.priceRow
            }>

            <Text
              style={styles.label}>
              Subtotal
            </Text>

            <Text
              style={styles.value}>
              {formatINR(subtotal)}
            </Text>

          </View>

          <View
            style={
              styles.priceRow
            }>

            <Text
              style={styles.label}>
              Delivery
            </Text>

            <Text
              style={styles.value}>

              {delivery === 0
                ? 'FREE'
                : `₹${delivery.toLocaleString(
                    'en-IN',
                  )}`}

            </Text>

          </View>

          <View
            style={styles.divider}
          />

          <View
            style={
              styles.totalRow
            }>

            <Text
              style={
                styles.totalLabel
              }>
              Total
            </Text>

            <Text
              style={
                styles.totalValue
              }>
              ₹{total.toLocaleString(
                'en-IN',
              )}
            </Text>

          </View>
        </View>
      </ScrollView>

      <View
        style={styles.bottomBar}>

        <View
          style={
            styles.bottomTotal
          }>

          <Text
            style={
              styles.bottomLabel
            }>
            Total
          </Text>

          <Text
            style={
              styles.bottomPrice
            }>
            ₹{total.toLocaleString(
              'en-IN',
            )}
          </Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.placeButton,
            !addressData &&
              styles.disabledButton,
          ]}
          disabled={!addressData}
          onPress={
            handlePlaceOrder
          }>

          <Text
            style={
              styles.placeButtonText
            }>
            Place Order
          </Text>

          <ChevronRight
            size={20}
            color="#FFFFFF"
          />

        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
  },

  headerSpace: {
    width: 40,
  },

  content: {
    padding: 16,
    paddingBottom: 150,
  },

  section: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionTitle: {
    marginLeft: 8,
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  addressCard: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
  },

  addressName: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#111827',
  },

  addressText: {
    marginTop: 5,
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    lineHeight: 19,
    color: '#6B7280',
  },

  addAddressButton: {
    marginTop: 14,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addAddressText: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  paymentCard: {
    marginTop: 14,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },

  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: '#F9FAFB',
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentContent: {
    flex: 1,
    marginLeft: 12,
  },

  paymentTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  paymentSubtitle: {
    marginTop: -3,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },

  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  priceRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },

  value: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  divider: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  totalRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 17,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  totalValue: {
    fontSize: 17,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  bottomTotal: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  bottomLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  bottomPrice: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
  },

  placeButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  disabledButton: {
    opacity: 0.5,
  },

  placeButtonText: {
    marginRight: 6,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});

export default Payment;