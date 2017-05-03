//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Welcome to Memebox Weapp',
    userInfo: {},
    bannerInfo: {},
    customerInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    app.to('../logs/logs');
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    app.login();
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    app.ajax({
      url:'/h5/view/index',
      success: function(data){
        // console.log(data);
        that.bannerInfo = data.data.banner;
      }
    })
  }
})
