import React, {useRef } from 'react'
import { ScrollView, Text, View } from 'react-native'
import styles from './styles/styles'
import AuthHeader from '../../components/auth/AuthHeader'
import { Button, TextInput } from 'react-native-paper'
import { globalStyle } from '../../styles/globalStyle'
import { appColors } from '../../util/constant'
import BottomHeader from '../../components/global/BottomHeader'
import LogoImage from '../../components/global/LogoImage'
import { textStyle } from '../../styles/textStyle';

const ForgotPassword = ({navigation}) => {
    const [email, setEmail] = React.useState("");
    const childRef = useRef();
    const callChildFunction = () => {
        // Access the child function using the ref
        childRef.current.handleOpenBottomSheet();
      }
    const handleOpenModal = (open)=> {
        open();
    } 
    return (
        <ScrollView contentContainerStyle={globalStyle.container} keyboardDismissMode="on-drag" >
            {/* <AuthHeader title='Forgot Password' /> */}
            <LogoImage imgStyle={{marginTop:60}}/>

            <Text style={{...textStyle.largeBoldText,textAlign:'center',marginTop:60}}>Forget Password</Text>
            <Text style={{...textStyle.mediumText,textAlign:'center',marginTop:20}}>Enter Your Email Address for verification process. We will send 4 digits code to your email or phone number</Text>
            <View style={styles.subContainer}  >
                <TextInput
                    // label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    mode='flat'
                    style={{...styles.input,marginTop:20}}
                    label='Email or Phone Number'
                    // left={<TextInput.Icon icon="email" />}
                />

                <Button mode="contained" 
                // onPress={callChildFunction} 
                onPress={()=>navigation.navigate('Otp',{page:'reset Password'})} 
                buttonColor={appColors.SECONDARY} 
                style={{...styles.loginBtn,marginTop:30}}>                    
                    CONTINUE
                </Button>

                {/* <BottomHeader ref={childRef}/> */}
            </View>
        </ScrollView>
    )
}

export default ForgotPassword