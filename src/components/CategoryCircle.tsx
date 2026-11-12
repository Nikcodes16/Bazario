import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  name: string;
  image?: string;
  onPress: () => void;
};

const CategoryCircle = ({name, image, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>🛍️</Text>
        )}
      </View>

      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: 16,
    width: 75,
  },

  circle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  placeholder: {
    fontSize: 28,
  },

  name: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
  },
});

export default CategoryCircle;