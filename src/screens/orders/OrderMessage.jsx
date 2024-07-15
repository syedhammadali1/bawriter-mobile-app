import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import { View, Text, TextInput } from 'react-native-web'
import tw from 'twrnc'
import { appColors } from '../../util/constant';
import { usePostcommentMutation } from '../../services/apiService';



export default function OrderMessage() {
    const [message, setMessage] = React.useState("");

    const [postcomment, {isloading}] = usePostcommentMutation()

    const handleSubmit = async () => {
        try {
            const response = await postcomment({ message }).unwrap();
            console.log('Message posted successfully:', response);
        } catch (error) {
            console.error('Failed to post message:', error);
        }
    };

  return (
    <>
        <View style={tw`bg-gray-200 rounded px-3 py-5 mt-10`}>
        
            <TextInput
                label="Email"
                value={setMessage}
                onChangeText={message => setText(message)}
                style={tw`bg-white rounded my-3 h-20`}
            />
            <View style={tw`text-right`}>
                <Button mode="contained" onPress={handleSubmit} buttonColor={appColors.SECONDARY} style={tw`text-white rounded w-[40%]`}></Button>
            </View>
            
        </View>
    
    </>
  )
}
