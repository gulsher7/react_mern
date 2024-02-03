//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { moderateScale } from '../styles/responsiveSize';
import colors from '../styles/colors';

// create a component
const GroupImage = ({
    data = []
}) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {data.map((val, i) => {
                return (
                    <FastImage
                        key={String(val?._id)}
                        source={{ uri: val?.profileImage }}
                        style={{
                            height: moderateScale(34),
                            width: moderateScale(34),
                            borderRadius: moderateScale(17),
                            backgroundColor: colors.blackOpacity50,
                            marginLeft: -14,
                            borderWidth: 1
                        }}
                    />
                )
            })}
        </View>
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
});

//make this component available to the app
export default GroupImage;
