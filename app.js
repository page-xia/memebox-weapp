//app.js
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function(cb) {
        var that = this;
        if (that.globalData.userInfo) {
            typeof cb == "function" && cb(that.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            });
        }
    },
    getOpenId: function(cb) {
        var that = this;
        if (that.globalData.openId) {
            typeof cb == "function" && cb(that.globalData.openId)
        } else {
            wx.login({
                success: function(res) {
                    if (res.code) {
                      console.log(res.code);
                        wx.request({
                          url: 'http://cn.memebox.com/sns/callback/weapp',
                          data: {
                            js_code: res.code
                          },
                          success: function(res1){
                            console.log(res1);
                            if(res1.data.code == '3'){
                                console.log('here we go');
                                wx.navigateTo({
                                    url: '/pages/bind/bind'
                                })
                                that.weappId = res1.data.data.weappId;
                            }
                            else{
                                that.customerInfo = res1.data.data;
                                console.log(that.customerInfo);
                            }
                          }
                        })
                    } else {
                        console.log('获取用户登录态失败！' + res.errMsg)
                    }
                }
            });
        }
    },
    login: function() {
        var that = this;
        var token = wx.getStorageSync('mmToken');
        wx.checkSession({
            success: function(res) {
                //登录态未过期
                console.log(res, '登录成功')
            },
            fail: function() {
                //登录态过期
                console.log('登录过期')
                that.getOpenId();
            },
            complete: function() {
                if (!token) {
                    that.getOpenId();
                }
            }
        })
    },
    ajax: function(setting) {
        var that = this;
        wx.showToast({title:'正在加载...',icon:'loading'})
        wx.request({
            url: (setting.domain ? setting.domain : that.globalData.domain) + setting.url,
            data: setting.data || {},
            method: setting.method || 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            success: function(res, a) {
                if (res.data && res.data.code == 2) {
                    that.login();
                } else {
                    setting.success && setting.success(res.data);
                }
            },
            fail: function() {
                // fail
                setting.fail && setting.fail();
            },
            complete: function() {
                // complete
                wx.hideToast()
                setting.complete && setting.complete();

            }
        })
    },
    to: function(url) {
        wx.navigateTo({
            url: url
        })
    },
    getDataSet: function(event, attributeName) {
        if (attributeName) {
            return event.currentTarget.dataset[attributeName] || event.target.dataset[attributeName];
        } else {
            return event.currentTarget.dataset;
        }
    },
    getCustomerInfo: function(phone){
        var that = this;
        wx.request({
            url: 'http://cn.memebox.com/sns/callback/weappBind',
            data: {
                weapp_id: that.weappId,
                phone: phone
            },
            success: function(res2) {
                that.customerInfo = res2.data.data;
            }
        })
    },
    globalData: {
        userInfo: null,
        openId: null,
        weappId: null,
        domain: "https://qaapp.cn.memebox.com",
        appid: 'wx6aea4c702b122448',
        secret: '291b272da0463076ae5113d07ce22fb1',
        customerInfo: {},
    }
})
