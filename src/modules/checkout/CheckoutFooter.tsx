import {Button, Price} from 'components';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import {Alert, StyleSheet, Text, View} from 'react-native';
export default function CheckoutFooter({total}: {total: number}) {
  return (
    <View style={{flex: 1}}>
      <View style={styles.row}>
        <Text style={styles.total}>
          <FormattedMessage id="checkout.total" />
        </Text>
        <Text>
          <Price value={total} />
        </Text>
      </View>
      <Button
        style={styles.button}
        onPress={() => Alert.alert('Payment', 'Payment is not implemented')}>
        <FormattedMessage id="checkout.proceed" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  total: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  button: {
    marginHorizontal: 16,
    width: 'auto',
  },
});
