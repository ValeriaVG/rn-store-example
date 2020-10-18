import {Product} from 'modules/products/types';

export type CheckoutItem = {
  product: Product;
  quantity: number;
};
