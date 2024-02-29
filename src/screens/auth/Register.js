import React from 'react'
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet, Text,
    // TextInput,
    View
} from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import styles from './styles/styles'
import AuthHeader from '../../components/auth/AuthHeader'
const Register = ({ navigation }) => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
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
            <AuthHeader title='Register'/>
            <ScrollView contentContainerStyle={styles.subContainer} keyboardDismissMode="on-drag">
                <TextInput
                    value={firstName}
                    onChangeText={firstName => setFirstName(firstName)}
                    mode='flat'
                    style={styles.input}
                    placeholder='First Name'
                    left={<TextInput.Icon icon={'account'} />}

                />

                <TextInput
                    value={lastName}
                    onChangeText={lastName => setLastName(lastName)}
                    mode='flat'
                    style={styles.input}
                    placeholder='Last Name'
                    left={<TextInput.Icon icon={'account-supervisor'} />}
                />

                <TextInput
                    value={email}
                    onChangeText={email => setEmail(email)}
                    mode='flat'
                    style={styles.input}
                    placeholder='Emai'
                    left={<TextInput.Icon icon="email" />}
                    keyboardType={"email-address"}
                />


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


                <Button mode="contained" onPress={() => console.log('Pressed')} buttonColor='black' style={styles.loginBtn}>
                    SIGN UP
                </Button>
                <Text style={styles.text}>Do you have an account?
                    <Pressable onPress={() => navigation.navigate('LogIn')}>
                        <Text style={{ fontWeight: 'bold', color: 'purple',marginLeft: 5,justifyContent:'center' }}>Login Here</Text>
                    </Pressable>
                </Text>
            </ScrollView>
        </ScrollView>
    )
}


// const styles = StyleSheet.create({
//     container: {
//         // flex:1,
//         // alignItems:'center'
//     },
//     subContainer: {
//         alignItems: 'center',

//         marginTop: 10
//     },
//     input: {
//         //   borderColor: "gray",
//         //   borderWidth: 1,
//         //   borderRadius: 5,
//         //   padding: 10,
//         width: "80%",
//         //   textAlign:'center',
//         //   alignItems: 'center',
//         backgroundColor: 'white',
//         marginTop: 20
//     },
//     title: {
//         fontSize: 30,
//         fontWeight: '500',
//         textAlign: 'center',
//         // marginTop: 0
//     },
//     text: {
//         marginTop: 10
//     },
//     registerText: {
//         color: 'purple',
//         // fontWeight
//     },
//     loginBtn: {
//         width: '40%',
//         marginTop: 10,
//         borderRadius: 2
//     },
//     logo: {
//         height: 100,
//         width: 300,
//         resizeMode: 'contain',
//         marginTop: 10
//     },
// });

export default Register