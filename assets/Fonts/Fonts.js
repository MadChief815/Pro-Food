import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'PBold': require("./Poppins-Bold.ttf"),
    'PSemiBold': require("./Poppins-SemiBold.ttf"),
    'PMedium': require("./Poppins-Medium.ttf"),
    'PBlack': require("./Poppins-Black.ttf"),
    'PExtraBold': require("./Poppins-ExtraBold.ttf"),
    'PExtraLight': require("./Poppins-ExtraLight.ttf"),
    'PLight': require("./Poppins-Light.ttf"),
    'PRegular': require("./Poppins-Regular.ttf"),
    'PThin': require("./Poppins-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FontLoader;
