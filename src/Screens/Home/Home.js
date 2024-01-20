import { FlashList } from "@shopify/flash-list";
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import FastImageComp from '../../Components/FastImageComp';
import TextComp from '../../Components/TextComp';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import actions from '../../redux/actions';
import colors from '../../styles/colors';
import { moderateScale, moderateScaleVertical } from '../../styles/responsiveSize';
import styles from './styles';
import navigationStrings from "../../Navigations/navigationStrings";
import HeaderComp from "../../Components/HeaderComp";
import socketServices from "../../utils/sockertService";

const Home = ({ navigation }) => {
    const { selectedTheme } = useSelector(state => state?.appSetting)

    const { userData } = useSelector(state => state?.auth)

    console.log("userData", userData)

    const [posts, setPosts] = useState([])


    useEffect(()=>{
            socketServices.initialzeSocekt()
    },[])

    useEffect(() => {
        userPosts()
    }, [])

    const userPosts = async () => {
        try {
            const res = await actions.getAllPost(`?limit=50&userId=${userData?._id}`)
            console.log("res++++", res)


            setPosts(res.data)
        } catch (error) {
            console.log("error raised", error)
        }
    }


    const onPressHeart = async (item, index) => {

        try {
            const res = await actions.likeDislike({
                postId: item?._id,
                userId: userData?._id
            })
            const clonerArry = [...posts]

            clonerArry[index].isLike = !item?.isLike
            clonerArry[index].likeCount = item?.isLike ? clonerArry[index].likeCount + 1 : clonerArry[index].likeCount - 1

            console.log("clonerArryclonerArry", clonerArry)

            setPosts(clonerArry)

            console.log("post like resres", res)
        } catch (error) {
            console.log("post like error", error)
        }

        console.log("itemitem", item)

    }

    const onPresPost = (item) => {
        navigation.navigate(navigationStrings.POST_DETAIL, { item: item })

    }


    const onPressMessage = async (item) => {

        try {
            const res = await actions.createPrivateChat({
                userId: item?.user._id
            })
            console.log("createPrivateChat res======", res)
        } catch (error) {

        }
    }

    const renderItem = useCallback(({ item, index }) => {
        return (
            <Pressable
                onPress={() => onPresPost(item)}
                style={styles.boxStyle}>
                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: "row", alignItems: 'center', flex: 1 }}>
                        <FastImageComp
                            url={'https://i1.sndcdn.com/artworks-JmErnf9jVsLNoqN4-7yRD4w-t500x500.jpg'}
                            imageStyle={styles.profileImage}
                        />
                        <View>
                            <TextComp
                                text={item?.user.fullName}
                                style={styles.nameStyle}
                            />
                            {!!item?.user?.bio ? <TextComp
                                text={item?.user?.bio}
                                style={{
                                    ...styles.bioStyle,
                                    color: selectedTheme == 'dark' ? colors.whiteColorOpacity40 : colors.blackOpacity70
                                }}
                            /> : null}

                            {userData?._id !== item.user._id ? <TouchableOpacity
                                onPress={() => onPressMessage(item)}
                            >
                                <TextComp
                                    text={'Message'}
                                    style={styles.descStyle}
                                />
                            </TouchableOpacity> : null}

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

                <View style={styles.flexHorizontal}>

                    <View style={{ flexDirection: 'row' }}>
                        <TextComp
                            text={`Comments ${item?.commentCount || 0}`}
                            style={{ ...styles.descStyle, marginRight: moderateScale(8) }}
                        />

                        <TextComp
                            text={`Likes ${item?.likeCount || 0}`}
                            style={styles.descStyle}
                        />

                        <TouchableOpacity
                            onPress={() => onPressHeart(item, index)}
                        >
                            <Image tintColor={item?.isLike ? colors.redColor : colors.blackColor} source={imagePath.icHeart} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}


                    >
                        <Image source={imagePath.icShare} />
                    </TouchableOpacity>

                </View>

            </Pressable>
        )
    }, [posts])


    const listEmptComp = () => {
        return (
            <View style={{ alignItems: "center", marginTop: 24 }}>
                <TextComp
                    text='No data found'
                    style={{
                        ...styles.notDataFound,
                        color: selectedTheme == 'dark' ? colors.whiteColor : colors.blackColor
                    }}
                />
            </View>
        )
    }

    return (
        <WrapperContainer style={styles.container}>
            <View style={{ flex: 1, padding: moderateScale(8) }}>
                <HeaderComp
                    isLeftImage={false}
                    rightImage={imagePath.icChat}
                    onPressRight={() => navigation.navigate(navigationStrings.CHATS)}

                />
                <FlashList
                    data={posts}
                    renderItem={renderItem}
                    estimatedItemSize={200}
                    ItemSeparatorComponent={() => <View style={{ height: moderateScale(20) }} />}
                    ListEmptyComponent={listEmptComp}

                />
            </View>
        </WrapperContainer>
    );
};

export default Home;
