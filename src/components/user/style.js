'use strict';

var React = require('react-native');
var Dimensions=require('Dimensions');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
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
    height:43
  },
  TextInputs:{
    fontSize:16
  },
});
