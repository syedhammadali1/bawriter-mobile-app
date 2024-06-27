import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import { View, Text, TextInput } from 'react-native-web'
import tw from 'twrnc'
import { appColors } from '../../util/constant';

export default function OrderMessage() {
    const [text, setText] = React.useState("");

  return (
    <>
        <View style={tw`bg-gray-200 rounded px-3 py-5 mt-10`}>
        
            <TextInput
                label="Email"
                value={text}
                onChangeText={text => setText(text)}
                style={tw`bg-white rounded my-3 h-20`}
            />
            <View style={tw`text-right`}>
                <Button mode="contained" onPress={() => console.log('Pressed')} buttonColor={appColors.SECONDARY} style={tw`text-white rounded w-[40%]`}></Button>
            </View>
            
        </View>
    
    </>
  )
}
