import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeNavigator from './HomeNavigator';
import QRScreen from '../screens/QRScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='HomeNav'
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name='QRNav'
        component={QRScreen}
        options={{
          title: 'My Royal',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='qrcode' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='HomeNav'
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
