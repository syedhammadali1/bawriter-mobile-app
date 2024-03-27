import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import styles from './styles/styles'
import AuthHeader from '../../components/auth/AuthHeader'
import { Button, TextInput } from 'react-native-paper'
import { globalStyle } from '../../styles/globalStyle'
import { appColors } from '../../util/constant'
import LogoImage from '../../components/global/LogoImage'
import { textStyle } from '../../styles/textStyle';
const ResetPassword = () => {
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [secureTextEntryPassword, setSecureTextEntryPassword] = React.useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = React.useState(true);

    const togglePasswordVisibility = () => {
        setSecureTextEntryPassword(!secureTextEntryPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword);
    };
    return (
        <ScrollView contentContainerStyle={styles.container} keyboardDismissMode="on-drag">
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

                <Button  mode="contained" onPress={() => console.log('Pressed')} buttonColor={appColors.SECONDARY} style={{...styles.loginBtn,marginTop:50}}>
                    RESET PASSWORD
                </Button>
            </View>
        </ScrollView>
    )
}

export default ResetPassword