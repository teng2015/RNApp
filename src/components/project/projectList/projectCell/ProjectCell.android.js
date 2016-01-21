'use strict';

var React = require('react-native');
var Button=require('../../../button/button.android');
var ProjectList = require('../ProjectList.android');
var NavTab = require('../../../navigation/navTab/NavTab.android');

var NavToolbar = require('../../../navigation/navToolBar/NavToolBar.android');

var {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  ToastAndroid,
  TouchableNativeFeedback
} = React;

var styles = require("./style");

var ProjectCell = React.createClass({
  render: function() {
    var project = this.props.project;
    if (project.avatar==null) {
      project.avatar='https://resource-huobanyun-cn.alikunlun.com/3.1.142/content/images/avatar_default.jpg';
    }
    return (
      <ScrollView horizontal={true} style={styles.scroll} showsHorizontalScrollIndicator={false} overflow={'visiable'} ref="scroll">
      <TouchableNativeFeedback onPress={this.props.onSelect}  style={{overflow:'hidden'}}>
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
      </TouchableNativeFeedback>
      <Button text='编辑' style={{backgroundColor:'green',overflow:'hidden'}} onclick={()=>this.props.editAction(project)}></Button>
      <Button text='删除' style={{backgroundColor:'red',overflow:'hidden'}} onclick={() =>this.deleteAction()}></Button>
      </ScrollView>
    );
  },
  deleteAction:function(){
    this.props.deleteAction(()=>this.scrollBack());
  },
  cancelAction:function(){
    this.props.cancelAction(()=>this.scrollBack());
  },
  scrollBack:function(){
    if (this.refs.scroll){
    this.refs.scroll.scrollTo(0,  0);
  }
},
});

module.exports = ProjectCell;
