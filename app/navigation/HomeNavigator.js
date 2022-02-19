import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import YasalamScreen from '../screens/YasalamScreen'
import HomeScreen from "../screens/HomeScreen";
import RewardsScreen from "../screens/RewardsScreen";
import ExperienceScreen from "../screens/ExperienceScreen";
import OutletYasalamScreen from "../screens/OutletYasalamScreen";


const Stack = createStackNavigator();

const HomeNavigator = () => {

  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Yasalam" component={YasalamScreen} />
      <Stack.Screen name="Experience" component={ExperienceScreen} />
      <Stack.Screen name="Reward" component={RewardsScreen} />
      <Stack.Screen name="OutletYasalam" component={OutletYasalamScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
