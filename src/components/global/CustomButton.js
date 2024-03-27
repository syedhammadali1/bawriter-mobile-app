import React from 'react'
import { Button } from 'react-native-paper'
import { appColors } from '../../util/constant'
import { globalStyle } from '../../styles/globalStyle'
import { StyleSheet } from 'react-native'

const CustomButton = ({children ,onPress,style,mode,buttonColor}) => {
    return (
        <Button mode={ mode ? mode:"contained" } onPress={onPress} buttonColor={buttonColor ? buttonColor : appColors.SECONDARY} style={{...localStyle.btn,...style}}>
            {children}
        </Button>
    )
}

const localStyle = StyleSheet.create({
    btn: {
        width: '100%',
        borderRadius: 15
    },
})
export default CustomButton