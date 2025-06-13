import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const HelpCenterScreen = () => {
    return (
        <View style={Styles.container}>
            <Text>HelpCenterScreen</Text>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HelpCenterScreen;