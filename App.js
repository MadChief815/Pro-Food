import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Main Navigator
import MainNavigator from './Navigators/MainNavigator';

// Redux Store
import { store, persistor } from './Src/Context/Redux/ReduxStore';

// Fonts
import FontLoader from './assets/Fonts/Fonts';

// Custom Components
import { Colors } from './Src/Styles/Colors';

export default function App() {

  // Custom toast config

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: Colors.PrimaryGreen,
          backgroundColor: Colors.Neutral10,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          color: Colors.Neutral90,
          fontWeight: 'bold',
          fontSize: hp(1.8),
        }}
        text2Style={{
          color: Colors.Neutral70,
          fontSize: hp(1.7),
        }}
      />
    ),

    error: (props) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: Colors.PrimaryRed,
          backgroundColor: Colors.Neutral10,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          color: Colors.Neutral90,
          fontWeight: 'bold',
          fontSize: hp(1.8),
        }}
        text2Style={{
          color: Colors.Neutral70,
          fontSize: hp(1.7),
        }}
      />
    ),
  };

  return (
    <FontLoader>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
              <MainNavigator />
            </PersistGate>
          </Provider>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </FontLoader>
  );
}