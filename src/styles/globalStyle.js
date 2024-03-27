import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
    container: {
        alignSelf:'center',
        width: "80%",
    },
    subContainer: {
        // width:'100%',
        alignItems: 'center',

        // marginTop: 10
    },
    input: {
        width: "100%",
        backgroundColor: 'white',
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


    otpInput:{
        marginTop:50
    },
    noLineBreakText:{
        whiteSpace: 'nowrap',
    },



    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingVertical: 23,
        paddingHorizontal: 25,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'red'
    },
})