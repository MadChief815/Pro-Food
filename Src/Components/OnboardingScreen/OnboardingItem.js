import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Custom Components
import { Colors } from '../../Styles/Colors';

// StatusBar Height
const statusBarHeight = StatusBar.currentHeight;

const OnboardingItem = ({ item, paginator }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={[styles.container, { width, height }]}>
      {/* Fullscreen Image */}
      <ImageBackground
        source={item.image}
        style={[styles.imageBackground, { width, height: height + statusBarHeight }]}
        resizeMode="cover"
      >
        {/* Orange Box */}
        <View style={styles.overlayContainer}>
          <View style={styles.box}>

            {/* Texts */}
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            {/* Paginator */}
            <View style={{ marginTop: hp(0) }}>{paginator}</View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: hp(4.1),
  },
  box: {
    backgroundColor: Colors.PrimaryOrange,
    height: hp(48),
    width: '100%',
    borderRadius: hp(6.15),
    marginBottom: statusBarHeight ,
    justifyContent: 'space-between',
  },
  textWrapper: {
    paddingTop: hp(4),
    paddingHorizontal: hp(4.1),
  },
  title: {
    fontFamily: 'PExtraBold',
    color: Colors.Neutral10,
    textAlign: 'center',
    fontSize: hp(3.1),
    marginBottom: hp(1.2),
  },
  description: {
    fontFamily: 'PRegular',
    color: Colors.Neutral10,
    textAlign: 'center',
    fontSize: hp(1.8),
  },
});

export default OnboardingItem;
