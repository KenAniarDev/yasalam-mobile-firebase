import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { NativeBaseProvider, Button, Text } from 'native-base';
import useStore from './app/hooks/useStore';
import { HAS_LAUNCHED } from './app/utility/constants';
import WrapperContainer from './app/components/WrapperContainer';
import IntroSlider from './app/screens/IntroSlider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';

export default function App() {
  // usePreventScreenCapture();
  const hasLaunched = useStore((state) => state.hasLaunched);
  const setHasLaunched = useStore((state) => state.setHasLaunched);

  const checIfHasLaunched = async () => {
    try {
      const value = await AsyncStorage.getItem(HAS_LAUNCHED);
      if (value !== null) {
        setHasLaunched(true);
      }
    } catch (e) {
      setHasLaunched(true);
    }
  };

  useEffect(() => {
    checIfHasLaunched();
  }, []);
  return (
    <NativeBaseProvider>
      <WrapperContainer>
        {hasLaunched ? (
          <NavigationContainer theme={navigationTheme}>
            <AppNavigator />
          </NavigationContainer>
        ) : (
          <IntroSlider />
        )}
      </WrapperContainer>
    </NativeBaseProvider>
  );
}
