/**
 * React Native News App
 * https://github.com/tabalt/ReactNativeNews
 */
'use strict';

var React = require('react-native');
var MyList=require('./mylist');
var MyCreat=require('./mycreat');

var {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
	TouchableOpacity,
	TextInput
} = React;

var NEWS_DETAIL_API_URL = 'http://192.168.0.181:9000/api/users';

var NewsDetail = React.createClass({

    getInitialState : function() {
        return {
            newsData : {},
            loaded : false,
        }
    },
	//取数据
    componentDidMount : function() {
        this.fetchData();
    },
	renderLoadingView:function(){
		  return(
			  <View style={styles.container}>
			    <Text>Loading,please wait</Text>
			  </View>
		  );
	},
    fetchData : function() {
        fetch(NEWS_DETAIL_API_URL + '/' + this.props.id)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    newsData :responseData,
                    loaded : true
                });
            })
            .done();
    },
   

    render : function() {
        if (!this.state.loaded) {
                return this.renderLoadingView();

        }
		
		var newsContents = this.state.newsData.data;
        return (
           <ScrollView style={styles.pageContainer}>
				<View style={styles.head}>
					 <TouchableOpacity onPress={this.onPressNews}>
						<Text style={styles.back}>返回</Text>
					 </TouchableOpacity >
					 <View style={styles.rightContainer}>
					     <Text style={styles.newsTitle}>{this.state.newsData.name}</Text>
					 </View>
				</View >
				<View style={styles.container}>
				<Image
					source={{uri: this.state.newsData.avatar}}
						style={styles.thumbnail}
					  />
				</View>
				<View style={styles.container}>
				 <Text>城市：</Text>
				 <Text style={styles.newsTitle}>{this.state.newsData.city}</Text>
				</View>
				<View style={styles.container}>
				 <Text>年龄：</Text>
				 <Text style={styles.newsTitle}>{this.state.newsData.age}</Text>
				</View>
				<View style={styles.container}>
				 <Text>性别：</Text>
				 <Text style={styles.newsTitle}>{this.state.newsData.gender}</Text>
				</View>
				<View style={styles.container}>
				 <Text>创建时间：</Text>
				 <Text style={styles.newsTitle}>{this.state.newsData.createdate}</Text>
				</View>
            </ScrollView>
		                                                                                                                                                     
        );
    },
	 onPressNews : function() {
        const { navigator } = this.props;
        if(navigator) {
			//把当前的页面pop掉，这里就返回到了上一个页面
            navigator.pop();
        }
    },
});

var styles = StyleSheet.create({
    pageContainer: {
    },
    container: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
	head: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9CAAF2',
		height:55
    },
	rightContainer: {
		flex: 1,
    },
	thumbnail: {
    width: 60,//默认以pt为单位
    height: 80,
  },
	back:{
		color : '#585FF4',
        fontSize : 15,
	},
    newsTitle : {
        color : '#4f4f4f',
        fontSize : 18,
        textAlign : 'center',
        marginTop : 10,
        marginBottom : 10,
        fontWeight : 'bold'
    },
    newsContent : {
        margin : 20,
        marginTop : 10,
        flex: 1,
        color : '#4f4f4f',
        fontSize : 16,
        textAlign : 'left',
        writingDirection : 'ltr',
        lineHeight : 20
    },
});

module.exports = NewsDetail;

