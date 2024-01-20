//import liraries
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImageComp from '../../Components/FastImageComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import WrapperContainer from '../../Components/WrapperContainer';
import colors from '../../styles/colors';
import { moderateScale, moderateScaleVertical, textScale, width } from '../../styles/responsiveSize';
import actions from '../../redux/actions';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../Navigations/navigationStrings';
import { useFocusEffect } from '@react-navigation/native';
import socketServices from '../../utils/sockertService';


const Messages = ({ navigation }) => {
    const { selectedTheme } = useSelector(state => state?.appSetting)
    const [data, setData] = useState([])
    const { userData } = useSelector(state => state?.auth)


  useEffect(()=>{
    fetchChats()
  },[])
    

    const fetchChats = async () => {
        try {
            const res = await actions.myChats()
            console.log(" fetchChats res++++", res)
            setData(res.data)
        } catch (error) {
            console.log("error raised", error)
        }
    }

    const onPressItem = (item, type) => {
        navigation.navigate(navigationStrings.MESSAGES, {
            item: {...item, name:  type == 'group' ? item?.chatName: item?.users[0]?.userName  }
        })
    }

    const renderItem = ({ item }) => {

        if (item.type == "group") {
            return (
                <>
                    <TouchableOpacity
                    onPress={()=>onPressItem(item, 'group')}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: moderateScale(16),
                        }}
                    >
                        <Image
                            source={imagePath.icGroup}
                            style={{
                                ...styles.imgStyle,
                                tintColor: 'white'
                            }}
                        />
                        <View style={{ marginHorizontal: moderateScale(16) }}>
                            <TextComp
                                text={item.chatName}
                                style={{ fontSize: textScale(16) }}
                            />

                            <TextComp
                                text={item?.updatedAt}
                                style={{
                                    marginVertical: moderateScaleVertical(4),
                                    color: selectedTheme == 'dark' ? colors.whiteColorOpacity70 : colors.blackOpacity70
                                }}
                            />
                        </View>
                    </TouchableOpacity>

                </>
            )
        }

        return (
            <TouchableOpacity
            onPress={()=>onPressItem(item, 'private')}
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
                        text={item.users[0]?.userName}
                        style={{ fontSize: textScale(16) }}
                    >
                        {!!item?.latestMessage ? <Text style={{ color: colors.redColor }}>{item?.latestMessage}</Text> : null}
                    </TextComp>
                    <TextComp
                        text={item?.updatedAt}
                        style={{
                            marginVertical: moderateScaleVertical(4),
                            color: selectedTheme == 'dark' ? colors.whiteColorOpacity70 : colors.blackOpacity70
                        }}
                    />
                </View>

            </TouchableOpacity>
        )
    }

    console.log("my chata data++++++++",data)

    return (
        <WrapperContainer>
            <View style={{ flex: 1 }}>
                <HeaderComp

                    leftText='Your Chats'
                    style={{ marginBottom: moderateScaleVertical(16) }}

                />
                <FlatList
                    data={data}
                    extraData={data}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ ...styles.horizontalLine, borderBottomColor: selectedTheme == 'dark' ? colors.whiteColorOpacity40 : colors.blackOpacity40 }} />}
                    keyExtractor={item => item._id}

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
export default Messages;
