import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, Image } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import useStore from '../hooks/useStore';
import { HAS_LAUNCHED } from '../utility/constants';

async function setAppLaunched() {
  try {
    await AsyncStorage.setItem(HAS_LAUNCHED, 'true');
  } catch (error) {}
}

const IntroSlider = () => {
  const setHasLaunched = useStore((state) => state.setHasLaunched);

  const onDone = () => {
    setAppLaunched();
    setHasLaunched(true);
  };
  const onSkip = () => {
    setAppLaunched();
    setHasLaunched(true);
  };

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 100,
          paddingHorizontal: 30,
        }}
      >
        <Image
          style={{
            resizeMode: 'contain',
            width: item.width,
            height: item.height,
          }}
          source={item.image}
        />
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={RenderItem}
      onDone={onDone}
      showSkipButton={true}
      onSkip={onSkip}
    />
  );
};

export default IntroSlider;

const styles = StyleSheet.create({
  introTextStyle: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
});

const slides = [
  {
    key: 's1',
    text: 'Royal is here  to help you find the perfect spot in any gym close to you!',
    image: require('../assets/slide/slide1.png'),
    backgroundColor: '#D25235',
    width: 400,
    height: 400,
  },
  {
    key: 's2',
    text: 'You are one  click away from SAVING MONEY and earning great DISCOUNTS ',
    image: require('../assets/slide/slide2.png'),
    backgroundColor: '#D25235',
    width: 200,
    height: 200,
  },
  {
    key: 's3',
    text: 'Sign up and start training!',
    image: require('../assets/slide/slide3.png'),
    backgroundColor: '#D25235',
    width: 200,
    height: 200,
  },
];
