import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, Pressable } from 'react-native'
import AuthHeader from '../components/auth/AuthHeader'
import { appColors } from '../util/constant'
import commonStyles from './auth/styles/styles'
import { globalStyle } from '../styles/globalStyle'
import { ActivityIndicator, Button, RadioButton, TextInput } from 'react-native-paper'
import mastericon from '../../assets/images/icons/mastercard.png'
import paypalicon from '../../assets/images/icons/paypal.png'
import visaicon from '../../assets/images/icons/visa.png'
import bankicon from '../../assets/images/icons/bank.png'
import tw from 'twrnc';

const AddPaymentMethods = ({navigation}) => {
    const [checked, setChecked] = React.useState('first');

    const handlePayPalPayment = () => {
      console.log('pressed handle payment');
          navigation.navigate('PayPalPayment', { amount: '30.00' }); 
        };
 
    return (
        <View style={globalStyle.main}>

            <ScrollView contentContainerStyle={commonStyles.container2}  style={globalStyle.curve_container}>
                <AuthHeader />
                <Text style={[tw`my-5`,{ ...globalStyle.largeBoldText, ...globalStyle.heading_two}]}>Payment Methods</Text>

                <View style={globalStyle.paymentIcon_main}>

                    <Pressable onPress={() => console.log('Pressed')} style={globalStyle.paymentIcon}>
                        <Image source={mastericon} />     
                    </Pressable >
                    <Pressable onPress={handlePayPalPayment} style={globalStyle.paymentIcon}>
                        <Image source={paypalicon} />
                    </Pressable >
                    <Pressable onPress={() => console.log('Pressed')} style={globalStyle.paymentIcon}>
                        <Image source={bankicon}  style={tw`h-5 w-5`}/>
                    </Pressable >
                </View>
                <View>
                    <TextInput
                        label="Card Number"
                        // value={text}
                        // onChangeText={text => setText(text)}
                        mode="outlined"
                        style={tw`mb-4 h-10`}
                    />
                    <TextInput
                        label="Password"
                        // value={text}
                        // onChangeText={text => setText(text)}
                        mode="outlined"
                        style={tw`mb-4 h-10`}
                    />
                    <View style={tw`flex justify-between flex-row`}>
                        <TextInput
                            label="CVV"
                            // value={text}
                            // onChangeText={text => setText(text)}
                            mode="outlined"
                            style={tw`w-2/5 h-10`}
                        />
                        <TextInput
                            label="Expiry Date"
                            // value={text}
                            // onChangeText={text => setText(text)}
                            mode="outlined"
                            style={tw`w-2/5 h-10`}
                        />  
                    </View>

                </View>

                    <Text style={{ ...globalStyle.largeBoldText, textAlign: 'center', marginTop: 20, marginBottom:20, fontSize:15, fontWeight:400}}>
                        We will send 4 digits code to your email or phone number
                    </Text>
                    <Button mode="contained"  onPress={() => navigation.navigate('PaymentMethods')} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn, marginTop: 50 }}>
                        continue
                    </Button>
                
            </ScrollView>
        </View>
    )
}

export default AddPaymentMethods


