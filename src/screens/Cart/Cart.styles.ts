import { StyleSheet } from "react-native"
import {colors} from '../../theme/colors';

const styles = StyleSheet.create({

container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,

    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },

  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  /* =========================
     LIST
  ========================= */

  list: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  cartItemsTitle: {
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Poppins-Medium',
  },

  clearText: {
    fontSize: 13,
    color: '#EF4444',
    fontFamily: 'Poppins-Medium',
  },

  /* =========================
     CART ITEM
  ========================= */

  cartItem: {
    marginBottom: 10,
    padding: 10,

    backgroundColor: '#FFFFFF',

    borderRadius: 12,

    flexDirection: 'row',

    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },

  itemContent: {
    flex: 1,
    marginLeft: 12,

    justifyContent: 'space-between',

    paddingVertical: 2,
  },

  itemTitle: {
    fontSize: 15,
    lineHeight: 20,
   
    color: colors.primary,
    fontFamily: 'Poppins-Medium',
  },

  price: {
    marginTop: 2,
    fontSize: 13,
    
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },

  bottomRow: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* =========================
     QUANTITY
  ========================= */

  quantityContainer: {
    height: 30,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 8,

    overflow: 'hidden',
  },

  quantityButton: {
    width: 34,
    height: 34,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#F9FAFB',
  },

  quantity: {
    minWidth: 34,

    textAlign: 'center',

    fontSize: 14,
    fontWeight: '600',

    color: '#111827',
  },

  /* =========================
     CHECKOUT
  ========================= */

  checkoutContainer: {
    padding: 16,
    paddingBottom: 12,

    backgroundColor: '#FFFFFF',

    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    elevation: 8,
    marginBottom:70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  totalRow: {
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  totalLabel: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Bold',
  },

  itemCount: {
    marginTop: 2,
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'Poppins-Regular',
  },

  total: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    fontFamily: 'Poppins-Medium',
  },

  checkoutButton: {
    height: 50,

    borderRadius: 12,

    backgroundColor: colors.primary,

    alignItems: 'center',
    justifyContent: 'center',
  },

  checkoutText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },

  /* =========================
     EMPTY CART
  ========================= */

  emptyContainer: {
    flex: 1,

    paddingHorizontal: 30,

    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyIcon: {
    fontSize: 54,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 20,
    fontFamily:'Poppins-SemiBold',
    color: '#111827',
   
  },

  emptyText: {
    marginTop: 8,

    fontSize: 14,
    lineHeight: 21,

    textAlign: 'center',

    color: '#6B7280',

    fontFamily: 'Poppins-Regular',
  },
});
export default styles;




