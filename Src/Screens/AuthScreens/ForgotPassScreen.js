import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';

// Custom Components
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import CButton from '../../Components/Buttons/Button';
import { forgotSchema } from '../../Components/Validations/validationSchemas';

const statusBarHeight = StatusBar.currentHeight;

const ForgotPassScreen = () => {

    // Navigation
    const navigation = useNavigation();

    // Loading
    const [loading, setLoading] = useState(false);

    // Data
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: zodResolver(forgotSchema),
        defaultValues: { email: '' }
    });

    const emailValue = watch("email");
    const isEmailFilled = typeof emailValue === "string" && emailValue.trim() !== "";

    // Reset
    useFocusEffect(
        React.useCallback(() => {
            reset();
            return () => { };
        }, [navigation, reset])
    );

    // Handle Reset
    const handleForgotPass = async (data) => {
        setLoading(true);
        try {
            Toast.show({
                type: 'error',
                text1: 'Under Maintenance',
                text2: 'This feature is currently unavailable.',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message
            });
        } finally {
            setLoading(false);
            reset();
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <StatusBar backgroundColor={Colors.Neutral10} barStyle={"dark-content"} />
            <SafeAreaView style={Styles.MainCont}>

                <View>
                    <Text style={[TextStyles.SB32N100, { paddingTop: hp(4.1), paddingHorizontal: hp(3.1) }]}>Forgot password?</Text>
                    <Text style={[TextStyles.M16N60, { paddingTop: hp(1), paddingHorizontal: hp(3.1) }]}>Enter your email address and we’ll send you confirmation code to reset your password</Text>
                </View>

                {/* Email */}
                <Text style={[TextStyles.M16N100, {
                    paddingTop: hp(4.1),
                    paddingLeft: hp(3.1)
                }]}>Email Address</Text>

                <View style={{ paddingHorizontal: hp(3.1), paddingTop: hp(1) }}>
                    <View style={Styles.emailinputCont}>
                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput
                                    style={[
                                        TextStyles.M16N60,
                                        value.length > 0 && TextStyles.M16N100,
                                        { paddingHorizontal: hp(2.05) }
                                    ]}
                                    placeholder='Enter Email'
                                    placeholderTextColor={Colors.Neutral60}
                                    value={value}
                                    onChangeText={onChange}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                />
                            )}
                        />
                    </View>
                    {errors.email && <Text style={{ color: 'red', marginTop: 2 }}>{errors.email.message}</Text>}
                </View>

                {/* Send Link Button */}
                {!loading ? (
                    <TouchableOpacity
                        onPress={handleSubmit(handleForgotPass)}
                        disabled={!isEmailFilled}
                        style={{ marginTop: hp(4.1), marginBottom: hp(3), marginHorizontal: hp(3.1), opacity: isEmailFilled ? 0.9 : 0.5 }}
                        activeOpacity={0.8}
                    >
                        <CButton text="Send Link" />
                    </TouchableOpacity>
                ) : (
                    <View
                        style={{
                            marginVertical: hp(3.1),
                            marginHorizontal: hp(3.1),
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: hp(6.6)
                        }}
                    >
                        <ActivityIndicator size="large" color={Colors.PrimaryOrange} />
                    </View>
                )}


                {/* Back to Login */}
                <Text style={[TextStyles.M16N60, { textAlign: "center" }]}>Or</Text>
                <View style={Styles.signupContainer}>
                    <Text style={TextStyles.M16N60}>Remember your password? </Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={TextStyles.M16Orange}>Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        flex: 1,
        backgroundColor: Colors.Neutral10,
        paddingTop: statusBarHeight
    },
    emailinputCont: {
        height: hp(6.6),
        borderRadius: hp(1),
        borderWidth: hp(0.1),
        borderColor: Colors.Neutral40,
        justifyContent: "center",
        // paddingTop: hp(1)
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: hp(1)
    },
});

export default ForgotPassScreen;