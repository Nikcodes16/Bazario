
import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import BackgroundGradient from '../../components/BackgroundGradient';
import ProductCard from '../../components/ProductCard';
import {
  getProducts,
  Product,
} from '../../services/productApi';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {
  MainTabParamList,
  RootStackParamList,
} from '../../navigation/navigationTypes';
import {ChevronLeft} from 'lucide-react-native';
import {colors} from '../../theme/colors';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Shop'>,
  NativeStackScreenProps<RootStackParamList>
>;

const Shop = ({navigation}: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Responsive columns
  const {width} = useWindowDimensions();

  const numColumns =
    width >= 1000 ? 4 :
    width >= 650 ? 3 :
    2;

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await getProducts();

      setProducts(response.products);
    } catch (err) {
      setError('Unable to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <ActivityIndicator
            size="large"
            color="#111827"
          />

          <Text style={styles.loadingText}>
            Loading products...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.errorText}>
            {error}
          </Text>

          <Text
            style={styles.retryText}
            onPress={loadProducts}>
            Tap to retry
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>

      {/* Background */}
      <BackgroundGradient />

      <SafeAreaView
        style={styles.container1}
        edges={['top']}>

        <View style={styles.header}>

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
            Shop
          </Text>

        </View>

        <FlashList
          key={`shop-products-${numColumns}`}
          data={products}
          keyExtractor={item => item.id.toString()}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
  <View style={styles.cardWrapper}>
    <ProductCard
      product={item}
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.id,
        })
      }
    />
  </View>
)}
        />

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container1: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
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

  list: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

 cardWrapper: {
  flex: 1,
  paddingHorizontal: 5,
  paddingBottom: 10,
},

  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  errorText: {
    fontSize: 16,
    color: '#EF4444',
    fontFamily: 'Poppins-Regular',
  },

  retryText: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    fontFamily: 'Poppins-Regular',
  },
});

export default Shop;
