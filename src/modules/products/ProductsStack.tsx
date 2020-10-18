import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductsScreen from './ProductsScreen';
import ProductScreen from './ProductScreen';
import {Product} from './types';

const Stack = createStackNavigator();
export default function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={ProductsScreen} name="Store Example" />
      <Stack.Screen
        component={ProductScreen}
        name="Product"
        options={({route}) => ({title: (route.params as Product).title})}
      />
    </Stack.Navigator>
  );
}
