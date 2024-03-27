import React from 'react'
import styles from '../../screens/auth/styles/styles'
import { Image, Text, View } from 'react-native'
import commonStyles from '../../screens/auth/styles/styles'

function AuthHeader({title}) {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image style={commonStyles.logo} source={require('../../../assets/images/logo.jpg')} />
        </View>
    )
}

export default AuthHeader