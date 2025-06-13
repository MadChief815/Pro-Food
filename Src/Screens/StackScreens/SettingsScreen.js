import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    SafeAreaView
} from 'react-native';

// Custom Components
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/TextStyles';
import Header from '../../Components/Header/header';

const SettingsScreen = () => {
    return (
        <SafeAreaView style={Styles.container}>
            {/* StatusBar */}
            <StatusBar
                backgroundColor={"transparent"}
                barStyle={"dark-content"}
                translucent={true}
            />
            {/* Header */}
            <Header title={"Settings"} icon={true} />
            {/*  */}
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Neutral10,
        flex: 1
    },
});

export default SettingsScreen;