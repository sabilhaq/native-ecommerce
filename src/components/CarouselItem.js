import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const CarouselItem = ({item, index}) => {
  return (
    <View style={styles.container} key={index}>
      <Image source={{uri: item.imgUrl}} style={styles.image} />

      <Text style={styles.header}>TES</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  image: {},
  header: {},
});

export default CarouselItem;
