import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator();
export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={SearchScreen} name="Search" />
    </Stack.Navigator>
  );
}
