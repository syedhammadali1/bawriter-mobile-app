import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View, Pressable } from 'react-native'
import { Button,Chip, DataTable, RadioButton, SegmentedButtons, TextInput } from 'react-native-paper'
import tw from 'twrnc';
import AuthHeader from '../../components/auth/AuthHeader'
import { appColors } from '../../util/constant'
import { globalStyle } from '../../styles/globalStyle'
import commonStyles from '../auth/styles/styles';
import Modal from 'react-native-modal';
import Checkbox from 'expo-checkbox';




export default function PaperDetails({navigation}) {
    const [title, setTitle] = React.useState("");
    const [Instructions, setInstructions] = React.useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [isSelected, setSelection] = useState(false);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View style={[tw`flex-1`,{...globalStyle.main}]}>
            <ScrollView contentContainerStyle={commonStyles.container2}  style={globalStyle.curve_container}>
                <Text style={[tw`font-bold`,{...globalStyle.heading_four}]}>Step 2/ 3 ADDITIONAL PAPER DETAILS</Text>
                
                <View style={tw`mb-5`}>
                    <TextInput
                        label="Title"
                        value={title}
                        onChangeText={title => setTitle(title)}
                        mode='flat'
                        style={[tw`my-2`,{...globalStyle.input}]}
                    />
                    <TextInput
                        label="Specific Instructions *"
                        value={Instructions}
                        onChangeText={Instructions => setInstructions(Instructions)}
                        mode='flat'
                        style={[tw`my-2`,{...globalStyle.input}]}
                        multiline={true}
                    />



                    <Text style={tw`color-[#5597D1] my-2 text-[12px] font-semibold`}>Previous</Text>
                    <View style={tw`flex-row`}>
                            <Checkbox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={tw`bg-#00000`}
                            />
                        <Text style={tw`text-[10px] pl-1`}>I agree to the Terms and Conditions and Privacy Policy  </Text> 
                    </View> 
                </View>
                    

                <Button mode="contained" onPress={toggleModal} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn}}>
                    PAY NOW
                </Button> 


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
                    <Text style={[tw`border-b-2 border-[#5597D1]`,{ ...globalStyle.largeBoldText, ...globalStyle.heading_three}]}>Order Summary</Text>
                    <View style={tw`my-3`}>
                        <Text style={tw`text-[16px] font-bold text-[#5597D1]`}>Service</Text>
                        <Text style={tw`text-[13px] font-semibold text-[#5597D1]`}>Admission/Application Essay</Text>
                        <Text style={tw`text-[10px] text-[#5597D1]`}>High School Work level</Text>
                    </View>    
                    <View style={tw`my-2`}>
                        <Text style={globalStyle.order_description_text}>Urgency : 20 days / Tue, Jun 18, 2024</Text>
                        <Text style={globalStyle.order_description_text}>Spacing Type : Double</Text>
                        <Text style={globalStyle.order_description_text}>Pages : 1</Text>
                        <Text style={globalStyle.order_description_text}>Writer Fee : $2.00</Text>
                        <Text style={globalStyle.order_description_text}>Work Level Charges : $0.05</Text>
                        <Text style={globalStyle.order_description_text}>Urgency Charges : $0.19</Text>
                        <Text style={globalStyle.order_description_text}>Unit Rate : $2.24</Text>
                    </View> 
                    <View style={tw`my-8`}>
                        <View style={tw`flex-row justify-between px-3 py-2 border-t-2 border-[#FDD043]`}>
                            <Text style={tw`font-bold text-[#5597D1]`}>Amount</Text>
                            <Text>$20.00</Text>
                        </View>
                        <View style={tw`flex-row justify-between px-3 py-2 border-t-2 border-[#FDD043]`}>
                            <Text style={tw`font-bold text-[#5597D1]`}>Total</Text>
                            <Text>$20.00</Text>
                        </View>   
                    </View>            
                    <Button mode="contained" onPress={()=> navigation.navigate('AddPaymentMethods')} buttonColor={appColors.SECONDARY} style={{ ...commonStyles.loginBtn}}>
                        GO TO PAYMENT METHODS 
                    </Button>   
                </View>
            </Modal>
        </View>
    )
}

