//import liraries
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImageComp from '../../Components/FastImageComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import WrapperContainer from '../../Components/WrapperContainer';
import navigationStrings from '../../Navigations/navigationStrings';
import imagePath from '../../constants/imagePath';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import { moderateScale, moderateScaleVertical, textScale } from '../../styles/responsiveSize';
import socketServices from '../../utils/sockertService';

const Messages = ({ navigation }) => {
    const { selectedTheme } = useSelector(state => state?.appSetting)
    const [data, setData] = useState([])
    const { userData } = useSelector(state => state?.auth)



    useFocusEffect(
        React.useCallback(() => {
            fetchChats()
        }, [])
    );


    useFocusEffect(
        React.useCallback(() => {
            socketServices.emit('join_chat', userData?._id)
            socketServices.on('new_chat', (values) => {

                setData(previousMessages => {
                    let cloneArry = JSON.parse(JSON.stringify(previousMessages))
                    const index = cloneArry.findIndex(item => item._id == values._id)
                    if (index !== -1) {
                        cloneArry.splice(index, 1)
                    }
                    cloneArry.unshift(values)
                    return cloneArry
                })
            })
            return () => removerListerns()

        }, [])
    );



    const removerListerns = () => {
        socketServices.removeListener('new_chat')
        socketServices.emit('leave_chat', userData?._id)
    }

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
        // removerListerns()
        navigation.navigate(navigationStrings.MESSAGES, {
            roomId: item._id,
            roomName: type == 'group' ? item?.chatName : item?.users.filter(val => val._id !== userData._id)[0].userName,
            receiverIds: type == 'group' ? item?.users.filter((val) => val?._id !== userData?._id).map((val,i)=> val._id) : item?.users.filter(val => val._id !== userData._id)[0]._id,
            type
        })
    }

    const renderItem = ({ item }) => {

        if (item.type == "group") {
            return (
                <>
                    <TouchableOpacity
                        onPress={() => onPressItem(item, 'group')}
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
                                text={!!item?.latestMessage ? item?.latestMessage : ""}
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
                onPress={() => onPressItem(item, 'private')}
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
                    {item.users.map((val, i) => {
                        if(val._id !== userData?._id){
                            return (
                                <TextComp
                                    text={val?.userName}
                                    style={{ fontSize: textScale(16) }}
                                >
                                    {!!item?.latestMessage ? <Text style={{ color: colors.redColor }}>{item?.latestMessage}</Text> : null}
                                </TextComp>
                            )
                        }
                    })}

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

    console.log("my chata data++++++++", data)

    return (
        <WrapperContainer>
            <View style={{ flex: 1 }}>
                <HeaderComp

                    leftText='Your Chats'
                    style={{ marginBottom: moderateScaleVertical(16) }}
                    rightText={userData?.userName}

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
