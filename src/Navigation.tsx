import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faStoreAlt,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import ProductsStack from './modules/products/ProductsStack';
import SearchStack from './modules/search/SearchStack';
import ProfileStack from './modules/profile/ProfileStack';
import CheckoutStack from './modules/checkout/CheckoutStack';
import theme from './theme';
import CheckoutContext from 'modules/checkout/context';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const {items} = useContext(CheckoutContext);
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        tabBarOptions={{
          tabStyle: {marginTop: 8, height: 48},
        }}
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            const icon: IconDefinition = ({
              Products: faStoreAlt,
              Search: faSearch,
              Profile: faUser,
              Checkout: faShoppingCart,
            } as any)[route.name];
            return <FontAwesomeIcon icon={icon} color={color} size={size} />;
          },
        })}>
        <Tab.Screen name="Products" component={ProductsStack} />
        <Tab.Screen name="Profile" component={ProfileStack} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen
          name="Checkout"
          component={CheckoutStack}
          options={items.length ? {tabBarBadge: items.length} : {}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
