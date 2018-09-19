Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选项卡 数据
    navbar: ["CUP-1", "CUP-2"],
    currentIndex: 0,//tabbar索引

    // -------
    imgInfoArr: [
      {
        src: '/images/i1.png',
        text: '回甘普洱',
        price: 66,
        id: 0
      },
      {
        src: '/images/i2.png',
        text: '茉莉绿茶',
        price: 85,
        id: 1
      },
      {
        src: '/images/i1.png',
        text: '雨前龙井',
        price: 32,
        id: 2
      },
      {
        src: '/images/i2.png',
        text: '正山小种',
        price: 66,
        id: 3
      },
      {
        src: '/images/i1.png',
        text: '金凤茶王',
        price: 85,
        id: 4
      },
      {
        src: '/images/i2.png',
        text: '脱脂奶',
        price: 85,
        id: 5
      },
      {
        src: '/images/i1.png',
        text: '全脂奶',
        price: 85,
        id: 6
      },
      {
        src: '/images/i2.png',
        text: '气泡水',
        price: 85,
        id: 7
      },
      {
        src: '/images/i1.png',
        text: '乳酸菌',
        price: 85,
        id: 8
      },
      {
        src: '/images/i2.png',
        text: '冰块',
        price: 85,
        id: 9
      },
      {
        src: '/images/i1.png',
        text: '直饮水',
        price: 85,
        id: 10
      },
    ],
    // 一级可选
    firstOption: [
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/16.png',
        text: '00000',
        price: 66,
        id:0
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/17.png',
        text: '1111',
        price: 85,
        id:1
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/18.png',
        text: '22222',
        price: 32,
        id:2
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/16.png',
        text: '33333',
        price: 66,
        id:3
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/17.png',
        text: '44444',
        price: 85,
        id:4
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/17.png',
        text: '5555',
        price: 85,
        id:5
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/17.png',
        text: '66666',
        price: 85,
        id:6
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/17.png',
        text: '气泡水',
        price: 85,
        id: 7
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/17.png',
        text: '乳酸菌',
        price: 85,
        id:8
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/17.png',
        text: '冰块',
        price: 85,
        id:9
      },
      {
        src: 'https://www.myratio.com//StoreApi/Content/img2/17.png',
        text: '直饮水',
        price: 85,
        id:10
      },
    ],

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
    current: 1,//当前高亮的元素
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

// -----
  changeFun(e) {
    var that = this;
    for (var i = 0; i < that.data.imgInfoArr.length; i++) {
      var id = that.data.firstOption[i].id;
      console.log(that.data.firstOption[i].id)
    }
    this.setData({
      current: e.detail.current,
      firstOption:that.data.firstOption,
    });
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
 
  
  /*
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