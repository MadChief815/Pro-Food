import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    FlatList,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Custom Components
import OnboardingItem from "../../Components/OnboardingScreen/OnboardingItem";
import Paginator from "../../Components/OnboardingScreen/Paginator";

// Data
import slides from "../../Components/OnboardingScreen/Sliders";

const OnboardingScreen = () => {

    // Navigation
    const navigation = useNavigation();

    const handleStart = () => {
        navigation.navigate("Login");
    };

    // Animations
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
            slideRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
        } else {
            navigation.navigate("Login");
        }
    };

    const handleSkip = () => {
        slideRef.current.scrollToIndex({ index: slides.length - 1, animated: true });
    };

    return (
        <SafeAreaView style={Styles.MainCont}>
            <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />

            <FlatList
                data={slides}
                renderItem={({ item }) => (
                    <OnboardingItem
                        item={item}
                        paginator={
                            <Paginator
                                data={slides}
                                currentIndex={currentIndex}
                                onNext={handleNext}
                                onSkip={handleSkip}
                                onStart={handleStart}
                            />
                        }
                    />
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={({ viewableItems }) => {
                    if (viewableItems.length > 0) {
                        setCurrentIndex(viewableItems[0].index);
                    }
                }}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                ref={slideRef}
            />

        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        flex: 1,
    },
});

export default OnboardingScreen;
