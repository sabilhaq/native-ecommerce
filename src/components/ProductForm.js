import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {addProduct} from '../actions';
import request from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import Carousel from './Carousel';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';

const includeExtra = true;

export default function ProductForm({navigation}) {
  useEffect(() => {
    const getData = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId !== null) {
          setInput({...input, userId});
        }
      } catch (e) {
        console.error(e);
      }
    };
    getData();
  }, [input]);

  const richText = useRef();
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [response, setResponse] = useState([]);
  const [error, setError] = useState({
    title: null,
    price: null,
    quantity: null,
  });
  const [input, setInput] = useState({
    title: '',
    rate: 0,
    description: '',
    price: 1000,
    brand: '',
    detail: '',
    quantity: 1,
    images: [],
    userId: '',
  });

  const toCurrency = number => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    });

    return formatter.format(number);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const nodeList =
    response &&
    response.map(uri => {
      return {
        illustration: uri,
      };
    });

  const handleUpload = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    };

    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled');
      } else if (res.error) {
        console.error(res.error);
      } else {
        const photo = {
          name: res.assets[0].fileName,
          type: res.assets[0].type,
          uri: res.assets[0].uri,
        };

        setInput({...input, images: [...input.images, photo]});

        setResponse([...response, res?.assets[0]?.uri]);
      }
    });
  };

  const [deleteModal, setDeleteModal] = useState('');

  const handleDeletePhoto = uri => {
    setDeleteModal(uri);
    setModalVisible(!modalVisible);
  };

  const handleCancelModal = uri => {
    setDeleteModal('');
    setModalVisible(!modalVisible);
  };

  const handleDeleteModal = uri => {
    const filteredPhotos = input.images.filter(image => {
      return image.uri !== uri;
    });
    const filteredResponse = response.filter(responseUri => {
      return responseUri !== uri;
    });
    setResponse([...filteredResponse]);
    setInput({...input, images: [...filteredPhotos]});
    setModalVisible(!modalVisible);
  };

  const handleSubmit = () => {
    const id = uuidv4();

    if (!input.title) {
      setError({...error, title: 'Title required.'});
    }
    if (!input.price) {
      setError({...error, price: 'Minimum price is Rp1.000.'});
    }
    if (!input.quantity) {
      setError({...error, quantity: 'Minimum quanity is 1.'});
    }

    if (input.title && input.price && input.quantity) {
      dispatch(addProduct(id, input));

      if (input.images.length === 0) {
        return navigation.navigate('Home');
      }

      const data = new FormData();

      input.images.forEach(element => {
        data.append('files', element);
      });

      request.put(`products/${id}`, data).then(() => {
        navigation.navigate('Home');
      });
    }
  };

  return (
    <React.Fragment>
      <ScrollView className="ProductForm">
        <Text style={styles.label}>Title</Text>
        <TextInput
          underlineColorAndroid={'gray'}
          onChangeText={text => {
            if (!text) {
              setError({...error, title: 'Title required.'});
            }
            setError({...error, title: null});
            setInput({...input, title: text});
          }}
          name="title"
          value={input.title}
          type="text"
          placeholder="Title"
        />
        {error?.title && <Text style={styles.textError}>{error?.title}</Text>}

        <Text style={styles.label}>Rate</Text>
        <TextInput
          underlineColorAndroid={'gray'}
          onChangeText={text => setInput({...input, rate: Number(text)})}
          name="rate"
          defaultValue={'0'}
          value={input.rate.toString()}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Image</Text>
        {response.length > 0 && (
          <Carousel
            carouselImages={nodeList}
            isWithButton={true}
            handleDeletePhoto={handleDeletePhoto}
          />
        )}

        <Button
          title="&#10003;	  Choose Image"
          color={'#C5C5C5'}
          onPress={handleUpload}
          style={styles.button}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          underlineColorAndroid={'gray'}
          name="description"
          onChangeText={text => setInput({...input, description: text})}
          value={input.description}
          cols="30"
          rows="3"
          placeholder="Description"
        />

        <Text style={styles.label}>Price</Text>
        {isEditing ? (
          <TextInput
            underlineColorAndroid={'gray'}
            keyboardType="phone-pad"
            value={input.price.toString()}
            onBlur={toggleEditing}
            onChangeText={text => {
              if (!text) {
                setError({...error, price: 'Minimum price is Rp1.000.'});
              }
              setError({...error, price: null});
              // eslint-disable-next-line radix
              setInput({...input, price: parseInt(text ? text : 0)});
            }}
          />
        ) : (
          <React.Fragment>
            <TextInput
              underlineColorAndroid={'gray'}
              type="text"
              name="price"
              value={toCurrency(input.price)}
              onFocus={toggleEditing}
              readOnly
            />
            {error?.price && (
              <Text style={styles.textError}>{error?.price}</Text>
            )}
          </React.Fragment>
        )}

        <Text style={styles.label}>Brand</Text>
        <TextInput
          underlineColorAndroid={'gray'}
          onChangeText={text => setInput({...input, brand: text})}
          name="brand"
          value={input.brand}
          type="text"
          placeholder="Brand"
        />

        <Text style={styles.label}>Stock</Text>
        <TextInput
          underlineColorAndroid={'gray'}
          onChangeText={text => {
            if (!text) {
              setError({...error, quantity: 'Minimum quanity is 1.'});
            }
            setError({...error, quantity: null});
            setInput({...input, quantity: Number(text)});
          }}
          name="quantity"
          defaultValue={'1'}
          value={input.quantity.toString()}
          keyboardType="phone-pad"
          placeholder="Stock"
        />
        {error?.quantity && (
          <Text style={styles.textError}>{error?.quantity}</Text>
        )}

        <Text style={styles.label}>Detail Product</Text>
        <RichToolbar
          style={[styles.richBar, false && styles.richBarDark]}
          flatContainerStyle={styles.flatStyle}
          editor={richText}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.undo,
            actions.redo,
          ]}
          disabled={false}
          selectedIconTint={'#2095F2'}
          disabledIconTint={'#bfbfbf'}
        />

        <RichEditor
          disabled={false}
          ref={richText}
          placeholder="Start writing here"
          onChange={text => setInput({...input, detail: text})}
        />

        <Button
          title="&#10003;	  SUBMIT"
          color={'#C5C5C5'}
          onPress={handleSubmit}
          style={styles.button}
        />

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalHeaderText}>Info</Text>
                <Text style={styles.modalText}>You sure want to delete?</Text>
                <View style={styles.buttons}>
                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => handleCancelModal()}>
                    <Text style={styles.textStyle}>CANCEL</Text>
                  </Pressable>
                  <Pressable
                    style={styles.buttonClose}
                    onPress={() => handleDeleteModal(deleteModal)}>
                    <Text style={styles.textStyle}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  label: {fontSize: 16, fontWeight: 'bold'},
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 25,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
  },
  buttonClose: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  textStyle: {
    color: '#00A3A3',
    fontWeight: 'bold',
  },
  modalHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textError: {color: 'red'},
});
