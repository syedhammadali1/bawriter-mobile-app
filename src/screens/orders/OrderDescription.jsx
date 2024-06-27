import React from 'react'
import { View, Text } from 'react-native-web'
import { globalStyle } from '../../styles/globalStyle'
import { Button } from 'react-native-paper'
import tw from 'twrnc'
import commonStyles from '../auth/styles/styles'
import { appColors } from '../../util/constant'



export default function OrderDescription() {
 return (
    <>
        <View style={tw`bg-gray-300 px-3 py-5 mt-5 rounded shadow-lg shadow-slate-700`}>
            <Text style={tw`text-[15px] font-bold text-center mb-5`}>Project Code: FO-3999</Text>

            <Text style={globalStyle.order_description_text}>Project Title : Grand Application</Text>
            <Text style={globalStyle.order_description_text}>Posted Date : 2nd March’24 10:39pm</Text>
            <Text style={globalStyle.order_description_text}>Deadline Date : 10th March’24</Text>
            <Text style={globalStyle.order_description_text}>Assigned To : Hammad Ali</Text>
            <Text style={globalStyle.order_description_text}>Quantity : 10 Pages</Text>
            <Text style={globalStyle.order_description_text}>Revision Request : 0</Text>
            <Text style={globalStyle.order_description_text}>Status : On Going</Text>
            <Text style={globalStyle.order_description_text}>Revision Request : 0</Text>
            {/* <View style={tw`pt-5`}>
                <Text style={tw`text-center`}>
                    File Attachement
                </Text>
            </View> */}
        </View>
        <Button mode="contained" onPress={() => console.log('Pressed')} buttonColor={appColors.SECONDARY} style={commonStyles.loginBtn}>
            continue
        </Button>  
     </>    
  )     
}
