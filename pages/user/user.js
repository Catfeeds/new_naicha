// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["我的口味库", "购买历史记录", "优惠券"],
    currentIndex: 0,//tabbar索引 
    con:[
      { img: "/images/me1.png", text: "雨前龙井+蝶豆花+水蜜桃+糖浆少糖+黄金珍珠+芝士奶盖1", btn: "设为首推", right: "0", hidImg:"true",id:0,},
      { img: "/images/me2.png", text: "雨前龙井+蝶豆花+水蜜桃+糖浆少糖+黄金珍珠+芝士奶盖2", btn: "设为首推1", right: "0", hidImg: "true", id: 1,},
      { img: "/images/me2.png", text: "雨前龙井+蝶豆花+水蜜桃+糖浆少糖+黄金珍珠+芝士奶盖3", btn: "设为首推4", right: "0", hidImg: "true",id:2},
      { img: "/images/me2.png", text: "雨前龙井+蝶豆花+水蜜桃+糖浆少糖+黄金珍珠+芝士奶盖4", btn: "设为首推98", right: "0", hidImg: "true",id:3},
      { img: "/images/me2.png", text: "雨前龙井+蝶豆花+水蜜桃+糖浆少糖+黄金珍珠+芝士奶盖5", btn: "设为首推5", right: "0", hidImg: "true",id:4},
      { img: "/images/me2.png", text: "雨前龙井+蝶豆花+水蜜桃+糖浆少糖+黄金珍珠+芝士奶盖6", btn: "设为首推00", right: "0", hidImg: "true",id:5},
      { img: "/images/me2.png", text: "雨前龙井+蝶豆花+水蜜桃+糖浆少糖+黄金珍珠+芝士奶盖7", btn: "设为首推3", right: "0", hidImg: "true",id:6}
    ],
    record:[
      {name:"菊花茶",num:"2",numb:"123123123123123123123",time:"2014-01-55 11:87:66",money:"131.00"},
      { name: "雨前龙井", num: "5", numb: "22333334322342", time: "2015-01-55 11:87:66", money: "441.00" },
      { name: "明朝", num: "44", numb: "8997979747464", time: "2016-01-55 11:87:66", money: "121.00" },
      { name: "反清复明", num: "22", numb: "5656555656", time: "2017-01-55 11:87:66", money: "12.00" },
      { name: "桂花茶", num: "43", numb: "7777777777777", time: "2018-01-55 13:87:66", money: "21.00" },
      { name: "大红袍", num: "77", numb: "4660321313103106", time: "2019-01-55 11:87:66", money: "01.00" }
    ],
    coupon:[
      {time:"2012.12.21"},
      { time: "2012.12.21" },
      { time: "2013.12.231" },
      { time: "2014.12.21" },
      { time: "2015.12.21" },
      { time: "2016.12.21" },
      { time: "2017.12.21" }
    ],
    title_formula: "雨前龙井 + 蝶豆花 + 水蜜桃 + 糖浆少糖 + 黄金珍珠 + 芝士奶盖1",
    mask:true,
    recommend:true,
    cart:true,
    getId:0,
    yi:true,
    tea:true
  },
  // 弹窗
  modalcnt: function (e) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  setTo:function(e){
    var that = this;
    that.data.mask = false;
    that.data.recommend =false;
    console.log(e);
    var id = e.target.dataset.id;
    console.log(id);    
    that.data.getId = id;
    this.setData({
      mask:that.data.mask,
      recommend:that.data.recommend,
      getId:that.data.getId
    })
  },
  sures:function(e){
    var that = this;
    that.data.recommend = true;
    that.data.mask = true;
    
    for(var i= 0;i<that.data.con.length;i++){
      if ( that.data.con[i].id == that.data.getId){
        console.log(that.data.con[i].text);
        var text = that.data.con[i].text;
        
      }
      that.data.title_formula = text;
    };
    that.setData({
      recommend:that.data.recommend,
      mask:that.data.mask,
      title_formula:that.data.title_formula,
      con:that.data.con
    })
  },
  carts:function(){
    var that = this;
    that.data.cart = false;
    that.data.mask= false;
    that.setData({
      cart:that.data.cart,
      mask:that.data.mask
    })
  },
  masks:function(){
    var that =this;
    that.data.mask = true;
    that.data.recommend = true;
    that.data.cart = true;
    that.data.tea = true;
    that.setData({
      mask:that.data.mask,
      recommend:that.data.recommend,
      cart:that.data.recommend,
      tea:that.data.tea
    })
  },

  // 点击取消左移
  closeImg:function(e){
    var that = this;
    var index =e.currentTarget.dataset.index;

    that.data.con[index].right=18;
    that.data.con[index].hidImg = !that.data.con[index].hidImg;

    console.log(that.data.con[index].hidImg)
    that.setData({
      con:that.data.con,
    })
  },

  // 点击列表右移
  list: function (e) {
    var that = this;
    var id =e.currentTarget.dataset.id;
    for(var i=0;i<that.data.con.length;i++){
      if(that.data.con[i].id == id){
          console.log(that.data.con[i].id);
          that.data.con[i].right = 0;
      }
    }
    that.setData({
      con: that.data.con,
    })
  },
  
  // 优惠券
  uses:function(){
    var that = this;
    that.data.tea = false;
    that.data.mask = false;
    this.setData({
      tea:that.data.tea,
      mask:that.data.mask
    })
  },

  //取消按钮点击事件
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  
  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },
  

})