Page({
    data: {
    	productInfo:{}
    },
    onLoad: function(options) {
        console.log(options, 'in')
        var that = this;
        that.setData({
        	productInfo: options
        })
        console.log(that.data.productInfo,'info');
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    }
})
