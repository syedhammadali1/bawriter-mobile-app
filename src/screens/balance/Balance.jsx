import React from 'react'
import AuthHeader from '../../components/auth/AuthHeader'
import commonStyles from '../auth/styles/styles'
import { globalStyle } from '../../styles/globalStyle'
import { appColors } from '../../util/constant'
import { Button } from 'react-native-paper'
import { Image, ScrollView, Text, View } from 'react-native'
import tw from 'twrnc';



export default function Balance({navigation}) {
    return (
        <View style={tw`bg-[#FDD043]`}>
            <ScrollView contentContainerStyle={globalStyle.container} keyboardDismissMode="on-drag" style={globalStyle.curve_container}>
                <AuthHeader/>
                    <View style={tw`bg-gray-300 p-10 rounded-lg my-20`}>
                        <Text style={tw`text-[20px] font-medium text-center	pb-2`}>
                            Current Balance
                        </Text>
                        <Text style={tw`text-[20px] font-bold text-center`}>
                            $100.00
                        </Text>
                    </View>
                    <Button mode="contained" onPress={() => navigation.navigate('OrderDetails')} buttonColor={appColors.SECONDARY} style={tw`mt-50`}>
                        continue
                    </Button>
            </ScrollView>
        </View>    
    )
}
