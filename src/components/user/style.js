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
  },
  button:{
    width:Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    height:76,
    backgroundColor:'green',

  },
  text:{
    color:'white'
  },
  texts:{
    fontFamily: 'Cochin',
    width:Dimensions.get('window').width,
    backgroundColor:'#8ED9E6',
    fontSize:14,
  },
  adduserInput: {
       borderWidth: 2,
       borderRadius: 4,
       borderColor:'black',
   },
});
