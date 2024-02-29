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
function LogIn({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    return (
        <View behavior='height' style={styles.container} >
            <AuthHeader title='Log In'/>
            <View style={styles.subContainer}  >
                <TextInput
                    // label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    mode='flat'
                    style={styles.input}
                    placeholder='Email'
                    left={<TextInput.Icon icon="email" />}
                />
                <TextInput
                    // label="Email"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    mode='flat'
                    style={styles.input}
                    placeholder='password'
                    left={<TextInput.Icon icon={secureTextEntry ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                    secureTextEntry={secureTextEntry}
                />
                <Pressable style={{alignSelf:'flex-end'}} onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </Pressable>
                <Button mode="contained" onPress={() => console.log('Pressed')} buttonColor='black' style={styles.loginBtn}>
                    LOGIN
                </Button>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ ...styles.text, alignItems: 'center', alignSelf: 'center' }}>Don't have an account?
                        <Pressable onPress={() => navigation.navigate('Register')}>
                            <Text style={{ fontWeight: 'bold', color: 'purple', marginLeft: 5, justifyContent: 'center', alignSelf: 'center' }}>Register Here</Text>
                        </Pressable>
                    </Text>
                </View>
            </View>
        </View>
    )
}

// const styles = StyleSheet.create({
//     container: {
//         // flex:1,
//         // alignItems:'center'
//     },
//     subContainer: {
//         alignItems: 'center',

//         marginTop: 20
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
//         marginTop: 25
//     },
//     title: {
//         fontSize: 30,
//         fontWeight: '500',
//         textAlign: 'center',
//         // marginTop: 150
//     },
//     text: {
//         marginTop: 20
//     },
//     registerText: {
//         color: 'purple',
//         // fontWeight
//     },
//     loginBtn: {
//         width: '40%',
//         marginTop: 50,
//         borderRadius: 2
//     },
//     logo: {
//         height: 100,
//         width: 300,
//         resizeMode: 'contain',
//         marginTop: 70
//     },
// });

export default LogIn