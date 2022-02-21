import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SingleCategoryScreen from '../screens/SingleCategoryScreen';
import YasalamScreen from '../screens/YasalamScreen';
import RewardsScreen from '../screens/RewardsScreen';
import ExperienceScreen from '../screens/ExperienceScreen';
import SingleOutletScreen from '../screens/SingleOutletScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      presentation='presentation'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='SingleCategory' component={SingleCategoryScreen} />
      <Stack.Screen name='Yasalam' component={YasalamScreen} />
      <Stack.Screen name='Experience' component={ExperienceScreen} />
      <Stack.Screen name='Reward' component={RewardsScreen} />
      <Stack.Screen name='SingleOutlet' component={SingleOutletScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
