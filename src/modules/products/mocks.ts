import faker from 'faker';
import PRODUCTS from './queries/PRODUCTS';

const makeProducts = (num: number) =>
  Array(num)
    .fill({})
    .map((_, i) => {
      return {
        id: faker.random.uuid(),
        image: faker.random.image(),
        article: faker.random.hexaDecimal(6).toUpperCase(),
        title: faker.lorem.sentence(3),
        description: faker.lorem.paragraph(),
        price: faker.random.number(999),
        parameters: Array(faker.random.number(5))
          .fill({})
          .map((_) => ({
            label: faker.random.word(),
            value: faker.random.word(),
          })),
      };
    });

export default {
  [PRODUCTS]: ({limit}: {limit?: number}) => {
    const items = makeProducts(limit || 5);
    return {
      data: {
        products: {
          items,
          nextAfter: items[items.length - 1].id,
        },
      },
    };
  },
};
