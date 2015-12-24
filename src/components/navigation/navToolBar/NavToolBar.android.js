'use strict';

var React = require('react-native');
var {
  StyleSheet,
  ToolbarAndroid,
  Text,
  View
} = React;

var NavToolbar = React.createClass({

  render: function () {
    var title = this.props.title;
    var navIcon = {uri: this.props.icon, isStatic: true}

    return (
      <View style={{ flexDirection: 'row',}}>
      <ToolbarAndroid
        actions={this.props.actions}
        style={styles.toolbar}
        navIcon={navIcon}
        onIconClicked={this.props.onClicked}
        onActionSelected={this.props.onActionSelected}
        titleColor="#ffffff"
        title={title} />
      </View>
    )
  }

})
var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#4E8EF7',
    height: 56,
    flex:1
  }
});

module.exports = NavToolbar;
