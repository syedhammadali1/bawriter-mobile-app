import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, Text, Linking  } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import tw from 'twrnc';
import AuthHeader from '../../components/auth/AuthHeader';
import commonStyles from '../auth/styles/styles';
import { globalStyle } from '../../styles/globalStyle';
import { appColors } from '../../util/constant';
import messageIcon from '../../../assets/images/icons/msg.png';
import descIcon from '../../../assets/images/icons/desc.png';
import dollarIcon from '../../../assets/images/icons/finance.png';
import { useGetOrderDetailQuery } from '../../services/apiService';
import * as FileSystem from 'expo-file-system';


import moment from 'moment/moment';


export default function OrderSummary({ route, navigation }) {
  const { orderId } = route.params || {};

  const [attachmentId, setAttachmentId] = useState(null);

  const downloadAttachment = async (url, displayName) => {
    const downloadDest = `${FileSystem.documentDirectory}${displayName}`;
    try {
      const { uri } = await FileSystem.downloadAsync(url, downloadDest);
      alert('Success', `Attachment downloaded to: ${uri}`);
    } catch (err) {
      alert('Error', `Failed to download attachment: ${err.message}`);
    }
  };

  if (!orderId) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-red-500`}>Order ID is missing</Text>
      </View>
    );
  }

  const { data, error, isLoading } = useGetOrderDetailQuery(orderId);



  const [selectedScreen, setSelectedScreen] = useState('Details');
  const [text, setText] = useState('');
  // console.log(data)
  const renderScreen = () => {
    // Handle loading and error states
    if (isLoading) {
      return <Text>Loading...</Text>;
    }

    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    const formattedPostedDate = data && moment(data.result.data.created_at).format('Do MMM YYYY');
    const formattedDeadlineDate = data && moment(data.result.data.dead_line).format('Do MMM YYYY');
    
    const attachments = data.result.data.order_attachments || [];


    // Render different screens based on selectedScreen
    switch (selectedScreen) {
      case 'Message':
        return (
          <View style={tw`bg-gray-200 rounded px-3 py-5 mt-10`}>
            <Text>Type Message</Text>
            <TextInput
              value={text}
              onChangeText={text => setText(text)}
              style={tw`bg-white rounded my-3 h-20`}
            />
            <View style={tw`text-right`}>
              <Button mode="contained" onPress={() => console.log('Pressed')} buttonColor={appColors.SECONDARY} style={tw`text-white rounded w-[40%]`}>
                Submit
              </Button>
            </View>
          </View>
        );
      case 'Details':
        return (
          <>
          <View style={tw`bg-gray-300 px-3 py-5 mt-5 rounded shadow-lg shadow-slate-700 mt-10`}>
            <Text style={tw`text-[15px] font-bold text-center mb-5`}>Project Code : {data.result.data.number}</Text>
            <Text style={globalStyle.order_description_text}> Project Title : {data.result.data.title}</Text>
            <Text style={globalStyle.order_description_text}> Posted Date : {formattedPostedDate}</Text>
            <Text style={globalStyle.order_description_text}> Deadline Date : {formattedDeadlineDate}</Text>
            <Text style={globalStyle.order_description_text}> Price per Page : {data.result.data.unit_price}</Text>
            <Text style={globalStyle.order_description_text}> Quantity : {data.result.data.quantity} </Text>
            {/* <Text style={globalStyle.order_description_text}> Spacing Type : {data.result.data.spacing_type}</Text> */}
              <View style={tw`pt-5`}>
              {attachments.length > 0 ? (
              attachments.map((attachment, index) => (
                <View key={index} style={tw`mb-4`}>
                  <Text style={tw`mb-5 text-center`}>File Attachment: {attachment.display_name}</Text>
                  <Button
                    mode="outlined"
                    onPress={() => downloadAttachment(attachment.name, attachment.display_name)}
                    style={tw`mx-10`}
                    textColor='#000'
                  >
                    Download Attachment
                  </Button>
                </View>
              ))
            ) : (
              <Text style={tw`text-center`}>No attachments found</Text>
            )}
              </View>
          </View>
          
          {/* <Button mode="contained" onPress={() => navigation.navigate('getStarted')} buttonColor={appColors.SECONDARY} style={commonStyles.loginBtn}>
            Continue
          </Button> */}
        </>
        );
      case 'Cash':
        return (
          <View style={tw`bg-gray-200 rounded px-3 py-5 mt-10`}>
            <View style={tw`bg-white py-5`}>
              <View style={globalStyle.order_cash}>
                <Text style={globalStyle.order_cash_text}>Total</Text>
                <Text>$ {data.result.data.total || 'N/A'}</Text>
              </View>
              <View style={globalStyle.order_cash}>
                <Text>Wallet Payment</Text>
              </View>
            </View>
            <Text style={tw`text-[#FF0303] text-[12px] tracking-[1px] pt-2`}>No Payment has been made</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[tw`flex-1`, { ...globalStyle.main }]}>
      <ScrollView
        contentContainerStyle={commonStyles.container2}
        keyboardDismissMode="on-drag"
        style={globalStyle.curve_container}
      >
        <AuthHeader />
        <View style={tw`mt-5 flex justify-center flex-row gap-[30px]`}>
          <Pressable
            onPress={() => setSelectedScreen('Message')}
            style={[
              tw`bg-[#5597D1] rounded-lg p-3 shadow-lg shadow-slate-700`,
              selectedScreen === 'Message' ? tw`opacity-50` : tw`opacity-100`
            ]}
          >
            <Image source={messageIcon} />
          </Pressable>
          <Pressable
            onPress={() => setSelectedScreen('Details')}
            style={[
              tw`bg-[#5597D1] rounded-lg py-3 px-4 shadow-lg shadow-slate-700`,
              selectedScreen === 'Details' ? tw`opacity-50` : tw`opacity-100`
            ]}
          >
            <Image source={descIcon} />
          </Pressable>
          <Pressable
            onPress={() => setSelectedScreen('Cash')}
            style={[
              tw`bg-[#5597D1] rounded-lg p-3 shadow-lg shadow-slate-700`,
              selectedScreen === 'Cash' ? tw`opacity-50` : tw`opacity-100`
            ]}
          >
            <Image source={dollarIcon} />
          </Pressable>
        </View>
        {renderScreen()}
      </ScrollView>
    </View>
  );
}
