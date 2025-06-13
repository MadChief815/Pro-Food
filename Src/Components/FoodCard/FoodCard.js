import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Custom Components
import { foodCategories } from "../../Context/Data/foodCatergories";
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';

// Zustand
import { useCartStore } from '../../Context/Zustand/cartStore';

// SVGs
import LocationIcon from "../../../assets/SVG/HomeScreen/gps.svg";
import RateIcon from "../../../assets/SVG/HomeScreen/start.svg";
import HeartIcon from "../../../assets/SVG/HomeScreen/heart.svg";
import FocusedHeartIcon from "../../../assets/SVG/HomeScreen/fheart.svg";

const FoodList = ({ selectedId, addToCart }) => {
    // Find selected category
    const selectedCategory = foodCategories.find(cat => cat.id === selectedId);

    // Add To Cart
    const cartItems = useCartStore(state => state.cartItems);
    const toggleCartItem = useCartStore(state => state.toggleCartItem);
    const loadCart = useCartStore(state => state.loadCart);

    useEffect(() => {
        loadCart(); // Load cart from AsyncStorage
    }, []);

    if (!selectedCategory) return null;

    const isInCart = (itemId) => cartItems.some(item => item.id === itemId);

    // Navigation
    const navigation = useNavigation();

    const renderItem = (item) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("Item", { item })}
                key={item.id}
                style={styles.item}
                activeOpacity={0.7}
            >

                {/* Food Image */}
                {item.image && (
                    <Image source={item.image} style={styles.image} resizeMode="stretch" />
                )}

                {/* Food Name */}
                <Text style={[TextStyles.M16N100, { marginBottom: hp(0.5) }]}>
                    {item.name}
                </Text>

                {/* Rating & Distance */}
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: hp(1),
                        width: "100%",
                    }}
                >
                    {/* Food Rating */}
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <RateIcon width={hp(2)} height={hp(2)} style={{ marginRight: hp(0.5) }} />
                        <Text style={TextStyles.M12N100}>
                            {item.rating}
                        </Text>
                    </View>

                    {/* Distance */}
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <LocationIcon width={hp(2)} height={hp(2)} style={{ marginRight: hp(0.5) }} />
                        <Text style={TextStyles.M12N100}>
                            {item.distance} km
                        </Text>
                    </View>
                </View>

                {/* Food Price */}
                <View style={{ alignSelf: "baseline", flexDirection: "row", paddingLeft: hp(1), paddingTop: hp(0.7), paddingBottom: hp(1) }}>
                    <Text style={[styles.DollarSign]}>$ </Text>
                    <Text style={[TextStyles.M16Orange]}>
                        {item.price}
                    </Text>
                </View>

                {/* Favorite */}
                <TouchableOpacity
                    style={styles.favoritebtn}
                    activeOpacity={0.6}
                    onPress={() => toggleCartItem(item)}
                >
                    {isInCart(item.id) ? <FocusedHeartIcon width={hp(2.5)} height={hp(2.5)} /> : <HeartIcon width={hp(2.5)} height={hp(2.5)} />}
                </TouchableOpacity>

            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.cont}>
            <View style={styles.gridContainer}>
                {selectedCategory.items.map(renderItem)}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cont: {
        paddingHorizontal: hp(2.95),
        paddingBottom: hp(2),
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    item: {
        alignItems: 'center',
        borderRadius: hp(1.5),
        backgroundColor: Colors.Neutral10,
        marginBottom: hp(2),
        width: '47%',
        paddingHorizontal: hp(1)
    },
    image: {
        width: "100%",
        height: hp(12.3),
        borderRadius: hp(1),
        marginVertical: hp(1),
        marginHorizontal: hp(1)
    },
    DollarSign: {
        color: Colors.PrimaryOrange,
        fontSize: hp(2.05)
    },
    favoritebtn: {
        height: hp(3.7),
        width: hp(3.7),
        backgroundColor: Colors.Neutral10,
        borderRadius: hp(1.85),
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        right: hp(2),
        top: hp(2)
    }
});

export default FoodList;
