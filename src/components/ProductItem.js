import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Carousel from './Carousel';

export default function ProductItem(props) {
  let star = 0;
  for (let i = 0; i < 5; i++) {
    star++;
  }

  return (
    <View style={styles.container}>
      {props.photos && (
        <Carousel carouselImages={props.photos} isWithButton={false} />
      )}

      <Text style={styles.titleDiv}>Title : {props.title}</Text>

      <Text style={styles.div}>Rate: {star}</Text>

      <Text style={styles.div}>Description: {props.description}</Text>

      <Text style={styles.priceDiv}>
        Price : {props.price.toLocaleString('id-ID')}
      </Text>

      <View style={styles.horizontalLine} />

      <View style={styles.buttonContainer}>
        <Button
          title="DETAIL ITEM"
          onPress={() => props.navigation.navigate('Detail', {id: props.id})}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 4,
    marginBottom: 20,
    padding: 4,
  },
  photoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    margin: 5,
  },
  image: {width: 200, height: 200},
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 0.4,
    marginBottom: 4,
  },
  div: {
    marginBottom: 10,
  },
  priceDiv: {
    marginBottom: 4,
    fontSize: 20,
  },
  titleDiv: {
    marginBottom: 10,
    fontSize: 20,
  },
});
