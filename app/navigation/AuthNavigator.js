import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import GuestRegisterScreen from "../screens/GuestRegisterScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterTypeScreen from "../screens/RegisterTypeScreen";
import OTPScreen from "../screens/OTPScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import TermsServicesScreen from "../screens/TermsServicesScreen";
import AccountSuccess from "../screens/AccountSuccess";


const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="RegisterType" component={RegisterTypeScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="GuestRegister" component={GuestRegisterScreen} options={{ headerShown: true }} />
    <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: true }} />
    <Stack.Screen name="OTP" component={OTPScreen} />
    <Stack.Screen name="Success" component={AccountSuccess} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    <Stack.Screen name="TermsServices" component={TermsServicesScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
