import checkout from './modules/checkout/locales';
import products from './modules/products/locales';
import profile from './modules/profile/locales';
import search from './modules/search/locales';

const locales = [checkout, products, profile, search].reduce(
  (a, c) => {
    Object.assign(a.en, c.en);
    Object.assign(a.sv, c.sv);
    return a;
  },
  {en: {}, sv: {}},
);

export default locales;
