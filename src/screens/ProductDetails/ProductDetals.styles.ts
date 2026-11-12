import {StyleSheet, Dimensions} from 'react-native';
import {colors} from '../../theme/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },

  errorText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#EF4444',
    textAlign: 'center',
  },

  retryButton: {
    marginTop: 18,
    paddingHorizontal: 24,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },

  retryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
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

  contentSafeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    lineHeight: 12,
    fontFamily: 'Poppins-Bold',
  },

  scrollContent: {
    paddingBottom: 20,
  },

  imageContainer: {
    height: 350,
    backgroundColor: '#F8FAFC',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },

  productImage: {
    width: '90%',
    height: '90%',
  },

  hotDeal: {
    position: 'absolute',
    left: 16,
    top: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'green',
  },

  hotDealText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
  },

  wishlistButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },

  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },

  categoryChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: '#EAF6FF',
  },

  categoryText: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
    textTransform: 'capitalize',
  },

  stockChip: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: '#ECFDF5',
  },

  stockText: {
    fontSize: 10,
    fontFamily: 'Poppins-SemiBold',
    color: '#059669',
  },

  title: {
    fontSize: 20,
    lineHeight: 29,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#16A34A',
  },

  ratingText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins-Bold',
  },

  ratingLabel: {
    marginLeft: 8,
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 8,
    backgroundColor: '#9CA3AF',
  },

  stockLabel: {
    fontSize: 11,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },

  priceSection: {
    marginTop: 18,
  },

  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 9,
  },

  currentPrice: {
    fontSize: 27,
    fontFamily: 'Poppins-Bold',
    color: '#111827',
  },

  originalPrice: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },

  discountBadge: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#DCFCE7',
  },

  discountText: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#16A34A',
  },

  taxText: {
    marginTop: 2,
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#9CA3AF',
  },

  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 20,
  },

  sectionTitle: {
    marginBottom: 11,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  deliveryCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom:20
  },

  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  deliveryItemLast: {
    marginBottom: 0,
  },

  deliveryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF6FF',
  },

  deliveryInfo: {
    flex: 1,
    marginLeft: 11,
  },

  deliveryTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  deliveryText: {
    marginTop: -5,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },

  benefitsCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom:20
  },

  benefitItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },

  benefitIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAF6FF',
  },

  benefitText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
  },

  descriptionCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 20,
  },

  description: {
    fontSize: 12,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },

  reviewCard: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 22,
  },

  reviewTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  reviewRatingText: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  reviewVerified: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#16A34A',
  },

  reviewText: {
    marginTop: 9,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },

  infoCard: {
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  infoRow: {
    minHeight: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  infoRowLast: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },

  infoValue: {
    maxWidth: '55%',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    textAlign: 'right',
    textTransform: 'capitalize',
  },

  bottomSpace: {
    height: 100,
  },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
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

  addCartButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 11,
    backgroundColor: '#EAF6FF',
    borderWidth: 1,
    borderColor: colors.primary,
  },

  addCartText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
  },

  buyNowButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 11,
    backgroundColor: colors.primary,
  },

  buyNowText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  skeletonContent: {
  paddingBottom: 20,
},

shimmerBackButton: {
  width: 38,
  height: 38,
  borderRadius: 19,
},

shimmerSearch: {
  flex: 1,
  height: 42,
  borderRadius: 12,
  marginLeft: 15,
},

shimmerCart: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginLeft: 10,
},

shimmerProductImage: {
  width: '100%',
  height: 350,
},

skeletonInfo: {
  paddingHorizontal: 16,
  paddingTop: 18,
},

skeletonRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  marginBottom: 12,
},

shimmerCategory: {
  width: 75,
  height: 25,
  borderRadius: 7,
},

shimmerStock: {
  width: 70,
  height: 25,
  borderRadius: 7,
},

shimmerTitle: {
  width: '92%',
  height: 24,
  borderRadius: 6,
  marginBottom: 7,
},

shimmerTitleSmall: {
  width: '65%',
  height: 24,
  borderRadius: 6,
},

skeletonRatingRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 12,
  gap: 8,
},

shimmerRating: {
  width: 55,
  height: 27,
  borderRadius: 6,
},

shimmerRatingText: {
  width: 90,
  height: 14,
  borderRadius: 5,
},

shimmerStockText: {
  width: 80,
  height: 14,
  borderRadius: 5,
},

skeletonPriceRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 9,
  marginTop: 20,
},

shimmerPrice: {
  width: 100,
  height: 32,
  borderRadius: 7,
},

shimmerOldPrice: {
  width: 65,
  height: 18,
  borderRadius: 5,
},

shimmerDiscount: {
  width: 65,
  height: 25,
  borderRadius: 6,
},

shimmerTax: {
  width: 125,
  height: 12,
  borderRadius: 4,
  marginTop: 5,
},

skeletonDivider: {
  height: 1,
  backgroundColor: '#E5E7EB',
  marginVertical: 20,
},

shimmerSectionTitle: {
  width: 145,
  height: 22,
  borderRadius: 6,
  marginBottom: 11,
},

shimmerCard: {
  padding: 14,
  borderRadius: 14,
  backgroundColor: '#F8FAFC',
  borderWidth: 1,
  borderColor: '#E5E7EB',
  marginBottom: 20,
},

shimmerDeliveryItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 14,
},

shimmerIcon: {
  width: 40,
  height: 40,
  borderRadius: 20,
},

shimmerDeliveryInfo: {
  flex: 1,
  marginLeft: 11,
},

shimmerDeliveryTitle: {
  width: 115,
  height: 15,
  borderRadius: 5,
  marginBottom: 7,
},

shimmerDeliveryText: {
  width: '85%',
  height: 12,
  borderRadius: 4,
},

shimmerBenefitsCard: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: 5,
  borderRadius: 14,
  backgroundColor: '#F8FAFC',
  borderWidth: 1,
  borderColor: '#E5E7EB',
  marginBottom: 20,
},

shimmerBenefitItem: {
  width: '50%',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
},

shimmerBenefitIcon: {
  width: 34,
  height: 34,
  borderRadius: 17,
},

shimmerBenefitText: {
  flex: 1,
  height: 14,
  borderRadius: 5,
  marginLeft: 8,
},

shimmerDescriptionCard: {
  padding: 14,
  borderRadius: 14,
  backgroundColor: '#F8FAFC',
  borderWidth: 1,
  borderColor: '#E5E7EB',
  marginBottom: 20,
},

shimmerDescriptionLine: {
  width: '100%',
  height: 13,
  borderRadius: 5,
  marginBottom: 9,
},

shimmerDescriptionLineShort: {
  width: '65%',
  height: 13,
  borderRadius: 5,
},

shimmerBottomButton: {
  flex: 1,
  height: 48,
  borderRadius: 11,
},
});
export default styles;