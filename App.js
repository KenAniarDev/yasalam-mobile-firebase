import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { NativeBaseProvider, Button, Text } from 'native-base';
import useStore from './app/hooks/useStore';
import { HAS_LAUNCHED, MEMBER } from './app/utility/constants';
import WrapperContainer from './app/components/WrapperContainer';
import IntroSlider from './app/screens/IntroSlider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import AppNavigator from './app/navigation/AppNavigator';
import AuthNavigator from './app/navigation/AuthNavigator';
import Loader from './app/components/Loader';

import { getAllFavoritesById } from './app/utility/firebase';

export default function App() {
  // usePreventScreenCapture();
  const hasLaunched = useStore((state) => state.hasLaunched);
  const setHasLaunched = useStore((state) => state.setHasLaunched);
  const member = useStore((state) => state.member);
  const setMember = useStore((state) => state.setMember);
  const setFavorites = useStore((state) => state.setFavorites);
  const [loading, setLoading] = useState(true);

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
  const checkIfLoggedIn = async () => {
    try {
      const value = await AsyncStorage.getItem(MEMBER);
      if (value !== null) {
        setMember(JSON.parse(value));
      }

      const favorites = await getAllFavoritesById(JSON.parse(value).id);
      setFavorites(favorites);
    } catch (e) {
      setMember(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checIfHasLaunched();
    checkIfLoggedIn();
  }, []);
  return (
    <NativeBaseProvider>
      <WrapperContainer>
        {hasLaunched ? (
          <NavigationContainer theme={navigationTheme}>
            {loading ? (
              <Loader />
            ) : (
              <>{member === null ? <AuthNavigator /> : <AppNavigator />}</>
            )}
          </NavigationContainer>
        ) : (
          <IntroSlider />
        )}
      </WrapperContainer>
    </NativeBaseProvider>
  );
}
