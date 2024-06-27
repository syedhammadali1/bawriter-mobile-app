import React, { useState } from 'react';
import { ScrollView, Text, View, Pressable, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { OtpInput } from 'react-native-otp-entry';
import { globalStyle } from '../../styles/globalStyle';
import { appColors } from '../../util/constant';
import { textStyle } from '../../styles/textStyle';
import LogoImage from '../../components/global/LogoImage';
import { useVerifyOtpMutation } from '../../services/apiService';

const Otp = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleContinue = async () => {
    if (!otp) {
      setErrorMessage('Please enter the verification code.');
      return;
    }
  
    try {
      const response = await verifyOtp({ email, token : otp }).unwrap();
      console.log('OTP verification response:', response);
  
      if (response.status_code === 200) {
        navigation.navigate('ResetPassword', { email });

      } else {
        setErrorMessage(response.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setErrorMessage('Failed to verify OTP. Please try again.');
    }
  };
  
  

  return (
    <View style={globalStyle.main}>
      <ScrollView
        contentContainerStyle={globalStyle.container}
        keyboardDismissMode="on-drag"
        style={globalStyle.curve_container}
      >
        <LogoImage imgStyle={globalStyle.LogoImage} />
        <View style={{ ...styles.subContainer, marginTop: 50 }}>
          <Text style={textStyle.mediumText}>
            Please type the verification code sent to Your Email and Phone No
          </Text>
          <Text style={{ ...textStyle.largeBoldText, marginBottom: 30, marginTop: 20 }}>
            Verification Code
          </Text>
          <OtpInput
            numberOfDigits={4}
            style={{ ...styles.otpInput }}
            onTextChange={otp => setOtp (otp)}
            value={otp}
          />

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <Pressable style={globalStyle.resend_btn} onPress={() => console.log('resend code')}>
            <Text>Resend Code</Text>
          </Pressable>

          <Button
            mode="contained"
            onPress={handleContinue}
            buttonColor={appColors.SECONDARY}
            style={styles.loginBtn}
            loading={isLoading}
            disabled={isLoading}
          >
            Continue
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  otpInput: {
    // Your OTP input styles here
  },
  loginBtn: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default Otp;
