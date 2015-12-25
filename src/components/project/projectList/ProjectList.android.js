'use strict';

var React = require('react-native');
var { Text, View, ListView, ToastAndroid ,PullToRefreshViewAndroid,ScrollView} = React;
var DataService = require('../../../network/DataService');
var NavTab = require('../../navigation/navTab/NavTab.android');
var NavToolbar = require('../../navigation/navToolBar/NavToolBar.android');
var ProjectCell = require('./projectCell/ProjectCell.android');
var styles = require("./style");
var _=require("lodash");

var ProjectList = React.createClass({
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
  },

  onToolbarClicked:  function (){
    // important：需要调用子控件中导出的方法，可以通过ref，去调用。
    this.refs['navTab'].openNavDrawer();
  },
  _refreshData:function(){
    DataService.getProjectList()
      .then(responseData=>{
        ToastAndroid.show('yeah!',ToastAndroid.SHORT)
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
          <Text>
            载入项目中...
          </Text>
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
      </NavTab>
    );
  },

  renderProject: function(project){
    return(
      <ProjectCell
        onSelect={() => this.selectProject(project)}
        project={project}
        deleteAction={()=>this.deleteAction(project)}/>
    );
  },

  selectProject: function(project) {
    this.props.nav.push({
      id: 'ProjectProfile',
      project: project,
    });
  },
  deleteAction:function(project){
    var userid=project._id;
    DataService.deleteUser(userid)
    // .then((response) => response.text())
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
