import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import AuthHeader from '../../components/auth/AuthHeader';
import { globalStyle } from '../../styles/globalStyle';
import { textStyle } from '../../styles/textStyle';
import CustomButton from '../../components/global/CustomButton';
import tw from 'twrnc';
import { useRegisterMutation } from '../../services/apiService';

const Register = ({ navigation }) => {
    const [formState, setFormState] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        email: "",
        password: "",
        confirm_password: ""
    });
    const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
    const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = useState(true);
    const [errors, setErrors] = useState({});
    const [register, { isLoading }] = useRegisterMutation();

    const togglePasswordVisibility = () => {
        setSecureTextEntryPassword(!secureTextEntryPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePhoneNumber = (phone_number) => {
        const phonePattern = /^[0-9\s-()+]*$/;
        return phonePattern.test(phone_number)
    }
    const fields = [
        {
            name: 'first_name',
            label: 'First Name',
            value: formState.first_name,
            validate: (text) => text.trim() !== '',
            errorMessage: 'First Name is required'
        },
        {
            name: 'last_name',
            label: 'Last Name',
            value: formState.last_name,
            validate: (text) => text.trim() !== '',
            errorMessage: 'Last Name is required'
        },
        {
            name: 'email',
            label: 'Email',
            value: formState.email,
            validate: validateEmail,
            errorMessage: 'Please enter a valid email address'
        },
        {
            name: 'phone_number',
            label: 'Phone Number',
            value: formState.phone_number,
            validate: validatePhoneNumber,
            errorMessage: 'Phone Number is required'
        },
        {
            name: 'password',
            label: 'Password',
            value: formState.password,
            validate: (text) => text.trim() !== '',
            errorMessage: 'Password is required'
        },
        {
            name: 'confirm_password',
            label: 'Confirm Password',
            value: formState.confirm_password,
            validate: (text) => text === formState.password,
            errorMessage: 'Passwords do not match'
        }
    ];

    const handleRegister = async () => {
        let valid = true;
        let newErrors = {};

        fields.forEach(field => {
            if (!field.validate(formState[field.name])) {
                newErrors[field.name] = field.errorMessage;
                valid = false;
            } else {
                newErrors[field.name] = "";
            }
        });

        setErrors(newErrors);

        if (valid) {
            try {
                console.log("Form state before registration:", formState);
                const response = await register({
                    first_name: formState.first_name,
                    last_name: formState.last_name,
                    email: formState.email,
                    phone_number: formState.phone_number,
                    password: formState.password,
                }).unwrap();

                if (response.status_code === 422) {
                    const apiErrors = response.error;
                    let apiErrorMessages = {};
                    apiErrors.forEach(err => {
                        apiErrorMessages[err.field] = err.message;
                    });
                    setErrors(apiErrorMessages);
                } else {
                    console.log("Registration successful:", response);
                    setFormState({
                        first_name: "",
                        last_name: "",
                        phone_number: "",
                        email: "",
                        password: "",
                        confirm_password: ""
                    });
                    navigation.navigate('getStarted');
                }
            } catch (error) {
                console.error("Registration failed:", error);
                alert("Registration failed: " + error.message);
            }
        }
    };

    const handleChange = (name, value) => {
        setFormState({ ...formState, [name]: value });
    };

    return (
        <View style={tw`bg-[#FDD043]`}>
            <ScrollView contentContainerStyle={globalStyle.container} keyboardDismissMode="on-drag" style={globalStyle.curve_container}>
                <AuthHeader />
                <Text style={{ ...textStyle.mediumText, marginTop: 10 }}>Make sure all your information is correct before joining us</Text>
                <ScrollView contentContainerStyle={localStyle.subContainer} keyboardDismissMode="on-drag">
                    {fields.map((field, index) => (
                        <View key={index} style={localStyle.inputContainer}>
                            <TextInput
                                value={field.value}
                                onChangeText={(value) => handleChange(field.name, value)}
                                mode='flat'
                                style={{ ...globalStyle.input, ...localStyle.input }}
                                label={field.label}
                                error={!!errors[field.name]}
                                secureTextEntry={field.name === 'password' || field.name === 'confirm_password'}
                                right={field.name === 'password' ?
                                    <TextInput.Icon icon={secureTextEntryPassword ? 'eye-off' : 'eye'} onPress={togglePasswordVisibility} /> :
                                    (field.name === 'confirm_password' ? <TextInput.Icon icon={secureTextEntryConfirmPassword ? 'eye-off' : 'eye'} onPress={toggleConfirmPasswordVisibility} /> : null)
                                }
                            />
                            {errors[field.name] ? <Text style={localStyle.errorText}>{errors[field.name]}</Text> : null}
                        </View>
                    ))}
                    <CustomButton 
                        onPress={handleRegister} 
                        style={{ marginTop: 30 }}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        CONTINUE
                    </CustomButton>
                </ScrollView>
            </ScrollView>
        </View>
    );
}

const localStyle = StyleSheet.create({
    subContainer: {
        width: '100%',
        alignItems: 'center',
    },
    inputContainer: {
        width: '100%',
        marginTop: 10
    },
    errorText: {
        color: 'red',
        marginTop: 2,
        marginLeft: 10,
        fontSize: 10
    }
});

export default Register;
