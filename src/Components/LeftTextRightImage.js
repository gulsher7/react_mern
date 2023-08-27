//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import fontFamily from '../styles/fontFamily';
import colors from '../styles/colors';
import { moderateScaleVertical, textScale } from '../styles/responsiveSize';
import imagePath from '../constants/imagePath';

// create a component
const LeftTextRightImage = ({
    onPress = () => { },
    isSelected,
    text = '',
    image = imagePath.icUnchek
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styles.horizontalView}
            onPress={onPress}
        >
            <Text style={{
                ...styles.langTextStyle,
                color: isSelected ? colors.redColor : colors.blackColor
            }}>{text}</Text>
            <Image style={{ tintColor: isSelected  ? colors.redColor : colors.gray2 }} source={image} />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    langTextStyle: {
        fontFamily: fontFamily.semiBold,
        color: colors.blackColor,
        fontSize: textScale(14),
        textTransform: 'capitalize',
        marginVertical: moderateScaleVertical(8)
    },
    horizontalView: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

//make this component available to the app
export default LeftTextRightImage;
