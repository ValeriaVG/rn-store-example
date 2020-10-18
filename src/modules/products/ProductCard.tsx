import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'components';
import {Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import theme from 'theme';
import {Product} from './types';

export default function ProductCard({product}: {product: Product}) {
  const navigator = useNavigation();
  const navigateToProduct = () => navigator.navigate('Product', product);
  return (
    <TouchableOpacity style={styles.card} onPress={navigateToProduct}>
      <Image src={product.image} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.article}>Art. {product.article}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: theme.colors.card,
    padding: 16,
  },
  image: {width: '100%', aspectRatio: 16 / 9},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  article: {
    fontSize: 16,
    opacity: 0.5,
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
