import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../services/api';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

export default function Login({navigation}) {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = () => {
    request
      .post('auth', {
        email: input.email,
        password: input.password,
      })
      .then(function (response) {
        AsyncStorage?.setItem('userId', response.data.userId);
        AsyncStorage?.setItem('email', response.data.email);
        AsyncStorage?.setItem('token', response.data.token);
        setInput({
          email: '',
          password: '',
        });
        navigation.navigate('Home');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Native E-Commerce</Text>
      <View style={styles.form}>
        <View style={styles.inputs}>
          <TextInput
            underlineColorAndroid={'gray'}
            onChangeText={text => setInput({...input, email: text})}
            placeholder="Email"
          />
          <TextInput
            secureTextEntry={true}
            underlineColorAndroid={'gray'}
            onChangeText={text => setInput({...input, password: text})}
            placeholder="Password"
          />
        </View>
        <Button title="LOGIN" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    paddingHorizontal: 30,
  },
  inputs: {
    marginVertical: 20,
  },
});
