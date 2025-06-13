import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import LoginScreen from '../Src/Screens/AuthScreens/LoginScreen';
import RegisterScreen from '../Src/Screens/AuthScreens/RegisterScreen';
import ForgotPassScreen from '../Src/Screens/AuthScreens/ForgotPassScreen';
import EmailVerifyScreen from '../Src/Screens/AuthScreens/EmailVerifyScreen';
import AccessLocationScreen from '../Src/Screens/AuthScreens/AccessLocationScreen';
import OnboardingScreen from '../Src/Screens/AuthScreens/OnboardingScreen';
import TermsAndPrivacyScreen from "../Src/Screens/AuthScreens/TermsAndPrivacyScreen";

// Import CustomerTabNavigator from centralized exports
import { CustomerTabNavigator } from './NavigatorExports';

const Stack = createStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding">
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false, animation: "scale_from_center" }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animation: "fade_from_right" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, animation: "fade_from_bottom" }} />
      <Stack.Screen name="ForgotPass" component={ForgotPassScreen} options={{ headerShown: false, animation: "fade_from_bottom" }} />
      <Stack.Screen name="EmailVerify" component={EmailVerifyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AccessLocation" component={AccessLocationScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsPrivacy" component={TermsAndPrivacyScreen} options={{ headerShown: false, animation: "scale_from_center" }} />
      <Stack.Screen name="SellerScreens" component={CustomerTabNavigator} options={{ headerShown: false, animation: "scale_from_center" }} />
    </Stack.Navigator>
  );
}