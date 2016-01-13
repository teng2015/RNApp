'use strict';

var React = require('react-native');
var { Text, View, ListView, TouchableHighlight, Image,TextInput,TouchableOpacity,ToastAndroid,ScrollView,NativeModules, Dimensions,} = React;
var NavToolbar = require('../navigation/navToolBar/NavToolBar.android');
var styles = require("./style");
var DataService = require('../../network/DataService');
var Dimensions=require('Dimensions');
var Dropdown = require('react-native-dropdown-android');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var RNALocation = require('react-native-android-location');
var { DeviceEventEmitter } = require('react-native');
var Contacts = require('react-native-contacts');
var Calendar = require('react-native-calendar-android');
var SmsAndroid = require('react-native-sms-android');
var Button  = require('react-native-button');
var Circles = require('react-native-android-circles');

var createuser = React.createClass({

  getInitialState: function() {
    return {
    names: null,
	  ages: null,
	  citys: null,
    sexs:0,
    avatarSource: null,
    lng: 0.0,
    lat: 0.0,
    };
  },
  componentDidMount: function() {
      //测试经纬度
      DeviceEventEmitter.addListener('updateLocation', function(e: Event) {
          this.setState({lng: e.Longitude, lat: e.Latitude });
      }.bind(this));
      RNALocation.getLocation();
    //发短信
    //   SmsAndroid.sms(
    //   '15764219896', // phone number to send sms to
    //   'tnskjdfnskfjsdmfsklfmsdfksdlfsjdklgsdgjklgjdsgkl', // sms body
    //   'sendIndirect', // sendDirect or sendIndirect
    //   (err, message) => {
    //     if (err){
    //       ToastAndroid.show("error", ToastAndroid.SHORT)
    //     } else {
    //       ToastAndroid.show(message.toString(), ToastAndroid.SHORT)
    //     }
    //   }
    // );
    //获取所有的联系人
      // Contacts.getAll((err, contacts) => {
      //   if(err && err.type === 'permissionDenied'){
      //     ToastAndroid.show("permissionDenied", ToastAndroid.SHORT)
      //   } else {
      //
      //     Array.prototype.forEach.call(contacts, function(aaa) {
      //       ToastAndroid.show(JSON.stringify(aaa), ToastAndroid.SHORT);
      //       ToastAndroid.show(aaa.givenName.toString()+" "+aaa.phoneNumbers[0].number, ToastAndroid.SHORT);
      //   });
      //   }
      // })
  },
  //date
  handleClick: function () {
      NativeModules.DateAndroid.showTimepicker(function() {}, function(hour, minute) {
       ToastAndroid.show(hour + ":" + minute, ToastAndroid.SHORT)
      });
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
          { this.state.avatarSource === null ?
            <Image style={styles.userImage} source={{uri: 'https://resource-huobanyun-cn.alikunlun.com/3.1.142/content/images/avatar_default.jpg'}}/>:
            <Image style={styles.userImage} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>
        </View>

         <View>
            <Button style={{backgroundColor:'#18D5EA',height:30,marginTop:20}}onPress={this.handleClick}>时间选择器</Button>
         </View>

         <View>
             <Calendar
             width={300}
             topbarVisible={true}
             arrowColor="#2212a7"
             firstDayOfWeek="monday"
             showDate="all"
             currentDate={[ "2016/12/01" ]}
             selectionMode="multiple"
             selectionColor="#dadafc"
             selectedDates={[ "2015/11/20", "2015/11/30", 1448745712382 ]}
             onDateChange={(data) => {
               ToastAndroid.show(data.selected.toString(), ToastAndroid.SHORT);
               ToastAndroid.show(data.date.toString(), ToastAndroid.SHORT)
             }} />
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
            //secureTextEntry={true} 密码
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

          <View>
             <Text>
               经度: {this.state.lng} 纬度: {this.state.lat}
             </Text>
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
    if(this.state.avatarSource === null)
    {
          var usersparm = {
                name: this.state.names,
                age: this.state.ages,
                city: this.state.citys,
                __v:this.state.sex,
                avatar:'https://resource-huobanyun-cn.alikunlun.com/3.1.142/content/images/avatar_default.jpg'
          };
    }
    else
    {
        var usersparm = {
              name: this.state.names,
              age: this.state.ages,
              city: this.state.citys,
              __v:this.state.sex,
              avatar:this.state.avatarSource.uri.toString(),
            };
    }


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
              this.props.nav.push({
                id: 'ProjectList',
              });
              ToastAndroid.show("创建成功", ToastAndroid.SHORT)
            }

          })
    }
  }


});

module.exports = createuser;
