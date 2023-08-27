//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, I18nManager } from 'react-native';
import navigationStrings from '../../Navigations/navigationStrings';
import { saveUserData } from '../../redux/reducers/auth';
import store from '../../redux/store';
import WrapperContainer from '../../Components/WrapperContainer';
import imagePath from '../../constants/imagePath';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import strings from '../../constants/lang';
import ButtonComp from '../../Components/ButtonComp';
import { height, moderateScale, moderateScaleVertical, textScale } from '../../styles/responsiveSize';
import TextComp from '../../Components/TextComp';
import { useSelector } from 'react-redux';
import ModalComp from '../../Components/ModalComp';
import { changeLang, changeTheme } from '../../redux/reducers/appSettings';
import LeftTextRightImage from '../../Components/LeftTextRightImage';
import { langData } from '../../constants/langtheme/langData';
import { themeData } from '../../constants/langtheme/themeData';
import RNRestart from 'react-native-restart'; // Import package from node modules
import { changeAppTheme, changeLanguage } from '../../redux/actions/appSettings';


const { dispatch } = store;
// create a component
const InitialScreen = ({ navigation }) => {

    const [isVisible, setIsVisible] = useState(false)


    const { selectedTheme, lang } = useSelector(state => state?.appSetting)

    const onLogin = () => {
        dispatch(saveUserData({ isLogin: true }))
    }

    const privacyPolicy = (type = 1) => {
        if (type == 1) {
            navigation.navigate(navigationStrings.WEBVIEW, {type})
        } else {
            navigation.navigate(navigationStrings.WEBVIEW, {type})
        }
    }

    const onPressLang = (lan) => {
        setIsVisible(false)
        if (lan == 'ar' && lang !== lan) {
            changeLanguage(lan)
            setTimeout(() => {
                I18nManager.forceRTL(true)
                RNRestart.restart();
            }, 400);
        } else if (lang !== lan) {
            changeLanguage(lan)
            setTimeout(() => {
                I18nManager.forceRTL(false)
                RNRestart.restart();
            }, 400);
        }

    }
    const onPressTheme = (theme) => {
        setIsVisible(false)
        changeAppTheme(theme)

    }

    return (
        <WrapperContainer>
            <View style={{ flex: 1, padding: moderateScale(16), alignItems: 'center' }}>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsVisible(true)}
                    style={{
                        ...styles.circularStyle,
                        backgroundColor: selectedTheme == 'dark' ? colors.whiteColor : colors.gray2,
                    }} >
                    <Text style={{
                        ...styles.textStyle,
                        color: selectedTheme == 'dark' ? colors.blackColor : colors.whiteColor,
                        textAlign: 'left'

                    }} >{lang}</Text>
                </TouchableOpacity>
                <View style={{ flex: 0.3, justifyContent: 'center' }}>
                    <Image style={styles.logoStyle} source={imagePath.icLogo} />
                </View>

                <View style={{ flex: 0.7, justifyContent: 'flex-end' }}>
                    <TextComp
                        text={strings.BY_CLICKING_LOG_IN}
                        style={{ marginVertical: moderateScale(42) }}>
                        <Text style={{color: colors.blueColor}} onPress={() => privacyPolicy(1)} >{strings.TERMS}</Text>. {strings.LEARN_HOW_WE_PRCOESS} <Text style={{color: colors.blueColor}} onPress={() => privacyPolicy(2)} >{strings.PRIVACY_POLICY}</Text> </TextComp>

                    <ButtonComp
                        text={strings.LOG_IN_WITH_PHONE_NUMBER}
                        onPress={() => navigation.navigate(navigationStrings.LOGIN)}
                    />

                    <TextComp text={strings.OR} style={{ alignSelf: 'center', marginVertical: moderateScaleVertical(16) }} />


                    <ButtonComp
                        text={strings.LOG_IN_WITH_GOOGLE}
                        textStyle={{ color: colors.blackColor }}
                        style={{
                            backgroundColor: selectedTheme == 'dark' ? colors.whiteColor : colors.gray4
                        }}
                        leftImg={imagePath.icGoogle}


                    />
                    <ButtonComp
                        text={strings.LOG_IN_WITH_FACEBOOK}
                        style={{
                            marginVertical: moderateScaleVertical(16),
                            backgroundColor: selectedTheme == 'dark' ? colors.whiteColor : colors.gray4
                        }}
                        textStyle={{ color: colors.blackColor }}
                        leftImg={imagePath.icFacebook}

                    />
                    <ButtonComp
                        text={strings.LOG_IN_WITH_APPLE}
                        textStyle={{ color: colors.blackColor }}
                        style={{ backgroundColor: selectedTheme == 'dark' ? colors.whiteColor : colors.gray4 }}
                        leftImg={imagePath.icApple}
                    />

                    <TextComp style={{ textAlign: 'center', fontFamily: fontFamily.medium, marginVertical: 16 }}>{strings.NEW_HERE} <Text
                        onPress={() => navigation.navigate(navigationStrings.SIGNUP)}
                        style={{
                            color: colors.blueColor,
                            fontFamily: fontFamily.semiBold
                        }}>{strings.SIGN_UP}</Text></TextComp>
                </View>
            </View>


            <ModalComp
                isVisible={isVisible}
                style={{ justifyContent: 'flex-end', margin: 0 }}
                onBackdropPress={() => setIsVisible(false)}
            >
                <View style={styles.modalStyle}>
                    <Text style={styles.headingStyle}>{strings.CHOOSE_LANGUAGE}</Text>


                    {langData.map((val, i) => {
                        return (
                            <LeftTextRightImage
                                key={String(i)}
                                text={val.title}
                                isSelected={lang == val.code}
                                onPress={() => onPressLang(val.code)}
                            />
                        )
                    })}

                    <Text style={{ ...styles.headingStyle, marginTop: moderateScaleVertical(16) }}>{strings.CHOOSE_THEME}</Text>

                    {themeData.map((val, i) => {
                        return (
                            <LeftTextRightImage
                                key={String(i)}
                                text={val.title}
                                isSelected={val.code == selectedTheme}
                                onPress={() => onPressTheme(val.code)}
                            />
                        )
                    })}

                </View>



            </ModalComp>

        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    logoStyle: {
        width: moderateScale(150),
        height: moderateScale(150),
        borderRadius: moderateScale(150 / 2),
    },
    textStyle: {
        fontFamily: fontFamily.semiBold,
        color: colors.whiteColor,
        textAlign: 'center',
        fontSize: textScale(14),
        textTransform: 'capitalize'
    },
    circularStyle: {
        height: moderateScale(40),
        width: moderateScale(40),
        borderRadius: moderateScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end'
    },
    headingStyle: {
        fontFamily: fontFamily.semiBold,
        color: colors.blackColor,
        fontSize: textScale(16),
        textTransform: 'capitalize',
        marginBottom: moderateScaleVertical(12)
    },
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
    },
    modalStyle: {
        backgroundColor: colors.whiteColor,
        minHeight: moderateScale(height / 4),
        borderTopLeftRadius: moderateScale(8),
        borderTopRightRadius: moderateScale(8),
        padding: moderateScale(16)
    }

});

//make this component available to the app
export default InitialScreen;
