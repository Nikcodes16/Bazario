import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ProductShimmer = () => {
  const imageRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const priceRef = useRef<any>(null);

  useEffect(() => {
    imageRef.current?.getAnimated().start();
    titleRef.current?.getAnimated().start();
    priceRef.current?.getAnimated().start();
  }, []);

  return (
    <View style={styles.card}>
      <ShimmerPlaceholder
        ref={imageRef}
        LinearGradient={LinearGradient}
        shimmerColors={['#E8EEF2', '#F7FAFC', '#E8EEF2']}
        duration={1200}
        style={styles.image}
      />

      <ShimmerPlaceholder
        ref={titleRef}
        LinearGradient={LinearGradient}
        shimmerColors={['#E8EEF2', '#F7FAFC', '#E8EEF2']}
        duration={1200}
        style={styles.title}
      />

      <ShimmerPlaceholder
        ref={priceRef}
        LinearGradient={LinearGradient}
        shimmerColors={['#E8EEF2', '#F7FAFC', '#E8EEF2']}
        duration={1200}
        style={styles.price}
      />
    </View>
  );
};

export default ProductShimmer;

const styles = StyleSheet.create({
  card: {
    width: '100%',
    marginBottom: 15,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },

  title: {
    width: '80%',
    height: 16,
    marginTop: 10,
    borderRadius: 6,
  },

  price: {
    width: '40%',
    height: 16,
    marginTop: 8,
    borderRadius: 6,
  },
});