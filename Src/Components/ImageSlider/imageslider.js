import React, { useState } from "react";
import { View, Image, FlatList, Dimensions } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

// Custom Components
import { Colors } from "../../Styles/Colors";

const { width } = Dimensions.get("window");

const ImageSlider = ({ item }) => {
    const images = [item.image, item.image2, item.image3].filter(img => img); // Filter out undefined images
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / width);
        setActiveIndex(index);
    };

    return (
        <View>
            {/* Image Slider */}
            <FlatList
                data={images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Image
                        source={item}
                        style={{ height: hp(36), borderRadius: hp(2), width: wp(90) }}
                        resizeMode="stretch"
                    />
                )}
            />

            {/* Pagination Dots */}
            <View style={{ flexDirection: "row", justifyContent: "center", position: "absolute", bottom: hp(2), alignSelf: "center" }}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={{
                            width: hp(4),
                            height: hp(0.5),
                            borderRadius: 2,
                            marginHorizontal: hp(0.5),
                            backgroundColor: activeIndex === index ? Colors.PrimaryOrange : Colors.Neutral10,
                        }}
                    />
                ))}
            </View>
        </View>
    );
};

export default ImageSlider;