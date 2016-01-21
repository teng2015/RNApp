'use strict';

var React = require('react-native');
var Dimensions=require('Dimensions');

var {
  StyleSheet,
} = React;
const calendarStyle = StyleSheet.create({
  calendarContainer: {},
  gridContainer: {},
  monthContainer: {},
  weekRow: {},
});


module.exports ={
  common: StyleSheet.create({
    container: {
      flex: 1,
    },
    todo:{
      flex: 1,
      paddingLeft:40,
      paddingRight:40,
      paddingTop:20,
      paddingBottom:10
    },
    button:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      height:56,
      backgroundColor:'green',
      borderRadius: 20,

    },
    userImage: {
      height: 140,
      width: 140,
      justifyContent: 'center',
      borderRadius:80
    },
    text:{
      fontSize:22,
      color:'white'
    },
    texts:{
      marginTop:5,
      fontSize:18,
      fontWeight:'bold',
    },
    adduserInput: {
      borderWidth: 0.5,
      borderColor: '#FF6600',
      borderRadius: 5,
      marginTop:5,
      marginBottom:0,
      height:43,
      flexDirection:'row',
      justifyContent: 'center'

    },
    adduserInput1: {
      borderWidth: 0.5,
      borderColor: '#FF6600',
      borderRadius: 5,
      marginTop:5,
      marginBottom:0,
      height:43,
    },

    TextInputs:{
      fontSize:16,
      flex:1
    },
    touch:{
      marginTop:110,
    },
  }),
  dayStyle : StyleSheet.create({
      filler: {},
      day: {},
      today: {},
      dayWithEvents: {},
      daySelected: {backgroundColor:'red'},
  })
}
