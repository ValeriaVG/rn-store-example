import React, {useContext} from 'react';
import {SafeAreaView, FlatList, Text, View} from 'react-native';

import CheckoutContext from './context';
import CheckoutRow from './CheckoutRow';
import EmptyCheckout from './EmptyCheckout';
import {Price} from 'components';
import {FormattedMessage} from 'react-intl';
import CheckoutFooter from './CheckoutFooter';

export default function CheckoutScreen() {
  const {items} = useContext(CheckoutContext);
  const total = items.reduce((a, c) => {
    a += c.product.price * c.quantity;
    return a;
  }, 0);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={{flex: 1}}
        data={items}
        renderItem={({item}) => <CheckoutRow {...item} />}
        keyExtractor={(item) => item.product.id}
        ListEmptyComponent={<EmptyCheckout />}
        ListFooterComponent={
          total ? <CheckoutFooter total={total} /> : undefined
        }
      />
    </SafeAreaView>
  );
}
