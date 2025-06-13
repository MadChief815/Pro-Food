import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Custom Components
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import Header from "../../Components/Header/header.js";
import Button from '../../Components/Buttons/Button.js';

// Zustand
import { useCartStore } from '../../Context/Zustand/cartStore';

// SVGs
import DeleteIcon from '../../../assets/SVG/CartScreen/delete.svg';
import TickIcon from '../../../assets/SVG/CartScreen/tick.svg';
import PlusIcon from '../../../assets/SVG/CartScreen/plus.svg';
import MinusIcon from '../../../assets/SVG/CartScreen/minus.svg';

// Images
import EmptyImage from "../../../assets/Images/CartScreen/Illustration.png";

const CartScreen = ({ isFocused }) => {

    // Cart
    const cartItems = useCartStore(state => state.cartItems);
    const toggleCartItem = useCartStore(state => state.toggleCartItem);
    const loadCart = useCartStore(state => state.loadCart);
    const removeFromCart = useCartStore(state => state.removeFromCart);
    // const [total, setTotal] = useState(null);
    const [discount, setDiscount] = useState(590);
    const [quantities, setQuantities] = useState({});

    // Initialize quantities from cartItems
    useEffect(() => {
        const initial = {};
        cartItems.forEach(item => {
            initial[item.id] = item.quantity || 1;
        });
        setQuantities(initial);
    }, [cartItems]);

    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
        const total1 = selectedItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
        // setTotal(total1);
        console.log('Selected Total Price:', total1);
    }, [selectedIds, cartItems]);

    const toggleSelect = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    // Zustand
    const updateQuantity = useCartStore(state => state.updateQuantity);

    // Replace handlePlus and handleMinus:
    const handlePlus = (id) => {
        const newQty = (quantities[id] || 1) + 1;
        setQuantities(q => ({ ...q, [id]: newQty }));
        updateQuantity(id, newQty); // <-- update Zustand
    };
    const handleMinus = (id) => {
        const newQty = Math.max(1, (quantities[id] || 1) - 1);
        setQuantities(q => ({ ...q, [id]: newQty }));
        updateQuantity(id, newQty); // <-- update Zustand
    };

    // Calculate selected items and total using local quantities
    const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
    const total = selectedItems.reduce(
        (acc, item) => acc + item.price * (quantities[item.id] || 1),
        0
    );
    const totalCount = selectedItems.reduce(
        (acc, item) => acc + (quantities[item.id] || 1),
        0
    );

    // Navigation
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate("Item", { item }) }
            activeOpacity={0.6}
            style={styles.itemRow}
        >
            {/* Tick Icon */}
            <TouchableOpacity
                onPress={() => toggleSelect(item.id)}
                activeOpacity={0.6}
                style={selectedIds.includes(item.id) ? styles.tickBox : styles.untickBox}
            >
                {selectedIds.includes(item.id) ? <TickIcon width={hp(2.5)} height={hp(2.5)} /> : null}
            </TouchableOpacity>

            {/* Food Image */}
            <Image source={item.image} style={styles.image} resizeMode="cover" />

            {/* Item Info */}
            <View style={styles.infoBox}>
                <Text style={TextStyles.SB16N100}>{item.name}</Text>
                <Text style={TextStyles.B14Orange}>$ {item.price}</Text>

                {/* Quantity Controls */}
                <View style={styles.qtyRow}>
                    <TouchableOpacity
                        onPress={() => handleMinus(item.id)}
                        activeOpacity={0.6}
                        style={[styles.qtyBtn, { opacity: (quantities[item.id] || 1) === 1 ? 0.5 : 1 }]}
                        disabled={(quantities[item.id] || 1) === 1}
                    >
                        <MinusIcon width={hp(2)} height={hp(2)} />
                    </TouchableOpacity>
                    <Text style={TextStyles.M16N100}>{quantities[item.id] || 1}</Text>
                    <TouchableOpacity
                        onPress={() => handlePlus(item.id)}
                        activeOpacity={0.6}
                        style={styles.qtyBtn}
                    >
                        <PlusIcon width={hp(2)} height={hp(2)} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Delete Button */}
            <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                activeOpacity={0.5}
                style={styles.deleteBtn}
            >
                <DeleteIcon width={hp(2.8)} height={hp(2.8)} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.Neutral10 }}>
            {/* StatusBar */}
            {isFocused && (
                <StatusBar
                    backgroundColor={"transparent"}
                    barStyle={isFocused ? "dark-content" : "light-content"}
                    translucent={true}
                />
            )}

            {/* Header */}
            <Header title={"My Cart"} icon={false} />

            <ScrollView
                style={{ backgroundColor: Colors.Neutral20, flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                {cartItems.length >= 1 ? (
                    <View style={{ justifyContent: "space-between", marginTop: hp(1) }}>
                        {/* FlatList with fixed height for independent scrolling */}
                        <FlatList
                            data={cartItems}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.container}
                            style={{ height: hp(42) }}
                            nestedScrollEnabled={true}
                        />
                        {/* Payment Summary */}
                        <View style={styles.paymentCont}>

                            {/* Title */}
                            <Text style={TextStyles.SB16N100}>Payment Summary</Text>

                            {/* Total Items & Fees */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={[TextStyles.M14N60, { paddingTop: hp(1) }]}>
                                    Total Items ({totalCount})
                                </Text>
                                <Text style={TextStyles.B14N100}>
                                    ${total ? total.toLocaleString(undefined) : '0'}
                                </Text>
                            </View>

                            {/* Delivery Fee */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={[TextStyles.M14N60, { paddingTop: hp(2) }]}>
                                    Delivery Fee
                                </Text>
                                <Text style={TextStyles.B14N100}>Free</Text>
                            </View>

                            {/* Discount */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={[TextStyles.M14N60, { paddingTop: hp(2) }]}>
                                    Discount
                                </Text>
                                <Text style={TextStyles.B14Orange}>
                                    ${discount ? discount.toLocaleString(undefined) : '0'}
                                </Text>
                            </View>

                            {/* Total */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={[TextStyles.M14N60, { paddingTop: hp(2) }]}>
                                    Total
                                </Text>
                                <Text style={TextStyles.B14N100}>
                                    ${((total || 0) - (discount || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Text>
                            </View>
                        </View>
                        {/* Payment Button */}
                        <TouchableOpacity
                            onPress={() => {
                                const selectedItems = cartItems
                                    .filter(item => selectedIds.includes(item.id))
                                    .map(item => ({
                                        ...item,
                                        quantity: quantities[item.id] || 1
                                    }));
                                navigation.navigate("Payment", { selectedItems, discount, total });
                            }}
                            activeOpacity={0.7}
                            style={{ marginHorizontal: hp(3), opacity: selectedIds.length == 0 ? 0.5 : 1, marginBottom: hp(2) }}
                            disabled={selectedIds.length == 0}
                        >
                            <Button text={"Order Now"} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Empty Screen
                    <View style={{ alignItems: "center", backgroundColor: Colors.Neutral10, height: "100%" }}>
                        <Image
                            source={EmptyImage}
                            style={{ marginVertical: hp(6.9) }}
                        />
                        <Text style={[TextStyles.B24N100, { marginBottom: hp(2) }]}>Ouch! Hungry</Text>
                        <Text style={[TextStyles.R16N60, { paddingHorizontal: hp(7.4), textAlign: "center" }]}>
                            Seems like you have not added any food to the cart yet
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: hp(2),
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Neutral10,
        padding: hp(1.5),
        borderRadius: hp(1),
        marginTop: hp(1.5),
    },
    tickBox: {
        marginRight: hp(2),
        backgroundColor: Colors.PrimaryOrange,
        height: hp(2.5),
        width: hp(2.5),
        borderRadius: hp(0.5),
        justifyContent: "center",
        alignItems: "center"
    },
    untickBox: {
        marginRight: hp(2),
        borderColor: Colors.PrimaryOrange,
        borderWidth: 1,
        height: hp(2.5),
        width: hp(2.5),
        borderRadius: hp(0.5),
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: hp(10.5),
        height: hp(10.1),
        borderRadius: hp(1),
        marginRight: hp(2),
    },
    infoBox: {
        flex: 1,
        justifyContent: 'space-between',
    },
    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
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
    deleteBtn: {
        position: "absolute",
        right: hp(1.5),
        bottom: hp(2)
    },
    paymentCont: {
        marginHorizontal: hp(3),
        marginTop: hp(3),
        marginBottom: hp(3),
        backgroundColor: Colors.Neutral10,
        borderWidth: 1,
        borderRadius: hp(2),
        borderColor: Colors.Neutral30,
        padding: hp(1.5),
    }
});

export default CartScreen;