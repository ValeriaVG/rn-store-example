import {RouteProp} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Product} from './types';

import theme from 'theme';
import {Button, Image} from 'components';
import {TextInput} from 'react-native-gesture-handler';
import CheckoutContext from 'modules/checkout/context';

export default function ProductScreen({
  route,
}: {
  route: RouteProp<{product: Product}, 'product'>;
}) {
  const product = route.params;
  const [quantity, setQuantity] = useState('1');
  const numQuantity = parseInt(quantity);
  const price = Number.isNaN(numQuantity)
    ? product.price
    : numQuantity * product.price;

  const {addItem} = useContext(CheckoutContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.screen}>
        <View style={styles.header}>
          <Image src={product.image} style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceBlock}>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
            />
            <Text style={styles.price}>
              <Text style={{fontWeight: 'bold'}}>{price}</Text> kr
            </Text>
            <Button
              style={{flex: 0.5}}
              onPress={() => addItem(product, numQuantity)}>
              <Text>Add to cart </Text>
            </Button>
          </View>
        </View>
        <Text style={styles.description}>{product.description}</Text>
        {Boolean(product.parameters) && (
          <View style={styles.table}>
            {product.parameters?.map(({label, value}, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableHeader}>{label}</Text>
                <Text style={styles.tableCell}>{value}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: theme.colors.card,
  },
  image: {width: '100%', aspectRatio: 16 / 9},
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  description: {
    marginTop: 16,
    marginBottom: 16,
    paddingHorizontal: 32,
  },
  priceBlock: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 0.15,
    textAlign: 'center',
    color: theme.colors.text,
    borderColor: theme.colors.border,
  },
  price: {
    flex: 0.35,
    color: theme.colors.text,
    fontSize: 18,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  table: {
    marginHorizontal: 32,
  },
  tableRow: {
    marginBottom: 4,
    flexDirection: 'row',
  },
  tableHeader: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    flex: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  tableCell: {
    marginLeft: 4,
    flex: 0.5,
    backgroundColor: theme.colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
