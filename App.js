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
    <NavigationContainer theme={MyTheme}>

      <PaperProvider>
        <View style={styles.container}>
         
          <Stack.Navigator initialRouteName="LogIn" 

            screenOptions={{ 
              headerStyle:{
                backgroundColor:appColors.PRIMARY,
              },
              headerTitleAlign:'center',
              headerTitleAllowFontScaling: true,
              headerTitleStyle: {
                fontSize: 24, // Adjust the font size as needed
                fontWeight: 'bold',
                
              },
          }}
          >
            <Stack.Screen name="LogIn" component={LogIn}
              options={{ title: 'LOGIN' }}
            />
            <Stack.Screen name="Register" component={Register}  options={{ title: 'REGISTER' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title:'Forget Password'}}/>
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{title:'Reset Password'}}/>
            <Stack.Screen name="Otp" component={Otp} options={{title:'OTP'}}/>
            <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{title:'Payment Methods'}}/>
          </Stack.Navigator>
          {/* <StatusBar style="auto" /> */}
        </View>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
});
