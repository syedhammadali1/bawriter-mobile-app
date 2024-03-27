import React from 'react'
import {
    Image,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet, Text,
    // TextInput,
    View
} from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import styles from './styles/styles'
import AuthHeader from '../../components/auth/AuthHeader';
import { OtpInput } from 'react-native-otp-entry';
import { globalStyle } from '../../styles/globalStyle';
import { appColors } from '../../util/constant';
import { textStyle } from '../../styles/textStyle';
import LogoImage from '../../components/global/LogoImage';
function Otp({ navigation,route }) {
    const { page } = route.params;

    return (
        <View behavior='height' style={styles.container} >
            <LogoImage imgStyle={{marginTop:60}}/>
            <View style={{...styles.subContainer,marginTop:50}}  >
                <Text style={textStyle.mediumText}> Please type the verification code sent to Your Email and Phone No
                {/* {phoneNo} */}
                </Text>
                <Text style={{...textStyle.largeBoldText,marginBottom:30 , marginTop:20}}>Verification Code</Text>
                <OtpInput numberOfDigits={4} style={{...styles.otpInput}} onTextChange={(text) => console.log(text)} />
                <Pressable style={{alignSelf:'center',marginTop:30,marginBottom:20}} onPress={() => console.log('resend code')}>
                    <Text >Resend Code</Text>
                </Pressable>
                <Button mode="contained" onPress={() => page == 'register' ? navigation.navigate('LogIn') : navigation.navigate('ResetPassword')} buttonColor={appColors.SECONDARY} style={styles.loginBtn}>
                    Continue
                </Button>
            </View>
        </View>
    )
}

export default Otp