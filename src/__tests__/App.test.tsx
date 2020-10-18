/**
 * @format
 */

import 'react-native';
import React from 'react';

import App from '../App';

// Note: test renderer must be required after react-native.
import renderer, {act} from 'react-test-renderer';

jest.useFakeTimers();
describe('App', () => {
  let testRenderer: renderer.ReactTestRenderer;
  let app: App;
  beforeAll(() => {
    act(() => {
      testRenderer = renderer.create(<App />);
    });
    app = testRenderer.getInstance() as any;
  });
  afterAll(() => {
    testRenderer.unmount();
  });
  // To fix not wrapped in act(...) warning
  afterEach(() => act(() => Promise.resolve()));

  it('addToCart', () => {
    act(() => {
      app.setState({cart: []});
      app.addToCart({id: '1'} as any);
    });
    expect(app.state.cart).toMatchObject([{product: {id: '1'}, quantity: 1}]);
    act(() => {
      app.addToCart({id: '1'} as any, 2);
    });
    expect(app.state.cart).toMatchObject([{product: {id: '1'}, quantity: 3}]);
  });
  it('changeQuantity', () => {
    act(() => {
      app.setState({
        cart: [
          {product: {id: '1'} as any, quantity: 3},
          {product: {id: '2'} as any, quantity: 1},
        ],
      });

      app.changeQuantity('1', 1);
    });
    expect(app.state.cart).toMatchObject([
      {product: {id: '1'} as any, quantity: 1},
      {product: {id: '2'} as any, quantity: 1},
    ]);
  });
  it('removeFromCart', () => {
    act(() => {
      app.setState({
        cart: [
          {product: {id: '1'} as any, quantity: 3},
          {product: {id: '2'} as any, quantity: 1},
        ],
      });
      app.removeFromCart('1');
    });
    expect(app.state.cart).toMatchObject([{product: {id: '2'}, quantity: 1}]);
  });
});
