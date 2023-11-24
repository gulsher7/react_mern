//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, Alert, Pressable } from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import HeaderComp from '../../Components/HeaderComp';
import { moderateScale, moderateScaleVertical, width } from '../../styles/responsiveSize';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import MultiTextInput from '../../Components/MultiTextInput';
import strings from '../../constants/lang';
import ButtonComp from '../../Components/ButtonComp';
import actions from '../../redux/actions';


// create a component
const AddPost = ({ navigation, route }) => {

    const { selectedTheme } = useSelector(state => state?.appSetting)

    const { userData } = useSelector(state => state?.auth || {})



    console.log("userDatausersData", userData)


    const isDark = selectedTheme == 'dark'

    console.log("route++++", route?.params)

    const [images, setImages] = useState(route?.params?.selectedImages || [])
    const [text, setText] = useState('')

    const onSelect = () => {

    }


    const onSave = async () => {
        if (images.length == 0) {
            alert("Please upload at least one photo")
            return;
        }

        const formData = new FormData()

     

        formData.append("userId", userData?._id)
        formData.append("description", text)


        console.log("iamges conosle",images)
        images.forEach((val, i) => {
            formData.append('file',{
                uri: val?.image?.uri || val?.image?.path,
                type: "video/mp4",
                name: val.image.filename,
            })
        })

        console.log("formDataformData",formData)


     

        try {
            const res = await actions.createPost(formData)

            console.log("api res+++++",res)

        } catch (error) {
            console.log("error raised", error)
        }


    }

    const renderItem = (item, index) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => onSelect(item, index)}
                style={{ marginRight: moderateScale(16) }}
            >
                <Image
                    source={{ uri: item?.image?.uri || item?.image?.path }}
                    style={styles.imgStyle}
                />

                <Pressable
                    onPress={() => removeImage(index)}
                    style={styles.crossStyle}
                >
                    <Image
                        style={{ tintColor: isDark ? colors.whiteColor : colors.blackColor }}
                        source={imagePath.icCross} />
                </Pressable>
            </TouchableOpacity>
        )
    }

    const onAdd = () => {
        if (images.length >= 4) {
            alert("You can only add 4 images")
            return;
        }

        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                { text: 'Camera', onPress: () => openCamera() },
                { text: 'Gallery', onPress: () => openGallery() },
                { text: 'Cancel', onPress: () => { } },
            ]
        )
    }

    const openCamera = () => {
        try {
            const image = ImagePicker.openCamera({ mediaType: 'photo' })
            console.log("image", image)
        } catch (error) {
            console.log('error raised')
        }
    }

    const openGallery = async () => {
        try {
            const image = await ImagePicker.openPicker({ mediaType: 'photo' })
            console.log("image", image)
            // [{image: image}]
            setImages(prev => [...prev, ...[{ image: image }]])

        } catch (error) {
            console.log('error raised')
        }
    }

    const removeImage = (index) => {
        let cloneImages = [...images]
        cloneImages.splice(index, 1)
        setImages(cloneImages)
    }

    return (
        <WrapperContainer>
            <HeaderComp leftText='Create post' />

            <View style={styles.container}>

                <View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ overflow: 'visible' }}
                    >
                        {images.length > 0 ? images.map((val, i) => {
                            return renderItem(val, i)
                        })
                            : null
                        }

                        <TouchableOpacity
                            onPress={onAdd}
                            style={{
                                ...styles.imgStyle,
                                backgroundColor: colors.gray2,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Image style={{ tintColor: colors.whiteColor }} source={imagePath.icAdd} />
                        </TouchableOpacity>

                    </ScrollView>

                    <MultiTextInput
                        value={text}
                        placeholder={strings.DESCRIPTION}
                        onChangeText={(value) => setText(value)}
                        multiline={true}
                        inputStyle={{ marginTop: moderateScaleVertical(24) }}
                    />
                </View>


                <ButtonComp
                    text={strings.SAVE}
                    onPress={onSave}
                />

            </View>

        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: moderateScale(16),
        justifyContent: 'space-between'

    },
    imgStyle: {
        height: width / 4,
        width: width / 4,
        borderRadius: moderateScale(8)
    },
    crossStyle: {
        position: 'absolute',
        right: -8,
        top: -8,
        tintColor: colors.redColor
    },
});

//make this component available to the app
export default AddPost;
