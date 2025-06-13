import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    StatusBar,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';

// Custom Components
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import FoodCategoryList from '../../Components/FoodCategoryList/FoodCategoryList';
import FoodCard from '../../Components/FoodCard/FoodCard';
import CloseButton from "../../Components/Buttons/Button";

// Images
import HomeImage from "../../../assets/Images/HomeScreen/home.png";

// SVGs
import ArrowIcon from "../../../assets/SVG/HomeScreen/arrow.svg";
import LocationIcon from "../../../assets/SVG/HomeScreen/location.svg";
import UpArrowIcon from "../../../assets/SVG/HomeScreen/arrowup.svg";

// Dimensions
const { width, height } = Dimensions.get('window');

const HomeScreen = ({ isFocused }) => {

    // Location
    const [town, setTown] = useState(null);
    const [loading, setLoading] = useState(true);

    // Request Location Permission and Get Current Location
    useEffect(() => {
        (async () => {
            try {
                // Request permissions
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setTown('Permission denied');
                    setLoading(false);
                    return;
                }

                // Get current location
                let location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                // Reverse geocode to get address
                let [place] = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                });

                // Extract town/locality name
                setTown(place.city || place.name || 'Unknown');
            } catch (error) {
                console.error('Error fetching location:', error);
                setTown('Error getting location');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Handle Maintain
    const handleMaintain = () => {
        Toast.show({
            type: 'error',
            text1: 'Under Maintenance',
            text2: 'This feature is currently unavailable.',
        });
    };

    // Modal for All Categories
    const AllCategoriesModal = ({ selectedId, setSelectedId, onClose }) => {
        return (
            <View style={Styles.modalOverlay}>
                <ScrollView contentContainerStyle={Styles.modalContent}>
                    {/* Title */}
                    <View>
                        <Text style={[
                            TextStyles.SB16N100,
                            { paddingBottom: hp(3), textAlign: "center" }
                        ]}>
                            Select A Category
                        </Text>

                        {/* Food List */}
                        <FoodCategoryList
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            showAll={true}
                        />
                    </View>

                    {/* Close Button */}
                    <TouchableOpacity
                        onPress={onClose}
                        activeOpacity={0.6}
                        style={{ marginVertical: hp(1), marginHorizontal: hp(3.1) }}
                    >
                        <CloseButton text={"Close"} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    };

    // Modal State
    const [showAll, setShowAll] = useState(false);
    const [selectedId, setSelectedId] = useState(1); // shared selection state

    const handleOpenModal = () => setShowAll(true);
    const handleCloseModal = () => setShowAll(false);

    // Scroll Settings
    const scrollViewRef = useRef(null);
    const [hideStatusBar, setHideStatusBar] = useState(false);
    const [showScrollTopBtn, setShowScrollTopBtn] = useState(false);

    const handleScroll = (event) => {
        const y = event.nativeEvent.contentOffset.y;
        setHideStatusBar(y > hp(26.35));
        setShowScrollTopBtn(y > 100);
    };

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
            setHideStatusBar(false); // Force status bar to light-content
            setShowScrollTopBtn(false); // Optionally hide the button
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {isFocused && (
                <StatusBar
                    backgroundColor={"transparent"}
                    barStyle={hideStatusBar ? "dark-content" : "light-content"}
                    translucent={true}
                />
            )}
            <ScrollView
                ref={scrollViewRef}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={Styles.MainCont}
            >
                <ImageBackground
                    source={HomeImage}
                    style={Styles.ImageCont}
                    resizeMode="stretch"
                >
                    {/* Location Container*/}
                    <View style={{ paddingTop: hp(6.4), paddingLeft: hp(2.95) }}>
                        {/* Location Title Text */}
                        <View style={{ flexDirection: "row" }}>
                            {/* Text */}
                            <Text style={TextStyles.R14N10}>Your Location</Text>
                            {/* Arrow Icon */}
                            <ArrowIcon width={hp(2)} height={hp(2)} marginLeft={hp(1)} marginTop={hp(0.2)} />
                        </View>
                        {/* Location GPS */}
                        <View style={{ flexDirection: "row", paddingTop: hp(1.1), alignItems: "center" }}>
                            {/* GPS Icon */}
                            <LocationIcon width={hp(3)} height={hp(3)} marginRight={hp(1)} />
                            {/* GPS Text */}
                            {loading ? (
                                <ActivityIndicator size="small" color="#FF4500" />
                            ) : (
                                <Text style={TextStyles.SB14N10}>{town}</Text>
                            )}
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={[
                        TextStyles.SB32N10, { marginHorizontal: hp(2.95), marginTop: hp(2.95), marginBottom: hp(2) }]}
                    >
                        Provide the best food for you
                    </Text>
                </ImageBackground>

                {/* Categories */}
                <View style={{
                    paddingTop: hp(2.95),
                    paddingHorizontal: hp(2.95),
                    paddingBottom: hp(2),
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    <Text style={TextStyles.SB16N100}>Find by Category</Text>
                    <TouchableOpacity
                        onPress={handleOpenModal}
                        activeOpacity={0.6}
                    >
                        <Text style={TextStyles.M14Orange}>See All</Text>
                    </TouchableOpacity>
                </View>

                {/* 4 Horizontal Items */}
                <FoodCategoryList
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    showAll={false}
                />

                {/* Food Cards */}
                <View style={{ paddingTop: hp(2) }} />
                <FoodCard
                    selectedId={selectedId}
                />

                {/* Modal for all categories */}
                <Modal visible={showAll} animationType="slide">
                    <AllCategoriesModal
                        selectedId={selectedId}
                        setSelectedId={(id) => {
                            setSelectedId(id);
                            handleCloseModal(); // optional: close modal when selecting
                        }}
                        onClose={handleCloseModal}
                    />
                </Modal>
            </ScrollView>

            {showScrollTopBtn && (
                <TouchableOpacity
                    onPress={scrollToTop}
                    style={{
                        position: 'absolute',
                        right: hp(3),
                        bottom: hp(3),
                        backgroundColor: '#fff',
                        borderRadius: hp(3),
                        padding: hp(1.5),
                        elevation: 4,
                    }}
                >
                    <UpArrowIcon width={hp(3)} height={hp(3)} />
                </TouchableOpacity>
            )}

        </View>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        backgroundColor: Colors.Neutral20,
    },
    ImageCont: {
        width: width,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000070',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.White,
        padding: hp(2),
        borderTopLeftRadius: hp(2),
        borderTopRightRadius: hp(2),
        maxHeight: '80%',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: '#00000010',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.White,
        borderTopLeftRadius: hp(2),
        borderTopRightRadius: hp(2),
        padding: hp(2),
        minHeight: '40%',
    }
});

export default HomeScreen;