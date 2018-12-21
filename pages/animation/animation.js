var app = getApp();

Page({

  data: {
    currentItem: 0,
    items: [
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/20181107171542.png', text: '11111111111111'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/20181108094833.png', text: '22222222222222'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/220181107171828.png', text: '33333333333333'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/20181108094806.png', text: '44444444444444'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/_cup.png', text: '55555555555555'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/_cup2.png', text: '66666666666666'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/_cup3.png', text: '77777777777777'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/cup.png', text: '88888888888888'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/cup2.png', text: '99999999999999'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/cup3.png', text: '00000000000000'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/20181108094729.png', text: '16141134111211'},
      { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/20181107171542.png', text: '13242343242343'},
    ],
    top: { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/20181107171542.png', text: '11111111111111'},
    center: { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/20181108094833.png', text: '22222222222', style:'transform:rotate(5deg);'},
    bottom: { url: 'http://cqingt.oss-cn-shenzhen.aliyuncs.com/image/220181107171828.png', text: '33333333333', style: 'transform:rotate(-7deg);' },
  },
  // 向右滑动
  slideRight: function (that, param, px) {
    let animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })

    animation.translateX(420).translateY(-120).opacity(0).step()

    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json);
  },
 // 复原
  slideReback: function (that, param, px) {
    let animation = wx.createAnimation({
      duration: 0,
      timingFunction: 'ease'
    })

    animation.translateX(0).translateY(0).opacity(1).step()

    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json);
  },

  // 首张滑动
  toptouchend: function(e) {
    var currentItem = this.data.currentItem + 1;
    var items = this.data.items;
    var len = items.length;
    var top = {};
    var center = {};
    var bottom = {};

    if (currentItem == len) {
     return;
    }

    this.setData({
      currentItem: currentItem
    });

    top = items[currentItem];

    if (currentItem - 1 == 0) {
      setTimeout(function () {
        this.setData({
          top: top,
        })
      }.bind(this), 300);
      
    } else {
      this.setData({
        top: top,
      })
    }

    this.slideRight(this, 'topSlide', 150);
    
    setTimeout(function () {
      this.slideReback(this, 'topSlide', 150);
      top = items[currentItem];
      if (len - currentItem >= 3) {
        center = items[currentItem + 1];
        bottom = items[currentItem + 2];
      } else if (len - currentItem == 2) {
        center = items[currentItem + 1];
      }    

      if (Object.keys(center).length) {
        center.style = 'transform:rotate(5deg);';
      }

      if (Object.keys(bottom).length) {
        bottom.style = 'transform:rotate(-7deg);';
      }

      this.setData({
        top: top,
        center: center,
        bottom: bottom
      });

    }.bind(this), 500);
  },

  // 第二张滑动
  centertouchend: function (e) {
    this.leftSlideIn(this, 'centerSlide', 150);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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