// pages/make_complete/complete.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderFoot:[],
    orders: [ ],
    recommends: [], // 推荐列表
    recommend: [], // 选中推荐
    // 颜色系
    colors: [ 
      { color: '#000', background: '#4682B4'},
      { color: '#000', background: '#483D8B' },
      { color: '#000', background: '#FFEC8B' },
      { color: '#000', background: '#8B658B' },
      { color: '#000', background: '#B8860B' },
      { color: '#000', background: '#FF6A6A' },
      { color: '#000', background: '#FF0000' },
      { color: '#000', background: '#DA70D6' },
      { color: '#000', background: '#FF1493' },
      { color: '#000', background: '#E0EEE0' },
      { color: '#000', background: '#4682B4' },
      { color: '#000', background: '#483D8B' },
      { color: '#000', background: '#FFEC8B' },
      { color: '#000', background: '#B8860B' },
      { color: '#000', background: '#E0EEE0' }
    ],
    showLen: 3,//同时显示的数量
    current: 1,//当前高亮的元素
    maskShow:true,
    orderPage:false,
    formulaPage:true,
    hasOrder: true,
    position: 0, //排队杯数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    app.sendRequest({
      url: 'order/index',
      data: {},
      success: function (res) {
        var orders = res.data.orders;
        var recomments = res.data.recommends;
        var orderArr = [];
        var recommendArr = [];
        var colors = that.data.colors;
        var hasOrder = true;

        if (orders.length) {
          for (var i = 0, len = orders.length; i < len; i++) {
            var order = [];
            for (var j = 0, l = orders[i].length; j < l; j ++) {
              orders[i][j]['color'] = colors[j]['color'];
              orders[i][j]['background'] = colors[j]['background'];
              order.push(orders[i][j]);
            }
            orderArr.push(order);
          }
          
        } else if (recomments.length) {
          for (var i = 0, len = recomments.length; i < len; i++) {
            var recomment = [];
            for (var j = 0, l = recomments[i].length; j < l; j++) {
              recomments[i][j]['color'] = colors[j]['color'];
              recomments[i][j]['background'] = colors[j]['background'];
              recomment.push(recomments[i][j]);
            }
            recommendArr.push(recomment);
          }
          hasOrder = false;
        }

        that.setData({
          orders: orderArr,
          hasOrder: hasOrder,
          recommends: recommendArr
        })

        console.log(orderArr);
      }
    });

  },
  goBuy: function() {
    wx.switchTab({
      url: '/pages/goods/goods'
    })
  },
  changeFun(e) {

    this.setData({
      current: e.detail.current,
    });
  },
  // 选择推荐
  getRecommend: function(e){
    var datasetId= e.currentTarget.dataset.id;

    var recommends = this.data.recommends;
    var recommend = [];

    for (var i = 0, len = recommends.length; i < len; i++) {
      if (datasetId == i) {
        recommend = recommends[i];
      }
    }
     
    this.setData({
      current: datasetId,
      maskShow: false,
      orderPage: true,
      formulaPage: false,
      recommend: recommend,
    })
  },
  // 取消选择
  closeBtn: function(e){
    this.setData({
      maskShow: true,
      orderPage: false,
      formulaPage: true, 
      recommend: []
    })
  },
  // 去支付
  goPay: function(e) {
    wx.setStorage({
      key: 'recommend',
      data: JSON.stringify(this.data.recommend),
    });
    
    wx.switchTab({
      url: '/pages/goods/goods'
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})