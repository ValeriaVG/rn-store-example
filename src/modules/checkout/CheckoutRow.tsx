import React, {useContext} from 'react';
import {Button, Image, Price} from 'components';
import {StyleSheet, Text, View} from 'react-native';
import theme from 'theme';

import {CheckoutItem} from './types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import CheckoutContext from './context';

export default function CheckoutRow({product, quantity}: CheckoutItem) {
  const {removeItem} = useContext(CheckoutContext);
  return (
    <View style={styles.row}>
      <Image src={product.image} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text>
        <Price value={product.price} />{' '}
      </Text>
      <Text>x {quantity}</Text>
      <Button
        onPress={() => removeItem(product.id)}
        style={styles.remove}
        type="alt">
        <FontAwesomeIcon icon={faTimes} size={16} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
  },
  image: {
    width: 40,
    marginRight: 8,
    aspectRatio: 1,
  },
  remove: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 8,

    marginLeft: 8,
    opacity: 0.5,
  },
});
