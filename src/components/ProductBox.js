import React from 'react';
import ProductList from './ProductList';

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function ProductBox() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <React.Fragment>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.addButton}
                onPress={() => console.log('clicked')}>
                <Text style={styles.text}>+</Text>
              </Pressable>
            </View>
            <ProductList />
          </View>
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'gray',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 40,
    height: 40,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 30,
    lineHeight: 36,
    color: 'white',
  },
});
