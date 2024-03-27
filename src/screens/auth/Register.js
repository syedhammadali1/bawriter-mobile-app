import React, { useState } from 'react'
import {
    Image,
    ScrollView,
    Text,
    Pressable,
    View,
    StyleSheet
} from 'react-native'
import { Button, TextInput } from 'react-native-paper'

import AuthHeader from '../../components/auth/AuthHeader'
import { globalStyle } from '../../styles/globalStyle'
import { appColors } from '../../util/constant'
import { CountryPicker } from "react-native-country-codes-picker";

import { textStyle } from '../../styles/textStyle';
import styles from './styles/styles'

import * as Location from 'expo-location';
import LogoImage from '../../components/global/LogoImage'
import CustomButton from '../../components/global/CustomButton'

const Register = ({ navigation }) => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNo, setPhoneNo] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [secureTextEntryPassword, setSecureTextEntryPassword] = React.useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = React.useState(true);
    const [countryCode, setCountryCode] = useState('+44');
    const [show, setShow] = useState(false);

    
    

    const togglePasswordVisibility = () => {

        setSecureTextEntryPassword(!secureTextEntryPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword);
    };
    return (
        <ScrollView contentContainerStyle={globalStyle.container} keyboardDismissMode="on-drag">
            <LogoImage imgStyle={{marginTop:30}}/>
            <Text style={{ ...textStyle.mediumText, marginTop: 20 }}>Make sure all your information is correct before join with us</Text>
            <ScrollView contentContainerStyle={localStyle.subContainer} keyboardDismissMode="on-drag">
                <TextInput
                    value={firstName}
                    onChangeText={firstName => setFirstName(firstName)}
                    mode='flat'
                    style={{ ...globalStyle.input,...localStyle.input }}
                    label='First Name'
                />

                <TextInput
                    value={lastName}
                    onChangeText={lastName => setLastName(lastName)}
                    mode='flat'
                    style={{...globalStyle.input,...localStyle.input}}
                    label='Last Name'

                />

                <TextInput
                    value={email}
                    onChangeText={email => setEmail(email)}
                    mode='flat'
                    style={{...globalStyle.input,...localStyle.input}}
                    label='Email'
                    keyboardType={"email-address"}
                />

                <View style={{...localStyle.countryCodeTextContainer}}>
                    <Pressable
                        onPress={() => setShow(true)}
                        // icon='arrow-down-drop-circle'
                        contentStyle={{flexDirection: 'row-reverse'}}
                        style={{
                            marginTop: 25,
                            padding: 10,
                        }}
                    >
                        <Text style={{
                            color: 'black',
                            fontSize: 16,
                        }}>
                            {countryCode}
                        </Text>
                    </Pressable > 

                    <TextInput
                        value={phoneNo}
                        onChangeText={phoneNo => setPhoneNo(phoneNo)}
                        mode='flat'
                        style={{...globalStyle.input,...localStyle.input}}
                        label='Phone Number'
                    />
                </View>




                <TextInput
                    value={password}
                    onChangeText={password => setPassword(password)}
                    mode='flat'
                    style={{...globalStyle.input,...localStyle.input}}
                    label='Password'
                    right={<TextInput.Icon icon={secureTextEntryPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} />}
                    secureTextEntry={secureTextEntryPassword}
                />
                <TextInput
                    value={confirmPassword}
                    onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
                    mode='flat'
                    style={{...globalStyle.input,...localStyle.input}}
                    label='Confirm Password'
                    right={<TextInput.Icon icon={secureTextEntryConfirmPassword ? 'eye-off' : 'eye'} onPress={toggleConfirmPasswordVisibility} />}
                    secureTextEntry={secureTextEntryConfirmPassword}
                />


                {/* <Button mode="contained" onPress={() => navigation.navigate('Otp',{phoneNo:countryCode+phoneNo,page:'register'})} buttonColor={appColors.SECONDARY} style={styles.loginBtn}>
                    CONTINUE
                </Button> */}

                <CustomButton onPress={() => navigation.navigate('Otp',{phoneNo:countryCode+phoneNo,page:'register'})} style={{marginTop:30}}>
                CONTINUE
                </CustomButton>


                <CountryPicker
                    show={show}
                    //    lang={'en'}
                    // initialState={countryCode}
                    style={{
                        // Styles for whole modal [View]
                        modal: {
                            height: 400,
                            //    backgroundColor: 'red'
                        },
                    }}
                    pickerButtonOnPress={(item) => {
                        setCountryCode(item.dial_code);
                        setShow(false);
                    }}
                />
            </ScrollView>
        </ScrollView>
    )
}


const localStyle = StyleSheet.create({
    subContainer:{
        width:'100%',
        alignItems: 'center',
    },
    input:{
        marginTop:10
    },
    countryCodeTextContainer:{
        flexDirection:'row',
        width:'100%'
    }
});

export default Register