
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Search as SearchIcon} from 'lucide-react-native';
import {colors} from '../theme/colors';

interface SearchBarProps {
  onPress: () => void;
  placeholder?: string;
}

const SearchBar = ({
  onPress,
  placeholder = 'Search products...',
}: SearchBarProps) => {
  return (
    <TouchableOpacity
      style={styles.searchBarButton}
      activeOpacity={0.8}
      onPress={onPress}>

      <SearchIcon
        size={20}
        color={colors.primary}
        style={styles.searchIcon}
      />

      <Text style={styles.searchText}>
        {placeholder}
      </Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchBarButton: {
    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#F3F4F6',

    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#7DA2E4',

    paddingHorizontal: 14,
    height: 45,

    width: '100%',
  },

  searchIcon: {
    marginRight: 10,
  },

  searchText: {
    fontSize: 15,
    color: colors.textSecondary || '#9CA3AF',
    fontFamily:'Poppins-Regular'
  },
});

export default SearchBar;

