var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选项卡 数据
    navbar: ["CUP-1", "CUP-2"],
    currentIndex: 0,//tabbar索引
    currents: { // 当前选中
      baseGoods: 0,
      firstOption: 0,
      secondGoods: 0,
      fifthGoods: 0,
      otherGoods: 0
    },

    defaultItem: {
      image: 'http://thyrsi.com/t6/372/1537346236x-1566680772.png',
      name: '请选择',
      price: 0,
      volume: 0,
      pk: 0,
      calorie: 0
    },
    // 购物车
    carts: [ 

    ],

    // 茶底
    baseGoods: [],

    // 一级可选
    firstOption: [],

    // 二级品类
    secondGoods: [],

    // 二级可选，多选
    secondOption: [],

    // 三级品类 ： 糖类选择
    thirdGoods: [],

    // 四级品类 多选
    fourthGoods: [],

    fifthGoods: [],

    otherGoods: [],

    // 进度数据
    processData: [
      {
        name: '无糖',
        start: '#fff',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '少糖',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '单糖',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '正常',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '多糖',
        start: '#aaa',
        end: '#fff',
        icon: '/images/process1.png'
      }
    ],
    progress: [
      {
        word: "无糖",
        state: 1
      }, {
        word: "少糖",
        state: 0
      }, {
        word: "单糖",
        state: 0
      }, {
        word: "正常",
        state: 0
      }, {
        word: "多糖",
        state: 0
      }
    ],
    // 进度数据2
    sconData: [
      {
        name: '无糖',
        start: '#fff',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '少糖',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '单糖',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '正常',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '多糖',
        start: '#aaa',
        end: '#fff',
        icon: '/images/process1.png'
      }
    ],
    scon: [
      {
        word: "无糖",
        state: 1
      }, {
        word: "少糖",
        state: 0
      }, {
        word: "单糖",
        state: 0
      }, {
        word: "正常",
        state: 0
      }, {
        word: "多糖",
        state: 0
      }
    ],
    // 33333333
    thirdData: [
      {
        name: '无糖',
        start: '#fff',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '少糖',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '单糖',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '正常',
        start: '#aaa',
        end: '#aaa',
        icon: '/images/process1.png'
      },
      {
        name: '多糖',
        start: '#aaa',
        end: '#fff',
        icon: '/images/process1.png'
      }
    ],
    third: [
      {
        word: "无糖",
        state: 1
      }, {
        word: "少糖",
        state: 0
      }, {
        word: "单糖",
        state: 0
      }, {
        word: "正常",
        state: 0
      }, {
        word: "多糖",
        state: 0
      }
    ],

    cup:[
      {
        list:1,
        name:"回肝普洱",
        num:12,
        cal:100,
        price:100.00
      },
      {
        list: 2,
        name: "回肝普洱",
        num: 12,
        cal: 100,
        price: 100.00
      },
      {
        list: 3,
        name: "回肝普洱",
        num: 12,
        cal: 100,
        price: 100.00
      },
      {
        list: 4,
        name: "回肝普洱",
        num: 12,
        cal: 100,
        price: 100.00
      },
      {
        list: 5,
        name: "回肝普洱",
        num: 12,
        cal: 100,
        price: 100.00
      },
      {
        list: 6,
        name: "回肝普洱",
        num: 12,
        cal: 100,
        price: 100.00
      },
      {
        list: 7,
        name: "春菊",
        num: 12,
        cal: 100,
        price: 100.00
      },
    ],
    showLen: 3,//同时显示的数量
    current: 0,//当前高亮的元素
    show: 3,//同时显示的数量
    cur: 0,//当前高亮的元素
    secondShow: 3,
    secondCur: 1,
    option: 3,
    options: 0,
    classFour:3,
    classFours:0,
    classFive: 3,
    classFives: 1,
    iceFlase:false,
    cold:false,
    hot: true,
    bgProcess:"#666",
    bgScon:"#666",
    bgThird:"#666",
    sugarId:0,
  },
  // 选项卡
  navbarTab: function (e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });
  },

  // 左右滑动
  changeFun(e) {
    var that = this;
    var tab = e.target.dataset.tab;
    var currentKey = 'currents.' + tab;
    var current = e.detail.current;
    var data = that.data;

    for (var i = 0, j = data[tab].length; i < j; i++) {
      
      // 当前选中的item
      if (current == i) {
        data.carts[tab] = data[tab][i];  

        if (data[tab][i]['pk'] == 0) {
          data.carts[tab] = {};
        }
      }
    }

    console.log(data.carts);

    data[currentKey] = current;
    data[tab] = data[tab];

    that.setData(data);

    that.calculate(); // 购物车计算
  },
  change(e) {
    this.setData({
      cur: e.detail.current
    });
  },
  secondLevel(e){
    this.setData({
      secondCur: e.detail.current
    });
  },
  optionChange(e) {
    this.setData({
      options: e.detail.current
    });
  },
  optionFour(e) {
    this.setData({
      classFours: e.detail.current
    });
  },
  optionFive(e) {
    this.setData({
      classFives: e.detail.current
    });
  },
  iceShow: function () {
    this.data.iceFlase = false;
    this.data.hot = true;
    this.data.cold = false;
    this.setData({
      iceFlase: this.data.iceFlase,
      hot:this.data.hot,
      cold: this.data.cold
    })
  },
  iceHide:function(){
    console.log(this.data.iceFlase);
    this.data.iceFlase = true;
    this.data.hot = false;
    this.data.cold = true ;
    this.setData({
      iceFlase:this.data.iceFlase,
      hot: this.data.hot,
      cold: this.data.cold
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
   // 进度
  onLoad: function (options) {
    var that = this;

    app.sendRequest({
      url: 'goods/index',
      data: {},
      success: function (res) {
        var data = res.data.products;
        var init = [that.data.defaultItem]; // 请选择 单选必须

        var baseGoods = init,
          firstOption = init,
          secondGoods = init,
          fifthGoods = init,
          otherGoods = init,
          secondOption = [],
          thirdGoods = [],
          fourthGoods = [];

        for (var i in data) {
          var volume = data[i]['volume'];
          var items = data[i]['items'];

          for (var j = 0; j < items.length; j++) {
            var item = {};

            item['image'] = items[j]['image'];
            item['name'] = items[j]['name'];
            item['pk'] = items[j]['id'];
            item['price'] = items[j]['price'];
            item['calorie'] = items[j]['calorie'];
            item['volume'] = volume;

            if (i == 1 || i == 2 || i ==3 ) { // 一级分类
              baseGoods.push(item);
            }

            if (i == 4) { // 一级可选
              firstOption.push(item);
            }

            if (i == 5) { // 二级品类
              secondGoods.push(item);
            }

            if (i == 6) {
              secondOption.push(item);
            }

            if (i == 7) {
              thirdGoods.push(item);
            }

            if (i == 8) {
              fourthGoods.push(item);
            }

            if (i == 9) { // 五级品类
              fifthGoods.push(item);
            }

            if (i == 10) { // 奶盖其他
              otherGoods.push(item);
            }
          }
        }
        
        that.setData({
          baseGoods: baseGoods,
          firstOption: firstOption,
          secondGoods: secondGoods,
          secondOption: secondOption,
          thirdGoods: thirdGoods,
          fourthGoods: fourthGoods,
          fifthGoods: fifthGoods,
          otherGoods: otherGoods,
        });

      }
    });
  },
  btn:function(e){
    var that = this;
    
    console.log(e.currentTarget.dataset.id);
    var setId = e.currentTarget.dataset.id;
    if(e.currentTarget.dataset.id == 1){
      that.data.bgProcess = "#000";
      that.data.bgScon = "#666";
      that.data.bgThird = "#666";
      console.log("setId" + setId)
      that.data.sugarId = setId;
      
    } else if (e.currentTarget.dataset.id == 2){
      that.data.bgProcess = "#666";
      that.data.bgScon = "#000";
      that.data.bgThird = "#666";
      console.log("setId" +setId)
      that.data.sugarId = setId;
    }else{
      that.data.bgProcess = "#666";
      that.data.bgScon = "#666";
      that.data.bgThird = "#000";
      that.data.sugarId = setId;
    }
    that.setData({
      bgProcess: that.data.bgProcess,
      bgScon: that.data.bgScon,
      bgThird: that.data.bgThird,
      sugarId:setId,
    })
  },
  // 11111
  changeprocess(e) {
    let index = e.target.dataset.index
    let mypro = this.data.progress
    if (index == 0) {
      for (var i = 1; i < mypro.length; i++) {
        var item = mypro[i]
        item.state = 0
      }
    } else {
      for (var i = 1; i < index + 1; i++) {
        var item = mypro[i]
        item.state = 1
      }
      for (var i = index + 1; i < mypro.length; i++) {
        var item = mypro[i]
        item.state = 0
      }
    }
    console.log(this.data.sugarId +"这是sugarId")
    if (this.data.sugarId != 1) {
      return;
    }
    this.setData({
      progress: mypro
    })
    this.setPeocessIcon();
  },

  setPeocessIcon: function () {
    var index = 0 //记录状态为1的最后的位置
    var processArr = this.data.processData

    for (var i = 0; i < this.data.progress.length; i++) {
      var item = this.data.progress[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "/images/process3.png"
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "/images/process1.png"
        processArr[i].start = "#aaa"
        processArr[i].end = "#aaa"
      }
    }
    processArr[index].icon = "/images/process2.png"
    processArr[index].end = "#aaa"
    processArr[0].start = "#fff"
    processArr[this.data.progress.length - 1].end = "#fff";

    this.setData({
      processData: processArr
    })
  },
  // 2222
  changeScon(e) {
    let index = e.target.dataset.index

    let mypro = this.data.scon
    if (index == 0) {
      for (var i = 1; i < mypro.length; i++) {
        var item = mypro[i]
        item.state = 0
      }
    } else {
      for (var i = 1; i < index + 1; i++) {
        var item = mypro[i]
        item.state = 1
      }
      for (var i = index + 1; i < mypro.length; i++) {
        var item = mypro[i]
        item.state = 0
      }
    }
    console.log(this.data.sugarId + "这是sugarId")
    if (this.data.sugarId != 2) {
      return;
    }
    this.setData({
      scon: mypro
    })
    this.setScon()
  },

  setScon: function () {
    var index = 0 //记录状态为1的最后的位置
    var processArr = this.data.sconData
    for (var i = 0; i < this.data.scon.length; i++) {
      var item = this.data.scon[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "/images/process3.png"
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "/images/process1.png"
        processArr[i].start = "#aaa"
        processArr[i].end = "#aaa"
      }
    }
    processArr[index].icon = "/images/process2.png"
    processArr[index].end = "#aaa"
    processArr[0].start = "#fff"
    processArr[this.data.scon.length - 1].end = "#fff"
    this.setData({
      sconData: processArr
    })
  },

  // 333333333
  changeThird(e) {
    let index = e.target.dataset.index

    let mypro = this.data.third
    if (index == 0) {
      for (var i = 1; i < mypro.length; i++) {
        var item = mypro[i]
        item.state = 0
      }
    } else {
      for (var i = 1; i < index + 1; i++) {
        var item = mypro[i]
        item.state = 1
      }
      for (var i = index + 1; i < mypro.length; i++) {
        var item = mypro[i]
        item.state = 0
      }
    }
    console.log(this.data.sugarId + "这是sugarId")
      if (this.data.sugarId != 3) {
        return;
    }
    this.setData({
      third: mypro
    })
    this.setThird()
  },

  setThird: function () {
    var index = 0 //记录状态为1的最后的位置
    var processArr = this.data.thirdData
    for (var i = 0; i < this.data.third.length; i++) {
      var item = this.data.third[i]
      processArr[i].name = item.word
      if (item.state == 1) {
        index = i
        processArr[i].icon = "/images/process3.png"
        processArr[i].start = "#45B2FE"
        processArr[i].end = "#45B2FE"
      } else {
        processArr[i].icon = "/images/process1.png"
        processArr[i].start = "#aaa"
        processArr[i].end = "#aaa"
      }
    }
    processArr[index].icon = "/images/process2.png"
    processArr[index].end = "#aaa"
    processArr[0].start = "#fff"
    processArr[this.data.third.length - 1].end = "#fff"
    this.setData({
      thirdData: processArr
    })
  },
 
  // 购物车计算
  calculate: function() {
    var carts = this.data.carts,
      price = 0.00,
      volume = 0,
      calorie = 0,
      nums = 0;
    console.log(carts);
    for (var k = 0; k < carts.length; k ++) {
      console.log(carts[k]);
      // 多选
      if (Array.isArray(carts[k])) {
        for (var y in carts[k]) {
          console.log(carts[k][y]);
          nums++;
        }
      } else { // 单选
        price += carts[k]['price'];
        volume += carts[k]['volume'];
        calorie += carts[k]['calorie'];
        nums++;

      }
    }

    console.log('price' + price);
    console.log('volume' + volume);
    console.log('calorie' + calorie);
    console.log('nums' + nums);
  },
  
  /*
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {
    // app.showToast({
    //   title: '加载中...',
    //   icon: 'loading'
    // });
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