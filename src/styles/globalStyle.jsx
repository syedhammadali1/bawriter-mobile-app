import { StyleSheet } from "react-native";
import { appColors } from "../util/constant";
import { main } from "react-devtools";
import LogoImage from "../components/global/LogoImage";
import { Dropdown } from "react-native-element-dropdown";

export const globalStyle = StyleSheet.create({
    container: {
        alignSelf:'center',
        width: "80%",
        justifyContent:'space-between'
    },
    subContainer: {
        // width:'100%',
        alignItems: 'center',

        // marginTop: 10
    },
    order_container:{
        width:"90%",
        alignSelf:'center',
        justifyContent:'space-between'

    },
    curve_container:{
        backgroundColor:'white',
        borderTopLeftRadius:80,
        position:'relative',
        zIndex:1,
        
    },
    main:{
        backgroundColor:'#FDD043'
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
    errorText: {
        color: 'red',
        marginTop: 2,
        marginLeft: 10,
        fontSize: 10
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
    heading:{
        textAlign: 'center', 
        marginTop: 50, 
        marginBottom:50, 
        fontSize:25, 
        fontWeight:600
    },
    heading_two:{
        textAlign: 'center', 
        fontSize:25, 
        fontWeight:600
    },
    heading_three:{
        textAlign: 'center', 
        fontSize:20, 
        fontWeight:800,
        paddingVertical:20,
        paddingHorizontal:25,
    },
    heading_four:{
        textAlign: 'center', 
        fontSize:20, 
        paddingVertical:20,
        paddingHorizontal:25,
        marginVertical:5,
        borderBottomWidth:2,
        borderBottomColor:'#5597D1'
    },
    selectPaymentMethod:{
        marginBottom:20, 
        paddingHorizontal:20, 
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#D9D9D9',
        width:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:9,
        height:50
    },
    paymentIcon:{
        backgroundColor:'rgba(217, 217, 217, 1)',
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:10,
        alignItems:'center',
        flexDirection:'row'
        
    },
    card_cta:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between', 
        marginTop:2,  
    },
    card_buttton:{
           marginTop:2,
           marginBottom:2,
           marginLeft:10,
           marginRight:10,
           letterSpacing:1,
           backgroundColor:'rgb(253, 208, 67)',
           color:'#000',
    },
    order_card:{
        padding:10,
        backgroundColor:'white',
        borderWidth:2,
        borderColor:'#5597D1',
        marginTop:10,
        marginBottom:10,
        
    },
    order_card_inner:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    order_card_text:{
        fontSize:15,
        letterSpacing:1,
        fontWeight:800,
    },
    order_card_btn:{
        backgroundColor:'#FDD043'
    },
    order_card_btnText:{
        color:'#000000',
        fontWeight:'bold',
        letterSpacing:2,
    },
    order_description_text:{
        marginTop:10,
        marginBottom:5,
        fontWeight: "500"
    },
    order_cash:{
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'black',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
    
    },
    order_cash_text:{
        fontSize:15,
    },
    error:{
        color:'red',
        textAlign:'left'
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: '#EFEFED',
        padding: 22,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '80%', // Adjust the height as needed
    },
    dragHandle: {
        width: 80,
        height: 5,
        backgroundColor: '#FDD043',
        borderRadius: 2.5,
        alignSelf: 'center',
        marginBottom: 10,
    },
    custom_button:{
        marginTop:30,
    },
    social_button:{
        marginHorizontal:10,
        backgroundColor:appColors.FACEBOOKBLUE,
    },
    LogoImage:{
        marginTop:30
    },
    resend_btn:{
        alignSelf:'center',
        marginTop:30,
        marginBottom:20
    },
    dropdown_heading:{
        marginVertical:10,
        fontSize:15,
    },
    dropdown_headingsmall:{
        fontSize:12,
        textAlign:'center'
    },
    paymentIcon_main:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginVertical:25,
    }
    
})