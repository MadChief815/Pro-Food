import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    logout,
    selectUserData,
    setUserLogged,
    setUserEmail,
    setUserName
} from '../../../Src/Context/Redux/mainSlice';

// Zustand
import AuthStackStore from '../../Context/Zustand/ZustandStore';

// Custom Components
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import Header from "../../Components/Header/header";

// Images
import NoImage from "../../../assets/Images/ProfileScreen/noimage.png";

// SVGs
import CameraIcon from "../../../assets/SVG/ProfileScreen/camera.svg";
import OutIcon from "../../../assets/SVG/ProfileScreen/out.svg";
import ArrowIcon from "../../../assets/SVG/ProfileScreen/arrow.svg";
import ProfileIcon from "../../../assets/SVG/ProfileScreen/profile.svg";
import SettingsIcon from "../../../assets/SVG/ProfileScreen/settings.svg";
import HelpIcon from "../../../assets/SVG/ProfileScreen/help.svg";
import DeleteIcon from "../../../assets/SVG/ProfileScreen/delete.svg";

const ProfileScreen = ({ isFocused }) => {

    // Orders
    const orders = AuthStackStore(state => state.orders);

    // Redux
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);

    // Navigation
    const navigation = useNavigation();

    // User Image
    const uploadedImage = AuthStackStore((state) => state.uploadedImage);
    const loadUploadedImage = AuthStackStore((state) => state.loadUploadedImage);

    useEffect(() => {
        loadUploadedImage();
    }, []);


    // Handle Logout
    const handleLogout = () => {
        // Clear Redux state
        dispatch(logout());
        dispatch(setUserName(''));
        dispatch(setUserEmail(''));
        dispatch(setUserLogged(false));

        // Navigate to LogOut screen
        navigation.replace('LogOut');
    };

    // Handle Maintain
    const handleMaintain = () => {
        Toast.show({
            type: 'error',
            text1: 'Under Maintenance',
            text2: 'This feature is currently unavailable.',
        });
    };

    return (
        <ScrollView contentContainerStyle={Styles.MainCont} scrollEventThrottle={8}>
            {/* Statusbar */}
            {isFocused && (
                <StatusBar
                    backgroundColor={"transparent"}
                    barStyle={isFocused ? "dark-content" : "light-content"}
                    translucent={true}
                />
            )}
            {/* Header */}
            <Header title={"Profile Settings"} icon={false} />
            {/* Profile Picture */}
            <View style={{ alignItems: "center", paddingTop: hp(3), paddingBottom: hp(2) }}>
                {uploadedImage ? (
                    <Image source={{ uri: uploadedImage }} style={Styles.image} />
                ) : (
                    <Image
                        source={NoImage}
                        style={Styles.image}
                        resizeMode="stretch"
                    />
                )}
            </View>
            {/* UserName */}
            <Text style={[TextStyles.SB16N100, { textAlign: "center" }]}>{userData.userName}</Text>
            {/* User Email */}
            <Text style={[TextStyles.R14N60, { textAlign: "center" }]}>{userData.userEmail}</Text>
            {/* Order List */}
            <View style={Styles.OrdersCont}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={[TextStyles.SB16N100]}>My Orders</Text>
                    {orders.length >= 1 ? (
                        <Text style={[TextStyles.M16Orange]}>See All</Text>
                    ) : (
                        null
                    )}

                </View>
                {orders.length >= 1 ? (
                    <View style={{ flexDirection: "row", paddingTop: hp(2), justifyContent: "space-between", paddingBottom: hp(2.5) }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={[TextStyles.SB12N60]}>Order ID: </Text>
                            <Text style={[TextStyles.SB12N100]}>88888888</Text>
                        </View>
                        <View style={Styles.DeliveryCont}>
                            <Text style={[TextStyles.M10N10, { paddingVertical: hp(0.5), paddingHorizontal: hp(1) }]}>In Delivery</Text>
                        </View>
                    </View>
                ) : (
                    <Text style={[TextStyles.SB14Red, { textAlign: "center", paddingVertical: hp(1) }]}>
                        No Orders Available
                    </Text>
                )}
            </View>

            {/* Stoke */}
            <View style={{
                height: 2,
                backgroundColor: Colors.Neutral30,
                marginHorizontal: hp(3),
                marginBottom: hp(3)

            }} />

            {/* Profile Container */}
            <View style={{ paddingHorizontal: hp(3) }}>
                <Text style={TextStyles.M12N60}>Profile</Text>
                {/* Personal Data */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("Personal")}
                    activeOpacity={0.7}
                    style={Styles.PSCard}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <ProfileIcon height={hp(4)} width={hp(4)} />
                        <Text style={[TextStyles.M14N100, { marginLeft: hp(2) }]}>Personal Data</Text>
                    </View>
                    <ArrowIcon height={hp(3)} width={hp(3)} />
                </TouchableOpacity>
                {/* Settings */}
                <TouchableOpacity
                    // onPress={() => navigation.navigate("Settings")}
                    onPress={handleMaintain}
                    activeOpacity={0.7}
                    style={Styles.PSCard}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <SettingsIcon height={hp(4)} width={hp(4)} />
                        <Text style={[TextStyles.M14N100, { marginLeft: hp(2) }]}>Settings</Text>
                    </View>
                    <ArrowIcon height={hp(3)} width={hp(3)} />
                </TouchableOpacity>
            </View>

            {/* Support Container */}
            <View style={{ paddingHorizontal: hp(3), paddingTop: hp(2) }}>
                <Text style={TextStyles.M12N60}>Profile</Text>
                {/* Help Center */}
                <TouchableOpacity
                    onPress={handleMaintain}
                    // onPress={() => navigation.navigate("HelpCenter")}
                    activeOpacity={0.7}
                    style={Styles.PSCard}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <HelpIcon height={hp(4)} width={hp(4)} />
                        <Text style={[TextStyles.M14N100, { marginLeft: hp(2) }]}>Help Center</Text>
                    </View>
                    <ArrowIcon height={hp(3)} width={hp(3)} />
                </TouchableOpacity>
                {/* Delete Account */}
                <TouchableOpacity
                    onPress={handleMaintain}
                    activeOpacity={0.7}
                    style={Styles.PSCard}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <DeleteIcon height={hp(4)} width={hp(4)} />
                        <Text style={[TextStyles.M14N100, { marginLeft: hp(2) }]}>Request Account Deletion</Text>
                    </View>
                    <ArrowIcon height={hp(3)} width={hp(3)} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.6}
                style={Styles.SignOutBtn}
            >
                <OutIcon width={hp(2.5)} height={hp(2.5)} />
                <Text style={[TextStyles.SB14Red, { marginLeft: hp(1) }]}>Sign Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        backgroundColor: Colors.Neutral10
    },
    image: {
        width: hp(13),
        height: hp(13),
        borderRadius: hp(6.5),
    },
    OrdersCont: {
        marginHorizontal: hp(3),
        marginTop: hp(3),
        marginBottom: hp(3),
        padding: hp(1),
        backgroundColor: Colors.Neutral10,
        elevation: 2,
        borderRadius: hp(1)
    },
    DeliveryCont: {
        backgroundColor: Colors.PrimaryOrange,
        borderRadius: hp(3.7),
        justifyContent: "center",
        alignItems: "center"
    },
    SignOutBtn: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: hp(2),
        borderRadius: hp(12.3),
        borderWidth: 1,
        borderColor: Colors.Neutral40,
        marginHorizontal: hp(3),
        marginBottom: hp(3),
        marginTop: hp(2),
        flexDirection: "row"
    },
    PSCard: {
        height: hp(6),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});


export default ProfileScreen;