import React, { useState } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import AuthHeader from '../components/auth/AuthHeader'
import { appColors } from '../util/constant'
import commonStyles from './auth/styles/styles'
import { globalStyle } from '../styles/globalStyle'
import { Button, RadioButton } from 'react-native-paper'
import mastericon from '../../assets/images/icons/mastercard.png'
import paypalicon from '../../assets/images/icons/paypal.png'
import visaicon from '../../assets/images/icons/visa.png'
import tw from 'twrnc';


const PaymentMethods = ({navigation}) => {
    const [checked, setChecked] = React.useState('second');

    const handlePayPalPayment = () => {
        console.log('pressed handle payment');
            navigation.navigate('PayPalPayment', { amount: '30.00' }); 
          };

    return (
        <View style={tw`bg-[#FDD043]`}>
            <ScrollView contentContainerStyle={commonStyles.container} keyboardDismissMode="on-drag" style={globalStyle.curve_container}>
                <AuthHeader/>
                <Text style={{ ...globalStyle.largeBoldText, ...globalStyle.heading }}>Payment Methods</Text>

                <View>
                    {/* <View style={globalStyle.selectPaymentMethod}>
                        <Image source={mastericon} />
                        <Text>Master Card</Text>
                        <RadioButton
                            value="first"
                            status={ checked === 'first' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('first')}
                        />
                    </View> */}
                    <View style={globalStyle.selectPaymentMethod}>
                        <Image source={paypalicon} />
                        <Text>Pay Pal</Text>
                        <RadioButton
                            value="second"
                            status={ checked === 'second' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('second')}
                        />
                    </View>
                    {/* <View style={globalStyle.selectPaymentMethod}>
                        <Image source={visaicon} />
                        <Text>Visa</Text>
                        <RadioButton
                            value="third"
                            status={ checked === 'third' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('third')}
                        />
                    </View> */}
                </View>

                <Button mode="contained" onPress={handlePayPalPayment} buttonColor={appColors.SECONDARY} style={[{ ...commonStyles.loginBtn}]}>
                        continue
                </Button>
            </ScrollView>
        </View>    
    )
}

export default PaymentMethods