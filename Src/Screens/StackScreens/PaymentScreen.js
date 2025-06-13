import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import RazorpayCheckout from 'react-native-razorpay';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../../Src/Context/Redux/mainSlice';

// Custom Components
import Header from '../../Components/Header/header';
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import CButton from "../../Components/Buttons/Button";

const PaymentScreen = ({ route }) => {

    // StatusBar
    const isFocused = useIsFocused();

    // Data
    const { selectedItems, discount, total } = route.params;

    useEffect(() => {
        const totalPrice = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [selectedItems]);

    // Transactions
    const [driverCost, setDriverCost] = useState(180);

    // Redux
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);

    // Calculate total price
    const calculateTotal = () => {
        const baseTotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalWithTaxAndDriver = baseTotal * 1.1 + driverCost - discount;
        return totalWithTaxAndDriver.toLocaleString(undefined, { minimumFractionDigits: 2 });
    };


    // Handle Buy
    const handleBuy = () => {
        const totalAmount = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 1.1 + driverCost - discount;

        const options = {
            description: 'Payment for Order #123',
            currency: 'INR',
            key: 'rzp_test_xxxxxx',
            amount: Math.round(totalAmount * 100), // Convert to paise
            name: 'Your App Name',
            prefill: {
                email: "test01@gmail.com",
                contact: '9876543210',  // Optional
                name: 'Customer Name'   // Optional
            },
            theme: { color: '#F37254' }
        };

        RazorpayCheckout.open(options)
            .then((data) => {
                console.log('Payment success:', data);
                // You can dispatch success data or call your backend here
            })
            .catch((error) => {
                console.error(`Payment failed: ${error.code} | ${error.description}`);
                // Optionally show an error toast or dispatch
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
        <ScrollView contentContainerStyle={styles.container}>
            {/* StatusBar */}
            {isFocused && (
                <StatusBar
                    backgroundColor={"transparent"}
                    barStyle={isFocused ? "dark-content" : "light-content"}
                    translucent={true}
                />
            )}
            {/* Header */}
            <Header title={"Payment"} icon={true} />

            <Text style={[TextStyles.R14N60, { paddingTop: hp(1), paddingLeft: hp(3), paddingBottom: hp(0.5) }]}>
                You deserve better meal
            </Text>
            <Text style={[TextStyles.SB16N100, { paddingLeft: hp(3), paddingBottom: hp(2) }]}>
                Item Ordered
            </Text>
            <View style={{ width: '100%' }}>
                {selectedItems.map(item => (
                    <View
                        key={item.id}
                        style={styles.card}
                    >
                        <Image
                            source={item.image}
                            style={styles.image}
                            resizeMode="stretch"
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={TextStyles.SB14N100}>{item.name}</Text>
                            <Text style={[TextStyles.B14Orange, { paddingTop: hp(0.5) }]}>
                                $ {(item.price * item.quantity).toLocaleString(undefined)}
                            </Text>
                        </View>
                        <Text style={TextStyles.M12N60}>
                            <Text style={{ fontWeight: 'bold' }}>{item.quantity}</Text> {item.quantity === 1 ? 'Item' : 'Items'}
                        </Text>

                    </View>
                ))}
            </View>

            {/* Details Transaction */}
            <Text style={[TextStyles.SB16N100, { paddingLeft: hp(3), paddingTop: hp(1) }]}>Details Transaction</Text>
            <View style={styles.detailsCont}>
                <Text style={TextStyles.R14N60}>Driver</Text>
                <Text style={TextStyles.M14N100}>$ {driverCost.toFixed(2)}</Text>
            </View>
            <View style={styles.detailsCont}>
                <Text style={TextStyles.R14N60}>Tax 10%</Text>
                <Text style={TextStyles.M14N100}>
                    $ {(selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0) * 0.1).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Text>
            </View>
            <View style={styles.detailsCont}>
                <Text style={TextStyles.R14N60}>Discount</Text>
                <Text style={TextStyles.M14N100}>$ {discount.toFixed(2)}</Text>
            </View>
            <View style={styles.detailsCont}>
                <Text style={TextStyles.R14N60}>Total Price</Text>
                <Text style={TextStyles.B14Orange}>
                    $ {calculateTotal()}
                </Text>
            </View>

            {/* Stroke */}
            <View style={{
                height: 2,
                backgroundColor: Colors.Neutral30,
                marginHorizontal: hp(3),
                marginVertical: hp(2.5)
            }} />

            {/* Delivery Data */}
            <Text style={[TextStyles.SB16N100, { paddingLeft: hp(3), paddingTop: hp(1) }]}>Deliver to :</Text>
            <View style={styles.detailsCont}>
                <Text style={TextStyles.R14N60}>Name</Text>
                <Text style={TextStyles.M14N100}>{userData.userName}</Text>
            </View>
            <View style={styles.detailsCont}>
                <Text style={TextStyles.R14N60}>Phone No.</Text>
                <Text style={TextStyles.M14N100}>{userData.phone}</Text>
            </View>
            <View style={styles.detailsCont}>
                <Text style={TextStyles.R14N60}>Address</Text>
                <Text style={TextStyles.M14N100}>{userData.address}</Text>
            </View>
            <View style={styles.detailsCont}>
                <Text style={TextStyles.R14N60}>House No.</Text>
                <Text style={TextStyles.M14N100}>{userData.houseNo}</Text>
            </View>
            <View style={[styles.detailsCont, { paddingBottom: hp(4.9) }]}>
                <Text style={TextStyles.R14N60}>City</Text>
                <Text style={TextStyles.M14N100}>{userData.city}</Text>
            </View>

            {/* Buy */}
            <TouchableOpacity
                onPress={handleBuy}
                activeOpacity={0.7}
                style={{ marginHorizontal: hp(3), marginBottom: hp(3) }}
            >
                <CButton text={"Order Now"} />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Neutral10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(2),
        marginLeft: hp(2.5),
        marginRight: hp(3),
    },
    image: {
        width: hp(9.85),
        height: hp(8.6),
        borderRadius: hp(1),
        marginRight: hp(1.5),
    },
    detailsCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: hp(1.7),
        paddingHorizontal: hp(3)
    },
});

export default PaymentScreen;
