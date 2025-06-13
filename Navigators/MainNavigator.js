import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    Image,
    StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

// Custom Navigators
import AuthStackNavigator from './AuthStackNavigator';
import CustomerTabNavigator from './CustomerTabNavigator';

// Images
import AppLogo from "../assets/Logos/logo.png";

export default function MainNavigator() {

    // Redux Store
    const { userLogged } = useSelector((state) => state.userData);

    // Other Consts
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* Logo */}
                <Image
                    source={AppLogo}
                    style={Styles.Logo}
                />
                {/* Activity Indicaitor */}
                <View style={{ paddingTop: 10 }}>
                    <ActivityIndicator size={hp(4)} color="#FF4500" style={Styles.Indicator} />
                </View>
            </View>
        );
    }

    return userLogged ? (
        <CustomerTabNavigator />
    ) : (
        <AuthStackNavigator />
    );
}

const Styles = StyleSheet.create({
    Indicator: {

    },
    Logo: {
        width: hp(14),
        height: hp(17)
    },
    spiralIMGCont: {
        position: "absolute",
        right: 0,
        bottom: 0
    },
    spiralIMG: {
        width: hp(22),
        height: hp(25)
    }
})