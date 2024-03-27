import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import AuthHeader from '../components/auth/AuthHeader'
import { appColors } from '../util/constant'
import commonStyles from './auth/styles/styles'
import { globalStyle } from '../styles/globalStyle'
import { Button, RadioButton } from 'react-native-paper'
import mastericon from '../../assets/images/icons/mastercard.png'

const PaymentMethods = () => {
    return (
        <ScrollView contentContainerStyle={commonStyles.container} keyboardDismissMode="on-drag">
            <AuthHeader title='Reset Password' />
            <Text style={{ ...globalStyle.largeBoldText, textAlign: 'center', marginTop: 80 }}>Payment Methods</Text>

            <View style={commonStyles.subContainer}  >

                <View style={{display:'flex',flexDirection:'row',backgroundColor:'#D9D9D9',width:'100%',justifyContent:'space-around',alignItems:'center',borderRadius:9,height:50}}>
                    <Image source={mastericon} />
                    <Text style={globalStyle.mediumBoldText}>Master Card</Text>
                    <RadioButton
                        value="first"
                        status={'checked'}
                        // onPress={() => setChecked('first')}
                    />
                </View>

                <Button mode="contained" onPress={() => console.log('Pressed')} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn, marginTop: 50 }}>
                    RESET PASSWORD
                </Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    
})
export default PaymentMethods