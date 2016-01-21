'use strict';

var React = require('react-native');
var { AppRegistry, View, BackAndroid, Navigator, Text } = React;
var ProjectList = require('./project/projectList/ProjectList.android');
var ProjectProfile = require('./project/projectProfile/ProjectProfile.android');
var IssuesList = require('./issues/issuesList/IssuesList.android');
var IssuesProfile = require('./issues/issuesProfile/IssuesProfile.android');
var Todo = require('./common/todo/Todo.android');
var CreateUser=require('./user/createuser.android');
var UpdateUser=require('./user/updateuser.android');
var ModalTest=require('./user/modaltest');
var LightboxTest=require('./user/lightboxtest');
var DialogsTest=require('./user/dialogstest')

var _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

var Routers = React.createClass({
  renderScene: function(route, navigator) {
    _navigator = navigator;
    if (route.id === 'ProjectList') {
      return (
        <View style={{flex: 1}}>
          <ProjectList nav={navigator} />
        </View>
      );
    }

    if (route.id === 'ProjectProfile') {
      return (
        <View style={{flex: 1}}>
          <ProjectProfile nav={navigator} project={route.project} />
        </View>
      )
    }
    if (route.id === 'CreateUser') {
      return (
        <View style={{flex: 1}}>
          <CreateUser nav={navigator} />
        </View>
      )
    }
    if (route.id === 'ModalTest') {
      return (
        <View style={{flex: 1}}>
          <ModalTest nav={navigator} />
        </View>
      )
    }
    if (route.id === 'IssuesList') {
      return (
        <View style={{flex: 1}}>
          <Todo nav={navigator}>
            <Text>尚未实现</Text>
          </Todo>
        </View>
      );
    }

    if (route.id === 'IssuesProfile') {
      return (
        <View style={{flex: 1}}>
          <IssuesProfile nav={navigator} />
        </View>
      )
    }

    if (route.id === 'Login') {
      return (
        <View style={{flex: 1}}>
          <Todo nav={navigator}>
            <Text> 登录尚未实现 </Text>
          </Todo>
        </View>
      )
    }

    if (route.id === 'Blog') {
      return (
        <View style={{flex: 1}}>
          <Todo nav={navigator}>
            <Text> 博客尚未做 </Text>
          </Todo>
        </View>
      )
    }

    if (route.id === 'Setting') {
      return (
        <View style={{flex: 1}}>
          <Todo nav={navigator}>
            <Text> 没有什么需要设置的。。。issues </Text>
          </Todo>
        </View>
      )
    }

    if (route.id === 'UpdateUser') {
      return (
        <View style={{flex: 1}}>
          <UpdateUser nav={navigator} project={route.project} />
        </View>
      )
    }
    if (route.id === 'DialogsTest') {
      return (
        <View style={{flex: 1}}>
          <DialogsTest nav={navigator} />
        </View>
      )
    }
    if (route.id === 'LightboxTest') {
      return (
        <View style={{flex: 1}}>
          <LightboxTest nav={navigator} />
        </View>
      )
    }

  },
  render: function() {
    return (
      <Navigator
        initialRoute = {{id: 'ProjectList'}}
        configureScene={() => Navigator.SceneConfigs.FadeAndroid}
        renderScene={this.renderScene}
      />
    );
  },
});

module.exports = Routers;
