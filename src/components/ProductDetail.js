import React, {useEffect} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import Config from 'react-native-config';
import {loadProduct} from '../actions';
import Carousel from './Carousel';
import RenderHTML from 'react-native-render-html';

export default function ProductDetail({route, navigation}) {
  const id = route.params?.id;

  const {product} = useSelector(
    state => ({
      product: state.products.products[0],
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();
  const {width} = useWindowDimensions();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(loadProduct(id));
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, id]);

  const tagsStyles = {
    body: {
      whiteSpace: 'normal',
      color: '#2E2E2E',
      justifyContent: 'flex-start',
      textAlignVertical: 'top',
      borderBottomWidth: 1,
      margin: 8,
      marginTop: 0,
      fontSize: 16,
      padding: 0,
    },
  };

  const source = {
    html: `<html><head><meta name="viewport" content="user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0"></head><body>${product.detail}</body></html>`,
  };

  const photoList = product.photos?.map(photo => {
    return {
      illustration: `${Config.REACT_APP_BASE_URL}${photo}`,
    };
  });

  if (!product) {
    return <View className="ProductDetail Loading">Loading...</View>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {product.photos && (
          <Carousel carouselImages={photoList} isWithButton={false} />
        )}
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.label}>Title :</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={product.title}
        />

        <Text style={styles.label}>Rate :</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={product.rate.toString()}
        />

        <Text style={styles.label}>Description :</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={product.description}
          multiline={true}
          numberOfLines={1}
        />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={product.price ? product.price.toLocaleString('id-ID') : '0'}
        />

        <Text style={styles.label}>Brand :</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={product.brand}
        />

        <Text style={styles.label}>Detail :</Text>
        <View>
          <ScrollView keyboardShouldPersistTaps="always">
            <RenderHTML
              contentWidth={width}
              source={source}
              tagsStyles={tagsStyles}
            />
          </ScrollView>
        </View>
      </View>

      <View style={styles.backButton}>
        <Button
          color={'gray'}
          title="<    BACK"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  detailContainer: {padding: 20},
  label: {paddingBottom: 5, fontSize: 20, fontWeight: 'bold'},
  input: {
    borderBottomWidth: 1,
    margin: 8,
    marginTop: 0,
    color: '#2E2E2E',
    fontSize: 16,
    padding: 0,
  },
  backButton: {
    backgroundColor: 'gray',
    marginHorizontal: 20,
    paddingVertical: 5,
  },
});
