/*
* @Author: Derek Zhou
* @Date:   2016-11-14 11:46:13
* @Last Modified by:   Derek Zhou
* @Last Modified time: 2016-11-14 11:49:42
*/

var app = getApp();
Page({
	data:{

	},
	onLoad:function(options){

	},
	onReady:function(){

	},
	onShow:function(){

	},
	onHide:function(){

	},
	onUnload:function(){

	},
	onPullDownRefresh:function(){

	},
	onReachBottom:function(){

	},
  	formSubmit: function(e) {
	   var phone = e.detail.value.input;
	   app.getCustomerInfo(phone);
    },
})
