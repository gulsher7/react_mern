//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import { moderateScale, moderateScaleVertical, textScale } from '../../styles/responsiveSize';
import strings from '../../constants/lang';
import TextInputComp from '../../Components/TextInputComp';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import ButtonComp from '../../Components/ButtonComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import { showError } from '../../utils/helperFunctions';

import validator from '../../utils/validations'
import navigationStrings from '../../Navigations/navigationStrings';
import { userLogin } from '../../redux/actions/auth';
import { saveUserData } from '../../redux/reducers/auth';

// create a component
const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureText, setSecureText] = useState(true)
    const [isLoading, setLoading] = useState(false)



    const isValidData= () =>{
        const error = validator({
            email,
            password
        })
        if(error){
            showError(error)
            return false
        }
        return true
    }
    const onLogin = async() =>{

        const checkValid = isValidData()
        if(checkValid){
            setLoading(true)
            try {
                const res = await userLogin({
                    email,
                    password})
                    console.log("login api res",res)
                    setLoading(false)
                    if(!!res.data && !res?.data?.validOTP){
                        navigation.navigate(navigationStrings.OTP_VERIFICATION,{data: res.data})
                        return;
                    }
            } catch (error) {
                console.log("error in login api",error)
                showError(error?.error)
                setLoading(false)
            }
        }
    }

    return (
        <WrapperContainer>
            <HeaderComp />

            <KeyboardAvoidingView
                style={{ flex: 1, margin: moderateScale(16) }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>

                        <View style={{ flex: 0.8 }}>

                            <TextComp style={styles.headerStyle} text={strings.WELCOME_BACK} />
                            <TextComp style={styles.descStyle} text={strings.WE_ARE_HAPPY_TO_SEE} />


                            <TextInputComp
                                value={email}
                                placeholder={strings.EMAIL}
                                onChangeText={(value) => setEmail(value)}
                            />

                            <TextInputComp
                                value={password}
                                placeholder={strings.PASSWORD}
                                onChangeText={(value) => setPassword(value)}
                                secureTextEntry={secureText}
                                secureText={secureText ? strings.SHOW : strings.HIDE}
                                onPressSecure={() => setSecureText(!secureText)}
                            />

                            <Text style={{
                                ...styles.descStyle,
                                alignSelf: 'flex-end',
                                color: colors.blueColor,
                                fontFamily: fontFamily.semiBold
                            }} >{strings.FORGOT_PASSWORD}?</Text>

                        </View>

                        <View style={{ flex: 0.2, justifyContent: 'flex-end', marginBottom: moderateScaleVertical(16) }} >
                            <ButtonComp
                                text={strings.LOGIN}
                                onPress={onLogin}
                                isLoading={isLoading}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        </WrapperContainer>
    );
};

// define your styles
const styles = StyleSheet.create({
    headerStyle: {
        fontSize: textScale(24),
        fontFamily: fontFamily.medium,

    },
    descStyle: {
        fontSize: textScale(12),
        fontFamily: fontFamily.regular,
        marginTop: moderateScaleVertical(8),
        marginBottom: moderateScaleVertical(52)
    }
});

//make this component available to the app
export default Login;
