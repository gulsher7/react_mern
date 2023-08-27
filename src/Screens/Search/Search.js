//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import { height, moderateScale, moderateScaleVertical, width } from '../../styles/responsiveSize';
import { FlashList } from '@shopify/flash-list';
import FastImageComp from '../../Components/FastImageComp';
import colors from '../../styles/colors';
import { SearchBar } from 'react-native-screens';
import SerachBar from '../../Components/SerachBar';

// create a component
const Search = () => {

    const renderItem = ({ index }) => {



        return (
            <TouchableOpacity
                style={{
                    marginTop: index % 2 == 0 ? moderateScaleVertical(16) : 0
                }}
            >

                <FastImageComp
                    url={'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'}
                    imageStyle={{
                        ...styles.imageStyle,
                        borderColor: colors.whiteColor,


                    }}
                />

            </TouchableOpacity>
        )
    }
    return (
        <WrapperContainer>

            <View style={{ flex: 1 }}>

                <SerachBar
                    placeholder='Searach...'
                    inputStyle={{ marginHorizontal: moderateScale(8) }}
                // isSearch
                />
                <FlashList
                    data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
                    numColumns={2}
                    renderItem={renderItem}
                    estimatedItemSize={width / 2}
                    ItemSeparatorComponent={() => <View style={{ height: moderateScale(20) }} />}
                />
            </View>

        </WrapperContainer>
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
        width: width / 2.2,
        height: height / 3,
        borderWidth: 1,
        borderRadius: moderateScale(10),
    }
});

//make this component available to the app
export default Search;
