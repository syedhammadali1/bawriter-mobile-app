import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LogIn from './src/screens/auth/LogIn';
import { PaperProvider } from 'react-native-paper';
import Register from './src/screens/auth/Register';
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import ResetPassword from './src/screens/auth/ResetPassword';
import Otp from './src/screens/auth/Otp';
import PaymentMethods from './src/screens/PaymentMethods';
import { appColors } from './src/util/constant';
import AddPaymentMethods from './src/screens/AddPaymentMethod';
import OrderDetails from './src/screens/orders/OrderDetails';
import OrderSummary from './src/screens/orders/OrderSummary';
import Balance from './src/screens/balance/Balance';
import tw from 'twrnc';
import getStarted from './src/screens/getStarted/getStarted';
import PaperDetails from './src/screens/paperDetails/PaperDetails';
import { Provider } from 'react-redux';
import store from './src/store';
import PayPalWebView from './src/services/PayPalWebView';

export default function App() {
  const Stack = createNativeStackNavigator();
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };
  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <PaperProvider >
          <View style={styles.container}>
            <Stack.Navigator initialRouteName="LogIn" 
              screenOptions={{ 
                headerStyle:{
                  backgroundColor:appColors.PRIMARY,
                  height:200,
                  borderColor:'#FDD043', 
                  borderBottomWidth:0,
                  
                },
                headerTitleAlign:'center',
                headerTitleAllowFontScaling: true,
                headerTitleStyle: {
                  fontSize: 20, // Adjust the font size as needed
                  fontWeight: 'bold',
                  
                },
                
            }}
            
            >
          
              <Stack.Screen name="LogIn" component={LogIn}options={{ title: 'LOGIN' }} />
  
               <Stack.Screen name="PayPalPayment" component={PayPalWebView} />
              <Stack.Screen name="Register" component={Register}  options={{ title: 'REGISTER' }} />
               <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title:'Forget Password'}}/>
              <Stack.Screen name="ResetPassword" component={ResetPassword} options={{title:'Reset Password'}}/>
              <Stack.Screen name="Otp" component={Otp} options={{title:'OTP'}}/>
              <Stack.Screen name="AddPaymentMethods" component={AddPaymentMethods} options={{title:'Add Payment Method'}}/>
              <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{title:'Payment Methods'}}/>
              <Stack.Screen name="Balance" component={Balance} options={{title:'Balance'}}/>
              <Stack.Screen name="OrderDetails" component={OrderDetails}  options={{ title: 'Order Details', headerLeft: () => null }}/>
              <Stack.Screen name="OrderSummary" component={OrderSummary} options={{title:'Order Summary'}}/>
              <Stack.Screen 
              name="getStarted"
              component={getStarted} 
              options={{
                title:'Lets get started on your project!',
                headerLeft: () => null, // This removes the back button
                gestureEnabled: false,
              }}
              />
              <Stack.Screen name="PaperDetails" component={PaperDetails} options={{title:'Lets get started on your project!'}}/>

            </Stack.Navigator>
            {/* <StatusBar style="auto" /> */}
          </View>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
