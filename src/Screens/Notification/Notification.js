//import liraries
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImageComp from '../../Components/FastImageComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import WrapperContainer from '../../Components/WrapperContainer';
import colors from '../../styles/colors';
import { moderateScale, moderateScaleVertical, textScale, width } from '../../styles/responsiveSize';


const Notification = () => {
    const { selectedTheme } = useSelector(state => state?.appSetting)


    const renderItem = () => {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: moderateScale(16),
                }}
            >

                <FastImageComp
                    url={'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'}
                    imageStyle={styles.imgStyle}
                />
                <View style={{ marginHorizontal: moderateScale(16) }}>
                    <TextComp
                        text='User name'
                        style={{ fontSize: textScale(16) }}
                    >
                        <Text style={{ color: colors.redColor }}>added new</Text>
                    </TextComp>
                    <TextComp
                        text='1 hr'
                        style={{
                            marginVertical: moderateScaleVertical(4),
                            color: selectedTheme == 'dark' ? colors.whiteColorOpacity70 : colors.blackOpacity70
                        }}
                    />
                </View>

            </TouchableOpacity>
        )
    }

    return (
        <WrapperContainer>
            <View style={{ flex: 1 }}>
                <HeaderComp
            
                    leftText='Notifications'
                    style={{ marginBottom: moderateScaleVertical(16) }}

                />
                <FlashList
                    data={[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]}
                    renderItem={renderItem}
                    estimatedItemSize={70}
                    ItemSeparatorComponent={() => <View style={{ ...styles.horizontalLine, borderBottomColor: selectedTheme == 'dark' ? colors.whiteColorOpacity40 : colors.blackOpacity40 }} />}
                />
            </View>

        </WrapperContainer>
    );
};


const styles = StyleSheet.create({
   
    imgStyle: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
    },
    horizontalLine: {
        height: moderateScale(2),
        borderBottomWidth: 1,
        marginVertical: moderateScaleVertical(16)
    }
});

//make this component available to the app
export default Notification;
