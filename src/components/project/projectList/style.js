'use strict';

var React = require('react-native');
var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center',
  },
  projectListView:{
    backgroundColor: '#FFF',
  },
  headerItem: {
      flex: 1,
      height: 100,
  flexDirection: 'row',
    },
headerPager: {
  height: 100,
},
listHeader:{
  height:100
},
  headerTitleContainer: {
  flex: 1,
  alignSelf: 'flex-end',
  padding: 10,
  backgroundColor: 'rgba(0,0,0,0.2)',
},
headerTitle: {
  fontSize: 18,
  fontWeight: '500',
  color: 'white',
  marginBottom: 10,
  textAlign : 'center',//水平居中
},
});
