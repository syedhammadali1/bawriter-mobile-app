import React from 'react'
import { Text, View } from 'react-native'
import styles from './styles/styles'
import AuthHeader from '../../components/auth/AuthHeader'
import { Button, TextInput } from 'react-native-paper'

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = React.useState("");
    return (
        <View behavior='height' style={styles.container} >
            <AuthHeader title='Forgot Password' />

            <View style={styles.subContainer}  >
                <TextInput
                    // label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    mode='flat'
                    style={styles.input}
                    placeholder='Enter Email Address'
                    left={<TextInput.Icon icon="email" />}
                />

                <Button icon="send" mode="contained" onPress={() => navigation.navigate('ResetPassword')} buttonColor='black' style={styles.loginBtn}>
                    Send
                </Button>
            </View>
        </View>
    )
}

export default ForgotPassword