import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export default function ProductBox({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handlePress = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      return navigation.navigate('Login');
    }
    navigation.navigate('Form');
  };

  return (
    <React.Fragment>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.addButton} onPress={handlePress}>
            <Text style={styles.text}>+</Text>
          </Pressable>
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <ProductList navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    zIndex: 99,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 27,
    width: 54,
    height: 54,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 50,
    lineHeight: 55,
    color: 'white',
  },
});
