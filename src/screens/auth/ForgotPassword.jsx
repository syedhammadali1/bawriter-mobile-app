import React, {useRef} from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import styles from './styles/styles';
import { Button, TextInput } from 'react-native-paper';
import { globalStyle } from '../../styles/globalStyle';
import { appColors } from '../../util/constant';
import LogoImage from '../../components/global/LogoImage';
import { textStyle } from '../../styles/textStyle';
import { useForgotMutation } from '../../services/apiService';
import commonStyles from './styles/styles';


const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = React.useState("");
    const [ emailError, setEmailError] = React.useState("");
    const [forgot, {isLoading}] = useForgotMutation();
    // const childRef = useRef();

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleForgotPassword = async () => {

        let valid = true;
    
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            valid = false;
        } else {
            setEmailError("");
        }
    
        if (valid) {
            try {
                const response = await forgot({ email }).unwrap();
    
                if (response.status_code === 422) {
                    const apiErrors = response.error;
                    if (apiErrors && apiErrors.length > 0 && apiErrors[0].field === 'email') {
                        setEmailError(apiErrors[0].message);
                    } else {
                        setEmailError("Validation Error");
                    }
                } else {
                navigation.navigate('Otp', { email });
                }
            } catch (error) {
                console.error("Forgot password request failed:", error);
                setEmailError("An error occurred. Please try again.");
            }
        }
    };
    

    return (
        <View style={globalStyle.main}>
            <ScrollView contentContainerStyle={globalStyle.container} keyboardDismissMode="on-drag" style={globalStyle.curve_container}>
                <LogoImage imgStyle={globalStyle.LogoImage} />
                <Text style={{...textStyle.largeBoldText, textAlign: 'center', marginTop: 60}}>Forget Password</Text>
                <Text style={{...textStyle.mediumText, textAlign: 'center', marginTop: 20}}>
                    Enter Your Email Address for verification process. We will send 4 digits code to your email or phone number
                </Text>
                <View style={styles.subContainer}>
                    <TextInput
                        value={email}
                        onChangeText={email => setEmail(email)}
                        mode='flat'
                        style={{...styles.input, marginTop: 20}}
                        label='Email Address'
                        error={!!emailError}
                    />
                    {emailError ? <Text style={localStyle.errorText}>{emailError}</Text> : null}
                    <Button
                        mode="contained"
                        onPress={handleForgotPassword}
                        buttonColor={appColors.SECONDARY}
                        style={{...styles.loginBtn, marginTop: 30}}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        CONTINUE
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
}
const localStyle = StyleSheet.create({
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});
export default ForgotPassword;
