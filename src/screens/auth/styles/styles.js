// styles.js
import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    container: {
        alignSelf:'center',
        width: "80%",
    },
    subContainer: {
        alignItems: 'center',

        marginTop: 10
    },
    input: {
        width: "100%",
        backgroundColor: 'white',
        marginTop: 20,
        
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        textAlign: 'center',
       
    },
    text: {
        marginTop: 20
    },
    registerText: {
        color: 'purple',
       
    },
    loginBtn: {
        width: '100%',
        marginTop: 20,
        borderRadius: 15
    },
    logo: {
        height: 100,
        width: 300,
        resizeMode: 'contain',
        marginTop: 10
    },
    forgotPasswordText:{
        fontWeight: 'bold',
        color: 'purple',
        marginTop:5
    }
});

export default commonStyles;