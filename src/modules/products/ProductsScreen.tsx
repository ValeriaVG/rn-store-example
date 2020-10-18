import {useQuery} from 'lib/graphql';
import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import ProductCard from './ProductCard';
import PRODUCTS from './queries/PRODUCTS';

export default function ProductsScreen() {
  const {data} = useQuery(PRODUCTS);

  const items = data?.products.items ?? [];
  return (
    <SafeAreaView>
      <FlatList
        data={items}
        renderItem={({item}) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
