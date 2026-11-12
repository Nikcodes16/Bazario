
import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ArrowLeft,
  ChevronRight,
  MapPin,
  CreditCard,
  ShoppingBag,
} from 'lucide-react-native';
import { colors } from '../../theme/colors'; 
import {SafeAreaView} from 'react-native-safe-area-context';
import {formatINR, usdToInr} from '../../utils/currency';
import {useCartStore} from '../../store/cartStore';
import {useAddressStore} from '../../store/addressStore';

const Checkout = ({navigation}: any) => {


  const items = useCartStore(
    state => state.items,
  );



  const savedAddress = useAddressStore(
    state => state.address,
  );


  // PRICE CALCULATION



const subtotal = items.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0,
);

const subtotalInr = usdToInr(subtotal);

const delivery = subtotalInr > 9000 ? 0 : 900;

const total = subtotalInr + delivery;

  const handleContinue = () => {
    // Cart empty
    if (!items.length) {
      return;
    }

    // Address already saved
    if (savedAddress) {
      navigation.navigate('Payment');
      return;
    }

    // No address saved
    navigation.navigate('Address');
  };

  
  // EDIT ADDRESS
  

  const handleEditAddress = () => {
    navigation.navigate('Address');
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      {/* 
          HEADER
 */}

      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.8}
          testID="back-button"
          onPress={() =>
            navigation.goBack()
          }>

          <ArrowLeft
            size={22}
            color="#111827"
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Checkout
        </Text>

        <View style={styles.headerSpace} />

      </View>

      {/*
          CONTENT
     */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }>

        {/* 
            DELIVERY ADDRESS
     */}

        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <View
              style={
                styles.sectionTitleRow
              }>

              {/* <MapPin
                size={20}
                color="#111827"
              /> */}

              <Text
                style={
                  styles.sectionTitle
                }>
                Delivery Address
              </Text>

            </View>

            {savedAddress && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={
                  handleEditAddress
                }>

                <Text
                  style={
                    styles.editText
                  }>
                  Edit
                </Text>

              </TouchableOpacity>
            )}

          </View>

          {savedAddress ? (

            <View
              style={
                styles.addressCard
              }>

              <Text
                style={
                  styles.addressName
                }>
                {savedAddress.name}
              </Text>

              <Text
                style={
                  styles.addressText
                }>
                {savedAddress.phone}
              </Text>

              <Text
                style={
                  styles.addressText
                }>
                {savedAddress.address}
              </Text>

              <Text
                style={
                  styles.addressText
                }>
                {savedAddress.city},{' '}
                {savedAddress.state} -{' '}
                {savedAddress.pincode}
              </Text>

            </View>

          ) : (

            <TouchableOpacity
              activeOpacity={0.8}
              style={
                styles.addAddressCard
              }
               testID="add-address-button"
              onPress={() =>
                navigation.navigate(
                  'Address',
                )
              }>

              <View
                style={
                  styles.addAddressIcon
                }>

                <MapPin
                  size={22}
                  color="#111827"
                />

              </View>

              <View
                style={
                  styles.addAddressContent
                }>

                <Text
                  style={
                    styles.addAddressTitle
                  }>
                  Add Delivery Address
                </Text>

                <Text
                  style={
                    styles.addAddressText
                  }>
                  Please add your address
                  to continue.
                </Text>

              </View>

              <ChevronRight
                size={20}
                color="#9CA3AF"
              />

            </TouchableOpacity>

          )}

        </View>

        {/* 
            PAYMENT
         */}

        <View style={styles.section}>

          <View style={styles.sectionHeader}>

            <View
              style={
                styles.sectionTitleRow
              }>

              {/* <CreditCard
                size={20}
                color="#111827"
              /> */}

              <Text
                style={
                  styles.sectionTitle
                }>
                Payment Method
              </Text>

            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {

                if (savedAddress) {
                  navigation.navigate(
                    'Payment',
                  );
                }

              }}>

              <Text
                style={
                  styles.editText
                }>
                Change
              </Text>

            </TouchableOpacity>

          </View>

          <View
            style={
              styles.paymentCard
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

            <ChevronRight
              size={20}
              color="#9CA3AF"
            />

          </View>

        </View>

        {/* =========================
            ORDER ITEMS
        ========================= */}

        <View style={styles.section}>

          <View
            style={
              styles.sectionTitleRow
            }>

            {/* <ShoppingBag
              size={20}
              color="#111827"
            /> */}

            <Text
              style={
                styles.sectionTitle
              }>
              Order Items
            </Text>

          </View>

          {items.length === 0 ? (

            <Text
              style={
                styles.emptyText
              }>
              Your cart is empty.
            </Text>

          ) : (

            items.map(item => (

              <View
                key={item.id}
                style={
                  styles.itemRow
                }>

                <View
                  style={
                    styles.itemInfo
                  }>

                  <Text
                    numberOfLines={1}
                    style={
                      styles.itemTitle
                    }>
                    {item.title}
                  </Text>

                  <Text
                    style={
                      styles.itemQuantity
                    }>
                    Qty: {item.quantity}
                  </Text>

                </View>
<Text style={styles.itemPrice}>
  {formatINR(item.price * item.quantity)}
</Text>
              </View>

            ))

          )}

        </View>

        {/*
            PRICE SUMMARY
       */}

        <View style={styles.section}>

          <Text
            style={
              styles.sectionTitle
            }>
            Price Summary
          </Text>

          <View
            style={
              styles.priceRow
            }>

            <Text
              style={
                styles.label
              }>
              Subtotal
            </Text>

        <Text style={styles.value}>
  {formatINR(subtotal)}
</Text>

          </View>

          <View
            style={
              styles.priceRow
            }>

            <Text
              style={
                styles.label
              }>
              Delivery
            </Text>

            <Text style={styles.value}>
  {delivery === 0
    ? 'FREE'
    : `₹${delivery.toLocaleString('en-IN')}`}
</Text>
          </View>

          <View
            style={
              styles.divider
            }
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

          <Text style={styles.totalValue}>
  ₹{total.toLocaleString('en-IN')}
</Text>

          </View>

        </View>

      </ScrollView>

      {/* 
          BOTTOM
       */}

      <View
        style={
          styles.bottomBar
        }>

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

     <Text style={styles.totalValue}>
  ₹{total.toLocaleString('en-IN')}
</Text>

        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!items.length}
           testID="continue-button"
          style={[
            styles.continueButton,
            !items.length &&
              styles.disabledButton,
          ]}
          onPress={
            handleContinue
          }>

          <Text
            style={
              styles.continueButtonText
            }>
            Continue
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
    fontFamily:'Poppins-SemiBold',
    color: colors.primary,
  },

  headerSpace: {
    width: 40,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 150,
  },

  section: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionTitle: {
    marginLeft: 8,
    fontSize: 17,
    fontFamily:'Poppins-SemiBold',
    color: colors.primary,
  },

  editText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
    fontFamily:'Poppins-Medium'
  },

  addressCard: {
    marginTop: 14,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
  },

  addressName: {
    fontSize: 15,
    fontFamily:'Poppins-Medium',
    color: '#111827',
  },

  addressText: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    color: '#6B7280',
  },

  addAddressCard: {
    marginTop: 14,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },

  addAddressIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addAddressContent: {
    flex: 1,
    marginLeft: 12,
  },

  addAddressTitle: {
    fontSize: 14,
    fontFamily:'Poppins-Medium',
    color: '#111827',
  },

  addAddressText: {
 
    fontSize: 12,
    fontFamily:'Poppins-Regular',
    color: '#6B7280',
  },

  paymentCard: {
    marginTop: 14,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
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
    fontFamily:'Poppins-Medium',
    color: '#111827',
  },

  paymentSubtitle: {
   
    fontSize: 12,
    fontFamily:'Poppins-Regular',
    color: '#6B7280',
  },

  itemRow: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  itemInfo: {
    flex: 1,
    marginRight: 12,
  },

  itemTitle: {
     fontSize: 14,
    fontFamily:'Poppins-Medium',
    color: '#111827',
  },

  itemQuantity: {
    marginTop: 4,
    fontSize: 12,
    color: '#6B7280',
  },

  itemPrice: {
    fontSize: 14,
    fontFamily:'Poppins-SemiBold',
    color: '#111827',
  },

  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },

  priceRow: {
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 14,
    color: '#6B7280',
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  divider: {
    marginTop: 14,
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
    fontFamily:'Poppins-SemiBold',
    color: '#111827',
  },

  totalValue: {
    fontSize: 17,
    fontFamily:'Poppins-Bold',
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
  },

  bottomPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },

  continueButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },

  disabledButton: {
    backgroundColor: '#9CA3AF',
  },

  continueButtonText: {
    marginRight: 6,
    fontSize: 16,
    fontFamily:'Poppins-SemiBold',
    color: '#FFFFFF',
  },

});

export default Checkout;
