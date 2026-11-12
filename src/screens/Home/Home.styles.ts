import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container1: {
    flex: 1,
    backgroundColor:
      'transparent',
  },

  topHeader: {
    height: 58,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
      // marginTop:30
  },

  headerTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 21,
    fontFamily:
      'Poppins-Bold',
    color:
      colors.primary,
  },

  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  headerButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent:
      'center',
  },

  cartWrapper: {
    position: 'relative',
  },

  headerCartBadge: {
    position: 'absolute',
    top: 0,
    right: 1,
    minWidth: 17,
    height: 17,
    paddingHorizontal: 3,
    borderRadius: 9,
    backgroundColor:
      '#EF4444',
    alignItems: 'center',
    justifyContent:
      'center',
    borderWidth: 1.5,
    borderColor:
      '#FFFFFF',
  },

  headerCartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 12,
  },

  header: {
  paddingHorizontal: 16,
  paddingTop: 4,
  paddingBottom: 12,
},
suggestion: {
  fontSize: 18,
  fontFamily: 'Poppins-SemiBold',
  color: colors.primary,
  marginTop: 8,
  marginBottom: 12,
},
list: {
  paddingHorizontal: 16,
  paddingBottom: 90,
},

row: {
  justifyContent: 'space-between',
  alignItems: 'stretch',
},

  loader: {
    flex: 1,
    backgroundColor:
      colors.background,
    justifyContent:
      'center',
    alignItems:
      'center',
  },

  error: {
    fontSize: 16,
    color:
      colors.danger,
  },

categoryScroll: {
  marginHorizontal: -16,
  width: 'auto',
  flexGrow: 0,
},

circleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 0,
  paddingTop:10
},

circleItem: {
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 0,
},

  circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor:
      'pink',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  circleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  circleText: {
    marginTop: 7,
    fontSize: 12,
    fontFamily:
      'Poppins-Medium',
    color:
      colors.primary,
    textAlign: 'center',
  },

bannerContainer: {
  marginVertical: 10,
  marginHorizontal: -16,
  overflow: 'hidden',
},

banner: {
  height: 150,
  alignItems: 'center',
  justifyContent: 'center',
},

bannerImage: {
  width: '90%',
  height: '100%',
  borderRadius: 16,
  resizeMode: 'cover',
  shadowOpacity: 0,
  elevation: 0,
},
  dotsContainer: {
    flexDirection: 'row',
    justifyContent:
      'center',
    alignItems:
      'center',
    marginTop: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor:
      '#ccc',
    marginHorizontal: 4,
  },

  activeDot: {
    width: 22,
    backgroundColor:
      colors.primary,
  },
  shimmerScreen: {
  flex: 1,
  backgroundColor: '#FFFFFF',
},

shimmerTopHeader: {
  height: 58,
  paddingHorizontal: 12,
  flexDirection: 'row',
  alignItems: 'center',
},

shimmerIcon: {
  width: 42,
  height: 42,
  borderRadius: 21,
},

shimmerLogo: {
  width: 110,
  height: 24,
  borderRadius: 6,
  marginLeft: 12,
},

shimmerHeaderRight: {
  marginLeft: 'auto',
  flexDirection: 'row',
  gap: 4,
},

shimmerSearchContainer: {
  paddingHorizontal: 16,
  paddingTop: 4,
  paddingBottom: 12,
},

shimmerSearch: {
  width: '100%',
  height: 42,
  borderRadius: 21,
},

shimmerCategories: {
  flexDirection: 'row',
  paddingHorizontal: 16,
  marginTop: 8,
  overflow: 'hidden',
},

shimmerCategoryItem: {
  width: 76,
  alignItems: 'center',
  marginRight: 2,
},

shimmerCircle: {
  width: 60,
  height: 60,
  borderRadius: 30,
},

shimmerCategoryText: {
  width: 48,
  height: 12,
  borderRadius: 5,
  marginTop: 8,
},

shimmerBannerContainer: {
  marginTop: 18,
  marginBottom: 8,
  paddingLeft: 16,
},

shimmerBanner: {
  width: '90%',
  height: 150,
  borderRadius: 16,
},

shimmerDots: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 10,
  marginRight: 16,
},

shimmerDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginHorizontal: 4,
},

shimmerSuggestion: {
  width: 160,
  height: 20,
  borderRadius: 6,
  marginHorizontal: 16,
  marginTop: 12,
  marginBottom: 14,
},

shimmerProducts: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
},
});
export default styles;