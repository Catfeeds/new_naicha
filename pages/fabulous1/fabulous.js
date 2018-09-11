// pages/fabulous1/fabulous.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [
      { url: 'https://f10.baidu.com/it/u=574985193,338759863&fm=76' },
      { url: 'https://ss0.bdstatic.com/-0U0b8Sm1A5BphGlnYG/kmarketingadslogo/9c5e8a09adb14379f0de35ca2dec338c_259_194.jpg' },
      { url: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=218975447,1440067537&fm=58&bpow=385&bpoh=249' }
    ],
    currentSwiper: 0,
    autoplay: true,
    formulas:[]
  },
  swiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail.current
    })
  },
  onLoad: function (e) {
    var that = this;

    app.sendRequest({
      url: 'index/index',
      data: {},
      success: function (res) {
        var data = res.data.formulas;
        let dataList = that.data.formulas;
        for (var i = 0, j = data.length - 1; i <= j; i++) {
          let item = {};
          item['position'] = i + 1;
          item['name'] = data[i]['username'];
          item['collocation'] = data[i]['title'];
          item['num'] = data[i]['likes'];
          item['pk'] = data[i]['id'];
          dataList.push(item);
        }

        var images = res.data.pushes;
        let imgsList = that.data.imgs;
        for (var i = 0, j = images.length - 1; i <= j; i++) {
          let item = {};
          item['url'] = images[i]['image'];
          imgsList.push(item);
        }

        that.setData({
          'formulas': dataList,
          'imgs': imgsList
        });
      }
    });
  },
  setLike: function (e) {
    let id = e.currentTarget.dataset.pk;
    var that = this;

    app.sendRequest({
      url: 'index/like/' + id,
      data: {},
      success: function (res) {
        if (res.code == 200) {
          let formulas = that.data.formulas;
          for (let i in formulas) {
            if (formulas[i].pk == id) {
              formulas[i].num = res.data.likes;
            }
          }

          that.setData({
            'formulas': formulas,
          });

        } else if (res.code == 401) {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    });
  }
})