import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterTypeScreen from '../screens/RegisterTypeScreen';
import OTPScreen from '../screens/OTPScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name='Welcome'
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name='RegisterType' component={RegisterTypeScreen} />
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen
      name='Register'
      component={RegisterScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen name='OTP' component={OTPScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
