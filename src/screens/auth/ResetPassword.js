import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles/styles'
import AuthHeader from '../../components/auth/AuthHeader'
import { Button, TextInput } from 'react-native-paper'

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
        <View behavior='height' style={styles.container} >
            <AuthHeader title='Reset Password' />

            <View style={styles.subContainer}  >
            <TextInput
                    value={password}
                    onChangeText={password => setPassword(password)}
                    mode='flat'
                    style={styles.input}
                    placeholder='password'
                    left={<TextInput.Icon icon={secureTextEntryPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                    secureTextEntry={secureTextEntryPassword}
                />
                <TextInput
                    value={confirmPassword}
                    onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                    mode='flat'
                    style={styles.input}
                    placeholder='Confirm Password'
                    left={<TextInput.Icon icon={secureTextEntryConfirmPassword ? 'eye-off' : 'eye'} onPress={toggleConfirmPasswordVisibility} />}
                    secureTextEntry={secureTextEntryConfirmPassword}
                />

                <Button icon="plus" mode="contained" onPress={() => console.log('Pressed')} buttonColor='black' style={styles.loginBtn}>
                    Save
                </Button>
            </View>
        </View>
    )
}

export default ResetPassword