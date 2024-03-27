import React from 'react'
import { Image,Pressable,StyleSheet,Text,View} from 'react-native'
import { Button, Checkbox, TextInput } from 'react-native-paper'
import { appColors } from '../../util/constant';
import { globalStyle } from '../../styles/globalStyle';
import CustomButton from '../../components/global/CustomButton';
import LogoImage from '../../components/global/LogoImage';
import { textStyle } from '../../styles/textStyle';

import {
    useFonts,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  } from '@expo-google-fonts/montserrat';

function LogIn({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [secureTextEntry, setSecureTextEntry] = React.useState(true);
    const [rememberMe, setRememberMe] = React.useState(false);

    // 
    let [fontsLoaded] = useFonts({
        Montserrat_100Thin,
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
        Montserrat_800ExtraBold,
        Montserrat_900Black,
        Montserrat_100Thin_Italic,
        Montserrat_200ExtraLight_Italic,
        Montserrat_300Light_Italic,
        Montserrat_400Regular_Italic,
        Montserrat_500Medium_Italic,
        Montserrat_600SemiBold_Italic,
        Montserrat_700Bold_Italic,
        Montserrat_800ExtraBold_Italic,
        Montserrat_900Black_Italic,
      });

    // 

    const togglePasswordVisibility = () => {
        setSecureTextEntry(!secureTextEntry);
    };
    return (
        <View behavior='height' style={globalStyle.container} >
            
            <LogoImage imgStyle={{marginTop:60}}/>
            <View style={{...localStyle.subContainer,marginTop:10}}  >
                <TextInput
                    label="Username, Email or Phone Number"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    mode='flat'
                    style={{...globalStyle.input,...localStyle.input}}
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    mode='flat'
                    style={{...globalStyle.input,...localStyle.input}}
                    right={<TextInput.Icon icon={secureTextEntry ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                    secureTextEntry={secureTextEntry}
                />
                <View style={{...localStyle.forgotPasswordTextContainer}}>
                    <View style={{...localStyle.checkboxContainer}}>
                        <Checkbox
                            status={rememberMe ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setRememberMe(!rememberMe);
                            }}
                        />
                        <Text style={{...textStyle.mediumText,fontSize:14}}>
                            Remember Me?
                        </Text>
                    </View>
                    <View style={{width:'50%'}}>
                        <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={{...textStyle.mediumText,fontSize:14,textAlign:'right',}}>Forgot Password?</Text>
                        </Pressable>
                    </View>
                </View>

                <CustomButton style={{marginTop:20}}>
                    LOGIN
                </CustomButton>

                <View style={localStyle.orView}>
                    <View style={localStyle.bar} />
                    <Text style={{ fontSize: 16 }}>or</Text>
                    <View style={localStyle.bar} />
                </View>

                <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
                    <Button icon="facebook" mode="contained" style={{backgroundColor:appColors.FACEBOOKBLUE,marginHorizontal:10}} onPress={() => console.log('Pressed')}>
                        Facebook
                    </Button>
                    <Button icon={require('../../../assets/images/google-logo-icon.png')} mode="outlined" onPress={() => console.log('Pressed')}>
                       Google
                    </Button>
                </View>

                {/* <Button mode="contained" onPress={() => navigation.navigate('Register')} buttonColor={appColors.SECONDARY} style={{...globalStyle.loginBtn,marginTop:30}}>
      
                </Button> */}
                <CustomButton onPress={() => navigation.navigate('Register')} style={{marginTop:30}}>
                    CREATE NEW ACCOUNT
                </CustomButton>
            </View>
        </View>
    )
}

const localStyle = StyleSheet.create({
    subContainer:{
        width:'100%',
        alignItems: 'center',
    },
    orView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:30
    },
    bar:{
        height:1,
        backgroundColor:'black',
        width:50,
        marginLeft:20,
        marginRight:20
    },
    input:{
        marginTop:20
    },
    forgotPasswordTextContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        marginTop:40
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default LogIn