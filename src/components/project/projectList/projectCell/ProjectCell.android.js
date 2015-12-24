'use strict';

var React = require('react-native');
var Button=require('../../../button/button.android');

var {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  ToastAndroid
} = React;

var styles = require("./style");

var ProjectCell = React.createClass({
  editAction:()=>{
    ToastAndroid.show('Now you want to edit user profile', ToastAndroid.LONG)
  },
  deleteAction:()=>{
    ToastAndroid.show('Fuck you!', ToastAndroid.SHORT)
  },
  render: function() {
    var project = this.props.project;
    return (
      <ScrollView horizontal="true" style={styles.scroll}>
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Image
            source={{uri: project.avatar}}
            style={styles.projectImage}
          />
          <View style={styles.projectDetailsContainer}>
            <Text style={styles.projectName}>
              {project.name}
            </Text>
            <Text style={styles.projectDetail}>
              Posted by <Text style={{color: '#4E8EF7'}}> {project.city} </Text> | 年龄 {project.age}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
      <Button text='编辑' style={{backgroundColor:'green'}} onclick={this.editAction}></Button>
      <Button text='删除' style={{backgroundColor:'red'}} onclick={this.deleteAction}></Button>
      </ScrollView>
    );
  }
});

module.exports = ProjectCell;
