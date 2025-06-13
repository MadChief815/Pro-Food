import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Pressable
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from 'react-native-toast-message';

// Zustand
import AuthStackStore from '../../Context/Zustand/ZustandStore';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import {
    selectUserData,
    setUserGender,
    setUserPhone,
    setUserAddress,
    setUserCity,
    setUserDateofBirth,
    setUserHouseNo,
} from '../../../Src/Context/Redux/mainSlice';

// Custom Component
import Header from '../../Components/Header/header';
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import useImageUploader from '../../Components/ImageUploader/ImageUploader';
import CButton from "../../Components/Buttons/Button"

// Images
import NoImage from "../../../assets/Images/ProfileScreen/noimage.png";

// SVGs
import CameraIcon from "../../../assets/SVG/ProfileScreen/camera.svg";

// InputFields
const InputField = ({ label, placeholder, value, onChangeText, isTyping, editable = true, keyboardType = 'default' }) => (
    <>
        <Text style={[TextStyles.M16N100, { paddingTop: hp(1.8), paddingLeft: hp(3.1) }]}>{label}</Text>
        <View style={{ paddingHorizontal: hp(3.1), paddingTop: hp(1) }}>
            <View style={Styles.emailinputCont}>
                <TextInput
                    style={[
                        TextStyles.M16N60,
                        isTyping && TextStyles.M16N100,
                        { paddingLeft: hp(2.05), fontSize: hp(2), width: "100%" }
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.Neutral60}
                    value={value}
                    onChangeText={onChangeText}
                    editable={editable}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    </>
);

const PersonalScreen = () => {

    // Redux
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);

    // User Image
    const uploadedImage = AuthStackStore((state) => state.uploadedImage);
    const loadUploadedImage = AuthStackStore((state) => state.loadUploadedImage);

    useEffect(() => {
        loadUploadedImage();
    }, []);

    // Handle Image Upload
    const uploadImage = useImageUploader();

    const handleUploadImage = async () => {
        const image = await uploadImage();
        if (image) {
            console.log('Image uploaded:', image.uri);
            // Do something with the image if needed
        }
    };

    // Data
    const [userName, setUserName] = useState(() => userData.userName || '');
    const [dob, setDob] = useState(() => userData.dateofbirth || '');
    const [gender, setGender] = useState(() => userData.gender || '');
    const [address, setAddress] = useState(() => userData.address || '');
    const [houseNo, setHouseNo] = useState(() => userData.houseNo || '');
    const [city, setCity] = useState(() => userData.city || '');
    const [phone, setPhone] = useState(() => userData.phone || '');
    const [email, setEmail] = useState(() => userData.userEmail || '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showGenderModal, setShowGenderModal] = useState(false);

    const handleConfirmDate = (selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const year = selectedDate.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            setDob(formattedDate);
        }
    };

    // Handle Save
    const handleSave = () => {
        dispatch(setUserDateofBirth(dob));
        dispatch(setUserGender(gender));
        dispatch(setUserPhone(phone));
        dispatch(setUserCity(city));
        dispatch(setUserAddress(address));
        dispatch(setUserHouseNo(houseNo));
        Toast.show({
            type: 'success',
            text1: 'Saved',
            text2: 'Data is saved!',
        });
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
        <ScrollView contentContainerStyle={Styles.MainCont}>
            {/* StatusBar */}
            <StatusBar
                backgroundColor={"transparent"}
                barStyle={"dark-content"}
                translucent={true}
            />
            {/* Header */}
            <Header title={"Personal Data"} icon={true} />
            {/* User Profile Picture */}
            <View style={Styles.imageCont}>
                <View>
                    {uploadedImage ? (
                        <Image source={{ uri: uploadedImage }} style={Styles.image} />
                    ) : (
                        <Image
                            source={NoImage}
                            style={Styles.image}
                            resizeMode="stretch"
                        />
                    )}
                    {/* Change Image */}
                    <TouchableOpacity
                        onPress={handleUploadImage}
                        activeOpacity={0.7}
                        style={Styles.uploadImage}
                    >
                        <CameraIcon width={hp(2.6)} height={hp(2.6)} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* User Name */}
            <InputField
                label="User Name"
                placeholder="Enter Name"
                value={userName}
                isTyping={!!userName}
                editable={false}
                onChangeText={setUserName}
            />
            {/* Email */}
            <InputField
                label="Email"
                placeholder="Enter Email"
                value={email}
                isTyping={!!email}
                editable={false}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            {/* Date of Birth */}
            <>
                <Text style={[TextStyles.M16N100, { paddingTop: hp(1.8), paddingLeft: hp(3.1) }]}>Date of Birth</Text>
                <TouchableOpacity
                    style={{ paddingHorizontal: hp(3.1), paddingTop: hp(1) }}
                    onPress={() => setShowDatePicker(true)}
                    activeOpacity={0.7}
                >
                    <View style={Styles.emailinputCont}>
                        <Text style={[
                            TextStyles.M16N60,
                            dob && TextStyles.M16N100,
                            { paddingLeft: hp(2.05), fontSize: hp(2), width: "100%" }
                        ]}>
                            {dob || "DD/MM/YYYY"}
                        </Text>
                    </View>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={showDatePicker}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={() => setShowDatePicker(false)}
                    maximumDate={new Date()}
                    date={dob ? new Date(dob) : new Date()}
                    display="spinner"
                />
            </>
            {/* Gender Selection */}
            <>
                <Text style={[TextStyles.M16N100, { paddingTop: hp(1.8), paddingLeft: hp(3.1) }]}>Gender</Text>
                <TouchableOpacity
                    style={{ paddingHorizontal: hp(3.1), paddingTop: hp(1) }}
                    onPress={() => setShowGenderModal(true)}
                    activeOpacity={0.7}
                >
                    <View style={Styles.emailinputCont}>
                        <Text style={[
                            TextStyles.M16N60,
                            gender && TextStyles.M16N100,
                            { paddingLeft: hp(2.05), fontSize: hp(2), width: "100%" }
                        ]}>
                            {gender || "Select Gender"}
                        </Text>
                    </View>
                </TouchableOpacity>
                <Modal
                    visible={showGenderModal}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setShowGenderModal(false)}
                >
                    <Pressable style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} onPress={() => setShowGenderModal(false)}>
                        <View style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            width: '70%',
                            paddingVertical: 16,
                            alignItems: 'center'
                        }}>
                            {['Male', 'Female'].map(option => (
                                <TouchableOpacity
                                    key={option}
                                    style={{
                                        paddingVertical: 12,
                                        width: '100%',
                                        alignItems: 'center',
                                        backgroundColor: gender === option ? Colors.PrimaryOrange : 'transparent'
                                    }}
                                    onPress={() => {
                                        setGender(option);
                                        setShowGenderModal(false);
                                    }}
                                >
                                    <Text style={{
                                        color: gender === option ? '#fff' : Colors.Neutral100,
                                        fontWeight: gender === option ? 'bold' : 'normal',
                                        fontSize: hp(2)
                                    }}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Pressable>
                </Modal>
            </>
            {/* Phone Number */}
            <InputField
                label="Phone"
                placeholder="Enter Phone No."
                value={phone}
                isTyping={!!phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
            />
            {/* City */}
            <InputField
                label="City"
                placeholder="Enter City Name"
                value={city}
                isTyping={!!city}
                onChangeText={setCity}
            />
            {/* Address */}
            <InputField
                label="Address"
                placeholder="Enter Your Address"
                value={address}
                isTyping={!!address}
                onChangeText={setAddress}
            />
            {/* House No */}
            <InputField
                label="House No."
                placeholder="Enter Your House No."
                value={houseNo}
                isTyping={!!houseNo}
                onChangeText={setHouseNo}
            />

            {/* Save Button */}
            <TouchableOpacity
                onPress={handleSave}
                activeOpacity={0.7}
                style={{ marginHorizontal: hp(3), marginTop: hp(4.4), marginBottom: hp(3) }}
            >
                <CButton text={"Save"} />
            </TouchableOpacity>
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        backgroundColor: Colors.Neutral10
    },
    imageCont: {
        alignItems: "center",
        paddingTop: hp(2),
        paddingBottom: hp(3)
    },
    uploadImage: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: hp(4),
        height: hp(4),
        backgroundColor: Colors.Neutral20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: hp(2)
    },
    image: {
        width: hp(13),
        height: hp(13),
        borderRadius: hp(6.5),
    },
    emailinputCont: {
        borderColor: Colors.Neutral40,
        borderRadius: hp(1),
        borderWidth: hp(0.1),
        height: hp(6.6),
        justifyContent: "center",
    },
});

export default PersonalScreen;