import React from 'react';

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Package,
  MapPin,
  CreditCard,
} from 'lucide-react-native';

import {colors} from '../../theme/colors';
import {useOrderStore} from '../../store/orderStore';

const Orders = ({navigation}: any) => {
  const orders = useOrderStore(
    state => state.orders,
  );

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}>

      {/* Header */}
      <View style={styles.header}>

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>
            My Orders
          </Text>

          <Text style={styles.subtitle}>
            {orders.length}{' '}
            {orders.length === 1
              ? 'order'
              : 'orders'}
          </Text>
        </View>

      </View>

      {/* Empty */}
      {orders.length === 0 ? (

        <View style={styles.emptyContainer}>

          <View style={styles.emptyIcon}>
            <Package
              size={40}
              color={colors.primary}
            />
          </View>

          <Text style={styles.emptyTitle}>
            No orders yet
          </Text>

          <Text style={styles.emptyText}>
            Your placed orders will appear here.
          </Text>

        </View>

      ) : (

        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({item}) => (

            <View style={styles.orderCard}>

              {/* Order Header */}
              <View
                style={
                  styles.orderHeader
                }>

                <View>

                  <Text
                    style={
                      styles.orderId
                    }>
                    {item.id}
                  </Text>

                  <Text
                    style={
                      styles.date
                    }>
                    {new Date(
                      item.createdAt,
                    ).toLocaleDateString()}
                  </Text>

                </View>

                <View
                  style={
                    styles.status
                  }>

                  <Text
                    style={
                      styles.statusText
                    }>
                    {item.status}
                  </Text>

                </View>

              </View>

              {/* Products */}
              <View
                style={
                  styles.products
                }>

                {item.items.map(
                  product => (

                    <View
                      key={product.id}
                      style={
                        styles.productRow
                      }>

                      <View
                        style={
                          styles.productInfo
                        }>

                        <Text
                          style={
                            styles.productTitle
                          }
                          numberOfLines={2}>
                          {product.title}
                        </Text>

                        <Text
                          style={
                            styles.quantity
                          }>
                          Qty: {product.quantity}
                        </Text>

                      </View>

                      <Text
                        style={
                          styles.price
                        }>
                        ₹
                        {(
                          product.price *
                          product.quantity
                        ).toFixed(2)}
                      </Text>

                    </View>

                  ),
                )}

              </View>

              {/* Address */}
              <View
                style={
                  styles.addressSection
                }>

                <View
                  style={
                    styles.infoHeader
                  }>

                  <MapPin
                    size={18}
                    color={colors.primary}
                  />

                  <Text
                    style={
                      styles.infoTitle
                    }>
                    Delivery Address
                  </Text>

                </View>

                <Text
                  style={
                    styles.addressText
                  }>
                  {item.addressData.name}
                </Text>

                <Text
                  style={
                    styles.addressText
                  }>
                  {item.addressData.phone}
                </Text>

                <Text
                  style={
                    styles.addressText
                  }>
                  {item.addressData.address}
                </Text>

                <Text
                  style={
                    styles.addressText
                  }>
                  {item.addressData.city},{' '}
                  {item.addressData.state} -{' '}
                  {item.addressData.pincode}
                </Text>

              </View>

              {/* Bottom */}
              <View
                style={
                  styles.bottomRow
                }>

                <View
                  style={
                    styles.paymentInfo
                  }>

                  <CreditCard
                    size={18}
                    color={colors.primary}
                  />

                  <Text
                    style={
                      styles.paymentText
                    }>

                    {item.paymentMethod ===
                    'cod'
                      ? 'Cash on Delivery'
                      : 'Online Payment'}

                  </Text>

                </View>

                <View>

                  <Text
                    style={
                      styles.totalLabel
                    }>
                    Total
                  </Text>

                  <Text
                    style={
                      styles.total
                    }>
                    ₹
                    {Number(
                      item.total,
                    ).toFixed(2)}
                  </Text>

                </View>

              </View>

            </View>

          )}
        />

      )}

      {/* Continue Shopping */}
      <View style={styles.continueBar}>

      <TouchableOpacity
  activeOpacity={0.8}
  style={styles.continueButton}
  onPress={() =>
    navigation.navigate('MainTabs', {
      screen: 'Home',
    } as any)
  }>
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

  /* Header */
  header: {
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },

  subtitle: {
    marginTop: -2,
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  /* List */
  list: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
    overflow: 'hidden',
  },

  orderHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  orderId: {
    fontSize: 15,
    fontFamily:'Poppins-SemiBold',
    color: '#111827',
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
    fontFamily:'Poppins-Regular'
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
  },

  statusText: {
    fontSize: 12,
   
    color: '#166534',
    fontFamily:'Poppins-SemiBold'
  },

  /* Products */
  products: {
    paddingHorizontal: 16,
  },

  productRow: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  productInfo: {
    flex: 1,
    paddingRight: 12,
  },

  productTitle: {
    fontSize: 14,
    fontFamily:'Poppins-Medium',
    color: '#111827',
  },

  quantity: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
    fontFamily:'Poppins-Regular'
  },

  price: {
    fontSize: 14,
    fontFamily:'Poppins-SemiBold',
    color: '#111827',
  },

  /* Address */
  addressSection: {
    marginTop: 2,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },

  infoTitle: {
    marginLeft: 7,
    fontSize: 14,
    fontFamily:'Poppins-SemiBold',
    color: '#111827',
  },

  addressText: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    color: '#6B7280',
    fontFamily:'Poppins-Regular'
  },

  /* Bottom Order Info */
  bottomRow: {
    padding: 16,
    marginTop: 2,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  paymentText: {
    marginLeft: 7,
    fontSize: 13,
    color: '#6B7280',
    fontFamily:'Poppins-Regular'
  },

  totalLabel: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
  },

  total: {
    marginTop: 2,
    fontSize: 17,
    fontFamily:'Poppins-SemiBold',
    color: '#111827',
    textAlign: 'right',
  },

  /* Empty */
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 19,
    fontFamily:'Poppins-SemiBold',
    color: '#111827',
  },

  emptyText: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily:'Poppins-Regular'
  },

  /* Continue Shopping */
  continueBar: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  continueButton: {
    height: 54,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  continueText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },

});

export default Orders;