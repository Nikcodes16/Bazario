import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View,
  FlatList
} from 'react-native';
import { ArrowLeft, Search as SearchIcon, X } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from './ProductCard'; 
import { colors } from '../theme/colors';

const SearchScreen = ({ navigation, route }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const allProducts = route?.params?.allProducts || [];

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return allProducts.filter((product: any) => {
      const titleMatch = product.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const descMatch = product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return titleMatch || descMatch;
    });
  }, [searchQuery, allProducts]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <ArrowLeft color={colors.text || '#111827'} size={24} />
        </TouchableOpacity>

        <View style={styles.searchBarContainer}>
          <SearchIcon color="#9CA3AF" size={18} style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder="Search products..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <X color="#9CA3AF" size={18} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {searchQuery.trim().length === 0 ? (
              <Text style={styles.placeholderText}>Type to find your favorite products...</Text>
            ) : (
              <Text style={styles.placeholderText}>No products found matching "{searchQuery}"</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    paddingRight: 12,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.text || '#111827',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  list: {
    padding: 16,
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 32,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.textSecondary || '#6B7280',
    textAlign: 'center',
  },
});

export default SearchScreen;
