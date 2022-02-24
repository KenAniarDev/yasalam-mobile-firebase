import React from 'react';
import { Text } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/AccountScreen';
import AddSpouseScreen from '../screens/AddSpouseScreen';
import AddChildScreen from '../screens/AddChildScreen';

const Stack = createStackNavigator();

const Spouse = () => (
  <Text>
    <AddSpouseScreen />
  </Text>
);

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name='Account' component={AccountScreen} />
    <Stack.Screen name='AddSpouse' component={AddSpouseScreen} />
    <Stack.Screen name='AddChild' component={AddChildScreen} />
    <Stack.Screen name='NewScreen' component={Spouse} />
  </Stack.Navigator>
);

export default AccountNavigator;
