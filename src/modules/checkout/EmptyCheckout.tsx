import React from 'react';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {View, Text, StyleSheet} from 'react-native';
import {FormattedMessage} from 'react-intl';

export default function EmptyCheckout() {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faShoppingCart} size={64} />
      <Text style={styles.label}>
        <FormattedMessage id="checkout.empty" />
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
    marginHorizontal: 32,
    alignItems: 'center',
    opacity: 0.5,
  },
  label: {marginTop: 16, fontSize: 18},
});
