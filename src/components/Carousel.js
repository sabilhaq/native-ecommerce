import React, {Component} from 'react';
import {View, ScrollView, StatusBar, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../styles/SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, {colors} from '../styles/index.style';

const SLIDER_1_FIRST_ITEM = 1;

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
    };
  }

  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        isWithButton={this.props.isWithButton}
        handleDeletePhoto={this.props.handleDeletePhoto}
      />
    );
  }

  mainExample(number, title) {
    const {slider1ActiveSlide} = this.state;

    return (
      <View style={styles.exampleContainer}>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={this.props.carouselImages}
          // renderItem={this._renderItemWithParallax}
          renderItem={this._renderItemWithParallax.bind(this)}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          onSnapToItem={index => this.setState({slider1ActiveSlide: index})}
        />
        <Pagination
          dotsLength={this.props.carouselImages.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(0, 0, 0, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._slider1Ref}
          tappableDots={!!this._slider1Ref}
        />
      </View>
    );
  }

  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{x: 1, y: 0}}
        endPoint={{x: 0, y: 1}}
        style={styles.gradient}
      />
    );
  }

  render() {
    const example1 = this.mainExample();

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <StatusBar
            translucent={true}
            backgroundColor={'rgba(0, 0, 0, 0.3)'}
            barStyle={'light-content'}
          />
          {this.gradient}
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}>
            {example1}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
