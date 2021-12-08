import React, {useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import Config from 'react-native-config';
import {loadMoreProducts, loadProducts} from '../actions';
import ProductItem from './ProductItem';

export default function ProductList() {
  const {products} = useSelector(
    state => ({
      products: state.products,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts({}));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!products.noData) {
      dispatch(loadMoreProducts({page: products.page + 1}));
    }
  };

  const nodeList = products.products.map(item => {
    const photoList = item.photos?.map(photo => {
      return {
        illustration: `${Config.REACT_APP_BASE_URL}${photo}`,
      };
    });

    return (
      <ProductItem
        key={item.id}
        id={item.id}
        title={item.title}
        sent={item.sent}
        rate={item.rate}
        description={item.description}
        price={item.price}
        photos={photoList}
        UserId={item.UserId}
      />
    );
  });

  if (nodeList.length === 0) {
    return (
      <View className="ProductList NoData">
        <View className="">
          <Text>Tidak ada data</Text>
        </View>
      </View>
    );
  }

  return (
    <React.Fragment>
      <View className="ProductList">{nodeList}</View>

      <View>
        {!products.noData && (
          <Button title="Load more" onPress={handleLoadMore} />
        )}
      </View>
    </React.Fragment>
  );
}
