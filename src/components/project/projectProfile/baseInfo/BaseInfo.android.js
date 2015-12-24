'use strict';

var React = require('react-native');
var { Text, View, } = React;
var styles = require('./style');

var BaseInfo = React.createClass({
  render: function() {
    var project = this.props.project;
    return(
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.projectSlogan}>
            {project.name}
          </Text>
        </View>
      </View>
    );
  },
});

module.exports = BaseInfo;
