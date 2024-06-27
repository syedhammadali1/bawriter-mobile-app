import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import tw from 'twrnc';
import { Dropdown } from 'react-native-element-dropdown';
import AuthHeader from '../../components/auth/AuthHeader';
import { appColors } from '../../util/constant';
import { globalStyle } from '../../styles/globalStyle';
import commonStyles from '../auth/styles/styles';
import { useGetOrderCreateQuery } from '../../services/apiService';

export default function GetStarted({ navigation }) {
  const { data, error, isLoading } = useGetOrderCreateQuery();
  const [selectedChip, setSelectedChip] = useState('');
  const [dropdownValue, setDropdownValue] = useState(null);
  const [pageCount, setPageCount] = useState(1);

  const handleChipPress = (chip) => {
    setSelectedChip(chip);
  };

  const pageIncrement = () => setPageCount(pageCount + 1);
  const pageDecrement = () => {
    if (pageCount > 1) {
      setPageCount(pageCount - 1);
    }
  };
  useEffect(() => {
    // You can add any side effects here if needed
  }, [data, error, isLoading]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const dropdownData = {
    serviceType: data?.service_types.map(type => ({ label: type.name, value: type.id })) || [],
    writers: data?.writer_list.map(writer => ({ label: `${writer.first_name} ${writer.last_name}`, value: writer.id })) || [],
    urgency: data?.urgency_types.map(type => ({ label: type.name, value: type.id })) || [],
  };


  return (
    <View style={[tw`flex-1`, { ...globalStyle.main }]}>
      <ScrollView contentContainerStyle={commonStyles.container2} style={globalStyle.curve_container}>
        <Text style={[tw`font-bold`, { ...globalStyle.heading_four }]}>Step 1/3 TYPE OF WORK AND DEADLINE</Text>

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
            value={dropdownValue}
            onChange={item => setDropdownValue(item.value)}
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
            data={writerList.map(writer => ({
              label: `${writer.first_name} ${writer.last_name}`,
              value: writer.id.toString()
            }))}
            maxHeight={100}
            labelField="label"
            valueField="value"
            placeholder="Select"
            value={dropdownValue}
            onChange={item => setDropdownValue(item.value)}
          />
        </View>

        <Text style={[tw`font-bold`, { ...globalStyle.dropdown_heading }]}>
          Work level
        </Text>
        <View style={tw`flex flex-row flex-wrap gap-[10px] justify-center mb-2`}>
          {['High School', 'College', 'Ph.D.', 'Undergraduate', 'Masters'].map((level) => (
            <Chip
              key={level}
              onPress={() => handleChipPress(level)}
              style={[
                tw`rounded-0`,
                {
                  backgroundColor: selectedChip === level ? '#FDD043' : '#FFFFFF',
                  borderColor: selectedChip === level ? '#FFFFFF' : '#5597D1',
                  borderWidth: 1
                }
              ]}
              textStyle={{ color: selectedChip === level ? '#FFFFFF' : '#000000' }}
            >
              {selectedChip === level && (
                <Text style={tw`absolute top-1 right-1`}>✓</Text>
              )}
              {level}
            </Chip>
          ))}
        </View>

        <View style={tw`flex flex-row gap-[5px] justify-between`}>
          <View style={tw`w-[40%] text-center`}>
            <Text style={[tw`font-bold`, { ...globalStyle.dropdown_headingsmall }]}>
              Number of pages
            </Text>
            <View style={tw`flex flex-row justify-between my-2 bg-gray-200 px-3`}>
              <TouchableOpacity onPress={pageDecrement}>
                <Text style={tw`text-lg font-bold`}>-</Text>
              </TouchableOpacity>
              <Text style={tw`text-lg font-bold bg-white w-[50%] text-center my-1`}>{pageCount}</Text>
              <TouchableOpacity onPress={pageIncrement}>
                <Text style={tw`text-lg font-bold`}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={tw` text-center`}>
            <Text style={[tw`font-bold`, { ...globalStyle.dropdown_headingsmall }]}>
              Spacing
            </Text>
            <View style={tw`flex flex-row my-2`}>
              {['Double-Spaced', 'Single-Spaced'].map((level) => (
                <Chip
                  key={level}
                  onPress={() => handleChipPress(level)}
                  style={[
                    tw`rounded-0`,
                    {
                      backgroundColor: selectedChip === level ? '#FDD043' : '#FFFFFF',
                      borderColor: selectedChip === level ? '#FFFFFF' : '#5597D1',
                      borderWidth: 1
                    }
                  ]}
                  textStyle={[
                    tw`text-[10px] m-1`,
                    { color: selectedChip === level ? '#FFFFFF' : '#000000' }
                  ]}
                >
                  {selectedChip === level && (
                    <Text style={tw`absolute top-1 right-1`}>✓</Text>
                  )}
                  {level}
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
            value={dropdownValue}
            onChange={item => setDropdownValue(item.value)}
          />
        </View>
      </ScrollView>
      <View style={tw`bg-white`}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('PaperDetails')}
          buttonColor={appColors.SECONDARY}
          style={{ ...commonStyles.loginBtn }}
        >
          NEXT
        </Button>
      </View>
    </View>
  );
}
