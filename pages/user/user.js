// pages/my/my.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["我的口味库", "购买历史记录", "优惠券"],
    currentIndex: 0,//tabbar索引 
    currentTaste: '暂无首推配方，请在口味库中设置',
    formulaId: 0,
    con: [],
    record: [],
    coupon: [],
    title_formula: "",
    taste_name: '',
    taste_id: 0,
    mask:true,
    recommend:true,
    cart:true,
    getId:0,
    yi:true,
    tea:true,
    scrollParam: {
      taste: { page: 1, is_more: 0, total_page: 2 },
      order: { page: 1, is_more: 0, total_page: 2 },
    }
  },
  onLoad: function (e) {
    var that = this;
    wx.showShareMenu();
    app.sendRequest({
      url: 'user/index',
      data: {},
      success: function (res) {
        var data = res.data;
        that.setData({
          'currentTaste': data.title,
          'formulaId': data.formula_id
        })

        // 我的口味库
        that.getTastes();
      }
    });
  },
  closePop: function () {
    var that = this;
    that.data.recommend = true;
    that.data.mask = true;
    this.setData({
      recommend: that.data.recommend,
      mask: that.data.mask
    })
  },
  // 加载口味库
  getTastes: function (e) {
    let that = this;

    if (that.data.scrollParam.taste.page == 1 || (that.data.scrollParam.taste.page <= that.data.scrollParam.taste.total_page)) {
      app.sendRequest({
        url: 'user/tastes',
        data: { page: that.data.scrollParam.taste.page },
        success: function (res) {
          var data = res.data;
          let dataList = that.data.con;
          console.log(that.data.formulaId);
          for (var i = 0, j = data.length - 1; i <= j; i++) {
            let item = {};
            item['pk'] = data[i]['id'];
            item['img'] = '/images/me1.png';
            item['text'] = data[i]['title'];
            item['delBtn'] = true;

            if (that.data.formulaId == data[i]['id']) {
              item['btn'] = "已是首推";
              item['setTo'] = '';
              item['selected'] = 'selected';
            } else {
              item['btn'] = "设为首推";
              item['setTo'] = 'setTo';
              item['selected'] = '';
            }

            item['right'] = "0";
            item['hidImg'] = "true";
            dataList.push(item);
          }

          that.setData({
            'con': dataList,
            'scrollParam.taste.page': that.data.scrollParam.taste.page + 1,
            'scrollParam.taste.is_more': res.is_more,
            'scrollParam.taste.total_page': res.total_page
          });
        }
      });
    }
  },
  // 加载历史纪录
  getOrders: function (e) {
    let that = this;
    if (that.data.scrollParam.order.page == 1 || (that.data.scrollParam.order.page <= that.data.scrollParam.order.total_page)) {
      app.sendRequest({
        url: 'user/orders',
        data: { page: that.data.scrollParam.order.page },
        success: function (res) {
          var data = res.data;
          let dataList = that.data.record;
          for (var i = 0, j = data.length - 1; i <= j; i++) {
            let item = {};
            item['pk'] = data[i]['id'];
            item['image'] = data[i]['image'];
            item['name'] = data[i]['title'];
            item['num'] = data[i]['num'];
            item['status'] = data[i]['status'];
            item['order_sn'] = data[i]['order_sn'];
            item['time'] = data[i]['created_at'];
            item['money'] = data[i]['price'];
            item['has_taste'] = data[i]['has_taste'];
            item['selected'] = data[i]['has_taste'] ? 'selected': '';
            dataList.push(item);
          }

          that.setData({
            'record': dataList,
            'scrollParam.order.page': that.data.scrollParam.order.page + 1,
            'scrollParam.order.is_more': res.is_more,
            'scrollParam.order.total_page': res.total_page
          });
        }
      });
    }
  },
  // 优惠券
  getCoupons: function (e) {
    let that = this;

    app.sendRequest({
      url: 'user/coupons',
      data: {},
      success: function (res) {
        var data = res.data;
        let dataList = that.data.coupon;
        for (var i = 0, j = data.length - 1; i <= j; i++) {
          let item = {};
          item['time'] = data[i]['deadline'];
          item['title'] = data[i]['title'];
          dataList.push(item);
        }

        that.setData({
          'coupon': dataList,
        });
      }
    });

  },
  // 加入口味库
  joinTaste: function (e) {
    let orderId = e.currentTarget.dataset.pk;
    var that = this;

    app.sendRequest({
      url: 'user/joinTaste/' + orderId,
      data: {},
      success: function (res) {
        var data = res.data;
        if (res.code == 200) {
          //that.text = '已加入';
          let record = that.data.record;
          for (let i in record) {
            if (record[i].pk == orderId) {
              record[i].has_taste = 1;
              record[i].selected = 'selected';
            } 
          }

          that.setData({
            record: record,
          });
        }
      }
    });
  },
  // 删除口味
  deleteTaste: function (e) {
    let id = e.currentTarget.dataset.pk;
    var that = this;

    // wx.showModal({
    //   cancelText: '放弃',
    //   confirmText: '确定',
    //   content: '确定删除该口味吗',
    //   success: function (res) {
    //     if (res.confirm) {
          app.sendRequest({
            url: 'user/deleteTaste/' + id,
            data: {},
            success: function (res) {
              if (res.code == 200) {
                app.showToast({
                  title: '删除成功',
                  icon: 'success'
                });

                let tastes = that.data.con;
                for (let i in tastes) {
                  console.log(tastes[i]);
                  if (tastes[i].pk == id) {
                    tastes.remove(i);
                  }
                }

                that.setData({
                  con: tastes,
                });

                if (res.data.title) {
                  that.setData({
                    currentTaste: res.data.title,
                    formulaId: 0
                  });
                }
              }
            }
          });
    //     }
    //   }
    // });
    
  },

  navbarTab: function (e) {

    if (e.currentTarget.dataset.index == 1) {
      if (this.data.record.length == 0) {
        this.getOrders();
      }
    }

    if (e.currentTarget.dataset.index == 2) {
      if (this.data.coupon.length == 0) {
        this.getCoupons();
      }
    }

    this.setData({
      currentIndex: e.currentTarget.dataset.index
    });

  },
  closeRight: function () {
    var that = this;
    that.data.tea = true;
    that.data.mask = true;
    that.setData({
      tea: that.data.tea,
      mask: that.data.mask
    })
  },
  // 设为首推弹窗
  setTo: function (e) {
    var that = this;
    that.data.mask = false;
    that.data.recommend = false;

    var id = e.target.dataset.pk;
    var name = e.target.dataset.text;

    this.setData({
      mask: that.data.mask,
      recommend: that.data.recommend,
      taste_id: id,
      taste_name: name,
    });
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
    var index = e.currentTarget.dataset.index;

    that.data.con[index].right = 50;
    that.data.con[index].hidImg = !that.data.con[index].hidImg;
    that.data.con[index].delBtn = false;
    console.log(that.data.con[index].hidImg)
    that.setData({
      con: that.data.con,
    })
  },
  // 点击取消，列表右移
  closeBtn: function (e) {
    var that = this;
    console.log(e)
    var id = e.currentTarget.dataset.num;
    for (var i = 0; i < that.data.con.length; i++) {
      if (that.data.con[i].id == id) {
        console.log(that.data.con[i].id);
        that.data.con[i].right = 0;
        that.data.con[i].delBtn = true;
      }
    };

    that.setData({
      con: that.data.con,
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
    console.log('aaaa');
    wx.switchTab({
      url: '/pages/goods/goods'
    });
    return false;


    var that = this;
    that.data.tea = false;
    that.data.mask = false;
    this.setData({
      tea:that.data.tea,
      mask:that.data.mask
    })
  },
  // 设为首推
  sures: function (e) {
    var that = this;
    var text;

    for (var i = 0; i < that.data.con.length; i++) {
      if (that.data.con[i].pk == that.data.taste_id) {
        text = that.data.con[i].text;
        that.data.con[i].btn = "已是首推";
        that.data.con[i].setTo = "";
        that.data.con[i].selected = "";
      }
    };

    var that = this;
    let id = that.data.taste_id;// e.currentTarget.dataset.pk;

    app.sendRequest({
      url: 'user/setIndex/' + that.data.taste_id,
      data: { },
      success: function (res) {
        if (res.code == 200) {
          let dataList = that.data.con;

          for (var i = 0, j = dataList.length - 1; i <= j; i++) {

            if (that.data.taste_id == dataList[i]['pk']) {
              dataList[i]['btn'] = "已是首推";
              dataList[i]['setTo'] = '';
              dataList[i]['selected'] = 'selected';
            } else {
              dataList[i]['btn'] = "设为首推";
              dataList[i]['setTo'] = 'setTo';
              dataList[i]['selected'] = '';
            }
          }

          that.setData({
            currentTaste: res.data.title,
            formulaId: id,
            con: dataList,
            recommend: true,
            mask: true
          });
        }
      }
    });
  },

  //取消按钮点击事件
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },

  onShow: function(){
    setTimeout(function () {
      app.slideupshow(this, 'userPage', -50, 1)
    }.bind(this), 200);
  }

});
// 删除数组元素
Array.prototype.remove = function (dx) {
  if (isNaN(dx) || dx > this.length) {
    return false;
  }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[dx]) {
      this[n++] = this[i]
    }
  }
  this.length -= 1
}