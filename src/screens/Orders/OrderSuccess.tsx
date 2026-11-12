import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Check,
  Home,
  ShoppingBag,
} from 'lucide-react-native';

import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {colors} from '../../theme/colors';

const OrderSuccess = ({
  navigation,
  route,
}: any) => {
  const insets = useSafeAreaInsets();

  const {
    addressData,
    paymentMethod,
    total,
  } = route?.params || {};

  const formattedTotal = Number(
    total || 0,
  ).toLocaleString('en-IN');

  const handleContinueShopping = () => {
    navigation.navigate('MainTabs', {
      screen: 'MainTabs',
      params: {
        screen: 'Home',
      },
    });
  };

  const handleMyOrders = () => {
    navigation.navigate('Orders');
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom: 145 + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}>

        <View style={styles.content}>
          <View style={styles.successCircle}>
            <Check
              size={50}
              color="#FFFFFF"
              strokeWidth={3}
            />
          </View>

          <Text style={styles.title}>
            Order Placed Successfully!
          </Text>

          <Text style={styles.subtitle}>
            Thank you for your order.
            {'\n'}
            Your order has been placed successfully.
          </Text>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <ShoppingBag
                  size={21}
                  color={colors.primary}
                />
              </View>

              <Text style={styles.cardTitle}>
                Order Details
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Total Amount
              </Text>

              <Text style={styles.value}>
                ₹{formattedTotal}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>
                Payment
              </Text>

              <Text style={styles.value}>
                {paymentMethod === 'cod'
                  ? 'Cash on Delivery'
                  : 'Online Payment'}
              </Text>
            </View>

            {addressData ? (
              <View style={styles.addressSection}>
                <Text style={styles.addressTitle}>
                  Delivery Address
                </Text>

                <Text style={styles.addressName}>
                  {addressData.name}
                </Text>

                <Text style={styles.addressText}>
                  {addressData.phone}
                </Text>

                <Text style={styles.addressText}>
                  {addressData.address}
                </Text>

                <Text style={styles.addressText}>
                  {addressData.city},{' '}
                  {addressData.state} -{' '}
                  {addressData.pincode}
                </Text>
              </View>
            ) : null}
          </View>

          <View style={styles.messageBox}>
            <Text style={styles.messageTitle}>
              We'll deliver your order soon! 🚚
            </Text>

            <Text style={styles.messageText}>
              You can check your order status
              from your orders section.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          {
            paddingBottom: 10
          },
        ]}>

        <TouchableOpacity
          style={styles.ordersButton}
          activeOpacity={0.8}
          onPress={handleMyOrders}>

          <ShoppingBag
            size={18}
            color={colors.primary}
          />

          <Text style={styles.ordersText}>
            My Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={handleContinueShopping}>

          <Home
            size={18}
            color="#FFFFFF"
          />

          <Text style={styles.continueText}>
            Continue Shopping
          </Text>
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

  scrollContent: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  successCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    marginTop: 40,
  },

  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
    textAlign: 'center',
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },

  card: {
    width: '100%',
    marginTop: 28,
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardTitle: {
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  row: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },

  value: {
    maxWidth: '55%',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    textAlign: 'right',
  },

  addressSection: {
    marginTop: 12,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  addressTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 7,
  },

  addressName: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#111827',
  },

  addressText: {
    marginTop: 3,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },

  messageBox: {
    width: '100%',
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  messageTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  messageText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },

bottomBar: {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  paddingHorizontal: 16,
  paddingTop: 15,
  paddingBottom: 2,
  backgroundColor: '#FFFFFF',
  borderTopWidth: 1,
  borderTopColor: '#E5E7EB',
  elevation: 12,
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: -3,
  },
  shadowOpacity: 0.08,
  shadowRadius: 8,
},

  ordersButton: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#EAF6FF',
borderColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    
  },

  ordersText: {
    marginLeft: 7,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  continueButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueText: {
    marginLeft: 7,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});

export default OrderSuccess;

