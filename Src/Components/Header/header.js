import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Custom Components
import { TextStyles } from '../../Styles/TextStyles';
import { Colors } from '../../Styles/Colors';

// SVGs
import BackIcon from "../../../assets/SVG/Header/arrow.svg";

// Status Bar Height
const statusbarHeight = StatusBar.currentHeight;

const Header = ({ title, icon = true }) => {

    // Navigation
    const navigation = useNavigation();

    return (
        <View style={Styles.container}>

            {/* Back Icon */}
            {icon && (
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.6}
                    style={Styles.BtnCont}
                >
                    <BackIcon width={hp(3.1)} height={hp(3.1)} />
                </TouchableOpacity>
            )}


            {/* Title */}
            <Text style={[TextStyles.SB16N100, { textAlign: "center", flex: 1 }]}>{title}</Text>

            {/* Mock Icon */}
            {icon && (
                <TouchableOpacity
                    activeOpacity={0.1}
                    style={[Styles.BtnCont, { borderColor: Colors.Neutral10 }]}
                >
                </TouchableOpacity>
            )}

        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        height: hp(7.4),
        flexDirection: "row",
        marginTop: statusbarHeight,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: Colors.Neutral10
    },
    BtnCont: {
        height: hp(4.4),
        width: hp(4.4),
        marginLeft: hp(3),
        borderRadius: hp(2.2),
        borderWidth: 1,
        borderColor: Colors.Neutral30,
        justifyContent: "center",
        alignItems: "center"
    },
});

export default Header;
