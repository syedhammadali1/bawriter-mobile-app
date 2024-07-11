import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, Pressable, StyleSheet } from 'react-native'
import { Button,Chip, DataTable, RadioButton, SegmentedButtons, TextInput } from 'react-native-paper'
import tw from 'twrnc';
import AuthHeader from '../../components/auth/AuthHeader'
import { appColors } from '../../util/constant'
import { globalStyle } from '../../styles/globalStyle'
import commonStyles from '../auth/styles/styles';
import Modal from 'react-native-modal';
import Checkbox from 'expo-checkbox';
import uploadicon from '../../../assets/images/icons/upload.png';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderData } from '../../redux/orderReducer';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
export default function PaperDetails({navigation}) {
    const [title, setTitle] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [Instructions, setInstructions] = React.useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [document, setDocument] = useState(null);
    const [binaryData, setBinaryData] = useState(null);
    const [errors, setErrors] = useState({
      title: '',
      instructions: '',
      terms: '',
    });
    const pickDocument = async () => {
      try {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result,'result');
        if (result.canceled === false) {
          const file = result.assets[0];
          setDocument(file.name);
          await convertToBinary(file.uri, file.name, file.mimeType,file.size);
          // const response = await uploadFile(file).unwrap(); // Assuming uploadFile is a RTK Query mutation
          // console.log('File upload response:', file);
          // Handle successful upload (e.g., show success message)
        } else {
          console.log('Document picking cancelled');
        }
      } catch (error) {
        console.error('Error picking/uploading document:', error);
        // Handle error (e.g., show error message to user)
      }
    };
    const convertToBinary = async (fileUri, fileName, mimeType, size) => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          const responseData = await uploadFile(fileUri, fileName, mimeType);
        } else {
          console.log('File does not exist');
        }
      } catch (error) {
        console.error('Error reading file:', error);
      }
    };
    const uploadFile = async (fileUri, fileName, mimeType) => {
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: fileUri,
          name: fileName,
          type: mimeType,
        });
        setLoading(true);
        const response = await fetch('http://dashboard.bestassignmentwriters.co.uk/api/attachments/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });
        const responseData = await response.json();
        if (!responseData.status_code == 200) {
          throw new Error(`Error uploading file: ${response.statusText}`);
        }
        setLoading(false);
        console.log(responseData,'responseData');
        return responseData;
      } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
      }
    };
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
            })
          );
          toggleModal();
        }
      };


      const Urgency = orderData.urgency?.name;
      const Spacing = orderData.spacing?.label;
      const Pages = orderData.pages;
      
      const WriterFee = (orderData.spacing?.label === 'Double-spaced' 
        ? orderData.writer.staff_price.double_space_price 
        : orderData.writer.staff_price.single_space_price).toFixed(2);
      
      const WorkLevel_charges = ((parseFloat(WriterFee) / 100) * orderData.workLevel?.percentage_to_add).toFixed(2);
      const Urgency_Charges = ((parseFloat(WriterFee) / 100) * orderData.urgency?.percentage_to_add).toFixed(2);
      const Unit_Price = (parseFloat(WriterFee) + parseFloat(WorkLevel_charges) + parseFloat(Urgency_Charges)).toFixed(2);
      const Total = ((parseFloat(WriterFee) + parseFloat(Urgency_Charges) + parseFloat(Unit_Price)) * Pages).toFixed(2);
      
    return (
        <View style={[tw`flex-1`,{...globalStyle.main}]}>
            <ScrollView contentContainerStyle={commonStyles.container2}  style={globalStyle.curve_container}>
                <Text style={[tw`font-bold`,{...globalStyle.heading_four}]}>Step 2/ 3 ADDITIONAL PAPER DETAILS</Text>
                <View style={tw`mb-5`}>
                    <TextInput
                        label="Title *"
                        value={title}
                        onChangeText={title => setTitle(title)}
                        mode='flat'
                        style={[tw`my-2`,{...globalStyle.input}]}
                        error={!!errors.title}/>
                    <TextInput
                        label="Specific Instructions *"
                        value={Instructions}
                        onChangeText={Instructions => setInstructions(Instructions)}
                        mode='flat'
                        style={[tw`my-2`,{...globalStyle.input}]}
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
                           disabled={loading}
                          >
                            Upload File
                          </Button>
                          {loading && <ActivityIndicator animating={true} size="large" />}
                          {document && <Text style={tw`mt-5`}>Uploaded File: {document}</Text>}
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
                <Button
                mode="contained"
                onPress={handleNextClick}
                buttonColor={appColors.SECONDARY}
                style={{ ...commonStyles.loginBtn}}
                disabled={loading}
                >Pay Now</Button>
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
              <Text style={tw`text-[10px] text-[#5597D1]`}> {orderData.workLevel?.name} Work level</Text>
            </View>
            <View style={tw`my-2`}>
              <Text style={globalStyle.order_description_text}>Urgency :<Text style={globalStyle.order_description_light_text}> {Urgency}</Text></Text>
              <Text style={globalStyle.order_description_text}>Spacing Type :<Text style={globalStyle.order_description_light_text}> {Spacing}</Text></Text>
              <Text style={globalStyle.order_description_text}>Pages : <Text  style={globalStyle.order_description_light_text}>{Pages}</Text></Text>
              <Text style={globalStyle.order_description_text}>Writer Fee : <Text  style={globalStyle.order_description_light_text}>${WriterFee} </Text></Text>
              <Text style={globalStyle.order_description_text}>Work Level Charges :  <Text  style={globalStyle.order_description_light_text}>$ {WorkLevel_charges}</Text></Text>
              <Text style={globalStyle.order_description_text}>Urgency Charges : <Text  style={globalStyle.order_description_light_text}>${Urgency_Charges}</Text></Text>
              <Text style={globalStyle.order_description_text}>Unit Rate : <Text  style={globalStyle.order_description_light_text}>${Unit_Price}</Text></Text>
            </View>
            <View style={tw`my-5`}>
              <View style={tw`flex-row justify-between px-3 py-2 border-t-2 border-[#FDD043]`}>
                <Text style={tw`font-bold text-[#5597D1]`}>Amount</Text>
                <Text style={tw`text-[#5597D1]`}>${Total}</Text>
              </View>
              <View style={tw`flex-row justify-between px-3 py-2 border-t-2 border-[#FDD043]`}>
                <Text style={tw`font-bold text-[#5597D1]`}>Total</Text>
                <Text style={tw`text-[#5597D1]`}>${Total}</Text>
              </View>
            </View>
            <Button mode="contained" onPress={() => navigation.navigate('PaymentMethods')} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn }}>
              GO TO PAYMENT METHODS
            </Button>
        </View>
            </Modal>
        </View>
    )
}