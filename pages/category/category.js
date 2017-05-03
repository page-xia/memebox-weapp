// category.js
// 分类列表
var app = getApp();
Page({
    data: {
        pageIndex: 1,
        categoryId: 1610,
        categoryList: [],
        pages: 1
    },
    onLoad: function(options) {
        console.log('onLoad');
        console.log(this.data,'options in');
        var that = this;
        that.getList();
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
        var that = this;
        that.data.pageIndex++;
        if (that.data.pageIndex <= that.data.pages) {
            that.getList();
        }
    },
    goDetail: function(event) {
        var productid = app.getDataSet(event,'productid');
        console.log(event,'eventdata');
        app.to('../detail/detail?productId=' + productid);
        console.log(2);
    },
    addcart: function(item) {
        app.to('../cart/cart');
        console.log(1);
    },
    uprice: function(product) {
        console.log(product, 'product');
    },
    getDiscount: function(list) {
    	for (var i = list.length - 1; i >= 0; i--) {
    		list[i].discount = ((list[i].price/list[i].originPrice)*10).toFixed(1)
    	}
    	return list;
    },
    getList: function() {
        var that = this;
        console.log(that.data.pageIndex);
        app.ajax({
            // domain:"https://cn.memebox.com",
            url: "/h5/category/productList",
            data: {
                pageIndex: that.data.pageIndex,
                categoryId: that.data.categoryId
            },
            success: function(data) {
            	var list = that.getDiscount(data.data);
                that.setData({
                    pages: Math.ceil(data.total / 10),
                    categoryList: that.data.categoryList.concat(list)
                })
                console.log(that.data.categoryList);
            }
        })
    }
})
