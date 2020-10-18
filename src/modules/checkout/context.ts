import {Product} from 'modules/products/types';
import {createContext} from 'react';
import {CheckoutItem} from './types';

const CheckoutContext = createContext<{
  items: Array<CheckoutItem>;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
}>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  changeQuantity: () => {},
});
export default CheckoutContext;
