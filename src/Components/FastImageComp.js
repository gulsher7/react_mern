//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

// create a component
const FastImageComp = ({
    url = '',
    imageStyle ={}
}) => {
    return (
        <FastImage
            style={{...styles.imageStyle, ...imageStyle}}
            source={{
                uri: url,
                priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
        />
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    imageStyle: {
        width: 100, 
        height: 100
    }
});

//make this component available to the app
export default FastImageComp;
