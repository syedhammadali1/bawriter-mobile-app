import React from 'react'
import { useState } from 'react';
import { Image, Modal, View, Button, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable } from 'react-native';
import styles from '../../screens/auth/styles/styles';
import { globalStyle } from '../../styles/globalStyle';
import { OtpInput } from 'react-native-otp-entry';
import { appColors } from '../../util/constant';
import closeIcon from '../../../assets/images/close-icon.png';

const SubText = ({ borderWidth, borderColor, text, size, color, family, letterSpacing, align = 'left', leading }) => {
    return (
        <Text
            style={{
                fontSize: size,
                color: color,
                fontFamily: family,
                letterSpacing: letterSpacing ? letterSpacing : -0.02,
                textAlign: align,
                lineHeight: leading,
                borderWidth: borderWidth,
                borderColor: borderColor
            }}>

            {text}

        </Text>
    )
}

const BottomHeader = React.forwardRef((props,ref,) => {
    // We need to get the height of the phone and use it relatively, 
    // This is because height of phones vary


      // Attach the childFunction to the ref
  React.useImperativeHandle(ref, () => ({
    handleOpenBottomSheet,
  }));
    const windowHeight = Dimensions.get('window').height;

    // This state would determine if the drawer sheet is visible or not
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    // Function to open the bottom sheet 
    const handleOpenBottomSheet = () => {
        setIsBottomSheetOpen(true);
    };

    // Function to close the bottom sheet
    const handleCloseBottomSheet = () => {
        setIsBottomSheetOpen(false);
    };
    return (
        <View style={localStyles.container}>
            {/* <TouchableOpacity onPress={handleOpenBottomSheet} style={{ width: '90%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#86827e', paddingVertical: 12, borderRadius: 8 }}>
                <SubText text={'Open Drawer'} color={'#86827e'} size={16} />
            </TouchableOpacity> */}
            <Modal
                animationType="fade"
                transparent={true}
                // We use the state here to toggle visibility of Bottom Sheet 
                visible={isBottomSheetOpen}
                // We pass our function as default function to close the Modal
                onRequestClose={handleCloseBottomSheet}
                style={{borderRadius:70}}
                >

                <View style={[localStyles.bottomSheet, { height: windowHeight * 0.6, backgroundColor: appColors.PRIMARY,borderTopEndRadius:50,borderTopLeftRadius:50 }]}>

                    <View style={{ flex: 0, width: '100%', justifyContent: 'flex-end', flexDirection: 'row' }}>
                        {/* <SubText text={'Preview'} size={16} color={'#86827e'} /> */}
                        <TouchableOpacity onPress={handleCloseBottomSheet}>
                        <Image 
                            source={closeIcon}
                            style={{width: 20, height: 20}}
                        />
                        </TouchableOpacity>
                    </View>

                    <View style={{ paddingVertical: 16 }}>
                        <View style={{ ...styles.subContainer, marginTop: 10 }}  >
                            <Text style={{...globalStyle.mediumBoldText,}}>Enter 4 Digits Code</Text>
                            <Text style={{ ...globalStyle.smallText,width:230,textAlign:'center' ,marginTop: 10 }}>
                                Enter the 4 digits code that you received
                                on your email or phone number
                            </Text>
                            <Text style={{ ...globalStyle.largeBoldText, marginBottom: 30, marginTop: 20, }}>Verification Code</Text>
                            <OtpInput numberOfDigits={4}
                                style={{ ...styles.otpInput, }}
                                onTextChange={(text) => console.log(text)}
                                theme={{
                                    // containerStyle: {justifyContent:'space-between'},
                                    // inputsContainerStyle: {marginRight:20},
                                    pinCodeContainerStyle: { marginHorizontal: 15, borderColor: '#8E8E8E' },
                                    pinCodeTextStyle: { color: appColors.SECONDARY },
                                    focusStickStyle: { borderColor: '#8E8E8E' },
                                    focusedPinCodeContainerStyle: { borderColor: '#8E8E8E' },
                                }} />
                            <Pressable style={{ alignSelf: 'center', marginTop: 30, marginBottom: 20 }} onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text >Resend Code</Text>
                            </Pressable>
                            {/* <Button mode="contained" onPress={() => navigation.navigate('LogIn')} buttonColor={appColors.SECONDARY} style={styles.loginBtn}>
                                Continue
                            </Button> */}
                        </View>
                    </View>

                </View>
            </Modal>

        </View>
    )
});


// The StyleSheet is imported from React Native
const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'red'
    },
});

export default BottomHeader