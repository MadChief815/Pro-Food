import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Custom Components
import { Colors } from '../../../Src/Styles/Colors';
import { TextStyles } from '../../../Src/Styles/TextStyles';

const Button = ({ text, icon }) => {
    return (
        <View style={Styles.MainCont}>
            {icon && <View style={Styles.iconWrapper}>{icon}</View>}
            <Text style={[TextStyles.SB16N10, { textAlign: "center" }]}>{text}</Text>
        </View>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        height: hp(6.7),
        backgroundColor: Colors.PrimaryOrange,
        borderRadius: hp(12.8),
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    iconWrapper: {
        paddingRight: hp(1)
    }
});

export default Button;