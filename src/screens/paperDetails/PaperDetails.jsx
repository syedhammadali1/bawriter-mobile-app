import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import tw from 'twrnc';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import { setOrderData } from '../../redux/orderReducer';
import { useUploadFileMutation } from '../../services/apiService';
import uploadicon from '../../../assets/images/icons/upload.png';
import { appColors } from '../../util/constant';
import { globalStyle } from '../../styles/globalStyle';
import commonStyles from '../auth/styles/styles';
import Checkbox from 'expo-checkbox';


export default function PaperDetails({ navigation }) {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [document, setDocument] = useState(null);
  const [errors, setErrors] = useState({
    title: '',
    instructions: '',
    terms: '',
  });

  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.order);
  const [uploadFile, { isLoading }] = useUploadFileMutation();

  useEffect(() => {
    console.log('Order Data in Order Summary:', orderData);
  }, [orderData]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.type === 'success') {
        const file = result.assets[0];
        setDocument(file.name);

        const response = await uploadFile(file).unwrap(); // Assuming uploadFile is a RTK Query mutation
        console.log('File upload response:', response);
        
        // Handle successful upload (e.g., show success message)
      } else {
        console.log('Document picking cancelled');
      }
    } catch (error) {
      console.error('Error picking/uploading document:', error);
      // Handle error (e.g., show error message to user)
    }
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
    if (!instructions.trim()) {
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
          instructions: instructions,
        })
      );
      toggleModal();
    }
  };

  return (
    <View style={[tw`flex-1`, { ...globalStyle.main }]}>
      <ScrollView contentContainerStyle={commonStyles.container2} style={globalStyle.curve_container}>
        <Text style={[tw`font-bold`, { ...globalStyle.heading_four }]}>Step 2/ 3 ADDITIONAL PAPER DETAILS</Text>
        <View style={tw`mb-5`}>
          <TextInput
            label="Title *"
            value={title}
            onChangeText={setTitle}
            mode='flat'
            style={[tw`my-2`, { ...globalStyle.input }]}
            error={!!errors.title}
          />
          <TextInput
            label="Specific Instructions *"
            value={instructions}
            onChangeText={setInstructions}
            mode='flat'
            style={[tw`my-2`, { ...globalStyle.input }]}
            multiline={true}
            error={!!errors.instructions}
          />
          <View style={tw`my-5`}>
            <Button
              mode="contained"
              icon={() => <Image source={uploadicon} style={{ width: 30, height: 30 }} />}
              textColor="#000"
              buttonColor="#EFEEEE"
              onPress={pickDocument}
              disabled={isLoading} // Disable button during loading
            >
              Upload File
            </Button>
            <Text style={tw`my-5`}>Uploaded File URL: {document}</Text>
          </View>
          <Text style={tw`color-[#5597D1] my-2 text-[12px] font-semibold`}>Previous</Text>
          <View style={tw`flex-row`}>
            <Checkbox
              value={isSelected}
              onValueChange={setSelection}
              style={tw`bg-#00000`}
              error={!!errors.terms}
            />
            <Text style={tw`text-[10px] pl-1`}>I agree to the Terms and Conditions and Privacy Policy� </Text>
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
            <Text style={tw`text-[13px] font-semibold text-[#5597D1]`}>{orderData.serviceType?.name}</Text>
            <Text style={tw`text-[10px] text-[#5597D1]`}> {orderData.workLevel?.label} Work level</Text>
          </View>
          <View style={tw`my-2`}>
            <Text style={globalStyle.order_description_text}>Urgency:{orderData.urgency?.name}</Text>
            <Text style={globalStyle.order_description_text}>Spacing Type: {orderData.spacing?.label}</Text>
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
          <Button mode="contained" onPress={() => navigation.navigate('PaymentMethods')} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn }}>
            GO TO PAYMENT METHODS
          </Button>
        </View>
      </Modal>
    </View>
  );
}
