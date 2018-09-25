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
    baseGoodsCurrent: 0,
    firstOptionCurrent: 0,
    secondGoodsCurrent: 0,
    fifthGoodsCurrent: 0,
    otherGoodsCurrent: 0,
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
        name: '半糖',
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

    // 购物车
    cups:[
    ],
    cup: [
        {
          list: 1,
          name: "回肝普洱",
          num: 12,
          calorie: 100,
          price: 100.00
        }
      ],
    //  冰量 选择
    ices:[
      {
        name:"正常冰",
        bgColor:"#black",
        color:"#fff",
        type:'ice',
        id:1
      },
      {
        name:"少冰",
        bgColor: "#fff",
        color: "black",
        type: 'less_ice',
        id:2
      },
      {
        name:"去冰",
        bgColor: "#fff",
        color: "black",
        type: 'none_ice',
        id:3
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
    option: 3,
    iceFlase:false,
    cold:false,
    hot: true,
    bgProcess:"#666",
    bgScon:"#666",
    bgThird:"#666",
    cupMenu:true,
    sub:true,
    payOrder:true,
    totalPrice: 0.00,
    totalNum: 0,
    totalCup: 0,
    totalCalorie: 0,
    totalVolume: 0,
    todos: 20, //排队杯数
    temperature: '', //温度选择
    baseItem: {}, // 第一品类选择
    doubleId: 0, // 一级品类双倍
    currentCup: 0, // 当前杯
    cupGroup: [],
    cartGroup: [], // 购物车
  },

  // 去买单
  checkOrder:function(e){
    if (this.data.totalVolume > 500) {
      wx.showModal({
        content: '容量已超出500ml,请重新搭配',
        showCancel: false,
        confirmText: '重新搭配',
      });
      return false;
    } 

    // 检测必选
    if (false) {

    }

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
  // 确认订单
  sureOrder:function(){
    var that = this;
    var payOrder = !that.data.payOrder;
    this.data.sub =true;
    var carts = that.data.carts;
    var cartList = {
      'price': '0',
      'temperature': '', // 温度选择
      'sugar': '', // 糖类选择
      'weight': '',  // 糖分分量
      'double': '', // 一级品类双倍 的id
      'list': [], // 选中
    };

    cartList.sugar = that.data.sugarId;
    cartList.weight = that.data.sugarWeight;
    cartList.temperature = that.data.temperature;
    cartList.double = that.data.doubleId;

    for (var k in carts) {
      // 多选
      if (Array.isArray(carts[k])) {
        for (let item of carts[k]) {
          cartList.list.push(item['pk']);
        }
      } else { 
        // 单选
        if (JSON.stringify(carts[k]) != "{}") {
          cartList.list.push(carts[k]['pk']);
        }
      }
    }

    console.log(cartList);

   // let array = [];
   // array.push(cartList);

    // 创建订单
    app.sendRequest({
      url: 'order/create',
      data: cartList,
      mehtod: 'post',
      success: function (res) {
        console.log(res);

        that.setData({
          payOrder: payOrder,
          sub: that.data.sub
        })
      }
    });

    
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
  // 冷选择
  iceBtn:function(e){
    var that =this;
    var iceId = e.currentTarget.dataset.id;
    var ices = that.data.ices;
    var temperature = 'hot';
    var current = that.data.currentCup;
    var cartGroup = that.data.cartGroup;


    for (var item of ices) {
      if (item['id'] == iceId) {
        item['bgColor'] = '#000';
        item['color'] = '#fff';
        temperature = item['type'];
      } else {
        item['bgColor'] = '#fff';
        item['color'] = '#000';
      }
    }

    // 设置冷选择
    cartGroup[current]['temperature'] = temperature;
    cartGroup[current]['ices'] = ices;
   
    this.setData({
      ices: ices,
      temperature: temperature,
      cartGroup: cartGroup
    })
  },
  // 冷热选择
  chooseTemp: function(e) {
    var that = this;
    var cold = e.currentTarget.dataset.type == 'cold';
    var current = that.data.currentCup;
    var cartGroup = that.data.cartGroup;

    // 设置当前杯的属性
    cartGroup[current]['temperature'] = cold ? 'ice' : 'hot';
    cartGroup[current]['bgHot'] = cold ? '#fff' : '#000';
    cartGroup[current]['colHot'] = cold ? '#000' : '#fff';
    cartGroup[current]['bgCold'] = cold ? '#000' : '#fff';
    cartGroup[current]['colCold'] = cold ? '#fff' : '#000';
    cartGroup[current]['points'] = ! cold;
    cartGroup[current]['choises'] = ! cold;

    this.setData({
      bgHot: cold ? '#fff' : '#000',
      colHot: cold ? '#000' : '#fff',
      bgCold: cold ? '#000' : '#fff',
      colCold: cold ? '#fff' : '#000',
      points: ! cold,
      choises: ! cold,
      temperature: cold ? 'ice' : 'hot',
      cartGroup: cartGroup
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
    //var currentKey = 'currents.' + tab;
    var current = e.detail.current;
    var data = that.data;
    var hasBaseGoods = that.hasBaseGoods();

    var currentKey = tab + 'Current';

    for (var i = 0, j = data[tab].length; i < j; i++) {
      
      // 当前选中的item
      if (current == i) {
        data[tab][i]['num'] = 1;

        if (data[tab][i]['pk'] == 0) {
          data.carts[tab] = {};
          
        } else {

          data.carts[tab] = data[tab][i]; 

          // 选择一级品类时，保存当前
          if (tab == 'baseGoods') {
            that.data.secondGoods.pop();
            that.data.secondGoods.push({
              name: '一级品类双倍',
              price: data[tab][i].price,
              image: 'https://www.layui.com/admin/std/dist/layuiadmin/style/res/template/portrait.png',
              volume: 250,
              calorie: data[tab][i].calorie,
              pk: -1
            });

            that.setData({
              baseItem: data[tab][i],
              secondGoods: that.data.secondGoods
            });

            // 如果已经选了双倍，需要同时更新
            if (that.data.doubleId) {
              data.carts['baseGoods'].num = 2;
            } else {
              if (hasBaseGoods) {
                data.carts['baseGoods'].num = 1;
              }
            }
          }

          // 只选择 一级品类双倍时，不计算
          if (tab == 'secondGoods' ) {
            if (data[tab][i]['pk'] == -1) {
              data.carts[tab] = {};
            }
          }
        }

        // 第一品类未选中，如果已经选中双倍的，需要清除
        if (tab == 'baseGoods' && that.data.doubleId) {
          data.carts['secondGoods'] = {};
        }
      }
    }

    // 选中一级品类双倍时
    if (tab == 'secondGoods') {
      if (current == data[tab].length - 1) {

        if (hasBaseGoods) {
          data.carts['baseGoods'].num = 2;
          data.carts['secondGoods'] = {};
        } 

        that.setData({
          doubleId: that.data.baseItem['pk']
        })
      } else {
        if (hasBaseGoods) {
          data.carts['baseGoods'].num = 1;
        }

        that.setData({
          doubleId: 0
        })
      }
    }

    console.log(data.carts);
    console.log('406:' + that.data.currentCup);

    data.cartGroup[that.data.currentCup] = data.carts;
    data[currentKey] = current;

    data[tab] = data[tab];

    //data['baseGoodsCurrent'] = that.data.baseGoodsCurrent

    that.setData(data);

    console.log('436:' + current);

    that.calculate(); // 购物车计算
  },

  // 是否有茶底商品
  hasBaseGoods: function() {
    var carts = this.data.carts;
    
    for (var key in carts) {
      if (key == 'baseGoods' && JSON.stringify(carts[key] != "{}")) {
        return true;
      }
    }

    return false;
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

        // 一级品类双倍
        secondGoods.push({
          name: '一级品类双倍',
          price: '0.00',
          image: 'https://www.layui.com/admin/std/dist/layuiadmin/style/res/template/portrait.png',
          volume: 250,
          calorie: 0,
          pk: 999
        });

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
    //var carts = that.data.carts;
    var current = that.data.currentCup;
    var cartGroup = that.data.cartGroup;
    var carts = cartGroup[current];

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

    cartGroup[current] = carts;

    that.calculate(); // 计算购物车

    that.setData({
      carts: carts,
      cartGroup: cartGroup,
      secondOption: secondData
    })
  },
  // 选中四级品类 多选
  selectFourth: function (e) {
    var that = this;
    var pk = e.currentTarget.dataset.id;
    var fourthGoods = that.data.fourthGoods;
    var carts = that.data.carts;
    var current = that.data.currentCup;
    var cartGroup = that.data.cartGroup;
    var carts = cartGroup[current];

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

    cartGroup[current] = carts;

    that.calculate(); // 计算购物车

    that.setData({
      carts: carts,
      fourthGoods: fourthGoods,
      cartGroup: cartGroup
    })
  },

  // 糖类选择
  chooseSugar:function(e){
    var that = this;
    var thirdGoods = that.data.thirdGoods;
    var pk = e.currentTarget.dataset.id;
    var sugarId = that.data.sugarId;
    var init = that.data.processData[0];
    var current = that.data.currentCup;
    var cartGroup = that.data.cartGroup;
    var cart = cartGroup[current];

    for (var item of thirdGoods) {

      if (item['pk'] == pk) {
        item['bgProcess'] = '#000';
        item['processData'] = that.data.processData;
      } else {
        item['bgProcess'] = '#666';
        item['processData'] = that.data.processData;
      }
    }

    cartGroup[current]['sugarId'] = pk;
    cartGroup[current]['sugarWeight'] = '无糖';

    that.setData({
      sugarId: pk,
      sugarWeight: '无糖',
      thirdGoods: thirdGoods,
      cartGroup: cartGroup,
    }); 
  },

  // 糖分选择
  chooseWeight: function(e) {
    var that = this;
    var thirdGoods = that.data.thirdGoods;
    var pk = e.currentTarget.dataset.id;
    var weight = e.currentTarget.dataset.weight;
    var selected = true;  // 选中
    var current = that.data.currentCup;
    var cartGroup = that.data.cartGroup;
    var cart = cartGroup[current];

    thirdGoods = that.selectSugar(pk, weight);

    // for (var i = 0, l = thirdGoods.length; i < l; i++) {
    //     let parent = [];
    //     for (var j = 0; j < thirdGoods[i]['processData'].length; j++) {
    //       let item = {};

    //       if (thirdGoods[i]['pk'] == pk ) {

    //         if (true == selected) {
    //           item.name = thirdGoods[i]['processData'][j]['name'];
    //           item.start = j == 0 ? '#fff' : '#000'; // 第一个
    //           item.end = j == 4 ? '#fff' :'#000';    // 最后一个
    //           item.icon = '/images/process2.png';
    //         } else {
    //           item.name = thirdGoods[i]['processData'][j]['name'];
    //           item.start = j == 0 ? '#fff' : '#aaa';
    //           item.end = j == 4 ? '#fff' : '#aaa';
    //           item.icon = '/images/process1.png';
    //         }

    //         if (thirdGoods[i]['processData'][j]['name'] == weight) {
    //           selected = false;
    //           item.end = '#aaa'; // 选中的最后一个 颜色设置
    //         }
    //       } else { // 非当前 糖类的，保持原样
    //         item.name = thirdGoods[i]['processData'][j]['name'];
    //         item.start = j == 0 ? '#fff' : '#aaa';
    //         item.end = j == 4 ? '#fff' :'#aaa';
    //         item.icon = '/images/process1.png';
    //       }
    //       parent.push(item);
    //     }

    //     thirdGoods[i]['processData'] = parent;
    // }

    // 选中糖类
    for (var item of thirdGoods) {

      if (item['pk'] == pk) {
        item['bgProcess'] = '#000';

      } else {
        item['bgProcess'] = '#666';
      }
    }

    cartGroup[current]['sugarId'] = pk;
    cartGroup[current]['sugarWeight'] = weight;

    that.setData({
      sugarId: pk,
      sugarWeight: weight,
      thirdGoods: thirdGoods,
      cartGroup: cartGroup
    }); 
  },

 // 浮点数相加
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

    // 取当前杯
    console.log('currentCup' + this.data.currentCup);
    carts = this.data.cartGroup[this.data.currentCup];
    console.log('716');
    console.log( carts);

    var cup = [];

    for (var k in carts) {
      // 多选
      if (Array.isArray(carts[k])) {
        for (let item of carts[k]) {
          item['num'] = 1;
          cup.push(item);
          nums++;

          price = (price * 100 + item['price'] * 100) / 100;
          //price = this.floatAdd(price, item['price']);
          volume += item['volume'];
          calorie += item['calorie'];
        }
      } else { // 单选
        if (JSON.stringify(carts[k]) != "{}") {
          price = (price * 100 + carts[k]['price'] * 100 * carts[k]['num']) / 100;
          //price = this.floatAdd(price, carts[k]['price'] * carts[k]['num']);
          volume += carts[k]['volume'];
          calorie += carts[k]['calorie'];
          nums++;

          //carts[k]['num'] = 1;
          cup.push(carts[k]);
        } 
      }
    }

    let cupGroup = this.data.cupGroup;
    cupGroup[this.data.currentCup] = cup;
    
    console.log('756:' + this.data.currentCup);
    
    this.setData({
      cup: cup,
      cupGroup: cupGroup,
      totalPrice: price,
      totalNum: nums,
      totalCalorie: calorie,
      totalVolume: volume,
      totalCup: 1
    });

    console.log('price:' + price);
    console.log('volume:' + volume);
    console.log('calorie:' + calorie);
    console.log('nums:' + nums);
  },
  // 糖类选中 - 循环遍历
  selectSugar: function (pk, weight) {
    var thirdGoods = this.data.thirdGoods;
    var selected = true;

    for (var i = 0, l = thirdGoods.length; i < l; i++) {
      let parent = [];
      for (var j = 0; j < thirdGoods[i]['processData'].length; j++) {
        let item = {};

        if (thirdGoods[i]['pk'] == pk) {

          if (true == selected) {
            item.name = thirdGoods[i]['processData'][j]['name'];
            item.start = j == 0 ? '#fff' : '#000'; // 第一个
            item.end = j == 4 ? '#fff' : '#000';    // 最后一个
            item.icon = '/images/process2.png';
          } else {
            item.name = thirdGoods[i]['processData'][j]['name'];
            item.start = j == 0 ? '#fff' : '#aaa';
            item.end = j == 4 ? '#fff' : '#aaa';
            item.icon = '/images/process1.png';
          }

          if (thirdGoods[i]['processData'][j]['name'] == weight) {
            selected = false;
            item.end = j == 4 ? '#fff' : '#aaa'; // 选中的最后一个 颜色设置
          }
        } else { // 非当前 糖类的，保持原样
          item.name = thirdGoods[i]['processData'][j]['name'];
          item.start = j == 0 ? '#fff' : '#aaa';
          item.end = j == 4 ? '#fff' : '#aaa';
          item.icon = '/images/process1.png';
        }
        parent.push(item);
      }

      thirdGoods[i]['processData'] = parent;
    }

    return thirdGoods;
  },

  // 切换杯
  changeCup: function (e) {
    var that = this;
    var current = e.detail.current; // 当前索引，第一个0 
    var currentCup = that.data.currentCup;
    var carts = that.data.cartGroup[currentCup];

    // 存储上一个选中的多选
    let secondSelected = []; // 2级多选 选中
    let fourthSelected = []; // 4级多选 选中

    if ('secondData' in carts) {
      for (var i = 0, len = carts['secondData'].length; i < len; i++) {
        secondSelected.push(carts['secondData'][i]['pk']);
      }
    }

    if ('fourthGoods' in carts) {
      for (var i = 0, len = carts['fourthGoods'].length; i < len; i++) {
        fourthSelected.push(carts['fourthGoods'][i]['pk']);
      }
    }

    // 存储上一个选中的状态
    wx.setStorage({
      key: 'cup-' + currentCup,
      data: {
        baseGoodsCurrent: that.data.baseGoodsCurrent,
        firstOptionCurrent: that.data.firstOptionCurrent,
        secondGoodsCurrent: that.data.secondGoodsCurrent,
        fifthGoodsCurrent: that.data.fifthGoodsCurrent,
        otherGoodsCurrent: that.data.otherGoodsCurrent,
        secondSelected: secondSelected,
        fourthSelected: fourthSelected,
      }
    });

    var secondOption = that.data.secondOption;
    var fourthGoods = that.data.fourthGoods;
   
    // 界面恢复选中状态
    var selected = wx.getStorage({
      key: 'cup-' + current,
      success: function (res) {
        var secondData = res.data.secondSelected;
        var fourthData = res.data.fourthSelected;
        console.log('secondData');
        console.log(secondData);
        console.log('fourthData');
        console.log(fourthData);
        for (var i = 0, len = secondOption.length; i < len; i++) {
          secondOption[i]['selected'] = '';
          for (var j = 0; j < secondData.length; j++) {
            if (secondOption[i]['pk'] == secondData[j]) {
              secondOption[i]['selected'] = 'selected';
            }
          }
        }
        console.log('secondOption');
        console.log(secondOption);
        for (var i = 0, len = fourthGoods.length; i < len; i++) {
          fourthGoods[i]['selected'] = '';
          for (var j = 0; j < fourthData.length; j++) {
            if (fourthGoods[i]['pk'] == fourthData[j]) {
              fourthGoods[i]['selected'] = 'selected';
            }
          }
        }
        console.log('fourthGoods:');
        console.log(fourthGoods);
        that.setData({
          baseGoodsCurrent: res.data.baseGoodsCurrent,
          firstOptionCurrent: res.data.firstOptionCurrent,
          secondGoodsCurrent: res.data.secondGoodsCurrent,
          fifthGoodsCurrent: res.data.fifthGoodsCurrent,
          otherGoodsCurrent: res.data.otherGoodsCurrent,
          secondOption: secondOption,
          fourthGoods: fourthGoods
        });
      },
    })

    var sugarId = 0;
    var sugarWeight = '';
    var cart = that.data.cartGroup[current]; // 切换后的杯子
    
    // 糖类选择
    if ('sugarId' in cart) {
      sugarId = cart['sugarId'];
    }

    if ('sugarWeight' in cart) {
      sugarWeight = cart['sugarWeight'];
    }

    var thirdGoods = that.selectSugar(sugarId, sugarWeight);

    // 选中糖类
    for (var item of thirdGoods) {

      if (item['pk'] == sugarId) {
        item['bgProcess'] = '#000';

      } else {
        item['bgProcess'] = '#666';
      }
    }

    // 保存上一个页面糖类选择
    var cartGroup = that.data.cupGroup;
    cartGroup[currentCup]['sugarId'] = that.data.sugarId;
    cartGroup[currentCup]['sugarWeight'] = that.data.weight;


    // 设置当前的温度选择

    // 保存上一温度选择
    var cold = that.data.temperature == 'ice';
    var ices = that.data.ices;

    // 冷热选择
    cartGroup[currentCup]['temperature'] = cold ? 'ice' : 'hot';
    cartGroup[currentCup]['bgHot'] = cold ? '#fff' : '#000';
    cartGroup[currentCup]['colHot'] = cold ? '#000' : '#fff';
    cartGroup[currentCup]['bgCold'] = cold ? '#000' : '#fff';
    cartGroup[currentCup]['colCold'] = cold ? '#fff' : '#000';
    cartGroup[currentCup]['points'] = !cold;
    cartGroup[currentCup]['choises'] = !cold;

    for (var item of ices) {
      if (item['id'] == iceId) {
        item['bgColor'] = '#000';
        item['color'] = '#fff';
        temperature = item['type'];
      } else {
        item['bgColor'] = '#fff';
        item['color'] = '#000';
      }
    }

    that.setData({
      carts: that.data.cartGroup[current],  // 购物车
      currentCup: parseInt(current),        // 当前杯
      cupGroup: cartGroup,

    });

    // 计算当前杯配方
    that.calculate();
  },
  cupShow: function () {
    var cup = !this.data.cupMenu;
    this.setData({
      cupMenu: cup
    })
  },
  // 增加一杯
  addCup: function(e) {
    let current = this.data.cupGroup.length;

    if (current>= 5) {
      app.showModal({
        content: '超过5杯，请分开下单',
        showCancel: false,
        confirmText: '确定',
      })
      return false;
    }

    let cupGroup = this.data.cupGroup;
    let cartGroup = this.data.cartGroup;
    let currentCup = this.data.currentCup;
    let cart = this.data.cartGroup[currentCup];
    let secondSelected = []; // 2级多选 选中
    let fourthSelected = []; // 4级多选 选中

    if ('secondData' in cart) {
      for (var i = 0, len = cart['secondData'].length; i < len; i++) {
        secondSelected.push(cart['secondData'][i]['pk']);
      }
    }

    if ('fourthGoods' in cart) {
      for (var i = 0, len = cart['fourthGoods'].length; i < len; i++) {
        fourthSelected.push(cart['fourthGoods'][i]['pk']);
      }
    }

    var secondOption = this.data.secondOption;
    var fourthGoods = this.data.fourthGoods;

    for (var i = 0, len = secondOption.length; i < len; i++) {
      secondOption[i]['selected'] = '';
    }

    for (var i = 0, len = fourthGoods.length; i < len; i++) {
      fourthGoods[i]['selected'] = '';
    }

    cartGroup[current] = {}; // 初始化购物车

    cupGroup[current] = {}; // 每杯配料

    // 存储上一个选中的状态
    wx.setStorage({
      key: 'cup-' + currentCup, 
      data: {
        baseGoodsCurrent: this.data.baseGoodsCurrent,
        firstOptionCurrent: this.data.firstOptionCurrent,
        secondGoodsCurrent: this.data.secondGoodsCurrent,
        fifthGoodsCurrent: this.data.fifthGoodsCurrent,
        otherGoodsCurrent: this.data.otherGoodsCurrent,
        secondSelected: secondSelected,
        fourthSelected: fourthSelected,
      }
    });

    // 初始化糖类
    //var thirdGoods = this.data.thirdGoods;
    var thirdGoods = this.selectSugar(0, '');

    this.setData({
      carts: {},
      currentCup: current,
      cupGroup: cupGroup,
      cartGroup: cartGroup,
      baseGoodsCurrent: 0,
      firstOptionCurrent: 0,
      secondGoodsCurrent: 0,
      fifthGoodsCurrent: 0,
      otherGoodsCurrent: 0,
      secondOption: secondOption,
      fourthGoods: fourthGoods,
      thirdGoods: thirdGoods,
      bgHot: "#fff",
      colHot: "#000",
      bgCold: "#000",
      colCold: "#fff",
      points: false,
      choises: false
    });
  },
  // 减去一杯
  subCup: function(e) {

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