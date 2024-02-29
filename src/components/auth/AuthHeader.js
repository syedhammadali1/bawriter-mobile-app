import React from 'react'
import styles from '../../screens/auth/styles/styles'
import { Image, Text, View } from 'react-native'

function AuthHeader({title}) {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image style={styles.logo} source={require('../../../assets/logo-icon.png')} />
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default AuthHeader