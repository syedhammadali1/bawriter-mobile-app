import React, { useState } from 'react';
import AuthHeader from '../../components/auth/AuthHeader';
import commonStyles from '../auth/styles/styles';
import { globalStyle } from '../../styles/globalStyle';
import { appColors } from '../../util/constant';
import { Button, Card, Searchbar } from 'react-native-paper';
import { Image, ScrollView, Text, View } from 'react-native';
import tw from 'twrnc';
import searchicon from '../../../assets/images/icons/search-icon.png';
import { useGetOrderDetailsQuery } from '../../services/apiService';

export default function OrderDetails({ navigation }) {
    const { data: orderDetails, error, isLoading } = useGetOrderDetailsQuery(2);
    const [searchQuery, setSearchQuery] = useState('');

    if (isLoading) {
        return (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text>Loading...</Text>
          </View>
        );
    }

    if (error) {
        return (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-red-500`}>An error occurred: {error.message}</Text>
          </View>
        );
    }

    return (
        <View style={tw`bg-[#FDD043] flex-1`}>
            <View style={globalStyle.curve_container}>
                <View style={[{ ...globalStyle.order_container }]}>
                    <Text style={tw`mt-3 mb-1 font-bold text-[20px] text-center`}>Order Details</Text>

                    <View style={tw`flex flex-row justify-between`}>
                        <Searchbar
                            placeholder="Search"
                            onChangeText={setSearchQuery}
                            value={searchQuery}
                            style={tw`bg-gray-100 shadow-lg my-3 h-auto font-bold pl-0 w-60`}
                            inputStyle={tw`text-base`}
                            icon={() => <Image source={searchicon} style={{ width: 20, height: 20 }} />}
                            iconColor='#5597D1'
                        />
                        <Button mode="contained" onPress={() => navigation.navigate('getStarted')} buttonColor={appColors.SECONDARY} style={tw`my-4 text-xs`}>
                            Create 
                        </Button>
                    </View>    
                </View>
            </View>
            <ScrollView contentContainerStyle={commonStyles.container} keyboardDismissMode="on-drag" style={tw`bg-white`}>
                <View>
                    <View>
                        {Array.isArray(orderDetails) && orderDetails.length > 0 ? (
                            orderDetails.map((order, index) => (
                                <Card key={index} style={{ ...globalStyle.order_card }}>
                                    <View style={{...globalStyle.order_card_inner}}>
                                        <Text style={{...globalStyle.order_card_text}}>
                                            Project Code : {order.projectCode}
                                        </Text>
                                        <Text>
                                            {order.id}
                                        </Text>
                                    </View>
                                    <Text style={tw`tracking-[1px] text-[10px]`}>
                                        {order.application}
                                    </Text>
                                    <Text style={tw`tracking-[1px] text-[10px]`}>
                                        {order.date}
                                    </Text>
                                    <View style={{ ...globalStyle.card_cta }}>
                                        <View>
                                            <Text style={[tw`tracking-[2px] text-[12px]`, { color: order.statusColor }]}>{order.status}</Text>
                                        </View>
                                        <View>
                                            <Button style={tw`tracking-[1px] text-[#000000] bg-[#FDD043]`}>View More</Button>
                                        </View>
                                    </View>
                                </Card>
                            ))
                        ) : (
                            <Text style={tw`text-center text-red-500`}>No order details found or an error occurred.</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
            <View style={tw`bg-white`}>
                <Button mode="contained" onPress={() => navigation.navigate('OrderSummary', { orderId: 2 })} buttonColor={appColors.SECONDARY} style={[tw`mt-5`, { ...commonStyles.loginBtn }]}>
                    NEXT
                </Button>
            </View>
        </View>
    );
}
