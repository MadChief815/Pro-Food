import React from 'react';
import {
  View,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Customer Tab View
import CustomerTabView from "./CustomTabView"

// Custom Components
import { Colors } from '../Src/Styles/Colors';

// Import AuthStackNavigator from centralized exports
import { AuthStackNavigator } from './NavigatorExports';

// Stack Screens
import PaymentScreen from "../Src/Screens/StackScreens/PaymentScreen";
import ItemScreen from "../Src/Screens/StackScreens/ItemScreen";
import PersonalScreen from "../Src/Screens/StackScreens/PersonalScreen";
import SettingsScreen from "../Src/Screens/StackScreens/SettingsScreen";
import HelpCenterScreen from "../Src/Screens/StackScreens/HelpCenterScreen";

const Stack = createStackNavigator();

// Main App Stack
function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
      <Stack.Screen name="LogOut" component={AuthStackNavigator} options={{ headerShown: false, animation: "scale_from_center" }} />
      <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false, animation: "slide_from_bottom" }} />
      <Stack.Screen name="Item" component={ItemScreen} options={{ headerShown: false, animation: "slide_from_bottom" }} />
      <Stack.Screen name="Personal" component={PersonalScreen} options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} options={{ headerShown: false, animation: "slide_from_right" }} />
    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator({ navigation }) {
  return (
   <CustomerTabView />
  );
}

export default function App() {
  return <MainStack />;
}