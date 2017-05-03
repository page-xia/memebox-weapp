/*
 * @Author: Derek Zhou
 * @Date:   2016-11-09 10:43:19
 * @Last Modified by:   Derek Zhou
 * @Last Modified time: 2016-11-09 18:08:21
 */
var app = getApp();
var WxAutoImage = require('../../utils/WxAutoImage.js');
Page({
    data: {
        productId: '',
        discount: 0,
        imgs: [],
        imgSize:[],
        productDetail: {},
        rewardPoint: 0,

    },
    onLoad: function(options) {
        console.log(options, 'productid in');
        var that = this;
        that.getDetail(options.productId);
        // that.getDetail(20326);
    },
    onReady: function() {
        console.log('onReady');
    },
    onShow: function() {
        console.log('onShow');
    },
    onHide: function() {
        console.log('onHide');
    },
    onUnload: function() {
        console.log('onUnload');
    },
    onPullDownRefresh: function() {
        console.log('onPullDownRefresh');
    },
    onReachBottom: function() {
        console.log('onReachBottom');
    },
    getDiscount: function(item) {
        return (item.price / item.originPrice * 10).toFixed(1);
    },
    getImgs: function(item) {
        item = item.match(/(http|https).*(.jpg|.png)/g);
        console.log(item, typeof item);
        return item;
    },
    getDetail: function(id) {
        var that = this;
        app.ajax({
            url: '/h5/product/detail',
            data: {
                productId: id
            },
            success: function(data) {
                var discount = that.getDiscount(data.data);
                var imgs = that.getImgs(data.data.detail);
                that.setData({
                    productDetail: data.data,
                    discount: discount,
                    imgs: imgs
                })
                console.log(that.data.productDetail, 'detail out');
            }
        });
        app.ajax({
        	url: '/h5/memeclub/productExtra',
        	data: {
        		productId: id
        	},
        	success: function(data){
        		that.setData({
        			rewardPoint: data.data.rewardAmount
        		})
        	}
        })
        console.log(that.data.rewardPoint,'rewardPoint');
    },
    goCart: function(event) {
        var productinfo = app.getDataSet(event, 'productinfo');
        console.log(event, 'eventdata');
        app.to('../cart/cart?productinfo=' + productinfo);
        console.log(2);
    },
    cusImageLoad: function (event) {
        var index=app.getDataSet(event, 'index');
        this.data.imgSize[index]=(WxAutoImage.wxAutoImageCal(event));
    }
})
