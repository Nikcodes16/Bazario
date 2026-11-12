
import React from 'react';

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import {colors} from '../../theme/colors';

import {
  Heart,
  Trash2,
  ChevronLeft,
} from 'lucide-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {
  useWishlistStore,
} from '../../store/wishlistStore';

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

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Wishlist'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Wishlist = ({navigation}: Props) => {
  const items = useWishlistStore(
    state => state.items,
  );

  const removeFromWishlist = useWishlistStore(
    state => state.removeFromWishlist,
  );

  // Responsive dimensions
  const {width} = useWindowDimensions();

  const isTablet = width >= 650;
  const isLargeScreen = width >= 1000;

  const imageSize = isLargeScreen
    ? 120
    : isTablet
    ? 110
    : 90;

  const horizontalPadding = isLargeScreen
    ? 24
    : 16;

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      <View style={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              activeOpacity={0.75}
              style={styles.backButton}
              onPress={() => navigation.goBack()}>

              <ChevronLeft
                size={21}
                color="#FFFFFF"
                strokeWidth={2.5}
              />

            </TouchableOpacity>

            <Text style={styles.title}>
              Wishlist
            </Text>
          </View>

          {items.length > 0 && (
            <Text style={styles.count}>
              {items.length} items
            </Text>
          )}
        </View>

        {/* Empty Wishlist */}
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Heart
              size={60}
              color="#7DA2E4"
            />

            <Text style={styles.emptyTitle}>
              Your wishlist is empty
            </Text>

            <Text style={styles.emptyText}>
              Save your favourite products
              here.
            </Text>
          </View>
        ) : (

          /* Wishlist Products */
          <FlatList
            data={items}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.list,
              {
                paddingHorizontal: horizontalPadding,
              },
            ]}
            renderItem={({item}) => (
              <View style={styles.card}>

                <Image
                  source={{
                    uri: item.thumbnail,
                  }}
                  style={[
                    styles.image,
                    {
                      width: imageSize,
                      height: imageSize,
                    },
                  ]}
                  resizeMode="contain"
                />

                <View style={styles.cardContent}>

                  <Text
                    numberOfLines={2}
                    style={[
                      styles.productTitle,
                      {
                        fontSize: isLargeScreen ? 17 : 15,
                      },
                    ]}>
                    {item.title}
                  </Text>

                  <Text style={styles.price}>
                    ₹{item.price}
                  </Text>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.removeButton}
                    onPress={() =>
                      removeFromWishlist(item.id)
                    }>

                    <Trash2
                      size={17}
                      color="#EF4444"
                    />

                    <Text style={styles.removeText}>
                      Remove
                    </Text>

                  </TouchableOpacity>

                </View>

              </View>
            )}
          />

        )}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  content: {
    flex: 1,
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
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

  count: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    marginTop: 10,
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
  },

  cardContent: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12,
    justifyContent: 'center',
  },

  productTitle: {
    lineHeight: 22,
    color: colors.primary,
    fontFamily: 'Poppins-Medium',
  },

  price: {
    marginTop: 3,
    fontSize: 13,
    color: 'gray',
    fontFamily: 'Poppins-SemiBold',
  },

  removeButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  removeText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
    fontFamily: 'Poppins-Regular',
  },

  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 20,
    color: '#111827',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },

  emptyText: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});

export default Wishlist;
