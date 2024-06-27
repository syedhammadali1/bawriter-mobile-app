import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import styles from './styles/styles'
import AuthHeader from '../../components/auth/AuthHeader'
import { Button, TextInput } from 'react-native-paper'
import { globalStyle } from '../../styles/globalStyle'
import { appColors } from '../../util/constant'
import LogoImage from '../../components/global/LogoImage'
import { textStyle } from '../../styles/textStyle';
import tw from 'twrnc';
import { useResetPasswordMutation } from '../../services/apiService'

const ResetPassword = ({ route, navigation }) => {
    const {email} = route.params
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [secureTextEntryPassword, setSecureTextEntryPassword] = React.useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = React.useState(true);
    const [resetPassword, {isloading}] = useResetPasswordMutation ();
    const [passwordError, setPasswordError] = React.useState("");

    
    const togglePasswordVisibility = () => {
        setSecureTextEntryPassword(!secureTextEntryPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword);
    };
    
    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        } else {
            setPasswordError("");
        }

        try {
            const response = await resetPassword({ email, password: password, password_confirmation: confirmPassword }).unwrap();
            console.log(response)
            if (response.status_code === 200) {
                navigation.navigate('LogIn');
            } else {
                setPasswordError("Reset password failed. Please try again.");
            }
        } catch (error) {
            console.error("Reset password request failed:", error);
            setPasswordError("An error occurred. Please try again.");
        }
    };

    return (
        <View style={tw`bg-[#FDD043]`}>
            <ScrollView contentContainerStyle={styles.container} keyboardDismissMode="on-drag" style={globalStyle.curve_container}>
                <LogoImage imgStyle={{marginTop:60}}/>
                <Text style={{...textStyle.largeBoldText,textAlign:'center',marginTop:60}}>Reset Password</Text>
                <Text style={{...textStyle.mediumText,textAlign:'center',marginTop:20}}>
                Set the new password for your account so you can login and access all the features
                </Text>
                <View style={styles.subContainer}  >
                    <TextInput
                        value={password}
                        onChangeText={password => setPassword(password)}
                        mode='flat'
                        style={styles.input}
                        label='Password'
                        right={<TextInput.Icon icon={secureTextEntryPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                        secureTextEntry={secureTextEntryPassword}
                    />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                        mode='flat'
                        style={styles.input}
                        label='Confirm Password'
                        right={<TextInput.Icon icon={secureTextEntryConfirmPassword ? 'eye-off' : 'eye'} onPress={toggleConfirmPasswordVisibility} />}
                        secureTextEntry={secureTextEntryConfirmPassword}
                    />
                    <Button 
                        mode="contained" 
                        onPress={handleResetPassword} 
                        buttonColor={appColors.SECONDARY} 
                        style={{...styles.loginBtn, marginTop:50}} 
                        loading={isloading} 
                        disabled={isloading}>
                        RESET PASSWORD
                    </Button>
                    {/* <Button  mode="contained" onPress={() => console.log('Pressed')} buttonColor={appColors.SECONDARY} style={{...styles.loginBtn,marginTop:50}}>
                        RESET PASSWORD
                    </Button> */}
                </View>
            </ScrollView>
        </View>    
    )
}

export default ResetPassword