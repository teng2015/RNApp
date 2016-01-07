'use strict';

var React = require('react-native');
var { View, Text,Image,ScrollView,Dimensions} = React;
var NavToolbar = require('../../navigation/navToolBar/NavToolBar.android')
var BaseInfo = require('./baseInfo/BaseInfo.android');
var Issues = require('./issues/Issues.android');
var styles = require('./style');



var ProjectProfile = React.createClass({
  getInitialState: function() {
    return {
    names: null,
    ages: null,
    citys: null,
    sexs:0,
    };
  },
  _onActionSelected: function(position) {
    this.props.nav.push({
      id: 'UpdateUser',
      project: this.props.project,
    });
  },
  render: function() {
    var project = this.props.project;
    switch (project.__v) {
      case 1:
        project.__v='男';
        break;
        case 0:
        project.__v='女';
        break;
      default:

    };
    //时间处理
    var dt= project.createdate;
    var createdate=dt.substr(0,16);
    var newdate=createdate.replace("T","  ");

    return (

      <View style={{flex:1}}>
        <NavToolbar icon={"ic_arrow_back_white_24dp"} title={project.name}
          onClicked={() => {this.props.nav.pop();}}
          actions={[{title:'编辑',show:'always'}]}
          onActionSelected={this._onActionSelected}
           />
           <ScrollView>
          <View style={{alignItems: 'center',marginTop:20}}>
          <Image
             source={{uri: project.avatar}}
             style={styles.projectImage}
           />
            <View style={{paddingTop:15}}>
              <Text style={styles.items}>
                姓名 {project.name}
              </Text>
              <Text style={styles.items}>
                性别 {project.__v}
              </Text>
              <Text style={styles.items}>
                城市 <Text style={{color: '#4E8EF7'}}> {project.city} </Text> | 年龄 {project.age}
              </Text>
              <Text style={styles.items}>
                创建时间 {newdate}
              </Text>
            </View>
          </View>
          </ScrollView>
      </View>

    );
  },
});

module.exports = ProjectProfile;
