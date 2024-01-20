//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import HeaderComp from '../../Components/HeaderComp';
import strings from '../../constants/lang';
import { moderateScale, moderateScaleVertical } from '../../styles/responsiveSize';
import FastImageComp from '../../Components/FastImageComp';
import styles from './styles'
import TextComp from '../../Components/TextComp';
import imagePath from '../../constants/imagePath';
import { useSelector } from 'react-redux';
import colors from '../../styles/colors';
import actions from '../../redux/actions';
import TextInputComp from '../../Components/TextInputComp';
import { CanceledError } from 'axios';

// create a component
const PostDetail = ({ navigation, route }) => {

    const { selectedTheme } = useSelector(state => state?.appSetting)
    const { userData } = useSelector(state => state?.auth)

    const item = route.params.item

    const [commentText, setCommentText] = useState('')

    console.log(":itemitemitem", item)

    const [comments, setComments] = useState([])


    useEffect(() => {
        getComments()
    }, [])


    const getComments = async () => {
        try {
            const res = await actions.postComments(`?postId=${item?._id}`)
            console.log("api res post comments", res)
            if (!!res && !!res?.data) {
                setComments(res?.data || [])
            }
        } catch (error) {
            console.log("errror raised during fetch comments", error)
        }
    }


    const renderItem = ({ item, index }) => {
        return (
            <View style={{ marginHorizontal: moderateScale(16) }}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FastImageComp
                        url={'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'}
                        imageStyle={styles.profileImage}
                    />
                    <TextComp
                        text={item?.userId?.fullName}

                    />
                </View>

                <TextComp
                    text={item?.createdAt}
                    style={{ marginVertical: moderateScaleVertical(8) }}
                />
                <TextComp
                    text={item?.comment}

                />
            </View>
        )
    }

    const emptyComp = () => {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <TextComp
                    text={strings.NO_COMMENT_ADDED}
                    style={{
                        ...styles.descStyle,
                        marginVertical: moderateScaleVertical(12),
                        color: selectedTheme == 'dark' ? colors.whiteColorOpacity70 : colors.blackOpacity70
                    }}
                />

            </View>
        )
    }

    const headerComp = () => {
        return (
            <View style={{ marginHorizontal: moderateScale(16) }}>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', flex: 1 }}>
                        <FastImageComp
                            url={'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'}
                            imageStyle={styles.profileImage}
                        />
                        <View>
                            <TextComp
                                text={item?.user?.fullName || item?.userId?.fullName}
                                style={styles.nameStyle}
                            />
                            {!!item?.user?.bio || item?.userId?.bio  ? <TextComp
                                text={item?.user?.bio || item?.userId?.bio }
                                style={{
                                    ...styles.bioStyle,
                                    color: selectedTheme == 'dark' ? colors.whiteColorOpacity40 : colors.blackOpacity70
                                }}
                            /> : null}

                        </View>

                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                    >
                        <Image source={imagePath.icDots} />
                    </TouchableOpacity>
                </View>

                <FastImageComp
                    url={item?.media[0]?.url}
                    imageStyle={styles.postImage}
                />

                {!!item?.description ? <TextComp
                    text={item?.description}
                    style={styles.descStyle}
                /> : null}

                <TextComp
                    text={item?.createdAt}
                    style={{
                        ...styles.descStyle,
                        marginVertical: moderateScaleVertical(12),
                        color: selectedTheme == 'dark' ? colors.whiteColorOpacity70 : colors.blackOpacity70
                    }}
                />
            </View>
        )
    }


    const onCommentSend = async () => {
        try {
            const res = await actions.addComment({
                userId: userData?._id,
                postId: item?._id,
                comment: commentText
            })

            if (!!res && !!res?.data) {
                getComments()
                setCommentText('')
            }
            console.log("comment added", res)


        } catch (error) {
            console.log("onCommentSend errror", CanceledError)
        }

    }


    return (
        <WrapperContainer>
            <View style={{ flex: 1, }}>
                <HeaderComp
                    leftText={strings.POST_DETAIL}
                />

                <FlatList
                    data={comments}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => String(item?._id)}
                    ListEmptyComponent={emptyComp}
                    ListHeaderComponent={headerComp}
                    ItemSeparatorComponent={() => <View style={{ height: moderateScale(10) }} />}

                />

                <View style={styles.bottomStyle}>
                    <View style={{ flex: 0.9 }}>
                        <TextInputComp
                            inputStyle={{ marginBottom: 0 }}
                            value={commentText}
                            onChangeText={(text) => setCommentText(text)}
                        />
                    </View>

                    <TouchableOpacity
                        style={{ flex: 0.1, alignItems: 'flex-end' }}
                        onPress={onCommentSend}
                    >
                        <Image style={{ tintColor: colors.redColor }} source={imagePath.icSend} />
                    </TouchableOpacity>
                </View>
            </View>



        </WrapperContainer>
    );
};

export default PostDetail;
