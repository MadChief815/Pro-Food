import React, { useState, useEffect } from 'react';
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
    ActivityIndicator,
    BackHandler
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Toast from 'react-native-toast-message';

// Custom Components
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import CButton from '../../Components/Buttons/Button';
import { registerSchema } from '../../Components/Validations/validationSchemas';

// Redux Store
import { useDispatch } from 'react-redux';
import { setUserName, setUserEmail, setUserLogged } from '../../Context/Redux/mainSlice';

// Zustand Store
import AuthStackStore from "../../../Src/Context//Zustand/ZustandStore";

// SVGs
import VisibleIcon from "../../../assets/SVG/visible.svg";
import InvisibleIcon from "../../../assets/SVG/invisible.svg";
import FBIcon from "../../../assets/SVG/SocailSVGs/facebook.svg";
import GoogleIcon from "../../../assets/SVG/SocailSVGs/google.svg";
import AppleIcon from "../../../assets/SVG/SocailSVGs/apple.svg";
import TickIcon from "../../../assets/SVG/RegisterScreen/tick.svg";

// Status Bar Height
const statusBarHeight = StatusBar.currentHeight;

// Input Field
const InputField = ({ label, placeholder, isPassword, visibility, isTyping, value, onChangeText, toggleVisibility }) => (
    <>
        <Text style={[TextStyles.M16N100, { paddingTop: hp(1.8), paddingLeft: hp(3.1) }]}>{label}</Text>
        <View style={{ paddingHorizontal: hp(3.1), paddingTop: hp(1) }}>
            <View style={isPassword ? Styles.passinputCont : Styles.emailinputCont}>
                <TextInput
                    style={[
                        TextStyles.M16N60,
                        isTyping && TextStyles.M16N100,
                        { paddingLeft: hp(2.05), fontSize: hp(2), width: isPassword ? "90%" : "100%" }
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.Neutral60}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isPassword && !visibility}
                    maxLength={isPassword ? 16 : undefined}
                />
                {isPassword && isTyping && (
                    <Pressable onPress={toggleVisibility} style={{ paddingRight: hp(2.05), }}>
                        {visibility ? <InvisibleIcon width={hp(2.6)} height={hp(2.6)} /> : <VisibleIcon width={hp(2.6)} height={hp(2.6)} />}
                    </Pressable>
                )}
            </View>
        </View>
    </>
);

const RegisterScreen = () => {

    // Loading
    const [loading, setLoading] = useState(false);

    // Data
    const [visibility, setVisibility] = useState({ password: false });
    const navigation = useNavigation();

    // Zustand
    const isChecked = AuthStackStore((state) => state.isChecked);
    const setIsChecked = AuthStackStore((state) => state.setIsChecked);

    // react-hook-form
    const { control, handleSubmit, formState: { errors }, reset, watch } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: { username: '', email: '', password: '' }
    });

    // All Values Check
    const watchedFields = watch();
    const allValuesFilled = ['email', 'password', 'username'].every(
        key => typeof watchedFields[key] === 'string' && watchedFields[key].trim() !== ''
    );


    // Handle visibility toggling
    const toggleVisibility = (field) => {
        setVisibility((prevState) => ({ ...prevState, [field]: !prevState[field] }));
    };

    // Handle Terms & Privacy
    const handleTermsAndPrivacy = () => {
        navigation.navigate("TermsPrivacy")
    };

    // Handle Go Back
    const handleGoBack = () => {
        setIsChecked(false);
        navigation.goBack();
    };

    // Back Handler
    useEffect(() => {
        const backAction = () => {
            setIsChecked(false)
            return false
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        )
        return () => backHandler.remove()
    }, [])

    // Redux
    const dispatch = useDispatch();

    // Register handler
    const handleRegister = async (data) => {
        if (!isChecked) {
            Toast.show({
                type: 'error',
                text1: 'Terms & Privacy',
                text2: 'Please agree to Terms and Privacy to proceed.',
            });
            return;
        }

        setLoading(true);

        try {

            dispatch(setUserEmail(data.email));
            dispatch(setUserName(data.username));
            dispatch(setUserLogged(true));

            // 5. Show success toast and navigate
            Toast.show({ type: 'success', text1: 'Account created successfully!' });
            navigation.replace('SellerScreens');
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Registration Failed',
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

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <SafeAreaView style={Styles.MainCont}>
                <StatusBar backgroundColor={Colors.Neutral10} barStyle={"dark-content"} />

                {/* Title & Description */}
                <Text style={[TextStyles.SB32N100, { paddingTop: hp(4.1), paddingHorizontal: hp(3.1) }]}>Get Started by Registering</Text>
                <Text style={[TextStyles.M16N60, { paddingTop: hp(1), paddingHorizontal: hp(3.1) }]}>Create an account to order food from our restaurants.</Text>

                {/* Form */}
                {/* Email */}
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Email Address"
                            placeholder="Enter Email"
                            value={value}
                            isTyping={!!value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.email && <Text style={{ color: 'red', marginLeft: hp(3.1), marginTop: 2 }}>{errors.email.message}</Text>}

                {/* Full Name */}
                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="User Name"
                            placeholder="Enter Name"
                            value={value}
                            isTyping={!!value}
                            onChangeText={onChange}
                        />
                    )}
                />
                {errors.username && <Text style={{ color: 'red', marginLeft: hp(3.1), marginTop: 2 }}>{errors.username.message}</Text>}

                {/* Password */}
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Password"
                            placeholder="Enter Password"
                            value={value}
                            isTyping={!!value}
                            isPassword={true}
                            visibility={visibility.password}
                            onChangeText={onChange}
                            toggleVisibility={() => toggleVisibility('password')}
                        />
                    )}
                />
                {errors.password && <Text style={{ color: 'red', marginLeft: hp(3.1), marginTop: 2 }}>{errors.password.message}</Text>}

                {/* Terms & Conditions */}
                <View style={Styles.TermsCont}>
                    {/* Tick Button */}
                    <TouchableOpacity
                        onPress={() => setIsChecked(!isChecked)}
                        activeOpacity={0.2}
                        style={[Styles.tickButton, { backgroundColor: isChecked ? Colors.PrimaryOrange : 'transparent' }]}
                    >
                        {isChecked && <TickIcon width={hp(2)} height={hp(2)} />}
                    </TouchableOpacity>
                    {/* Texts */}
                    <View style={{ flexDirection: "row", flexWrap: "wrap", paddingRight: hp(3.1) }}>
                        <Text style={TextStyles.M16N100}>I Agree with </Text>
                        <TouchableOpacity
                            onPress={handleTermsAndPrivacy}
                            activeOpacity={0.7}
                        >
                            <Text style={TextStyles.M16Orange}>Terms of Service</Text>
                        </TouchableOpacity>
                        <Text style={TextStyles.M16N100}> and </Text>
                        <TouchableOpacity
                            onPress={handleTermsAndPrivacy}
                            activeOpacity={0.7}
                        >
                            <Text style={TextStyles.M16Orange}>Privacy Policy</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                    onPress={handleSubmit(handleRegister)}
                    // Disable button if not all fields are filled or loading is true
                    disabled={!allValuesFilled || loading}
                    style={{
                        marginTop: hp(3.1),
                        marginHorizontal: hp(2.05),
                        marginBottom: hp(2.05),
                        opacity: allValuesFilled && !loading ? 0.9 : 0.5
                    }}
                    activeOpacity={0.8}
                >
                    {/* Show ActivityIndicator when loading, else show Register button */}
                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.PrimaryOrange} />
                    ) : (
                        <CButton text="Register" />
                    )}
                </TouchableOpacity>

                {/* Or sign in with Text */}
                <View style={{ flexDirection: "row", paddingHorizontal: hp(3.1), alignItems: "center" }}>
                    {/* Line 1*/}
                    <View style={{ height: hp(0.1), backgroundColor: Colors.Neutral60, flex: 1 }} />
                    {/* Text */}
                    <Text style={[TextStyles.M16N60, { paddingHorizontal: hp(1.8) }]}>Or sign in with</Text>
                    {/* Line 2*/}
                    <View style={{ height: hp(0.1), backgroundColor: Colors.Neutral60, flex: 1 }} />
                </View>

                {/* Other Logins */}
                <View style={Styles.otherLoignsCont}>
                    {/* Facebook */}
                    <TouchableOpacity onPress={handleMaintain} style={Styles.iconRound} activeOpacity={0.3}>
                        <FBIcon width={hp(4.1)} height={hp(4.1)} />
                    </TouchableOpacity>
                    {/* Google */}
                    <TouchableOpacity onPress={handleMaintain} style={[Styles.iconRound, { marginHorizontal: hp(2.05) }]} activeOpacity={0.3}>
                        <GoogleIcon width={hp(4.1)} height={hp(4.1)} />
                    </TouchableOpacity>
                    {/* Apple */}
                    <TouchableOpacity onPress={handleMaintain} style={Styles.iconRound} activeOpacity={0.3}>
                        <AppleIcon width={hp(4.1)} height={hp(4.1)} />
                    </TouchableOpacity>
                </View>

                {/* SignUp Navigation */}
                <View style={Styles.signUpCont}>
                    <Text style={TextStyles.M16N100}>Already registered? </Text>
                    {/* SignUp Navigation */}
                    <TouchableOpacity
                        // onPress={navigation.goBack}
                        onPress={handleGoBack}
                    >
                        <Text style={TextStyles.M16Orange}>Sign In</Text>
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
        borderColor: Colors.Neutral40,
        borderRadius: hp(1),
        borderWidth: hp(0.1),
        height: hp(6.6),
        justifyContent: "center",
        // paddingTop: hp(1)
    },
    passinputCont: {
        borderColor: Colors.Neutral40,
        borderRadius: hp(1),
        borderWidth: hp(0.1),
        height: hp(6.6),
        width: "100%",
        alignContent: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // paddingTop: hp(1)
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
    TermsCont: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: hp(3.1),
        paddingTop: hp(1.8)
    },
    tickButton: {
        width: hp(2.6),
        height: hp(2.6),
        borderRadius: hp(0.5),
        borderWidth: hp(0.1),
        borderColor: Colors.PrimaryOrange,
        justifyContent: "center",
        alignItems: "center",
        marginRight: hp(1),
        marginTop: hp(0.3),
        alignSelf: "flex-start"
    }
});

export default RegisterScreen;