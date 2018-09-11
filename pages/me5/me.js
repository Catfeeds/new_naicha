// pages/my/my.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["我的口味库", "购买历史记录", "优惠券"],
    currentIndex: 0,//tabbar索引 
    formulaId: 0,
    currentTaste: '暂无首推配方，请在口味库中设置',
    con:[],
    record:[],
    coupon:[],
    scrollParam: {
      taste: { page: 1, is_more: 0, total_page: 2},
      order: { page: 1, is_more: 0, total_page: 2},
    }
  },
  onGotUserInfo: function (e) {

  },
  onLoad:function(e) {
    var that = this;

    app.sendRequest({
      url: 'user/index',
      data: {},
      success: function (res) {
        var data = res.data;
        that.setData({
          'currentTaste': data.title,
          'formulaId': data.formula_id
        })
      }
    });

    // 我的口味库
    this.getTastes();
  },
  // 加载口味库
  getTastes: function (e) {
    let that = this;
    if (that.data.scrollParam.taste.page - 1 <= that.data.scrollParam.taste.total_page) {
      app.sendRequest({
        url: 'user/tastes',
        data: { page: that.data.scrollParam.taste.page },
        success: function (res) {
          var data = res.data;
          let dataList = that.data.con;
          for (var i = 0, j = data.length - 1; i <= j; i++) {
            let item = {};
            item['pk'] = data[i]['id'];
            item['img'] = '/images/me1.png';
            item['text'] = data[i]['title'];
            if (that.data.formulaId == data[i]['id']) {
              item['btn'] = "已是首推";
            } else {
              item['btn'] = "设为首推";
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
    if (that.data.scrollParam.order.page - 1 <= that.data.scrollParam.order.total_page) {
      app.sendRequest({
        url: 'user/orders',
        data: { page: that.data.scrollParam.order.page },
        success: function (res) {
          var data = res.data;
          let dataList = that.data.record;
          for (var i = 0, j = data.length - 1; i <= j; i++) {
            let item = {};
            item['id'] = data[i]['id'];
            item['image'] = data[i]['image'];
            item['name'] = data[i]['title'];
            item['num'] = data[i]['num'];
            item['status'] = data[i]['status'];
            item['order_sn'] = data[i]['order_sn'];
            item['time'] = data[i]['created_at'];
            item['money'] = data[i]['price'];
            item['has_taste'] = data[i]['has_taste'];
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
  changeTab: function (e) {
    console.log('aaa');
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
  closeImg:function(e){
    var that = this;
    console.log(e);
    var index =e.currentTarget.dataset.index;

    that.data.con[index].right=15;
    that.data.con[index].hidImg = !that.data.con[index].hidImg;

    console.log(that.data.con[index].hidImg)
    that.setData({
      con:that.data.con,
    })
  },

  deleteText:function(){

  },

  //取消按钮点击事件
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  // 加入口味库
  joinTaste: function(e) {
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
            if (record[i].id == orderId) {
              record[i].has_taste = 1;
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

    app.sendRequest({
      url: 'user/deleteTaste/' + id,
      data: {},
      success: function (res) {
        if (res.code == 200) {
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
  }, 
  // 设为首推
  setIndex: function (e) {
    let id = e.currentTarget.dataset.pk;
    var that = this;

    app.sendRequest({
      url: 'user/setIndex/' + id,
      data: { id: id },
      success: function (res) {
        if (res.code == 200) {
          that.setData({
            currentTaste: res.data.title,
            formulaId:id
          })
         // this.data.currentTaste = res.data.title;
        }
      }
    });
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