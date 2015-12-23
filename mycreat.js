/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';//表示在严格模式下执行此js文件

var React = require('react-native');
var MoviesList = require('./mylist');
//定义变量
var {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput
} = React;
//Api地址（json格式的）
var UserPost_URL = 'http://192.168.0.181:9000/api/users';

var MyCreat = React.createClass({
	//获取初始的数据

	getInitialState: function() {
    return {
      names: null,
	  ages: null,
	  citys: null
    };
  },
  render: function() {
	return (
			<ScrollView style={{paddingTop:30}}>
				 <View>
				  <Text>姓名</Text>
				  <TextInput onChangeText={(text) => this.setState({names: text})}/>
				</View>
				 <View>
				  <Text>年龄</Text>
				  <TextInput onChangeText={(text) => this.setState({ages: text})}/>
				</View>
				 <View>
				  <Text>城市</Text>
				  <TextInput onChangeText={(text) => this.setState({citys: text})} />
				</View>
        <View>
          <TouchableOpacity onPress={this.addUser}>
            <View>
              <Text>创建</Text>
            </View>
          </TouchableOpacity>
        </View>
		    </ScrollView>
		   )
  },

  //post
  addUser:function(){

	var usersparm = {
      name: this.state.names,
      age: this.state.ages,
      city: this.state.citys
    };
	fetch(UserPost_URL, {
	  method: 'POST',
	  headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(usersparm)
	})
	.then((response) => response.text())
    .then((responseText) => {
		//成功跳转页面
		const { navigator } = this.props;
        if(navigator) {
			//把当前的页面pop掉，这里就返回到了上一个页面
         this.props.navigator.push({name:"default",component:MoviesList});
	  };
	})
	  .catch((error) => {
		console.warn(error);
	  })
	}







});

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
});
module.exports = MyCreat;
