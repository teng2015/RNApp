'use strict';

var React = require('react-native');
var { View, Text,Image } = React;
var NavToolbar = require('../../navigation/navToolBar/NavToolBar.android')
var BaseInfo = require('./baseInfo/BaseInfo.android');
var Issues = require('./issues/Issues.android');
var styles = require('./style');

var ProjectProfile = React.createClass({

  render: function() {
    var project = this.props.project;
    return (
      <View style={{flex:1}}>
        <NavToolbar icon={"ic_arrow_back_white_24dp"} title={project.name}
          onClicked={() => {this.props.nav.pop();}}
          actions={[{title:'编辑',show:'always'}]}
           />
          <View style={{alignItems: 'center'}}>
          <Image
             source={{uri: project.avatar}}
             style={styles.projectImage}
           />
            <View style={styles.projectDetailsContainer}>
              <Text style={{alignItems: 'center'}}>
                姓名 {project.name}
              </Text>
              <Text style={{alignItems: 'center'}}>
                性别 {project.gender}
              </Text>
              <Text style={styles.projectDetail}>
                城市 <Text style={{color: '#4E8EF7'}}> {project.city} </Text> | 年龄 {project.age}
              </Text>
              <Text style={{alignItems: 'center'}}>
                创建时间 {project.createdate}
              </Text>
            </View>
          </View>
      </View>
    );
  },
});

module.exports = ProjectProfile;
