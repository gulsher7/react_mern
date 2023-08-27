//import liraries
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native';
import WrapperContainer from '../../Components/WrapperContainer';
import { moderateScale, moderateScaleVertical, textScale } from '../../styles/responsiveSize';
import strings from '../../constants/lang';
import fontFamily from '../../styles/fontFamily';
import colors from '../../styles/colors';
import ButtonComp from '../../Components/ButtonComp';
import HeaderComp from '../../Components/HeaderComp';
import TextComp from '../../Components/TextComp';
import OTPTextView from 'react-native-otp-textinput';

// create a component
const OtpVerification = ({ navigation }) => {

    const [timer, setTimer] = useState(59);


    useEffect(() => {
        const timeout = setTimeout(() => {
            if (timer > 0) setTimer(timer - 1)
        }, 1000);
        return () => {
            if (timeout) {
                clearTimeout(timeout)
            }
        }
    }, [timer])

    const [otpInput, setOtpInput] = useState("");


    const input = useRef(null)

    const handleCellTextChange = async (text, i) => {

    };

    const onResendCode = () =>{
        setTimer(59)
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

                            <TextComp style={styles.headerStyle} text={strings.ENTER_THE_FOUR_DIGIT + ` xyz@gmail.com`} />
                            <TextComp onPress={() => navigation.goBack()} style={styles.descStyle} text={strings.EDIT_MY_EMAIL} />

                            <OTPTextView
                                ref={input}
                                textInputStyle={styles.textInputContainer}
                                handleTextChange={setOtpInput}
                                handleCellTextChange={handleCellTextChange}
                                inputCount={4}
                                keyboardType="numeric"
                                autoFocus
                                tintColor={colors.whiteColor}
                                offTintColor={colors.whiteColorOpacity40}

                            />

                        </View>

                        <View style={{ flex: 0.2, justifyContent: 'flex-end', marginBottom: moderateScaleVertical(16) }} >
                            {timer > 0 ?
                                <TextComp style={{
                                    ...styles.descStyle,
                                    marginBottom: 12
                                }} text={strings.RESEND_CODE + 'In'} >

                                    <Text>{timer}</Text>

                                </TextComp>
                                :
                                <TextComp onPress={onResendCode} style={styles.resendCodeStyle} text={strings.RESEND_CODE} />
                            }

                            <ButtonComp
                                text={strings.LOGIN}
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
        fontSize: textScale(14),
        fontFamily: fontFamily.regular,
        color: colors.blueColor,
        marginTop: moderateScaleVertical(8),
        marginBottom: moderateScaleVertical(52)
    },
    textInputContainer: {
        backgroundColor: colors.gray2,
        borderBottomWidth: 0,
        borderRadius: 8,
        color: colors.whiteColor

    },
    resendCodeStyle: {
        fontSize: textScale(14),
        fontFamily: fontFamily.regular,
        marginTop: moderateScaleVertical(8),
        marginBottom: moderateScaleVertical(16)
    }
});

//make this component available to the app
export default OtpVerification;
