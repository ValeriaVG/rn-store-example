import React from 'react';
import 'react-native-gesture-handler';

import {IntlProvider} from 'react-intl';
import CheckoutContext from 'modules/checkout/context';
import {CheckoutItem} from 'modules/checkout/types';
import {Product} from 'modules/products/types';
import UserContext from 'modules/profile/context';
import {User} from 'modules/profile/types';
import Navigation from './Navigation';
import locales from './locales';
import getDeviceLocale from 'lib/getDeviceLocale';
import {GraphQLProvider, mockClient} from 'lib/graphql';
import mocks from './mocks';

const client = mockClient(mocks);

export default class App extends React.Component<
  {},
  {cart: Array<CheckoutItem>; user?: User}
> {
  state = {
    user: undefined,
    cart: [],
  };
  locale: keyof typeof locales = 'en';
  constructor(props: any) {
    super(props);
    // To avoid issues in the tests
    try {
      const deviceLocale = getDeviceLocale();
      this.locale = deviceLocale in locales ? deviceLocale : 'en';
    } catch (_) {}
  }
  addToCart = (product: Product, quantity: number = 1) => {
    return this.setState(({cart}) => {
      const item = cart.find((item) => item.product.id === product.id);
      if (!item) return {cart: [...cart, {product, quantity}]};
      item.quantity += quantity;
      return {cart: [...cart]};
    });
  };
  changeQuantity = (id: string, quantity: number) => {
    return this.setState(({cart}) => {
      return {
        cart: cart.map((item) => {
          if (item.product.id === id) {
            return {...item, quantity};
          }
          return item;
        }),
      };
    });
  };
  removeFromCart = (id: string) => {
    return this.setState(({cart}) => {
      return {cart: cart.filter((item) => item.product.id !== id)};
    });
  };
  render() {
    return (
      <GraphQLProvider client={client}>
        <IntlProvider locale={this.locale} messages={locales[this.locale]}>
          <CheckoutContext.Provider
            value={{
              items: this.state.cart,
              addItem: this.addToCart,
              removeItem: this.removeFromCart,
              changeQuantity: this.changeQuantity,
            }}>
            <UserContext.Provider
              value={{
                user: this.state.user,
                setUser: (user) => this.setState({user}),
              }}>
              <Navigation />
            </UserContext.Provider>
          </CheckoutContext.Provider>
        </IntlProvider>
      </GraphQLProvider>
    );
  }
}
