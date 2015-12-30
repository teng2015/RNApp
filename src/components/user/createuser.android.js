'use strict';

var React = require('react-native');
var { Text, View, ListView, TouchableHighlight, Image,TextInput,TouchableOpacity,ToastAndroid,ScrollView} = React;
var NavToolbar = require('../navigation/navToolBar/NavToolBar.android');
var styles = require("./style");
var DataService = require('../../network/DataService');
var Dimensions=require('Dimensions');
var Dropdown = require('react-native-dropdown-android');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

var createuser = React.createClass({
  getInitialState: function() {
    return {
    names: null,
	  ages: null,
	  citys: null,
    sexs:0,
    avatarSource: null,
    };
  },
  avatarTapped:function() {
   var options = {
       title: '选择图片',
       cancelButtonTitle: '取消',
       takePhotoButtonTitle: '拍照',
       chooseFromLibraryButtonTitle: '从图库中获取',
       maxWidth: 500,
       maxHeight: 500,
       quality: 0.2,//图片的质量
       noData: false, // Disables the base64 `data` field from being generated (greatly improves performance on large photos)
   };
     UIImagePickerManager.showImagePicker(options, (didCancel, response) => {
       console.log('Response = ', response);

       if (didCancel) {
         console.log('User cancelled image picker');
       }
       else {
           // You can display the image using either:
           const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
           //const source = {uri: response.uri.replace('file://', ''), isStatic: true};
           this.setState({
             avatarSource: source
           });
       }
     });
   },
  render: function () {
    return (
      <View style={styles.container}>
        <NavToolbar icon={"ic_arrow_back_white_24dp"} title='创建' onClicked={() => {this.props.nav.pop();}} />

      <ScrollView>
        <View style={styles.todo}>
        <View>
        <TouchableOpacity onPress={this.avatarTapped}>
          <View style={{alignItems:'center'}}>
          { this.state.avatarSource === null ? <Text>上传头像</Text> :
            <Image style={styles.userImage} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
        </View>

          <View>
            <Text style={styles.texts}>姓名</Text>
            <View style={styles.adduserInput}>
            <TextInput
            ref="textname"
            onFocus={()=>{this.refs.textname.focus()}}textAlign={'center'} textAlignVertical={'top'}  style={styles.TextInputs} onChangeText={(text) => this.setState({names: text})} />
            </View>
          </View>
          <View>
            <Text style={styles.texts}>年龄</Text>
            <View style={styles.adduserInput}>
              <TextInput
              ref="textage"
              onFocus={()=>{this.refs.textage.focus()}}textAlign={'center'} textAlignVertical={'top'} style={styles.TextInputs} underlineColorAndroid ={'transparent'} keyboardType={'numeric'} maxlength={2} onChangeText={(text) => this.setState({ages: text})} />
            </View>
          </View>
          <View>
            <Text style={styles.texts}>城市</Text>
            <View  style={styles.adduserInput}>
            <TextInput
            ref="textcity"
            onFocus={()=>{this.refs.textcity.focus()}} textAlign={'center'} textAlignVertical={'top'} style={styles.TextInputs} onChangeText={(text) => this.setState({citys: text})} />
            </View>
          </View>
          <View>
            <Text style={styles.texts}>性别</Text>
          <View style={styles.adduserInput}>
          <Dropdown
            style={{ height: 30,justifyContent: 'center',paddingTop:20}}
            values={['女','男']}
            selected={0} onChange={(date) => this.setState({sex: date.value})} />
          </View>

          </View>
          <View>
            <TouchableOpacity style={{marginTop:110}} onPress={this.addUser}>
              <View style={styles.button}>
                <Text style={styles.text}>保存</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  },
  addUser:function(){
    switch (this.state.sex) {
      case '男':
        this.state.sex=1;
        break;
        case '女':
          this.state.sex=0;
        break;
      default:

    }
    var usersparm = {
          name: this.state.names,
          age: this.state.ages,
          city: this.state.citys,
          __v:this.state.sex,
          avatar:this.state.avatarSource.uri.toString()
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
              ToastAndroid.show(this.state.avatarSource.uri.toString(), ToastAndroid.LONG)

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
