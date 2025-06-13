import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Screens
import HomeScreen from '../Src/Screens/TabBarScreens/HomeScreen';
import CartScreen from '../Src/Screens/TabBarScreens/CartScreen';
import ProfileScreen from '../Src/Screens/TabBarScreens/ProfileScreen';

// SVGs
import CartIcon from "../assets/SVG/TabBar/cart.svg";
import HomeIcon from "../assets/SVG/TabBar/home.svg";
import ProfileIcon from "../assets/SVG/TabBar/profile.svg";
import FocusedCartIcon from "../assets/SVG/TabBar/Fcart.svg";
import FocusedHomeIcon from "../assets/SVG/TabBar/Fhome.svg";
import FocusedProfileIcon from "../assets/SVG/TabBar/Fprofile.svg";

export default function CustomTabView() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home' },
    { key: 'cart', title: 'Cart' },
    { key: 'profile', title: 'Profile' },
  ]);

  // Pass isFocused to each screen
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <HomeScreen isFocused={index === 0} />;
      case 'cart':
        return <CartScreen isFocused={index === 1} />;
      case 'profile':
        return <ProfileScreen isFocused={index === 2} />;
      default:
        return null;
    }
  };

  const renderIcon = (route, focused) => {
    if (route.key === 'home') {
      return focused ? <FocusedHomeIcon width={hp(3.1)} height={hp(3.1)} /> : <HomeIcon width={hp(3.1)} height={hp(3.1)} />;
    } else if (route.key === 'cart') {
      return focused ? <FocusedCartIcon width={hp(3.1)} height={hp(3.1)} /> : <CartIcon width={hp(3.1)} height={hp(3.1)} />;
    } else if (route.key === 'profile') {
      return focused ? <FocusedProfileIcon width={hp(3.1)} height={hp(3.1)} /> : <ProfileIcon width={hp(3.1)} height={hp(3.1)} />;
    }
    return null;
  };

  const renderTabBar = props => (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route, i) => {
        const focused = index === i;
        return (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => setIndex(i)}
            activeOpacity={0.7}
          >
            {renderIcon(route, focused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={() => null} // Hide default tab bar
        swipeEnabled
      />
      {renderTabBar({ navigationState: { index, routes } })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabBar: {
    flexDirection: 'row',
    height: hp(8),
    borderTopLeftRadius: hp(2.6),
    borderTopRightRadius: hp(2.6),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -2 },
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp(1.5),
  },
});