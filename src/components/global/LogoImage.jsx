import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { globalStyle } from '../../styles/globalStyle'

const LogoImage = ({imgStyle,viewStyle}) => {
    return (
        <View style={{ ...localStyle.view,...viewStyle }}>
            <Image style={{...localStyle.img,...imgStyle}} source={require('../../../assets/images/logo.jpg')} />
        </View>
    )
}

const localStyle = StyleSheet.create({
    img: {
        height: 71,
        width: 260,
        resizeMode: 'contain',

    },
    view:{
        alignItems: 'center'
    }
})
export default LogoImage