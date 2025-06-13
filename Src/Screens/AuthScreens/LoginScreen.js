import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TextInput,
    Pressable,
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
import { Colors } from '../../../Src/Styles/Colors';
import { TextStyles } from '../../../Src/Styles/TextStyles';
import CButton from '../../Components/Buttons/Button';
import { loginSchema } from '../../Components/Validations/validationSchemas';

// Redux Store
import { useDispatch } from 'react-redux';
import { setUserLogged, setUserEmail, setUserName } from '../../../Src/Context/Redux/mainSlice';

// SVGs
import VisibleIcon from "../../../assets/SVG/visible.svg";
import InvisibleIcon from "../../../assets/SVG/invisible.svg";
import FBIcon from "../../../assets/SVG/SocailSVGs/facebook.svg";
import GoogleIcon from "../../../assets/SVG/SocailSVGs/google.svg";
import AppleIcon from "../../../assets/SVG/SocailSVGs/apple.svg";

// StatusBar Height
const statusBarHeight = StatusBar.currentHeight;

const LoginScreen = () => {

    // Loading
    const [loading, setLoading] = useState(false);

    // Data
    const [visibility, setVisibility] = useState({ password: false });
    const [isTyping, setIsTyping] = useState({ email: false, password: false });

    // Navigation
    const navigation = useNavigation();

    // react-hook-form setup
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '' }
    });

    const emailValue = watch("email");
    const passwordValue = watch("password");

    // Check All Values
    const allValuesFilled = emailValue.trim() !== '' && passwordValue.trim() !== '';

    // Password visibility toggle
    const toggleVisibility = (field) => {
        setVisibility((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    // Redux
    const dispatch = useDispatch();

    // Fetch user data by email
    // async function fetchUserDataByEmail(email) {
    //     try {
    //         const usersRef = collection(db, 'USERS');
    //         const q = query(usersRef, where('email', '==', email));
    //         const querySnapshot = await getDocs(q);

    //         if (querySnapshot.empty) {
    //             console.log('No user found with this email');
    //             // Handle "user not found"
    //             return null;
    //         }

    //         // Assuming email is unique, get the first matching doc
    //         const userDoc = querySnapshot.docs[0];
    //         const userData = userDoc.data();

    //         // Save to Redux:
    //         dispatch(setUserName(userData.username));
    //         dispatch(setUserEmail(userData.email));

    //         return userData;
    //     } catch (error) {
    //         console.error('Error fetching user data:', error);
    //         // handle error properly
    //         return null;
    //     }
    // }

    // Login handler
    const handleLogIn = async (data) => {
        setLoading(true);
        try {
            // Save to Redux:
            dispatch(setUserName("TestUser"));
            dispatch(setUserEmail(emailValue));
            dispatch(setUserLogged(true));

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Login failed!',
                text2: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle Maintain
    const handleMaintain = () => {
        Toast.show({
            type: 'error',
            text1: 'Under Maintenance',
            text2: 'This feature is currently unavailable.',
        });
    };

    // Reset fields when focused
    useFocusEffect(
        React.useCallback(() => {
            reset();
            setIsTyping({ email: false, password: false });
            return () => { };
        }, [navigation, reset])
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={Styles.MainCont}>
                <StatusBar backgroundColor={Colors.Neutral10} barStyle={"dark-content"} />

                {/* Title & Description */}
                <Text style={[TextStyles.SB32N100, { paddingTop: hp(4.1), paddingHorizontal: hp(3.1) }]}>Welcome back!{'\n'}Log in here</Text>
                <Text style={[TextStyles.M16N60, { paddingTop: hp(1), paddingHorizontal: hp(3.1) }]}>Log in to access your account and order from our restaurants</Text>

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
                                        { fontSize: hp(2), width: "100%", paddingLeft: hp(2.05) },
                                        isTyping.email && TextStyles.M16N100 // <-- Add this for color change when typing
                                    ]}
                                    placeholder="Enter Email"
                                    placeholderTextColor="#878787"
                                    value={value}
                                    onChangeText={(text) => {
                                        onChange(text);
                                        setIsTyping((prev) => ({ ...prev, email: text.length > 0 }));
                                    }}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    onBlur={onBlur}
                                />
                            )}
                        />
                    </View>
                    {errors.email && <Text style={{ color: 'red', marginTop: 2 }}>{errors.email.message}</Text>}
                </View>

                {/* Password */}
                <Text style={[TextStyles.M16N100, {
                    paddingTop: hp(1.8),
                    paddingLeft: hp(3.1)
                }]}>Password</Text>

                <View style={{ paddingHorizontal: hp(3.1), paddingTop: hp(1) }}>
                    <View style={Styles.passinputCont}>
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value, onBlur } }) => (
                                <TextInput
                                    style={[
                                        TextStyles.M16N60,
                                        { fontSize: hp(2), width: "90%" },
                                        isTyping.password && TextStyles.M16N100,
                                        { paddingLeft: hp(2.05) }
                                    ]}
                                    placeholder="Enter Password"
                                    placeholderTextColor={Colors.Neutral60}
                                    value={value}
                                    onChangeText={(text) => {
                                        const filteredText = text.replace(/[ ,:*]/g, '');
                                        onChange(filteredText);
                                        setIsTyping((prev) => ({ ...prev, password: filteredText.length > 0 }));
                                    }}
                                    secureTextEntry={!visibility.password}
                                    maxLength={16}
                                    onBlur={onBlur}
                                />
                            )}
                        />
                        {/* Password Visibility Toggle */}
                        <View style={{ justifyContent: "center", paddingRight: hp(2.05) }}>
                            <View style={{ height: hp(2.6), width: hp(2.6) }}>
                                {isTyping.password && (
                                    <Pressable onPress={() => toggleVisibility('password')}>
                                        {visibility.password ? (
                                            <InvisibleIcon width={hp(2.6)} height={hp(2.6)} />
                                        ) : (
                                            <VisibleIcon width={hp(2.6)} height={hp(2.6)} />
                                        )}
                                    </Pressable>
                                )}
                            </View>
                        </View>
                    </View>
                    {errors.password && <Text style={{ color: 'red', marginTop: 2 }}>{errors.password.message}</Text>}
                </View>

                {/* Forgot Pass */}
                <View style={Styles.ForgotpassCont}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ForgotPass")}
                        activeOpacity={0.3}
                    >
                        <Text style={TextStyles.M16Orange}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                {!loading ? (
                    <TouchableOpacity
                        onPress={handleSubmit(handleLogIn)}
                        disabled={!allValuesFilled}
                        style={{
                            marginVertical: hp(3.1),
                            marginHorizontal: hp(3.1),
                            opacity: allValuesFilled ? 0.9 : 0.5
                        }}
                        activeOpacity={0.8}
                    >
                        <CButton text="Sign In" />
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

                {/* Or sign in with Text */}
                <View style={{ flexDirection: "row", paddingHorizontal: hp(3.1), alignItems: "center" }}>
                    <View style={{ height: hp(0.1), backgroundColor: Colors.Neutral60, flex: 1 }} />
                    <Text style={[TextStyles.M16N60, { paddingHorizontal: hp(1.8) }]}>Or sign in with</Text>
                    <View style={{ height: hp(0.1), backgroundColor: Colors.Neutral60, flex: 1 }} />
                </View>

                {/* Other Logins */}
                <View style={Styles.otherLoignsCont}>
                    <TouchableOpacity onPress={handleMaintain} style={Styles.iconRound} activeOpacity={0.7}>
                        <FBIcon width={hp(4.1)} height={hp(4.1)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMaintain} style={[Styles.iconRound, { marginHorizontal: hp(2.05) }]} activeOpacity={0.7}>
                        <GoogleIcon width={hp(4.1)} height={hp(4.1)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleMaintain} style={Styles.iconRound} activeOpacity={0.7}>
                        <AppleIcon width={hp(4.1)} height={hp(4.1)} />
                    </TouchableOpacity>
                </View>

                {/* SignUp Navigation */}
                <View style={Styles.signUpCont}>
                    <Text style={TextStyles.M16N100}>Don't have an account? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={TextStyles.M16Orange}>Register</Text>
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
    passinputCont: {
        borderColor: Colors.Neutral40,
        height: hp(6.6),
        width: "100%",
        borderRadius: hp(1),
        borderWidth: hp(0.1),
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        // paddingTop: hp(1)
    },
    ForgotpassCont: {
        paddingRight: hp(3.1),
        paddingTop: hp(3.1),
        alignItems: "flex-end"
    },
    iconRound: {
        borderColor: Colors.Neutral40,
        height: hp(6.1),
        width: hp(6.1),
        borderRadius: hp(3.05),
        borderWidth: hp(0.1),
        alignItems: "center",
        justifyContent: "center"
    },
    otherLoignsCont: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: hp(3.2),
        paddingBottom: hp(4.1)
    },
    signUpCont: {
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: hp(3.1)
    },
});

export default LoginScreen;