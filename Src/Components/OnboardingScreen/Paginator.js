import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Custom Components
import { Colors } from '../../Styles/Colors';

// SVGs
import SmallArrow from '../../../assets/SVG/OnboardingScreen/smallarrow.svg';
import OrangeArrow from "../../../assets/SVG/OnboardingScreen/orangearrow.svg";


const PaginatorComponent = ({ data, currentIndex, onNext, onSkip, onStart }) => {
    return (
        <View style={Styles.Container}>
            {/* Pagination Dots */}
            <View style={Styles.DotsContainer}>
                {data.map((_, i) => (
                    <View
                        key={i.toString()}
                        style={[
                            Styles.dot,
                            { opacity: i === currentIndex ? 1 : 0.5 }
                        ]}
                    />
                ))}
            </View>

            {/* Buttons */}
            <View style={{ width: "100%" }}>
                {currentIndex < data.length - 1 ? (
                    <View style={Styles.buttonCont}>
                        {/* Skip Button */}
                        <TouchableOpacity
                            onPress={onSkip}
                            activeOpacity={0.9}
                        >
                            <Text style={Styles.SkipText}>SKIP</Text>
                        </TouchableOpacity>

                        {/* Next Button */}
                        <TouchableOpacity
                            onPress={onNext}
                            activeOpacity={0.9}
                            style={Styles.NextBtn}
                        >
                            <Text style={Styles.NextText}>NEXT</Text>
                            <SmallArrow width={hp(2.6)} height={hp(2.6)} marginLeft={hp(1)} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={Styles.Circle}>
                        <TouchableOpacity
                            onPress={onStart}
                            activeOpacity={0.9}
                            style={Styles.Round}
                        >
                            <OrangeArrow width={hp(3.1)} height={hp(3.1)} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    Container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    DotsContainer: {
        flexDirection: 'row',
    },
    dot: {
        height: hp(0.8),
        width: hp(3.1),
        borderRadius: hp(0.65),
        backgroundColor: Colors.Neutral10,
        marginHorizontal: hp(0.5),
    },
    buttonCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: hp(4.1),
        marginHorizontal: hp(4.1),
        marginTop: hp(11)
    },
    NextBtn: {
        flexDirection: "row",
        alignItems: "center"
    },
    SkipText: {
        color: Colors.Neutral10,
        fontSize: hp(2),
        fontFamily: "PSemiBold",
        paddingTop: hp(0.6)
    },
    NextText: {
        color: Colors.Neutral10,
        fontSize: hp(2),
        fontFamily: "PSemiBold",
        paddingTop: hp(0.6)
    },
    Circle: {
        borderColor: Colors.Neutral10,
        width: hp(11),
        height: hp(11),
        borderWidth: hp(0.2),
        borderRadius: hp(5.5),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginTop: hp(4.1),
        marginBottom: hp(4.1)
    },
    Round: {
        backgroundColor: Colors.Neutral10,
        width: hp(7.8),
        height: hp(7.8),
        borderRadius: hp(3.9),
        justifyContent: "center",
        alignItems: "center"
    },
    GetStartedText: {
        color: Colors.Neutral10,
        fontSize: hp(2),
        fontFamily: "PSemiBold",
        paddingTop: hp(0.6)
    },
});

export default PaginatorComponent;