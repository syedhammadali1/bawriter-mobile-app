import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

const PayPalWebView = ({ route, navigation }) => {
  const { amount } = route.params;

  const handleNavigationStateChange = (event) => {
    console.log('Navigation Handler:', event.url);

    if (event.url.includes('/success')) {
      Alert.alert('Payment Successful', 'Your payment has been successfully processed.');
      navigation.navigate('OrderDetails'); 
    } else if (event.url.includes('/cancel')) {
      Alert.alert('Payment Cancelled', 'Your payment has been cancelled.');
      navigation.goBack();
     }
      else if (event.url.includes('/error')) {
        Alert.alert('Payment Failed', 'Your payment could not be processed. Please try again.');
        navigation.goBack();
      }
  };

  return (
    <View style={styles.container}>
      <WebView
        style={{ width: '100%', height: '100%' }}
        source={{ uri: `https://dashboard.bestassignmentwriters.co.uk/paypal-payment?amount=${amount}`}}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PayPalWebView;
