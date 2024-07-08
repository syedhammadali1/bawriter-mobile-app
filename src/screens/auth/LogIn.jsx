import React, { useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { appColors } from '../../util/constant';
import { globalStyle } from '../../styles/globalStyle';
import CustomButton from '../../components/global/CustomButton';
import { textStyle } from '../../styles/textStyle';
import tw from 'twrnc';
import AuthHeader from '../../components/auth/AuthHeader';
import Checkbox from 'expo-checkbox';
import { useLoginMutation } from '../../services/apiService';
import { useDispatch } from 'react-redux';
import AuthService from '../../services/AuthService';
import { setToken } from '../../redux/authReducer';



function LogIn({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleLogin = async () => {
        let valid = true;
      
        if (!validateEmail(email)) {
          setEmailError("Please enter a valid email address.");
          setPasswordError("");
          setGeneralError("");
          valid = false;
        } else {
          setEmailError("");
        }
      
        if (password.trim() === "") {
          setPasswordError("Password cannot be empty.");
          setEmailError("");
          setGeneralError("");
          valid = false;
        } else {
          setPasswordError("");
        }
      
        if (valid) {
          try {
            const response = await login({ email, password }).unwrap();
            console.log('Login response:', response);
            if (response.result && response.result.data && response.result.data.token) {
              const token = response.result.data.token;
              const username = response.result.data.user;
              await AuthService.saveAuthData(token, username); // Save token and username
              dispatch(setToken(token));
              console.log('Token dispatched:', token);
            } else {
              throw new Error('Invalid response structure');
            }
            if (response.status_code === 200) {
              setEmail("");
              setPassword("");
              setEmailError("");
              setPasswordError("");
              setGeneralError("");
              navigation.navigate('getStarted');

            } else {
              if (response && response.status_code === 401) {
                setGeneralError("The provided credentials do not match our records.");
                setPasswordError("");
                setEmailError("");
              } else if (response && response.status_code === 422) {
                setEmailError("");
                setGeneralError("");
                response.error.forEach(err => {
                  if (err.field === "password") {
                    setPasswordError(err.message);
                  }
                });
              } else {
                setGeneralError(response.message || "Login failed. Please try again later.");
                setEmailError("");
                setPasswordError("");
              }
            }
          } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please try again later.");
          }
        }
      };
      


    return (
        <View style={globalStyle.main}>
            <ScrollView keyboardDismissMode="on-drag" style={globalStyle.curve_container}>
                <AuthHeader />
                <View style={globalStyle.container}>
                    <View style={{ ...localStyle.subContainer, marginTop: 10 }}>
                        <TextInput
                            label="Username, Email or Phone Number"
                            value={email}
                            onChangeText={setEmail}
                            mode='flat'
                            style={{ ...globalStyle.input, ...localStyle.input }}
                            error={!!emailError}
                        />
                        {emailError ? <Text style={localStyle.errorText}>{emailError}</Text> : null}
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            mode='flat'
                            style={{ ...globalStyle.input, ...localStyle.input }}
                            right={<TextInput.Icon icon={secureTextEntry ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                            secureTextEntry={secureTextEntry}
                            error={!!passwordError}
                        />
                        {passwordError ? <Text style={localStyle.errorText}>{passwordError}</Text> : null}

                        {generalError ? <Text style={localStyle.errorText}>{generalError}</Text> : null}

                        <View style={localStyle.forgotPasswordTextContainer}>
                            <View style={localStyle.checkboxContainer}>
                                <Checkbox
                                    value={isSelected}
                                    onValueChange={setSelection}
                                    style={tw`bg-#00000`}
                                />
                                <Text style={{ ...textStyle.mediumText, fontSize: 14, paddingLeft: 5 }}>
                                    Remember Me?
                                </Text>
                            </View>
                            <View style={{ width: '50%' }}>
                                <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                                    <Text style={{ ...textStyle.mediumText, fontSize: 14, textAlign: 'right' }}>Forgot Password?</Text>
                                </Pressable>
                            </View>
                        </View>

                        <CustomButton
                            style={{ marginTop: 20 }}
                            onPress={handleLogin}
                            loading={isLoading}
                            disabled={isLoading}>
                            LOGIN
                        </CustomButton>

                        <View style={localStyle.orView}>
                            <View style={localStyle.bar} />
                            <Text style={{ fontSize: 16 }}>or</Text>
                            <View style={localStyle.bar} />
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                            <Button icon="facebook" mode="contained" style={{ backgroundColor: appColors.FACEBOOKBLUE, marginHorizontal: 10 }} onPress={() => console.log('Pressed')}>
                                Facebook
                            </Button>
                            <Button icon={require('../../../assets/images/google-logo-icon.png')} mode="outlined" onPress={() => console.log('Pressed')}>
                                Google
                            </Button>
                        </View>

                        <CustomButton onPress={() => navigation.navigate('Register')} style={globalStyle.custom_button}>
                            CREATE NEW ACCOUNT
                        </CustomButton>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const localStyle = StyleSheet.create({
    subContainer: {
        width: '100%',
        alignItems: 'center',
    },
    orView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30
    },
    bar: {
        height: 1,
        backgroundColor: 'black',
        width: 50,
        marginLeft: 20,
        marginRight: 20
    },
    input: {
        marginTop: 20
    },
    forgotPasswordTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
        alignSelf: 'flex-start'
    }
});

export default LogIn;
