import React from 'react'
import { Button } from 'react-native-paper';
import { View, Text, TextInput, ScrollView } from 'react-native-web'
import tw from 'twrnc'
import { appColors } from '../../util/constant';
import { globalStyle } from '../../styles/globalStyle';
export default function OrderCash() {
  return (
    <>
        <ScrollView style={tw`bg-gray-200 rounded px-3 py-5 mt-10`}>
            <View style={tw`bg-white py-5`}>
                <View style={globalStyle.order_cash}>
                    <Text style={globalStyle.order_cash_text}>
                        Total
                    </Text>
                    <Text style={globalStyle.order_cash_text}>
                        $ 983
                    </Text>
                </View>
                <View style={globalStyle.order_cash}>
                    <Text style={globalStyle.order_cash_text}>
                        Wallet Payment
                    </Text>
                </View>
            </View>
            <Text style={tw`text-[#FF0303] text-[12px] tracking-[1px] pt-2 font-sm `}>No Payment has been made</Text>
        </ScrollView>
    
    </>  
    )
}
