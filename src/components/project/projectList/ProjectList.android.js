'use strict';

var React = require('react-native');
var { Text, View, ListView, ToastAndroid ,PullToRefreshViewAndroid,ScrollView,Alert} = React;
var DataService = require('../../../network/DataService');
var NavTab = require('../../navigation/navTab/NavTab.android');
var NavToolbar = require('../../navigation/navToolBar/NavToolBar.android');
var ProjectCell = require('./projectCell/ProjectCell.android');
var styles = require("./style");
var _=require("lodash");
var Notification=require('../../notification/notificationApi');
var ActionButton = require('react-native-action-button');
var { Icon, } = require('react-native-icons');
var BusyIndicator = require('react-native-busy-indicator');
var loaderHandler = require('react-native-busy-indicator/LoaderHandler');
var TimerMixin = require('react-native-timer-mixin');

var ProjectList = React.createClass({
    mixins: [TimerMixin],
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2}),
      loaded: false,
    };
  },

  componentDidMount: function() {
    DataService.getProjectList()
      .then(responseData=>{
        if(!!responseData){
          currentData = responseData;
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(currentData),
          loaded: true
        });
      })
      .done();
      this.Noti();
      this.handlePress();
  },

  onToolbarClicked:  function (){
    // important：需要调用子控件中导出的方法，可以通过ref，去调用。
    this.refs['navTab'].openNavDrawer();
  },
  _refreshData:function(){
    DataService.getProjectList()
      .then(responseData=>{
        if(!!responseData){
          currentData = responseData;
        }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(currentData),
          loaded: true
        });
      })
      .done();
  },
  _onActionSelected: function(position) {
    this.props.nav.push({
      id: 'CreateUser',
    });
  },
  Noti:function(){
    Notification.create({
      id: 1337,
      subject: 'hello',
      message: '这是通知内容。。。。。。..........',
      smallIcon: 'apple',
      autoClear: true,
      payload: { number: 2, what: true, someAnswer: '42' }
    });
  },
  handlePress:function() {
    loaderHandler.showLoader("Loading");
    this.setTimeout(
      () => { loaderHandler.hideLoader("Loading") },
      3000
    );
  },

  render: function() {
    var content = (
      // <PullToRefreshViewAndroid onRefresh={this._refreshData} style={{flex:1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderProject}
          pageSize={10}
          style={styles.projectListView} />
      // </PullToRefreshViewAndroid>
    );
    if(!this.state.loaded){
      content = (
        <View style={styles.loading}>
          <BusyIndicator/>
        </View>

      );
    }
    return (
      // important：NavTab外面不能包其他标签，因为其用了DrawerLayoutAndroid, DrawerLayoutAndroid外有别的标签会不显示，且没有任何提示。
      // important：ListView不能滚动。如果ListView包在一个View中，那么外面这个View需要设置style={flex: 1}。
      <NavTab ref='navTab' nav={this.props.nav}>
        <NavToolbar icon={"ic_menu_white"}
          nav={this.props.nav}
          title={'用户'}
          onClicked={this.onToolbarClicked}
          onActionSelected={this._onActionSelected}
          actions={toolbarActions}/>
        {content}
       <ActionButton buttonColor="rgba(231,76,60,1)">
         <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
         <Icon
           name='fontawesome|home'
           size={23}
           color='#fff'
           style={{width:30,height: 23}}
         />
         </ActionButton.Item>
         <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
         <Icon
           name='fontawesome|heart'
           size={23}
           color='#fff'
           style={{width:30,height: 23}}
         />
         </ActionButton.Item>
         <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
         <Icon
           name='fontawesome|star'
           size={23}
           color='#fff'
           style={{width:30,height: 23}}
         />
         </ActionButton.Item>
       </ActionButton>
      </NavTab>
    );
  },

  renderProject: function(project){
    return(
      <ProjectCell
        onSelect={() => this.selectProject(project)}
        project={project}
        deleteAction={()=>this.deleteAction(project)}
        editAction={()=>this.editAction(project)}/>
    );
  },

  selectProject: function(project) {
    this.props.nav.push({
      id: 'ProjectProfile',
      project: project,
    });
  },
  editAction: function(project) {
    this.props.nav.push({
      id: 'UpdateUser',
      project: project,
    });
  },
  deleteAction:function(project){
    Alert.alert('删除用户','是否删除该用户？',[{text: '取消', onPress: () => console.log('Cancel Pressed!')},{text: '确认', onPress: () => this.deleteUsers(project)}]);
  },
  //删除用户
  deleteUsers:function(project){
    var userid=project._id;
    DataService.deleteUser(userid)
    .then((responseText) => {
      if (responseText.error) {
        ToastAndroid.show("删除失败", ToastAndroid.SHORT)
      }
      else {
        ToastAndroid.show("删除成功", ToastAndroid.SHORT)
        if(currentData&&currentData.length>0&&!!project){
          let tempIds=_.pluck(currentData,'_id'),
            _index=tempIds.indexOf(project['_id'])
          ;
          if(_index>-1){
            currentData.splice(_index,1);
            var temp=new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
            this.setState({
              dataSource: temp.cloneWithRows(currentData),
              loaded: true
            });
          }
        }
      }
    })
  },
});

var currentData=[];

var toolbarActions = [
  {title: '创建', show: 'always'},
];

module.exports = ProjectList;
