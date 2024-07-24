import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { appColors } from '../../util/constant';
import { globalStyle } from '../../styles/globalStyle';
import commonStyles from '../auth/styles/styles';
import { useGetCreateOrderQuery } from '../../services/apiService';
import { setOrderData } from '../../redux/orderReducer';
import nextIcon from '../../../assets/images/icons/next-icon.png'
import { DotIndicator } from 'react-native-indicators';



export default function GetStarted({ navigation }) {
  const { data, error, isLoading, isSuccess } = useGetCreateOrderQuery();
  const [selectedWorkLevelChip, setSelectedWorkLevelChip] = useState('');
  const [selectedSpacingChip, setSelectedSpacingChip] = useState('');
  const [dropdownServiceType, setDropdownServiceType] = useState(null);
  const [dropdownWriter, setDropdownWriter] = useState(null);
  const [dropdownUrgency, setDropdownUrgency] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [workLevels, setWorkLevels] = useState([]);
  const [serviceTypeData, setServiceTypeData] = useState([]);
  const [writerListData, setWriterListData] = useState([]);
  const [urgencyData, setUrgencyData] = useState([]);
  const [spacing, setSpacing] = useState([]);

  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order);

  useEffect(() => {
    if (isSuccess) {
      setServiceTypeData(data.result.data.service_id_list);
      setWriterListData(data.result.data.writer_list);
      setUrgencyData(data.result.data.urgency_id_list);

      const mappedWorkLevels = data.result.data.work_level_id_list.map(level => ({
        id: level.id.toString(),
        name: level.name,
        percentage_to_add: level.percentage_to_add,
        inactive: level.inactive,
        created_at: level.created_at,
        updated_at: level.updated_at,
        value: level.id.toString()
      }));
      setWorkLevels(mappedWorkLevels);

      const mappedSpacing = data.result.data.spacings_list.map(spacing => ({
        id: spacing.id.toString(),
        label: spacing.name,
        value: spacing.id.toString()
      }));
      setSpacing(mappedSpacing);
    } else if (error) {
      console.error('API error:', error);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    console.log("Order Data:", orderData);
  }, [orderData]);

  const handleChipPress = (type, chip) => {
    if (type === 'workLevel') {
      setSelectedWorkLevelChip(chip);
    } else if (type === 'spacing') {
      setSelectedSpacingChip(chip);
    }
  };

  const pageIncrement = () => setPageCount(pageCount + 1);
  const pageDecrement = () => {
    if (pageCount > 1) {
      setPageCount(pageCount - 1);
    }
  };

  const handleNextClick = () => {
    if (!dropdownServiceType || !dropdownWriter || !selectedWorkLevelChip || !dropdownUrgency || !selectedSpacingChip) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    const selectedServiceType = serviceTypeData.find(item => item.id.toString() === dropdownServiceType);
    const selectedWriter = writerListData.find(item => item.id.toString() === dropdownWriter);
    const selectedWorkLevel = workLevels.find(level => level.value === selectedWorkLevelChip);
    const selectedUrgency = urgencyData.find(item => item.id.toString() === dropdownUrgency);
    const selectedSpacing = spacing.find(space => space.value === selectedSpacingChip);

    dispatch(setOrderData({
      serviceType: selectedServiceType,
      writer: selectedWriter,
      workLevel: selectedWorkLevel,
      urgency: selectedUrgency,
      pages: pageCount,
      spacing: selectedSpacing,
    }));

    navigation.navigate('PaperDetails');
  };

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
               <DotIndicator color="#FDD043" count={5} size={10} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <View style={[tw`flex-1`, { ...globalStyle.main }]}>
      <ScrollView contentContainerStyle={commonStyles.container2} style={globalStyle.curve_container}>
        <Text style={[tw`font-bold`, { ...globalStyle.heading_four }]}>Step 1/3 TYPE OF WORK AND DEADLINE</Text>

        <View style={tw`mb-2`}>
          <Text style={[tw`font-bold`, { ...globalStyle.dropdown_heading }]}>
            Service Type
          </Text>
          <Dropdown
            style={[tw`bg-[#EFEEEE] py-1 px-3 rounded-lg`, { width: '100%' }]}
            placeholderStyle={tw`text-gray-600`}
            selectedTextStyle={tw`text-black`}
            iconStyle={tw`text-gray-600`}
            data={serviceTypeData.map(item => ({ label: item.name, value: item.id.toString() }))}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={dropdownServiceType}
            onChange={item => setDropdownServiceType(item.value)}
          />
        </View>

        <View style={tw`mb-2`}>
          <Text style={[tw`font-bold`, { ...globalStyle.dropdown_heading }]}>
            Writers
          </Text>
          <Dropdown
            style={[tw`bg-[#EFEEEE] py-1 px-3 rounded-lg`, { width: '100%' }]}
            placeholderStyle={tw`text-gray-600`}
            selectedTextStyle={tw`text-black`}
            iconStyle={tw`text-gray-600`}
            data={writerListData.map(item => ({ label: item.first_name + ' ' + item.last_name, value: item.id.toString() }))}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={dropdownWriter}
            onChange={item => setDropdownWriter(item.value)}
          />
        </View>

        <Text style={[tw`font-bold`, { ...globalStyle.dropdown_heading }]}>
          Work level
        </Text>
        <View style={tw`flex flex-row flex-wrap gap-[5px] justify-around mb-2`}>
          {workLevels.map(level => (
            <Chip
              key={level.id}
              onPress={() => handleChipPress('workLevel', level.value)}
              style={[
                tw`rounded-0`,
                {
                  backgroundColor: selectedWorkLevelChip === level.value ? '#FDD043' : '#FFFFFF',
                  borderColor: selectedWorkLevelChip === level.value ? '#FFFFFF' : '#5597D1',
                  borderWidth: 1
                }
              ]}
              textStyle={{ color: "#000000" }}
            >
              {selectedWorkLevelChip === level.value && (
                <Text style={tw`absolute top-1 right-1`}>✓</Text>
              )}
              {level.name}
            </Chip>
          ))}
        </View>

        <View style={tw`flex flex-row gap-[5px] justify-between`}>
          <View style={tw`w-[40%] text-center`}>
            <Text style={[tw`font-bold`, { ...globalStyle.dropdown_headingsmall }]}>
              Number of pages
            </Text>
            <View style={tw`flex flex-row justify-between my-2 bg-gray-200 `}>
              <TouchableOpacity onPress={pageDecrement} style={tw`px-3 w-[25%]`}> 
                <Text style={tw`text-lg font-bold`}>-</Text>
              </TouchableOpacity>
              <Text style={tw`text-lg font-bold bg-white w-[50%] text-center my-1`}>{pageCount}</Text>
              <TouchableOpacity onPress={pageIncrement} style={tw`px-2 w-[25%]`}>
                <Text style={tw`text-lg font-bold`}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw` text-center`}>
            <Text style={[tw`font-bold`, { ...globalStyle.dropdown_headingsmall }]}>
              Spacing
            </Text>
            <View style={tw`flex flex-row my-2`}>
              {spacing.map(space => (
                <Chip
                  key={space.id}
                  onPress={() => handleChipPress('spacing', space.value)}
                  style={[
                    tw`rounded-0`,
                    {
                      backgroundColor: selectedSpacingChip === space.value ? '#FDD043' : '#FFFFFF',
                      borderColor: selectedSpacingChip === space.value ? '#FFFFFF' : '#5597D1',
                      borderWidth: 1
                    }
                  ]}
                  textStyle={[
                    tw`text-[10px] m-1`,
                    { color: '#000000' }
                  ]}
                >
                  {selectedSpacingChip === space.value && (
                    <Text style={tw`absolute top-1 right-1`}>✓</Text>
                  )}
                  {space.label}
                </Chip>
              ))}
            </View>
          </View>
        </View>

        <View style={tw`mb-2`}>
          <Text style={[tw`font-bold`, { ...globalStyle.dropdown_heading }]}>
            Urgency
          </Text>
          <Dropdown
            style={[tw`bg-[#EFEEEE] py-1 px-3 rounded-lg`, { width: '100%' }]}
            placeholderStyle={tw`text-gray-600`}
            selectedTextStyle={tw`text-black`}
            iconStyle={tw`text-gray-600`}
            data={urgencyData.map(item => ({ label: item.name, value: item.id.toString() }))}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={dropdownUrgency}
            onChange={item => setDropdownUrgency(item.value)}
          />
        </View>
      </ScrollView>
      <View style={tw`bg-white`}>
      <Button
        mode="contained"
        onPress={handleNextClick}
        buttonColor={appColors.SECONDARY}
        style={{ ...commonStyles.loginBtn }}
        contentStyle={{ flexDirection: 'row-reverse' }}
        icon={() => <Image source={nextIcon} style={{ width: 20, height: 20, position: 'absolute', left: 100, top: '0%', transform: [{ translateY: -10 }] }} />}
      >
        NEXT
      </Button>
    </View>
    </View>
  );
}
