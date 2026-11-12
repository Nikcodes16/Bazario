import { StyleSheet } from "react-native"
import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 5,
  },

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

  title: {
    fontSize: 20,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },

  cartButton: {
    width: 40,
    height: 40,
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
    borderColor: '#FFFFFF',
  },

  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },

  bannerContainer: {
    marginTop: 18,
    marginBottom: 22,
  },

  banner: {
    width: '100%',
    height: 150,
    borderRadius: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
    marginBottom: 12,
  },

  categoryRow: {
    gap: 10,
    paddingBottom: 10,
  },

  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
  },

  categoryCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  categoryImage: {
    width: '100%',
    height: '100%',
  },

 categoryName: {
  marginTop: 7,
    fontSize: 12,
    fontFamily:
      'Poppins-Medium',
    color:
      colors.primary,
    textAlign: 'center',
},

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  seeAll: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: colors.primary,
  },

  productRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  productItem: {
    width: '48%',
    // marginBottom: 5,
  },

  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  error: {
    fontSize: 15,
    color: colors.danger,
    fontFamily: 'Poppins-Medium',
  },
  shimmerScrollContent: {
  paddingHorizontal: 16,
  paddingBottom: 20,
},

shimmerBackButton: {
  width: 35,
  height: 35,
  borderRadius: 20,
},

shimmerTitle: {
  width: 110,
  height: 22,
  borderRadius: 6,
  marginLeft: 12,
},

shimmerCartButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
},

shimmerSearch: {
  width: '100%',
  height: 42,
  borderRadius: 21,
},

shimmerBanner: {
  width: '100%',
  height: 150,
  borderRadius: 16,
  marginTop: 18,
  marginBottom: 22,
},

shimmerSectionTitle: {
  width: 150,
  height: 20,
  borderRadius: 6,
  marginBottom: 12,
},

shimmerCategoryRow: {
  flexDirection: 'row',
  marginBottom: 20,
},

shimmerCategoryItem: {
  width: 72,
  alignItems: 'center',
  marginRight: 10,
},

shimmerCategoryCircle: {
  width: 64,
  height: 64,
  borderRadius: 32,
},

shimmerCategoryName: {
  width: 55,
  height: 12,
  borderRadius: 5,
  marginTop: 8,
},

shimmerSectionHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 8,
  marginBottom: 12,
},

shimmerPopularTitle: {
  width: 170,
  height: 20,
  borderRadius: 6,
},

shimmerSeeAll: {
  width: 50,
  height: 15,
  borderRadius: 5,
},

shimmerProductRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 20,
},
});
export default styles;