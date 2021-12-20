import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text, Pressable} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {illustration},
      parallax,
      parallaxProps,
      even,
      isWithButton,
      handleDeletePhoto,
    } = this.props;

    return parallax ? (
      <React.Fragment>
        {isWithButton && (
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.addButton}
              onPress={() => handleDeletePhoto(illustration)}>
              <Text style={styles.text}>x</Text>
            </Pressable>
          </View>
        )}

        <ParallaxImage
          source={{uri: illustration}}
          containerStyle={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}
          style={styles.image}
          parallaxFactor={0.35}
          showSpinner={true}
          spinnerColor={
            even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'
          }
          {...parallaxProps}
        />
      </React.Fragment>
    ) : (
      <Image source={{uri: illustration}} style={styles.image} />
    );
  }

  render() {
    const {
      data: {},
      even,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          // todo: make big photo
        }}>
        <View style={styles.shadow} />
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          {this.image}
        </View>
      </TouchableOpacity>
    );
  }
}
