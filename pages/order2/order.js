// pages/make_complete/complete.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperCurrent: 0, // 当前杯
    lastX: 0,
    lastY: 0,
    direction: "",
    orderFoot:[],
    orders: [ 
      [
        { goods_name: '高山乌龙', pk: 1 },
        { goods_name: '福鼎白茶', pk: 2 },
        { goods_name: '安溪铁观音', pk: 3 },
        { goods_name: '永春佛手', pk: 4 },
        { goods_name: '云南普洱茶', pk: 5 },
        { goods_name: '武夷山大红袍', pk: 6 },
        { goods_name: '西湖龙井茶', pk: 7 }
      ],
      [
        { goods_name: '高山乌龙2', pk: 1 },
        { goods_name: '福鼎白茶2', pk: 2 },
        { goods_name: '安溪铁观音2', pk: 3 },
        { goods_name: '永春佛手2', pk: 4 },
        { goods_name: '云南普洱茶2', pk: 5 },
        { goods_name: '武夷山大红袍2', pk: 6 },
        { goods_name: '西湖龙井茶2', pk: 7 }
      ],
      [
        { goods_name: '高山乌龙3', pk: 1 },
        { goods_name: '福鼎白茶3', pk: 2 },
        { goods_name: '安溪铁观音3', pk: 3 },
        { goods_name: '永春佛手3', pk: 4 },
        { goods_name: '云南普洱茶3', pk: 5 },
        { goods_name: '武夷山大红袍3', pk: 6 },
        { goods_name: '西湖龙井茶3', pk: 7 }
      ]
    ],
    recommends: [], // 推荐列表
    recommend: [], // 选中推荐
    // 颜色系
    colors: [ 
      { color: '#000', background: '#f5e984'},
      { color: '#000', background: '#ffb6a0' },
      { color: '#000', background: '#9ce9a9' },
      { color: '#000', background: '#bfabe0' },
      { color: '#000', background: '#febbd6' },
      { color: '#000', background: '#f7c07a' },
      { color: '#000', background: '#f5e984' },
      { color: '#000', background: '#ffb6a0' },
      { color: '#000', background: '#9ce9a9' },
      { color: '#000', background: '#bfabe0' },
      { color: '#000', background: '#febbd6' },
      { color: '#000', background: '#f7c07a' },
      { color: '#000', background: '#FFEC8B' },
      { color: '#000', background: '#f7c07a' },
      { color: '#000', background: '#f5e984' }
    ],
    showLen: 3,//同时显示的数量
    current: 1,//当前高亮的元素
    maskShow:true,
    orderPage:false,
    formulaPage:true,
    hasOrder: false,
    hasDone: true, // 是否有已做订单
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
        var orders = that.data.orders;
        var orderArr = [];
        var colors = that.data.colors;
        var hasOrder = false;

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
        } 

        that.setData({
          orders:orderArr,
          //hasOrder: orderArr.length
        })

        console.log(orderArr);
      }
    });
  },
  moveImg: function(e) {
    console.log('move');
    console.log(e);
  },

  touchmove: function (event) {
    let currentX = event.touches[0].pageX
    let currentY = event.touches[0].pageY
    let tx = currentX - this.data.lastX
    let ty = currentY - this.data.lastY
    let text = ""

    if (Math.abs(tx) > Math.abs(ty)) {
      //左右方向滑动
      text = tx > 0 ? "right" : 'left';
    } else {
      text = '';
    }

    //将当前坐标进行保存以进行下一次计算
    this.setData({
      lastX: currentX,
      lastY: currentY,
      direction: text,
    });
  },

  touchstart: function (event) {
    // 赋值
    this.data.lastX = event.touches[0].pageX
    this.data.lastY = event.touches[0].pageY
  },

  touchend: function (event) {
    console.log(this.data.direction);
    var len = this.data.orders.length;
    var current = this.data.swiperCurrent;
    var direction = this.data.direction;

    if (direction === 'right') {
      current = current ? current - 1 : current;
    } else if (direction === 'left') {
      current = current < (len - 1) ? current + 1 : current;
    }

    this.setData({
      swiperCurrent: current,
    })
  },

  changeItem: function(e) {
    console.log(e);
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
    setTimeout(function () {
      app.slideupshow(this, 'orderPage', -50, 1)
    }.bind(this), 500);
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