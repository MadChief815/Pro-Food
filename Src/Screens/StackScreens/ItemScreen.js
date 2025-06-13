import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    StatusBar,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Zustand
import { useCartStore } from "../../Context/Zustand/cartStore";

// Custom Component
import Header from '../../Components/Header/header';
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import ImageSlider from '../../Components/ImageSlider/imageslider';
import CButton from "../../Components/Buttons/Button";

// SVGs
import StarIcon from "../../../assets/SVG/ItemScreen/star.svg";
import ClockIcon from "../../../assets/SVG/ItemScreen/clock.svg";
import PlusIcon from '../../../assets/SVG/CartScreen/plus.svg';
import MinusIcon from '../../../assets/SVG/CartScreen/minus.svg';
import CartIcon from "../../../assets/SVG/ItemScreen/cart.svg";

// Dimensions
const { width } = Dimensions.get("window");

const ItemScreen = ({ route }) => {

    // Navigation
    const navigation = useNavigation();

    // Data
    const { item } = route.params;

    // Zustand
    const cartItems = useCartStore(state => state.cartItems);
    const toggleCartItem = useCartStore(state => state.toggleCartItem);
    const updateQuantity = useCartStore(state => state.updateQuantity);

    // Find if item is in cart and get its quantity
    const existingCartItem = cartItems.find(i => i.id === item.id);
    const isInCart = !!existingCartItem;
    const [localQty, setLocalQty] = useState(1);

    // Sync localQty with cart if cart changes (e.g. after remove)
    useEffect(() => {
        if (isInCart && existingCartItem.quantity) {
            setLocalQty(existingCartItem.quantity);
        } else {
            setLocalQty(1);
        }
    }, [isInCart, existingCartItem]);

    // Handlers
    const handlePlus = () => {
        if (isInCart) {
            const qty = existingCartItem.quantity || 1;
            if (qty < 10) {
                updateQuantity(item.id, qty + 1);
            }
        } else {
            setLocalQty(q => Math.min(10, q + 1));
        }
    };
    const handleMinus = () => {
        if (isInCart) {
            const qty = existingCartItem.quantity || 1;
            if (qty > 1) {
                updateQuantity(item.id, qty - 1);
            }
        } else {
            setLocalQty(q => Math.max(1, q - 1));
        }
    };

    const handleAddToCart = () => {
        toggleCartItem({ ...item, quantity: localQty });
        navigation.goBack();
    };

    const handleRemoveFromCart = () => {
        toggleCartItem({ ...item, quantity: 0 });
        navigation.goBack();
    };

    const displayQty = isInCart && existingCartItem.quantity ? existingCartItem.quantity : localQty;
    const total = item.price * (displayQty || 1);

    return (
        <ScrollView contentContainerStyle={Styles.container}>
            {/* StatusBar */}
            <StatusBar
                backgroundColor={"transparent"}
                barStyle={"dark-content"}
                translucent={true}
            />
            {/* Header */}
            <Header title={"About This Menu"} icon={true} />
            {/* Image */}
            <View style={{ paddingTop: hp(1), paddingHorizontal: wp(5) }}>
                <ImageSlider item={item} />
            </View>
            {/* Name */}
            <Text style={[TextStyles.SB24N100, { paddingTop: hp(2), paddingLeft: hp(3) }]}>{item.name}</Text>
            {/* Price */}
            <Text style={[TextStyles.B18Orange, { paddingTop: hp(0), paddingLeft: hp(3) }]}>
                $ {item.price.toLocaleString(undefined)}
            </Text>
            {/* Details */}
            <View style={Styles.detailsCont}>
                <Text style={[TextStyles.B14Orange]}>
                    $ <Text style={TextStyles.R14N60}>Free Delivery</Text>
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ClockIcon width={hp(1.7)} height={hp(1.7)} marginRight={hp(1)} />
                    <Text style={TextStyles.R14N60}>20 - 30</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <StarIcon width={hp(1.7)} height={hp(1.7)} marginRight={hp(1)} />
                    <Text style={TextStyles.R14N60}>{item.rating}</Text>
                </View>
            </View>
            {/* Description */}
            <Text style={[TextStyles.SB16N100, { paddingLeft: hp(3), paddingBottom: hp(0.5) }]}>Description</Text>
            <Text style={[TextStyles.R14N60, { paddingHorizontal: hp(3) }]}>
                {item.description && item.description.trim() !== ""
                    ? item.description
                    : "Burger With Meat is a typical food from our restaurant that is much in demand by many people, this is very recommended for you."}
            </Text>
            {/* Count and Price */}
            <View style={Styles.CPCont}>
                {/* Quantity Controls */}
                <View style={Styles.qtyRow}>
                    <TouchableOpacity
                        onPress={handleMinus}
                        activeOpacity={0.6}
                        style={{ opacity: displayQty === 1 ? 0.5 : 1 }}
                        disabled={displayQty === 1}
                    >
                        <MinusIcon width={hp(3)} height={hp(3)} />
                    </TouchableOpacity>
                    <Text style={TextStyles.SB18N100}>{displayQty || 1}</Text>
                    <TouchableOpacity
                        onPress={handlePlus}
                        activeOpacity={0.6}
                        style={{ opacity: displayQty === 10 ? 0.5 : 1 }}
                        disabled={displayQty === 10}
                    >
                        <PlusIcon width={hp(3)} height={hp(3)} />
                    </TouchableOpacity>
                </View>
                {/* Price */}
                <View>
                    <Text style={TextStyles.M24Orange}>
                        $ {total.toLocaleString(undefined)}
                    </Text>
                </View>
            </View>
            {/* Add/Remove To Cart */}
            {isInCart ? (
                <TouchableOpacity
                    onPress={handleRemoveFromCart}
                    activeOpacity={0.7}
                    style={Styles.addtoCartBTN}
                >
                    <CButton text={"Remove From Cart"} icon={<CartIcon height={hp(2.5)} width={hp(2.5)} />} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={handleAddToCart}
                    activeOpacity={0.7}
                    style={Styles.addtoCartBTN}
                >
                    <CButton text={"Add To Cart"} icon={<CartIcon height={hp(2.5)} width={hp(2.5)} />} />
                </TouchableOpacity>
            )}


        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Neutral10,
        flexGrow: 1,
    },
    detailsCont: {
        height: hp(4.9),
        backgroundColor: "#FFF2E2",
        borderRadius: hp(1),
        marginHorizontal: hp(3),
        marginTop: hp(2),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: hp(1),
        marginBottom: hp(4.2)
    },
    CPCont: {
        marginHorizontal: hp(3),
        marginTop: hp(2.5),
        flexDirection: "row",
        justifyContent: "space-between"
    },
    qtyRow: {
        flexDirection: 'row',
        gap: hp(2),
        marginTop: hp(0.5),
    },
    qtyBtn: {
        height: hp(3.4),
        width: hp(3.4),
        borderRadius: hp(1.7),
        borderWidth: 1,
        borderColor: Colors.Neutral30,
        justifyContent: "center",
        alignItems: "center"
    },
    addtoCartBTN: {
        marginHorizontal: hp(3),
        marginTop: hp(2),
        marginBottom: hp(3),
    }
});

export default ItemScreen;
