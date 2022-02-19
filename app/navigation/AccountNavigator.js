import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import AddSpouseScreen from "../screens/AddSpouseScreen";
import AddChildScreen from "../screens/AddChildScreen";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Account"component={AccountScreen} />
    <Stack.Screen name="AddSpouse" component={AddSpouseScreen} />
    <Stack.Screen name="AddChild" component={AddChildScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
