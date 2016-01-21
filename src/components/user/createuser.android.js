'use strict';

var React = require('react-native');
var { StyleSheet,Text, View, ListView, TouchableHighlight, Image,TextInput,TouchableOpacity,ToastAndroid,ScrollView,NativeModules, Dimensions,SwitchAndroid,IntentAndroid} = React;
var NavToolbar = require('../navigation/navToolBar/NavToolBar.android');
var styleObj = require("./style");
var styles=styleObj.common;
var dayStyle=styleObj.dayStyle;
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
var { Icon, } = require('react-native-icons');
var DateTimePicker = require('@remobile/react-native-datetime-picker');
import Picker from 'react-native-picker'
var DataService = require('../../network/DataService');
var Region = require('rn-china-region-picker');
var Communications = require('react-native-communications');
import CalendarAndroid from '@improntaadvance/react-native-calendar';

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
    date: new Date(),
    visible:false,
    currentData:null,
    switchstate:false
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
  calltel:function(){
      // IntentAndroid.openURL('geo:37.484847,-122.148386');//獲取地理位置
      // IntentAndroid.openURL("tel:"+'15764219896');//打電話
      // IntentAndroid.openURL('http://www.baidu.com');//打開網頁
    },
  addcontacts:function(){
    var newPerson = {
      familyName: "123",
      givenName: "123456",
      emailAddresses: [{
        label: "work",
        email: "mrniet@example.com",
      }],
    };
    Contacts.addContact(newPerson, (err) => { ToastAndroid.show(err, ToastAndroid.SHORT)})
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
   showDatePicker() {
        var date = this.state.date;
        this.picker.showDatePicker(date, (d)=>{
            this.setState({date:d});
        });
    },
    showTimePicker() {
        var date = this.state.date;
        this.picker.showTimePicker(date, (d)=>{
            this.setState({date:d});
        });
    },
    showCityPicker(){
      this.setState({
        visible: true
      });
    },
    cancelCityPicker(params){
      if (params==null) {
          ToastAndroid.show("空的", ToastAndroid.SHORT)
      }
      else {
      console.log(params);
      this.setState({currentData:params});
      }
      this.setState({
        visible: false
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
               <Text style={{textAlign: 'center'}}>
                   {this.state.date.toString()}
               </Text>
               <View style={{height:40}} />
               <Button onPress={this.showDatePicker} style={{backgroundColor:'blue',borderRadius: 5}}>日期选择</Button>
               <View style={{height:40}} />
               <Button onPress={this.showTimePicker} style={{backgroundColor:'blue'}}>时间选择</Button>
               <Button onPress={this.addcontacts} style={{backgroundColor:'green'}}>添加联系人</Button>
               <DateTimePicker ref={(picker)=>{this.picker=picker}}/>
          </View>
         <View>
             <Calendar
             width={300}
             topbarVisible={true}
             arrowColor="#2212a7"
             firstDayOfWeek="monday"
             showDate="all"
             currentDate={[ "2016/12/01" ]}
             selectionMode="single"
             selectionColor="#dadafc"
             selectedDates={[ "2015/11/20", "2015/11/30", 1448745712382 ]}
             onDateChange={(data) => {
               ToastAndroid.show(data.selected.toString(), ToastAndroid.SHORT);
               ToastAndroid.show(data.date.toString(), ToastAndroid.SHORT)
             }} />
         </View>

         <View>
            <CalendarAndroid
              firstDayOfWeek={1}
              nameOfDays={['周日', '周一', '周二', '周三', '周四', '周五', '周六']}
              eventDates={['2016-01-07']}
              dateFormat="M月YYYY年"
              prevButton='Prev'
              nextButton='Next'
              showDate="all"
              calendarStyle={{}}
              dayStyle={dayStyle}
              onDateSelect={(data) => {
                ToastAndroid.show(data.toString(), ToastAndroid.SHORT)}}
            />
        </View>


          <View>
            <Text style={styles.texts}>姓名</Text>
            <View style={styles.adduserInput}>
            <Icon
              name='fontawesome|user'
              size={25}
              color='#6C77EA'
              style={{ height: 30,width:30,marginTop:6}}
            />
            <TextInput
            ref="textname"
            underlineColorAndroid="transparent"
            onFocus={()=>{this.refs.textname.focus()}}  textAlignVertical={'top'} textAlign={'start'} style={styles.TextInputs} onChangeText={(text) => this.setState({names: text})} />
            </View>
          </View>
          <View>
            <Text style={styles.texts}>年龄</Text>
            <View style={styles.adduserInput}>
            <Icon
              name='fontawesome|tint'
              size={25}
              color='#6C77EA'
              style={{ height: 30,width:30,marginTop:6}}
            />
              <TextInput
              ref="textage"
              underlineColorAndroid ={'transparent'}
              onFocus={()=>{this.refs.textage.focus()}} textAlign={'start'} textAlignVertical={'top'} style={styles.TextInputs} keyboardType={'numeric'} onChangeText={(text) => this.setState({ages: text})} />
            </View>
          </View>
          <View>
            <Text style={styles.texts}>城市</Text>
            <View style={styles.adduserInput}>
            <Button
            style={{fontSize: 16, color: 'black',marginTop:9,jusifyContent:'center',alignItems:'center'}}
            onPress={()=>{this.showCityPicker();}}>
            {this.state.currentData==null?'选择城市':this.state.currentData.provinceName+''+this.state.currentData.cityName+''+this.state.currentData.areaName}
            </Button>
            </View>
          </View>
          <View>
            <Text style={styles.texts}>性别</Text>
          <View style={styles.adduserInput1}>
          <Dropdown
            style={{ height: 30,justifyContent: 'center',paddingTop:20}}
            values={['女','男']}
            selected={0} onChange={(date) => this.setState({sex: date.value})} />
          </View>

          <View>
              <SwitchAndroid value={this.state.switchstate} onValueChange={()=>{this.setState({switchstate: !this.state.switchstate});}}/>
          </View>

          <View>
             <Text>
               经度: {this.state.lng} 纬度: {this.state.lat}
             </Text>
          </View>

          <View style={styles.container}>
            <TouchableOpacity onPress={() => Communications.phonecall('0123456789', true)}>
              <View style={styles.phone}>
                <Text style={styles.text}>打电话</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Communications.email(['emailAddress1', 'emailAddress2'],null,null,'My Subject','My body text')}>
              <View style={styles.email}>
                <Text style={styles.text}>发送邮件</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Communications.text('0123456789')}>
              <View style={styles.sms}>
                <Text style={styles.text}>发短信/iMessage</Text>
              </View>
            </TouchableOpacity>
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
      <Region
         visible={this.state.visible}
         ref={(Region) => {this.Region = Region}}
         selectedProvince={'110000'} //初始化省，不传默认也是北京
         selectedCity={'110100'} //初始化市，不传默认也是北京
         selectedArea={'110101'} //初始化区，不传默认为东城区
         onSubmit={(params) => (this.cancelCityPicker(params))}//确认
         onCancel={this.cancelCityPicker}//取消
       />
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
    var citys=this.state.currentData.provinceName+''+this.state.currentData.cityName+''+this.state.currentData.areaName;
    if(this.state.avatarSource === null)
    {
          var usersparm = {
                name: this.state.names,
                age: this.state.ages,
                city: citys,
                __v:this.state.sex,
                avatar:'https://resource-huobanyun-cn.alikunlun.com/3.1.142/content/images/avatar_default.jpg'
          };
    }
    else
    {
        var usersparm = {
              name: this.state.names,
              age: this.state.ages,
              city: citys,
              __v:this.state.sex,
              avatar:this.state.avatarSource.uri.toString(),
            };
    }

if (this.state.ages.length>2) {
    ToastAndroid.show("年龄不合理", ToastAndroid.SHORT)
}
  if(!this.state.names || !this.state.ages || !citys){
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
