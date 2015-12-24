'use strict';

var React = require('react-native');
var { Text, View, ListView, TouchableHighlight, Image} = React;
var NavToolbar = require('../navigation/navToolBar/NavToolBar.android');
var styles = require("./style");

var createuser = React.createClass({
  render: function () {
    return (
      <View style={styles.container}>
        <NavToolbar icon={"ic_arrow_back_white_24dp"} title='创建用户' onClicked={() => {this.props.nav.pop();}} />
        <View style={styles.todo} >
          <Text>创建用户</Text>
        </View>
      </View>
    );
  },
});

module.exports = createuser;
