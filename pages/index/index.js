var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [ ],
    currentSwiper: 0,
    autoplay: true,
    formulas:[],
    current: { title:'', username: '',likes: 0},
    display: 'none',
    myRank: 'none', // 我的排名
    mine: [], //我的数据
    floating: "block", // 显示排名
  },
  // 关闭弹窗
  closeWin: function () {
    this.setData({
      display: 'none'
    })
  },
  chooseItem: function(e) {
    let id = e.currentTarget.dataset.pk;
    var that = this;
    let dataList = that.data.formulas;

    for (var i = 0, j = dataList.length - 1; i <= j; i++) {
      if (id == dataList[i]['pk']) {
        that.setData({
          'current.title': dataList[i]['collocation'],
          'current.username': dataList[i]['name'],
          'current.likes': dataList[i]['num'],
          display: 'block'
        });
      }
    }
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
          item['avatar'] = data[i]['avatar'];
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
          'imgs': imgsList,
          mine: res.data.mine,
          //myRank: res.data.mine ? 'block' : 'none'
          floating: res.data.mine ? 'block' : 'none'
        });
      }
    });
  },
  showRank: function(e) {
    this.setData({
      myRank: "block",
      floating: 'none',
    });

    // 浮窗右移15
    app.sliderightshow(this, 'hideRank', 15, 0)

    // 我的排名上移25
    setTimeout(function () {
      app.sliderightshow(this, 'showRank', '-65%', 1)
    }.bind(this), 200);
  },
  // 隐藏我的排名
  hideRank: function(e){
    
    // 隐藏我的排名
    setTimeout(function () {
      app.sliderightshow(this, 'showRank', '34%', 0);
      this.setData({
        //myRank: "none",
      });
    }.bind(this), 200);

    // 显示浮窗，同时左移15
    setTimeout(function () {
      app.sliderightshow(this, 'hideRank', 0, 1);
      this.setData({
        floating: 'block',
      });
    }.bind(this), 200);
  },
  toShare: function(e){
    var formulas = this.data.formulas;
    var mine = this.data.mine;
    var current = {};

    for (var i = 0, len = formulas.length; i< len; i++) {
      if (formulas[i]['pk'] == mine['id']) {
        current = formulas[i];
      }
    }

      this.setData({
        display: 'block',
        'current.title': current['collocation'],
        'current.username': current['name'],
        'current.likes': current['num'],
      })
  },
  setLike: function (e) {
    let id = e.currentTarget.dataset.pk;
    var that = this;

    app.sendRequest({
      url: 'index/like/' + id,
      data: {},
      success: function (res) {
        console.log(res);
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

        } else if (res.code == 411) {
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
        }
      }
    });
  },
  onShow: function(){
    // 显示浮窗，同时左移15
    setTimeout(function () {
      app.slideupshow(this, 'rankPage', -50, 1)
    }.bind(this), 200);

    setTimeout(function () {
      app.slideupshow(this, 'wrapPage', -30, 1)
    }.bind(this), 500);
  }
})