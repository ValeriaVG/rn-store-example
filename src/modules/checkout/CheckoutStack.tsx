import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CheckoutScreen from './CheckoutScreen';

const Stack = createStackNavigator();
export default function CheckoutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={CheckoutScreen} name="Checkout" />
    </Stack.Navigator>
  );
}
