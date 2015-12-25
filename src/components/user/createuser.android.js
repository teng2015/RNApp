'use strict';

var React = require('react-native');
var { Text, View, ListView, TouchableHighlight, Image,TextInput,TouchableOpacity,ToastAndroid} = React;
var NavToolbar = require('../navigation/navToolBar/NavToolBar.android');
var styles = require("./style");
var DataService = require('../../network/DataService');
var Dimensions=require('Dimensions');

var createuser = React.createClass({
  getInitialState: function() {
    return {
    names: null,
	  ages: null,
	  citys: null
    };
  },
  render: function () {
    return (
      <View style={styles.container}>
        <NavToolbar icon={"ic_arrow_back_white_24dp"} title='创建用户' onClicked={() => {this.props.nav.pop();}} />

        <View style={styles.todo}>
          <View style={{borderColor: '#CBCACA',}}>
            <Text style={styles.texts}>姓名</Text>
            <View style={styles.adduserInput}>
            <TextInput textAlign={'center'} textAlignVertical={'top'}  style={styles.TextInputs} onChangeText={(text) => this.setState({names: text})} />
            </View>
          </View>
          <View>
            <Text style={styles.texts}>年龄</Text>
            <View style={styles.adduserInput}>
              <TextInput textAlign={'center'} textAlignVertical={'top'} style={styles.TextInputs} underlineColorAndroid ={'transparent'} keyboardType={'numeric'} maxlength={2} onChangeText={(text) => this.setState({ages: text})} />
            </View>
          </View>
          <View>
            <Text style={styles.texts}>城市</Text>
            <View  style={styles.adduserInput}>
            <TextInput textAlign={'center'} textAlignVertical={'top'} style={styles.TextInputs} onChangeText={(text) => this.setState({citys: text})} />
            </View>
          </View>
          <View>
            <TouchableOpacity style={{marginTop:130}} onPress={this.addUser}>
              <View style={styles.button}>
                <Text style={styles.text}>保存</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
  addUser:function(){
    var usersparm = {
          name: this.state.names,
          age: this.state.ages,
          city: this.state.citys
        };
  if(!this.state.names || !this.state.ages || !this.state.citys){
      ToastAndroid.show("请确认信息是否填写完整！！！", ToastAndroid.SHORT)
    }
    else {
      DataService.addUser(usersparm)
          .then((response) => response.json())
          .then((responseText) => {
            if (responseText.error) {
              ToastAndroid.show("创建失败", ToastAndroid.SHORT)
            }
            else
            {

              ToastAndroid.show("创建成功", ToastAndroid.SHORT)
              this.props.nav.push({
                id: 'ProjectList',
              });

            }

          })
    }


  }


});

module.exports = createuser;
