import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { Button, TextInput, ActivityIndicator, MD2Colors } from 'react-native-paper';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import Checkbox from 'expo-checkbox';
import uploadicon from '../../../assets/images/icons/upload.png';
import { setOrderData, setUploadedFile } from '../../redux/orderReducer';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { globalStyle } from '../../styles/globalStyle';
import { appColors } from '../../util/constant';
import commonStyles from '../auth/styles/styles';
import { useCreateOrderMutation } from '../../services/apiService';
// import { unwrapResult } from '@reduxjs/toolkit'; // Ensure you have imported unwrapResult from RTK
export default function PaperDetails({ navigation }) {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [Instructions, setInstructions] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [document, setDocument] = useState(null);
    const [errors, setErrors] = useState({
        title: '',
        instructions: '',
        terms: '',
    });
    const [isPickingDocument, setIsPickingDocument] = useState(false);
    const dispatch = useDispatch();
    const orderData = useSelector((state) => state.order);
    console.log(orderData,'orderData');
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    useEffect(() => {
        console.log('Order Data:', orderData);
    }, [orderData]);
    const pickDocument = async () => {
        if (isPickingDocument) {
            return;
        }
        setIsPickingDocument(true);
        try {
            let result = await DocumentPicker.getDocumentAsync({});
            console.log(result, 'result');
            if (result && !result.cancelled) {
                const file = result.assets[0];
                setDocument(file.name);
                await convertToBinary(file.uri, file.name, file.mimeType, file.size);
            } else {
                console.log('Document picking cancelled');
            }
        } catch (error) {
            console.error('Error picking/uploading document:', error);
        } finally {
            setIsPickingDocument(false);
        }
    };
    const convertToBinary = async (fileUri, fileName, mimeType, size) => {
        try {
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (fileInfo.exists) {
                await uploadFile(fileUri, fileName, mimeType, fileInfo);
            } else {
                console.log('File does not exist');
            }
        } catch (error) {
            console.error('Error reading file:', error);
        }
    };
    const uploadFile = async (fileUri, fileName, mimeType, fileInfo) => {
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
            console.log(responseData?.result?.data,'responseDatafile');
            if (response.ok) {
                dispatch(
                    setUploadedFile({
                        name: responseData?.result?.data?.name,
                        display_name: responseData?.result?.data?.display_name, // Assuming the API returns the URL of the uploaded file
                        type: mimeType,
                        size: fileInfo.size,
                    })
                );
            } else {
                throw new Error(`Error uploading file: ${responseData.error}`);
            }
            setLoading(false);
            console.log(responseData, 'responseData');
            return responseData;
        } catch (error) {
            console.error('Error uploading file:', error);
            setLoading(false);
            throw error;
        }
    };
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
    const Urgency = orderData.urgency?.name || '';
    const Spacing = orderData.spacing?.label || '';
    const Pages = orderData.pages || 0;
    const WriterFee = orderData.writer
        ? (orderData.spacing?.label === 'Double-spaced'
            ? orderData.writer.staff_price.double_space_price
            : orderData.writer.staff_price.single_space_price
        ).toFixed(2)
        : '0.00';
    const WorkLevel_charges = orderData.writer
        ? ((parseFloat(WriterFee) / 100) * orderData.workLevel?.percentage_to_add).toFixed(2)
        : '0.00';
        console.log(WorkLevel_charges,'WorkLevel_charges');

    const Urgency_Charges = orderData.writer
        ? ((parseFloat(WriterFee) / 100) * orderData.urgency?.percentage_to_add).toFixed(2)
        : '0.00';
    const Unit_Price = orderData.writer
        ? (parseFloat(WriterFee) + parseFloat(WorkLevel_charges) + parseFloat(Urgency_Charges)).toFixed(2)
        : '0.00';
    const Total = orderData.writer
        ? ((parseFloat(Unit_Price)) * Pages).toFixed(2)
        : '0.00';
    const OrderCreate = async () => {
        setLoading(true);
        try {
            const formData = {
                title: title,
                instruction: Instructions,
                service_id: orderData.serviceType?.id || '',
                work_level_id: orderData.workLevel?.id || '',
                urgency_id: orderData.urgency?.id || '',
                dead_line: orderData.writer?.updated_at || '', // Replace with your actual deadline value
                quantity: Pages,
                files_data: [
                    {
                        upload: {
                            data: {
                                name: orderData.uploadedFile?.name || '',
                                display_name: 'Uploaded File',
                            },
                        },
                    },
                ],
                base_price: parseFloat(Unit_Price),
                spacing_type: Spacing,
                work_level_price: parseFloat(WorkLevel_charges),
                urgency_price: parseFloat(Urgency_Charges),
                unit_price: parseFloat(Unit_Price),
                amount: parseFloat(Total),
                sub_total: parseFloat(Total),
                total: parseFloat(Total),
                writer_model: {
                    id: orderData.writer?.id || '',
                },
            };
            console.log(formData,'formData');
            // const response = await fetch('http://dashboard.bestassignmentwriters.co.uk/api/order/store', {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify(formData),
            // });
            // const responseData = await response.json();
            setLoading(true);
            const resultAction = await createOrder({formData:JSON.stringify(formData)});
            // console.log(responseData,'responseData');
            // const result = unwrapResult(resultAction); // Extracts the payload or throws an error
            console.log('Order created:', resultAction); // Log or handle the result as needed
            setLoading(false);
            navigation.navigate('PaymentMethods');
        } catch (error) {
            console.error('Error sending order:', error);
            // Handle error, show an error message, etc.
        } finally {
            setLoading(false);
        }
    };
    return (
        <View style={[tw`flex-1`, globalStyle.main]}>
            <ScrollView contentContainerStyle={tw`py-4 px-5`} style={globalStyle.curve_container}>
                <Text style={[tw`font-bold text-[#5597D1] text-xl mb-5`]}>Step 2/3 ADDITIONAL PAPER DETAILS</Text>
                <TextInput
                    label="Title *"
                    value={title}
                    onChangeText={(title) => setTitle(title)}
                    mode="outlined"
                    style={tw`mb-3`}
                    error={!!errors.title}
                />
                {errors.title ? <Text style={tw`text-red-500 mb-3`}>{errors.title}</Text> : null}
                <TextInput
                    label="Specific Instructions *"
                    value={Instructions}
                    onChangeText={(instructions) => setInstructions(instructions)}
                    mode="outlined"
                    multiline
                    numberOfLines={4}
                    style={tw`mb-3`}
                    error={!!errors.instructions}
                />
                {errors.instructions ? <Text style={tw`text-red-500 mb-3`}>{errors.instructions}</Text> : null}
                <Button
                    mode="contained"
                    icon={() => <Image source={uploadicon} style={{ width: 30, height: 30 }} />}
                    onPress={pickDocument}
                    loading={loading || isPickingDocument}
                    disabled={loading || isPickingDocument}
                    style={tw`mt-3`}
                >
                    Upload File
                </Button>
                {document ? <Text style={tw`mt-3 text-gray-700`}>Uploaded File: {document}</Text> : null}
                {errors.terms ? <Text style={tw`text-red-500 mt-3`}>{errors.terms}</Text> : null}
                <View style={tw`flex-row items-center mt-3`}>
                    <Checkbox
                        value={isSelected}
                        onValueChange={(value) => setSelection(value)}
                        color="#5597D1"
                        style={tw`mr-2`}
                    />
                    <Text style={tw`text-sm text-gray-700`}>
                        I agree to the Terms and Conditions and Privacy Policy
                    </Text>
                </View>
                <Button
                    mode="contained"
                    onPress={handleNextClick}
                    disabled={loading}
                    style={tw`mt-5 bg-[#FDD043]`}
                    labelStyle={tw`text-[#5597D1]`}
                >
                    Pay Now
                </Button>
            </ScrollView>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
                swipeDirection="down"
                onSwipeComplete={toggleModal}
                style={globalStyle.bottomModal}
            >
               <ScrollView style={globalStyle.modalContent}>
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
          {loading && <ActivityIndicator animating={true} color={MD2Colors.red800} />}  
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
            <Button mode="contained" onPress={() => OrderCreate()} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn }}>
              GO TO PAYMENT METHODS
            </Button>
        </ScrollView>
            </Modal>
        </View>
    );
}