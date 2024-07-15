import React, { useState } from 'react';
import { View, Text, Image, ScrollView, RefreshControl } from 'react-native';
import { Button, Card, Searchbar } from 'react-native-paper';
import tw from 'twrnc';
import moment from 'moment';
import AuthHeader from '../../components/auth/AuthHeader';
import commonStyles from '../auth/styles/styles';
import { globalStyle } from '../../styles/globalStyle';
import { appColors } from '../../util/constant';
import searchicon from '../../../assets/images/icons/search-icon.png';
import { useGetOrderlistQuery } from '../../services/apiService';

export default function OrderDetails({ navigation }) {
  const { data, error, isLoading, refetch } = useGetOrderlistQuery(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); // Ensure this resolves
    } catch (err) {
      console.error("Failed to refresh:", err);
    }
    setRefreshing(false);
  };

  if (isLoading && !refreshing) {
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

  const list = data?.result?.data || [];

  const statusColors = {
    'New': '#007bff',
    'In progress': '#17a2b8',
    'Submitted for approval': '#17a2b8',
    'Requested for revision': '#ffc107',
    'Completed': '#28a745',
    'On hold': '#6c757d',
    'Canceled': '#343a40',
    'Refunded': '#F53B00',
    'Payment needs approval': '#F53B00',
    'Payment Disapproved': '#343a40',
    'Pending Payment': '#F53B00'
  };

  return (
    <View style={tw`bg-[#FDD043] flex-1`}>
      <View style={globalStyle.curve_container}>
        <View style={[{ ...globalStyle.order_container }]}>
          <Text style={tw`mt-3 mb-1 font-bold text-[20px] text-center`}>Order Details</Text>

          <View>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={tw`bg-gray-100 shadow-lg my-3 h-auto font-bold pl-0`}
              inputStyle={tw`text-base`}
              icon={() => <Image source={searchicon} style={{ width: 20, height: 20 }} />}
              iconColor='#5597D1'
            />
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={commonStyles.container}
        keyboardDismissMode="on-drag"
        style={tw`bg-white`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {list.length > 0 ? (
          list.map((order, index) => (
            <Card key={index} style={{ ...globalStyle.order_card }}>
              <View style={{ ...globalStyle.order_card_inner }}>
                <Text style={{ ...globalStyle.order_card_text }}>
                  Project Code: {order.order_no}
                </Text>
              </View>
              <Text style={tw`tracking-[1px] text-[15px] font-medium`}>
                {order.title}
              </Text>
              <Text style={tw`tracking-[1px] text-[12px] `}>
                {moment(order.created_at).format('Do MMMM-YY')}
              </Text>
              <View style={{ ...globalStyle.card_cta }}>
                <View>
                  <Text style={[tw`tracking-[1px] text-[10px]`, { color: statusColors[order.status] }]}>
                    {order.status}
                  </Text>
                </View>
                <View>
                  <Button
                    style={tw`tracking-[2px] text-[#000000] bg-[#FDD043] px-3`}
                    onPress={() => navigation.navigate('OrderSummary', { orderId: order.id })}
                    textColor="#000"
                  >
                    View More
                  </Button>
                </View>
              </View>
            </Card>
          ))
        ) : (
          <Text style={tw`text-center text-red-500`}>No order details found or an error occurred.</Text>
        )}
      </ScrollView>

      <View style={tw`bg-white`}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('getStarted')}
          buttonColor={appColors.SECONDARY}
          style={[tw`mt-5`, { ...commonStyles.loginBtn }]}
        >
          CREATE ORDER
        </Button>
      </View>
    </View>
  );
}
