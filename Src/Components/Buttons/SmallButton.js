import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Custom Components
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';

const Button = ({ text, textcolor = Colors.Neutral10, color = Colors.PrimaryOrange, borderwidth = 0, bordercolor = "transparent" }) => {

    return (
        <View style={[Styles.MainCont, {
            backgroundColor: color,
            borderColor: bordercolor,
            borderWidth: borderwidth
        }]}>
            <Text style={[TextStyles.SB16N10, {
                textAlign: "center",
                color: textcolor
            }]}>{text}</Text>
        </View>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        height: hp(6.15),
        borderRadius: hp(12.8),
        justifyContent: "center",
    }
});

export default Button;