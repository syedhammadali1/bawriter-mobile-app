import React from 'react'
import styles from '../../screens/auth/styles/styles'
import { Image, Text, View } from 'react-native'
import commonStyles from '../../screens/auth/styles/styles'

function AuthHeader({title}) {
    return (
        <View style={{ alignItems: 'center', marginVertical:10 }}>
            <Image  source={require('../../../assets/images/logo.png')}/>
        </View>
    )
}

export default AuthHeader