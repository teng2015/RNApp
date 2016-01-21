'use strict';

var React = require('react-native');
var { Text, View, ListView, ToastAndroid ,PullToRefreshViewAndroid,ScrollView,Alert,TouchableOpacity,Image} = React;
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
var ConsolePanel = require('react-native-console-panel').displayWhenDev();
var ViewPager = require('react-native-viewpager');
var imagedata = [
  {title: '标题1', image: require('../../images/nba01.jpg')},
  {title: '标题2', image: require('../../images/nba02.jpg')},
  {title: '标题3', image: require('../../images/nba03.jpg')},
  {title: '标题4', image: require('../../images/nba04.jpg')},
  {title: '标题5', image: require('../../images/nba05.jpg')},
];

var ProjectList = React.createClass({
    mixins: [TimerMixin],
  getInitialState: function() {
  var dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
   });

  var headerDataSource = new ViewPager.DataSource({
    pageHasChanged: (p1, p2) => p1 !== p2,
  });

  return {
    isLoading: false,
    isLoadingTail: false,
    dataSource: dataSource,
    headerDataSource: headerDataSource.cloneWithPages(imagedata),
   };
  },
  _renderPage: function(
    story: Object,
    pageID: number | string,) {
    return (
      <TouchableOpacity style={{flex: 1}}>
        <Image
          source={story.image}
          style={styles.headerItem}>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}
              numberOfLines={2}>
              {story.title}
            </Text>
          </View>
        </Image>
      </TouchableOpacity>
    )
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
_renderHeader:function(){
  return (
        <View style={{flex: 1, height: 200}}>
        <ViewPager
          dataSource={this.state.headerDataSource}
          style={styles.listHeader}
          renderPage={this._renderPage}
          isLoop={true}
          autoPlay={true} />
        </View>
      );
},
  render: function() {
    var content = (
      // <PullToRefreshViewAndroid onRefresh={this._refreshData} style={{flex:1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderProject}
          pageSize={10}
          style={styles.projectListView}
          automaticallyAdjustContentInsets={false}
          renderHeader={this._renderHeader} />
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
          titleColor="white"
          onClicked={this.onToolbarClicked}
          onActionSelected={this._onActionSelected}
          actions={toolbarActions}/>
        {content}
        {ConsolePanel}
       <ActionButton buttonColor="rgba(231,76,60,1)">
         <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => ToastAndroid.show("你点击了 New Task", ToastAndroid.SHORT)}>
         <Icon
           name='fontawesome|home'
           size={23}
           color='#fff'
           style={{width:30,height: 23}}
         />
         </ActionButton.Item>
         <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() =>ToastAndroid.show("你点击了 Notifications", ToastAndroid.SHORT)}>
         <Icon
           name='fontawesome|heart'
           size={23}
           color='#fff'
           style={{width:30,height: 23}}
         />
         </ActionButton.Item>
         <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() =>ToastAndroid.show("你点击了 All Tasks", ToastAndroid.SHORT)}>
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
        deleteAction={callb=>this.deleteAction(project,callb)}
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
  deleteAction:function(project,callb){
    Alert.alert('删除用户','是否删除该用户？',[{text: '取消', onPress: () =>this.cancelAction(project,callb) },{text: '确认', onPress: () => this.deleteUsers(project,callb)}]);
  },
  cancelAction:function(project,callb){
    callb&&callb();
    console.log('Cancel Pressed!');
  },
  //删除用户
  deleteUsers:function(project,callb){
    var userid=project._id;
    DataService.deleteUser(userid)
    .then((responseText) => {
      if (responseText.error) {
        callb&&callb();
        ToastAndroid.show("删除失败", ToastAndroid.SHORT)
      }
      else {
        callb&&callb();
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
  {title:'more',show:'never'}
];

module.exports = ProjectList;
