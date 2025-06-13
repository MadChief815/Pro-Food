import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Alert,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Zustand Store
import AuthStackStore from "../../../Src/Context//Zustand/ZustandStore";

// Custom Components
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import CButton from '../../Components/Buttons/SmallButton';

const TermsAndPrivacy = () => {

    // Navigation
    const navigation = useNavigation();

    // Handle Agree
    const { setIsChecked } = AuthStackStore();
    const handleAgree = () => {
        setIsChecked(true);
        navigation.goBack('Register');
    };

    // StatusBar Height
    const statusBarHeight = StatusBar.currentHeight;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: statusBarHeight }}>
            <StatusBar backgroundColor={Colors.Neutral10} barStyle={"dark-content"} />
            <SafeAreaView style={Styles.MainCont}>

                {/* Terms and Service */}
                <View style={{ paddingHorizontal: hp(3.1), paddingTop: hp(3) }}>
                    <Text style={[TextStyles.SB24N100, { textAlign: "center" }]}>Terms of Service</Text>
                    <Text style={[TextStyles.M16N70, { textAlign: "center" }]}>By using this app, you agree to use it responsibly and only for its intended purpose—finding and ordering food from local restaurants. You are responsible for keeping your account secure, and any activity under your account is your responsibility. Orders placed through the app are considered final, and accurate payment and location information are essential for successful delivery and service.</Text>
                    <Text style={[TextStyles.M16N70, { textAlign: "center" }]}>We reserve the right to update or modify these terms at any time, and continued use of the app after any changes means you accept those updates. We may also suspend or terminate accounts that violate our policies or abuse the service. All content within the app, including text, graphics, and branding, remains the intellectual property of Pro Food and may not be reused without permission.</Text>
                </View>

                {/* Privacy Policy */}
                <View style={{ paddingHorizontal: hp(3.1), paddingTop: hp(3.1) }}>
                    <Text style={[TextStyles.SB24N100, { textAlign: "center" }]}>Privacy Policy</Text>
                    <Text style={[TextStyles.M16N70, { textAlign: "center" }]}>We value your privacy. When you use our app, we collect basic information such as your name, phone number, email, location, and payment data to provide services like placing orders, sending updates, and improving your overall experience. This data is handled securely and is never sold or shared beyond what’s needed to deliver your order or support your account.</Text>
                    <Text style={[TextStyles.M16N70, { textAlign: "center" }]}>Your data is protected using secure servers and encryption where applicable. You can update or delete your personal information anytime by contacting support. By using our app, you consent to this policy, which may occasionally be updated. We'll notify you of significant changes directly through the app.</Text>
                </View>

                {/* Buttons */}
                <View style={{ flexDirection: "row", paddingTop: hp(3.1), paddingHorizontal: hp(2.05), paddingBottom: hp(3.1) }}>
                    {/* Cancel Button */}
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ flex: 1, marginRight: hp(2.05) }}
                        activeOpacity={0.8}
                    >
                        <CButton 
                            text="Cancel"
                            textcolor={Colors.Neutral100}
                            color={Colors.Neutral10}
                            bordercolor={Colors.Neutral50}
                            borderwidth={hp(0.15)}
                        />
                    </TouchableOpacity>
                    {/* Agree Button */}
                    <TouchableOpacity
                        onPress={handleAgree}
                        style={{ flex: 1 }}
                        activeOpacity={0.8}
                    >
                        <CButton text="Agree" />
                    </TouchableOpacity>
                </View>
            
            </SafeAreaView>
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        flex: 1,
        backgroundColor: Colors.Neutral10
    }
});

export default TermsAndPrivacy;