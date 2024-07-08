import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Chip, TextInput } from 'react-native-paper';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import Checkbox from 'expo-checkbox';
import uploadicon from '../../../assets/images/icons/upload.png';
import { setOrderData } from '../../redux/orderReducer';
import { appColors } from '../../util/constant';
import { globalStyle } from '../../styles/globalStyle';
import commonStyles from '../auth/styles/styles';

export default function PaperDetails({ navigation }) {
  const [title, setTitle] = useState("");
  const [Instructions, setInstructions] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    instructions: '',
    terms: '',
  });

  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleNextClick = () => {
    let hasErrors = false;
    let newErrors = { ...errors };

    if (!title.trim()) {
      newErrors.title = 'Title is required';
      hasErrors = true;
    } else {
      newErrors.title = '';
    }

    if (!Instructions.trim()) {
      newErrors.instructions = 'Instructions are required';
      hasErrors = true;
    } else {
      newErrors.instructions = '';
    }

    if (!isSelected) {
      newErrors.terms = 'You must agree to the terms';
      hasErrors = true;
    } else {
      newErrors.terms = '';
    }

    setErrors(newErrors);

    if (!hasErrors) {
      dispatch(
        setOrderData({
          title: title,
          instructions: Instructions,
          // Assuming orderData contains descriptive fields as well
          serviceType: orderData.serviceType,
          writer: orderData.writer,
          workLevel: orderData.workLevel,
          urgency: orderData.urgency,
          pages: orderData.pages,
          spacing: orderData.spacing,
        })
      );
      toggleModal();
    }
  };

  return (
    <View style={[tw`flex-1`, { ...globalStyle.main }]}>
      <ScrollView contentContainerStyle={commonStyles.container2} style={globalStyle.curve_container}>
        <Text style={[tw`font-bold`, { ...globalStyle.heading_four }]}>Step 2/3 ADDITIONAL PAPER DETAILS</Text>

        <View style={tw`mb-5`}>
          <TextInput
            label="Title *"
            value={title}
            onChangeText={title => setTitle(title)}
            mode='flat'
            style={[tw`my-2`, { ...globalStyle.input }]}
            error={!!errors.title}
          />
          <TextInput
            label="Specific Instructions *"
            value={Instructions}
            onChangeText={Instructions => setInstructions(Instructions)}
            mode='flat'
            style={[tw`my-2`, { ...globalStyle.input }]}
            multiline={true}
            error={!!errors.instructions}
          />
          <View style={tw`my-5`}>
            <Button
              mode='contained'
              icon={() => <Image source={uploadicon} style={{ width: 30, height: 30 }} />}
              textColor='#000'
              buttonColor='#EFEEEE'
              onPress={() => console.log('pressed')}
            >
              Upload File
            </Button>
            <Text style={tw`my-5`}>Selected File</Text>
          </View>

          <Text style={tw`color-[#5597D1] my-2 text-[12px] font-semibold`}>Previous</Text>
          <View style={tw`flex-row`}>
            <Checkbox
              value={isSelected}
              onValueChange={setSelection}
              style={tw`bg-#00000`}
              error={!!errors.terms}
            />
            <Text style={tw`text-[10px] pl-1`}>I agree to the Terms and Conditions and Privacy Policy </Text>
          </View>
        </View>

        <Button mode="contained" onPress={handleNextClick} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn }}>Pay Now</Button>
      </ScrollView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={globalStyle.bottomModal}
      >
        <View style={globalStyle.modalContent}>
          <View style={globalStyle.dragHandle} />
          <Text style={[tw`border-b-2 border-[#5597D1]`, { ...globalStyle.largeBoldText, ...globalStyle.heading_three }]}>Order Summary</Text>
          <View style={tw`my-3`}>
            <Text style={tw`text-[16px] font-bold text-[#5597D1]`}>Service</Text>
            <Text style={tw`text-[13px] font-semibold text-[#5597D1]`}>{orderData.serviceType}</Text>
            <Text style={tw`text-[10px] text-[#5597D1]`}>{orderData.workLevel}</Text>
          </View>
          <View style={tw`my-2`}>
            <Text style={globalStyle.order_description_text}>Urgency: {orderData.urgency}</Text>
            <Text style={globalStyle.order_description_text}>Spacing Type: {orderData.spacing}</Text>
            <Text style={globalStyle.order_description_text}>Pages: {orderData.pages}</Text>
            <Text style={globalStyle.order_description_text}>Writer Fee: $2.00</Text>
            <Text style={globalStyle.order_description_text}>Work Level Charges: $0.05</Text>
            <Text style={globalStyle.order_description_text}>Urgency Charges: $0.19</Text>
            <Text style={globalStyle.order_description_text}>Unit Rate: $2.24</Text>
          </View>
          <View style={tw`my-5`}>
            <View style={tw`flex-row justify-between px-3 py-2 border-t-2 border-[#FDD043]`}>
              <Text style={tw`font-bold text-[#5597D1]`}>Amount</Text>
              <Text>$20.00</Text>
            </View>
            <View style={tw`flex-row justify-between px-3 py-2 border-t-2 border-[#FDD043]`}>
              <Text style={tw`font-bold text-[#5597D1]`}>Total</Text>
              <Text>$20.00</Text>
            </View>
          </View>
          <Button mode="contained" onPress={() => navigation.navigate('AddPaymentMethods')} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn }}>
            GO TO PAYMENT METHODS
          </Button>
        </View>
      </Modal>
    </View>
  );
}
