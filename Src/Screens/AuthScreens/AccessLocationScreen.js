import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

const NewComponent = () => {
    return (
        <View style={Styles.MainCont}>
            <Text>Hello World!!!</Text>
        </View>
    );
};

const Styles = StyleSheet.create({
    MainCont: {
        flex: 1
    }
});

export default NewComponent;