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
    carts: {},

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

// 购物车
    cups:[
      [
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
      [
        {
          list: 1,
          name: "回肝普洱",
          num: 12,
          cal: 100,
          price: 100.00
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
      ]
    ],
    cup: [
        {
          list: 1,
          name: "回肝普洱",
          num: 12,
        calorie: 100,
          price: 100.00
        },
        {
          list: 2,
          name: "回肝普洱",
          num: 12,
          calorie: 100,
          price: 100.00
        },
        {
          list: 3,
          name: "回肝普洱",
          num: 12,
          calorie: 100,
          price: 100.00
        },
        {
          list: 4,
          name: "回肝普洱",
          num: 12,
          calorie: 100,
          price: 100.00
        },
        {
          list: 5,
          name: "回肝普洱",
          num: 12,
          calorie: 100,
          price: 100.00
        },
        {
          list: 6,
          name: "回肝普洱",
          num: 12,
          calorie: 100,
          price: 100.00
        },
        {
          list: 7,
          name: "春菊",
          num: 12,
          calorie: 100,
          price: 100.00
        },
      ],
    // 多选数据
    selects:[
      {
        name:"薄荷叶",
        id:0,
        bg: "#D6D3D3",
        color: "black"
      },{
        name:"果醋",
        id:1,
        bg: "#D6D3D3",
        color: "black"
      },{
        name:"配茶",
        id:2,
        bg: "#D6D3D3",
        color:"black"
      }
    ],
  //  冰量 选择
    ices:[
      {
        name:"正常冰",
        bgNol:"#fff",
        colNol:"black",
        id:0
      },
      {
        name:"少冰",
        bgNol: "#fff",
        colNol: "black",
        id:1
      },
      {
        name:"去冰",
        bgNol: "#fff",
        colNol: "black",
        id:2
      }
    ],
    bgHot:"#fff",
    colHot: "#000",
    bgCold:"#000",
    colCold:"#fff",
    points:false,
    choises:false,
    sugarId: 0, // 糖类选择
    sugarWeight: '',// 糖分 
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
    
    cupMenu:true,
    sub:true,
    payOrder:true
  },
  cupShow:function(){
    var cup = !this.data.cupMenu;
    this.setData({
      cupMenu:cup
    })
  },
  check:function(e){
    if (this.data.payOrder == false){
      var sub = true;
    }else{
      var sub = false;
    }
    this.data.cupMenu = true;
    this.setData({
      sub:sub,
      cupMenu: this.data.cupMenu
    })
  },
  sureOrder:function(){
    var payOrder =!this.data.payOrder;
    this.data.sub =true;
    this.setData({
      payOrder:payOrder,
      sub: this.data.sub
    })
  },
  closeSub:function(){
    this.data.sub =true;
    this.setData({
      sub: this.data.sub
    })
  },
  closePay:function(){
    this.data.payOrder = true;
    this.setData({
      payOrder:this.data.payOrder
    })
  },
  iceBtn:function(e){
    var that =this;
    var iceId = e.currentTarget.dataset.id;
    if (iceId == 0) {
      that.data.ices[0].bgNol = "#000";
      that.data.ices[0].colNol = "#fff";
      that.data.ices[1].bgNol = "#fff";
      that.data.ices[1].colNol = "#000";
      that.data.ices[2].bgNol = "#fff";
      that.data.ices[2].colNol = "#000";
      console.log(0);
    } else if (iceId == 1) {
      that.data.ices[1].bgNol = "#000";
      that.data.ices[1].colNol = "#fff";
      that.data.ices[0].bgNol = "#fff";
      that.data.ices[0].colNol = "#000";
      that.data.ices[2].bgNol = "#fff";
      that.data.ices[2].colNol = "#000";
      console.log(1);
    } else {
      that.data.ices[2].bgNol = "#000";
      that.data.ices[2].colNol = "#fff";
      that.data.ices[0].bgNol = "#fff";
      that.data.ices[0].colNol = "#000";
      that.data.ices[1].bgNol = "#fff";
      that.data.ices[1].colNol = "#000";
      console.log(2);
    }
    this.setData({
      ices:that.data.ices
    })
  },

  hotBtn:function(e){
    var that = this;
    that.data.bgHot="#000";
    that.data.colHot="#fff";
    that.data.bgCold="#fff";
    that.data.colCold="#000";
    that.data.points = true;
    that.data.choises = true;
    this.setData({
      bgHot: that.data.bgHot,
      colHot: that.data.colHot,
      bgCold: that.data.bgCold,
      colCold: that.data.colCold,
      points: that.data.points,
      choises:that.data.choises
    })
  },
  coldBtn:function(e){
    var that = this;
    that.data.bgHot = "#fff";
    that.data.colHot = "#000";
    that.data.bgCold = "#000";
    that.data.colCold = "#fff";
    that.data.points = false;
    that.data.choises = false;
    this.setData({
      bgHot: that.data.bgHot,
      colHot: that.data.colHot,
      bgCold: that.data.bgCold,
      colCold: that.data.colCold,
      points: that.data.points,
      choises: that.data.choises
    })
  },
  // 多选
  sel:function(e){
    var that = this;
    var setId = e.currentTarget.dataset.id;
    for(var i = 0; i<that.data.selects.length;i++){
      if ( setId == 0 ){
        that.data.selects[0].bg="#000";
        that.data.selects[0].color="#fff";
        that.data.selects[1].bg = "#D6D3D3";
        that.data.selects[1].color = "#000";
        that.data.selects[2].bg = "#D6D3D3";
        that.data.selects[2].color = "#000";
      } else if (setId == 1){
        that.data.selects[1].bg = "#000";
        that.data.selects[1].color = "#fff";
        that.data.selects[0].bg = "#D6D3D3";
        that.data.selects[0].color = "#000";
        that.data.selects[2].bg = "#D6D3D3";
        that.data.selects[2].color = "#000";
      }else{
        that.data.selects[2].bg = "#000";
        that.data.selects[2].color = "#fff";
        that.data.selects[0].bg = "#D6D3D3";
        that.data.selects[0].color = "#000";
        that.data.selects[1].bg = "#D6D3D3";
        that.data.selects[1].color = "#000";
      }
    };
    this.setData({
      selects:that.data.selects
    })
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
        data[tab][i]['num'] = 1;
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
        var result = res.data.products;

        var baseGoods = [that.data.defaultItem],
          firstOption = [that.data.defaultItem],
          secondGoods = [that.data.defaultItem],
          fifthGoods = [that.data.defaultItem],
          otherGoods = [that.data.defaultItem],
          secondOption = [],
          thirdGoods = [],
          fourthGoods = [];

        for (var i in result) {
          var volume = result[i]['volume'];
          var items = result[i]['items'];

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
              item['processData'] = that.data.processData; // 糖类分量
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
        console.log(thirdGoods);
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

  // 选中二级可选 多选
  selectSecond: function(e) {
    var that = this;
    var pk = e.currentTarget.dataset.id;
    var secondData = that.data.secondOption;
    var carts = that.data.carts;

    for (var i = 0, j = secondData.length; i < j; i++) {
      if (secondData[i].pk == pk) {
        
        if (secondData[i]['selected'] == 'selected') {
          secondData[i]['selected'] = '';
          
          // 从购物车删除
          for (var j = 0, l = carts['secondData'].length; j < l; j++) {
            if (carts['secondData'][j].pk == pk) {
              carts['secondData'].splice(j, 1);
            }
          }

        } else {
          secondData[i]['selected'] = 'selected';
          
          // 加入购物车
          if ('secondData' in carts) {
            carts['secondData'].push(secondData[i]);
          } else {
            carts['secondData'] = [secondData[i]];
          }
        }
      }
    }
    that.calculate(); // 计算购物车

    that.setData({
      carts: carts,
      secondOption: secondData
    })
  },
  // 选中四级品类 多选
  selectFourth: function (e) {
    var that = this;
    var pk = e.currentTarget.dataset.id;
    var fourthGoods = that.data.fourthGoods;
    var carts = that.data.carts;

    for (var i = 0, j = fourthGoods.length; i < j; i++) {
      if (fourthGoods[i].pk == pk) {

        if (fourthGoods[i]['selected'] == 'selected') {
          fourthGoods[i]['selected'] = '';

          // 从购物车删除
          for (var j = 0, l = carts['fourthGoods'].length; j < l; j++) {
            if (carts['fourthGoods'][j].pk == pk) {
              carts['fourthGoods'].splice(j, 1);
            }
          }

        } else {
          fourthGoods[i]['selected'] = 'selected';

          // 加入购物车
          if ('fourthGoods' in carts) {
            carts['fourthGoods'].push(fourthGoods[i]);
          } else {
            carts['fourthGoods'] = [fourthGoods[i]];
          }
        }
      }
    }
    that.calculate(); // 计算购物车

    that.setData({
      carts: carts,
      fourthGoods: fourthGoods
    })
  },

  // 糖类选择
  chooseSugar:function(e){
    var that = this;
    var thirdGoods = that.data.thirdGoods;
    var pk = e.currentTarget.dataset.id;

    for (var item of thirdGoods) {

      if (item['pk'] == pk) {
        item['bgProcess'] = '#000';
        
      } else {
        item['bgProcess'] = '#666';
      }
    }

    that.setData({
      sugarId: pk,
      thirdGoods: thirdGoods
    }); 
  },

  // 糖分选择
  chooseWeight: function(e) {
    var that = this;
    var thirdGoods = that.data.thirdGoods;
    var pk = e.currentTarget.dataset.id;
    var weight = e.currentTarget.dataset.weight;

    for (var i = 0, l = thirdGoods.length; i < l; i++) {
      //for (var item of thirdGoods) {
      console.log(thirdGoods[i]);
      if (thirdGoods[i]['pk'] == pk) {
        for (var j = 0; j < thirdGoods[i]['processData'].length; j++) {

        //for (var weight of item['processData']) {
          //console.log(item['processData'][j]);
          console.log(thirdGoods[i]['processData'][j]);
          if (thirdGoods[i]['processData'][j]['name'] == weight) {
            thirdGoods[i]['processData'][j]['start'] = '#000';
            thirdGoods[i]['processData'][j]['end'] = '#000';
            thirdGoods[i]['processData'][j]['icon'] = '/images/process2.png';
          }
        }
      }
    }
    console.log(thirdGoods);
    
    that.setData({
      sugarWeight: weight,
      thirdGoods: thirdGoods
    }); 

    return;

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
        processArr[i].start = "#000"
        processArr[i].end = "#000"
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

  floatAdd: function (arg1, arg2){
    var r1, r2, m;
    try{ 
      r1=arg1.toString().split(".")[1].length 
    }catch(e) { r1 = 0 }
    try{ 
      r2=arg2.toString().split(".")[1].length 
    }catch(e) { r2 = 0 }
   
    m=Math.pow(10, Math.max(r1, r2))
    return(arg1*m+ arg2 * m) / m
  },
 
  // 购物车计算
  calculate: function() {
    var carts = this.data.carts,
      price = 0.00,
      volume = 0,
      calorie = 0,
      nums = 0;

    var cup = [];

    for (var k in carts) {
      // 多选
      if (Array.isArray(carts[k])) {
        for (let item of carts[k]) {
          cup.push(item);
          nums++;
        }
      } else { // 单选
        price = this.floatAdd(price, carts[k]['price']);
        volume += carts[k]['volume'];
        calorie += carts[k]['calorie'];
        nums++;

        //carts[k]['num'] = 1;
        cup.push(carts[k]);
      }
    }

    this.setData({
      cup: cup
    });

    console.log('price:' + price);
    console.log('volume:' + volume);
    console.log('calorie:' + calorie);
    console.log('nums:' + nums);
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