/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';//表示在严格模式下执行此js文件

var React = require('react-native');
var MoviesDetail = require('./mydetail');
//定义变量
var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  ViewPagerAndroid,
  View,
  ListView,
  TouchableOpacity,
  ToastAndroid,
  Navigator,
  Component
} = React;
//Api地址（json格式的）
var REQUEST_URL = 'http://192.168.0.181:9000/api/users';
var ToolbarAndroid=require('ToolbarAndroid');

var MyList = React.createClass({
	//获取初始的数据
  getInitialState: function() {
    return {
      dataSource:new ListView.DataSource({
		  rowHasChanged:(row1,row2)=>row1!=row2
	  }),
	  //判断是否加载
	  loaded:false
    };
  },
  //发送请求获取数据
  componentDidMount: function() {
	  //取回数据
   fetch(REQUEST_URL)
   .then((response)=>response.json())
   .then((responseData)=>{
	   this.setState({
		   dataSource:this.state.dataSource.cloneWithRows(responseData),
		   loaded:true
	   });
   })
   .done();
  },
  render: function() {
	  if(this.state.loaded){
	  //到主页面
	  return this.renderList();
	  }
	  else{
	  //到等待的页面
	   return this.renderLoadingView();
	  }
  },
  _actionSelected:function(index){
    var currentAction=toolbarActions[index];
    ToastAndroid.show('currentAction is '+currentAction['title'], ToastAndroid.SHORT)
  },
  //渲染列表
    renderList:function(){
		  return(
                   <View>
                <ToolbarAndroid
                     title="导航工具栏"
                     actions={toolbarActions}
                     style={styles.toolbar}
                     onActionSelected={this._actionSelected}
                     subtitle="" />

                      			<ListView
                      			  dataSource={this.state.dataSource}
                      			  renderRow={this.renderItem}
                      			  style={styles.listView} />
             		</View>
		  )
	  },

	renderItem:function(movie){
    return (
	<TouchableOpacity onPress={() => this.onPressNews(movie)}>
      <View style={styles.container}>
          <Image
            source={{uri: movie.avatar}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.name}</Text>
            <Text style={styles.year}>{movie.age}</Text>
          </View>
        </View>
		<View style={styles.border}>
		<Text>22222222222</Text>
		</View>
		</TouchableOpacity>

		)
	  },
	  onPressNews : function(movie) {
        this.props.navigator.push({
            title: "News Detail",
            component: MoviesDetail,
			 params: {
                    id: movie._id,
                }

        });
    },
	 onPressCreat : function(movie) {
         const { navigator } = this.props;
        if(navigator) {
			//把当前的页面pop掉，这里就返回到了上一个页面
            navigator.pop();
        }
    },
	  renderLoadingView:function(){
		  return(
			  <View style={styles.container}>
			  <Text>Loading,please wait</Text>
			  </View>
		  );
	  }

});

var toolbarActions = [
  {title: '创建', show: 'always'},
];

var styles = StyleSheet.create({
 container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',//垂直居中
    alignItems: 'center',//水平居中
    backgroundColor: '#F5FCFF',
	marginTop:10
  },
  border:{
	  borderWidth: 1,
    borderColor: '##CBCACA',
  },
  head: {
    backgroundColor: '#9CAAF2',
    },
  thumbnail: {
    width: 60,//默认以pt为单位
    height: 80,
  },
  rightContainer: {
    flex: 1,
  },
  newsTitle : {
	color : '#4f4f4f',
	fontSize : 18,
	textAlign : 'center',
	marginTop : 10,
	marginBottom : 10,
	fontWeight : 'bold'
    },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
    listView: {
    paddingTop: 20,
	paddingLeft:0,
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
    flex:1,
    paddingTop:10
  },
});
module.exports = MyList;
