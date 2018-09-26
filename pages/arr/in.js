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
    iceId: 1, // 冷的第一个选择
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
    temperature: 'ice', //温度选择
    baseItem: {}, // 第一品类选择
    doubleId: 0, // 一级品类双倍
    currentCup: 0, // 当前杯
    cupGroup: [],
    cartGroup: [], // 购物车
    citrusCategory: [], // 柑橘类
    milkCategory: [],
    citrusHide: [], // 二级 柑橘类隐藏
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
    var temperature = 'ice';
    var current = that.data.currentCup;
    var cartGroup = that.data.cartGroup;

    for (var item of ices) {
      if (item['id'] == iceId) {
        item['bgColor'] = '#000';
        item['color'] = '#fff';
        temperature = item['type'];
        cartGroup[current]['temperData'] = { name: item['name'], num: 1, price: 0, calorie: 0, volume: 0, temperature: item['type'], iceId: iceId};
      } else {
        item['bgColor'] = '#fff';
        item['color'] = '#000';
      }
    }
    
    cartGroup[current]['temperData']['bgHot'] = '#fff';
    cartGroup[current]['temperData']['colHot'] = '#000';
    cartGroup[current]['temperData']['bgCold'] = '#000';
    cartGroup[current]['temperData']['colCold'] = '#fff';
    cartGroup[current]['temperData']['points'] = false;
    cartGroup[current]['temperData']['choises'] = false;

    // 设置冷选择
    // cartGroup[current]['temperature'] = temperature;
    // cartGroup[current]['ices'] = ices;
    // cartGroup[current]['iceId'] = iceId;

    console.log(cartGroup[current]['temperData']);
    
   
    this.setData({
      iceId: iceId,
      ices: ices,
      temperature: temperature,
      cartGroup: cartGroup
    });

    this.calculate();
  },
  // 冷热选择
  chooseTemp: function(e) {
    var that = this;
    var cold = e.currentTarget.dataset.type == 'cold';
    var current = that.data.currentCup;
    var cartGroup = that.data.cartGroup;

    if (! cold) {
      cartGroup[current]['temperData'] = {
        name: '热饮',
        num: 1,
        price: 0,
        calorie: 0,
        volume: 0
      }
    }

    // 设置当前杯的属性
    cartGroup[current]['temperData']['temperature'] = cold ? 'ice' : 'hot';
    cartGroup[current]['temperData']['bgHot'] = cold ? '#fff' : '#000';
    cartGroup[current]['temperData']['colHot'] = cold ? '#000' : '#fff';
    cartGroup[current]['temperData']['bgCold'] = cold ? '#000' : '#fff';
    cartGroup[current]['temperData']['colCold'] = cold ? '#fff' : '#000';
    cartGroup[current]['temperData']['points'] = ! cold;
    cartGroup[current]['temperData']['choises'] = ! cold;

    this.setData({
      bgHot: cold ? '#fff' : '#000',
      colHot: cold ? '#000' : '#fff',
      bgCold: cold ? '#000' : '#fff',
      colCold: cold ? '#fff' : '#000',
      points: ! cold,
      choises: ! cold,
      temperature: cold ? 'ice' : 'hot',
      cartGroup: cartGroup
    });

    this.calculate();
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
    var milkCategory = that.data.milkCategory;

    //console.log('hasBaseGoods:' + hasBaseGoods);
    // if (tab == 'secondGoods' && false == hasBaseGoods) {
    //   app.showModal({
    //     content: '一级品类必选',
    //     showCancel: false,
    //     confirmText: '确定',
    //   });
    //   that.setData({
    //     secondGoodsCurrent:0,
    //   });
    //   return false;
    // }

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
              image: data[tab][i].image,
              volume: 250,
              calorie: data[tab][i].calorie,
              pk: -1,
              show: true
            });

            // 选择奶制品类时，排斥柑橘类
            if (-1 != milkCategory.indexOf(data[tab][i]['pk'])) {
              that.toggleCitrus();
            } else {
              that.toggleCitrus('show');
            }

            that.setData({
              baseItem: data[tab][i],
              secondGoods: that.data.secondGoods,
              secondGoodsCurrent:0
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

          // 一级可选
          if (tab == 'firstOption') {
            // 选择奶制品类时，排斥柑橘类
            if (-1 != milkCategory.indexOf(data[tab][i]['pk'])) {
              that.toggleCitrus();
            } else {
              that.toggleCitrus('show');
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

    // 默认选择正常冰
    if ('temperData' in data.carts) {

    } else {
      data.carts['temperData'] = { name: '正常冰', num: 1, price: 0, calorie: 0, volume: 0 };
    }

    data.cartGroup[that.data.currentCup] = data.carts;
    data[currentKey] = current;

    data[tab] = data[tab];

    //data['baseGoodsCurrent'] = that.data.baseGoodsCurrent

    that.setData(data);

    that.calculate(); // 购物车计算
  },
   // 隐藏柑橘类
  toggleCitrus: function(action = 'hide') {
    var secondData = this.data.secondGoods;
    var citrusCategory = this.data.citrusCategory;
    
    for (var i = 0, len = secondData.length; i < len; i++) {
      //console.log(secondData[i]);
      var pk = secondData[i]['pk'];

      if (action == 'hide') {
        if (-1 != citrusCategory.indexOf(pk)) {
          //secondData[i]['show'] = false;
          //delete secondData[i];
          //this.data.citrusHide.push(secondData[i]);

          secondData.splice(i, 1);
        }
      }     
    }
    if (action != 'hide') {
     // secondData.splice(7, 1, this.data.citrusHide)
    }
    
    //console.log(secondData);

    this.setData({
      secondGoods: secondData,
      citrusHide: this.data.citrusHide
    });
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
        // var citrusCategory = res.data.citrus;
        // var milkCategory = res.data.milk;
        var defaultItem = res.data.defaultItem;

        var baseGoods = [defaultItem],
          firstOption = [defaultItem],
          secondGoods = [defaultItem],
          fifthGoods = [defaultItem],
          otherGoods = [defaultItem],
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
              item['show'] = true; // 默认显示
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
        secondGoods.push(res.data.doubleItem);

        that.setData({
          baseGoods: baseGoods,
          firstOption: firstOption,
          secondGoods: secondGoods,
          secondOption: secondOption,
          thirdGoods: thirdGoods,
          fourthGoods: fourthGoods,
          fifthGoods: fifthGoods,
          otherGoods: otherGoods,
          citrusCategory: res.data.citrus, // 柑橘类
          milkCategory: res.data.milk // 牛奶类
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
      if (secondData[i]['pk'] == pk) {
        
        if (secondData[i]['selected'] == 'selected') {
          secondData[i]['selected'] = '';

          // 从购物车删除
          for (var j = 0, l = carts['secondData'].length; j < l; j++) {
            if (carts['secondData'][j]['pk'] == pk) {
              carts['secondData'].splice(j, 1);
              break;
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
      if (fourthGoods[i]['pk'] == pk) {

        if (fourthGoods[i]['selected'] == 'selected') {
          fourthGoods[i]['selected'] = '';

          // 从购物车删除
          for (var j = 0, l = carts['fourthGoods'].length; j < l; j++) {
            if (carts['fourthGoods'][j]['pk'] == pk) {
              carts['fourthGoods'].splice(j, 1);
              break;
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

    // 默认选择无糖
    cartGroup[current]['sugarData'] = { name: item['name'] + '(' + weight + ')', num: 1, price: 0, calorie: 0, volume: 0, sugarId: pk, sugarWeight: '无糖'};


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

    // 选中糖类
    for (var item of thirdGoods) {

      if (item['pk'] == pk) {
        item['bgProcess'] = '#000';
        cartGroup[current]['sugarData'] = { name: item['name'] + '(' + weight + ')', num: 1, price: 0, calorie: 0, volume: 0,sugarId: pk, sugarWeight: weight };

      } else {
        item['bgProcess'] = '#666';
      }
    }
    
    that.setData({
      sugarId: pk,
      sugarWeight: weight,
      thirdGoods: thirdGoods,
      cartGroup: cartGroup
    });

    that.calculate();
  },
  // 购物车计算
  calculate: function() {
    var carts = this.data.carts,
      price = 0.00,
      volume = 0,
      calorie = 0,
      nums = 0;

    // 取当前杯
    carts = this.data.cartGroup[this.data.currentCup];
    console.log(carts);
    var cup = [];
    var keys = ['baseGoods', 'firstOption', 'secondGoods', 'secondData', 'fourthGoods', 'fifthGoods', 'otherGoods', 'sugarData'];
//, 'temperData'
    for (var k in carts) {
      if (-1 == keys.indexOf(k)) {
        continue;
      }

      // 多选
      if (Array.isArray(carts[k])) {
        for (let item of carts[k]) {
          item['num'] = 1;
          cup.push(item);
          nums++;

          price = this.floatFormat(price + item['price'] * 1, 2);

          volume += item['volume'];
          calorie += item['calorie'];
        }
      } else { // 单选
        if (JSON.stringify(carts[k]) != "{}") {
          price = this.floatFormat(price + carts[k]['price'] * carts[k]['num'], 2);
          volume += carts[k]['volume'];
          calorie += carts[k]['calorie'];
          nums++;

          //carts[k]['num'] = 1;
          cup.push(carts[k]);
        } 
      }
    }

    console.log(cup);

    // 把温度放在最后
    if ('temperData' in carts) {
      cup.push(carts['temperData']);
    } else {
      cup.push({name: '正常冰', num: 1, price: 0, calorie: 0, volume: 0 });
    }

    console.log(cup);

    let cupGroup = this.data.cupGroup;
    cupGroup[this.data.currentCup] = cup;
    
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
    var currentCup = that.data.currentCup; // 切换前 杯
    var carts = that.data.cartGroup[currentCup]; // 切换前的杯子
    var cart = that.data.cartGroup[current];     // 切换后的杯子

    console.log(cart);
    console.log(carts);

    // 当前杯 
    if (JSON.stringify(carts) != "{}") {
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

      // 保存上一个页面糖类选择
      var cartGroup = that.data.cartGroup;

      if ('sugarData' in carts) {
        // that.setData({
        //   sugarId: carts['sugarData']['sugarId'],
        //   weight: carts['sugarData']['sugarWeight']
        // });
        // carts['sugarData']['sugarId'] = that.data.sugarId || 0;
        // carts['sugarData']['sugarWeight'] = that.data.sugarWeight || '无糖';
      }

      // 保存上一温度选择
      var ices = that.data.ices;
      var temperature = '';

      if ('temperData' in carts) {
        temperature = carts['temperData']['temperature'];
        var cold = temperature != 'hot';

        // 冷热选择
        carts['temperData']['temperature'] = cold ? 'ice' : 'hot';
        carts['temperData']['bgHot'] = cold ? '#fff' : '#000';
        carts['temperData']['colHot'] = cold ? '#000' : '#fff';
        carts['temperData']['bgCold'] = cold ? '#000' : '#fff';
        carts['temperData']['colCold'] = cold ? '#fff' : '#000';
        carts['temperData']['points'] = !cold;
        carts['temperData']['choises'] = !cold;
        carts['temperData']['iceId'] = that.data.iceId;
      }
    }

    var secondOption = that.data.secondOption;
    var fourthGoods = that.data.fourthGoods;
   
    // 界面恢复选中状态
    var selected = wx.getStorage({
      key: 'cup-' + current,
      success: function (res) {
        var secondData = res.data.secondSelected;
        var fourthData = res.data.fourthSelected;

        for (var i = 0, len = secondOption.length; i < len; i++) {
          secondOption[i]['selected'] = '';
          for (var j = 0; j < secondData.length; j++) {
            if (secondOption[i]['pk'] == secondData[j]) {
              secondOption[i]['selected'] = 'selected';
            }
          }
        }

        for (var i = 0, len = fourthGoods.length; i < len; i++) {
          fourthGoods[i]['selected'] = '';
          for (var j = 0; j < fourthData.length; j++) {
            if (fourthGoods[i]['pk'] == fourthData[j]) {
              fourthGoods[i]['selected'] = 'selected';
            }
          }
        }

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


    if ('sugarData' in cart) {
      sugarId = cart.sugarData.sugarId;
      sugarWeight = cart.sugarData.sugarWeight;
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

    that.setData({
      carts: that.data.cartGroup[current],  // 购物车
      currentCup: parseInt(current),        // 当前杯
      cartGroup: cartGroup,
      ices: ices,
      iceId: 1,
      //temperature: temperature,
      bgHot: '#fff',
      colHot: "#000",
      bgCold: "#000",
      colCold: '#fff',
      points: false,
      choises: false,
    });

    if ('temperData' in cart) {
      var iceId = cart['temperData']['iceId'] || 1;// 默认为1

      for (var item of ices) {
        if (item['id'] == iceId) {
          item['bgColor'] = '#000';
          item['color'] = '#fff';
        } else {
          item['bgColor'] = '#fff';
          item['color'] = '#000';
        }
      }

      that.setData({
        iceId: iceId,
        ices: ices,
        temperature: cart['temperData']['temperature'] || 'ice',
        bgHot: cart['temperData']['bgHot'] || '#fff',
        colHot: cart['temperData']['colHot'] || '#000',
        bgCold: cart['temperData']['bgCold'] || '#000',
        colCold: cart['temperData']['colCold'] || '#fff',
        points: cart['temperData']['points'] || false,
        choises: cart['temperData']['choises'] || false,
      });
    }
   
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
    //cartGroup[current]['temperData'] = { name: '正常冰', num: 1, price: 0, calorie: 0, volume: 0 };

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
    var ices = this.data.ices;

    for (var item of ices) {
      if (item['id'] == 1) {
        item['bgColor'] = '#000';
        item['color'] = '#fff';
      } else {
        item['bgColor'] = '#fff';
        item['color'] = '#000';
      }
    }

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
      choises: false,
      ices: ices
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
  },
  // 浮点数操作，f 表达式，digit精度
  floatFormat: function(f, digit) {
    var m = Math.pow(10, digit);
    return Math.round(f * m, 10) / m;
  }
})