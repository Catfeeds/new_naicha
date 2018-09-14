//app.js
App({

  // 小程序启动时触发
  onLaunch: function (options) {
    var that = this;
    wx.login({
      success: res => {
        let openid = wx.getStorageSync('openid');

        if (! openid.length) {
          wx.request({
            url: that.globalData.wx_query_openid + res.code + '&grant_type=authorization_code',
            success: res => {
              if (res.data.openid) {
                that.globalData.openid = res.data.openid;
                wx.setStorageSync('openid', res.data.openid);

                if (! wx.getStorageSync('session_key')) {
                  that.queryUsreInfo();
                }
              }
            }
          })
        } else {
          that.globalData.openid = openid;
        }

        console.log(that.globalData);
      }
    });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    console.log("[onLaunch] 场景值:", options.scene)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }

        that.globalData.authSetting = 1; // 是否授权
      },
      fail: function (res) {
        wx.switchTab({
          url: '/pages/login/login'
        })
      }
    })

    // 获取授权
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        //此处为获取微信信息后的业务方法
      },
      fail: function () {
        //获取用户信息失败后。请跳转授权页面
        wx.showModal({
          title: '警告',
          content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/login/login'
              })
            } else {
              //用户按了拒绝按钮
              wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '/pages/login/login'
                    })
                    console.log('用户点击了“返回授权”')
                  }
                }
              })
            }
          }
        })
      }
    });
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    var that = this;
    that.sendRequest({
      url: 'user/info',
      data: {},
      success: function (res) {
        that.globalData.userInfo = res.data;
        that.globalData.sessionKey = res.data.session_key;

        wx.setStorageSync('session_key', res.data.session_key);
      }
    });
  },
  // user auth callback
  userInfoReadyCallback: function(res) {
    this.queryUsreInfo();
  },

  getSessionKey: function () {
    var sessionKey = wx.getStorageSync('session_key');

    if (sessionKey) {
      return sessionKey;
    } else {
      this.queryUsreInfo();
      return wx.getStorageSync('session_key');
    }
  },

  // 发送请求
  sendRequest: function (param, customSiteUrl) {
    let that = this;
    let data = param.data || {};
    let header = param.header;
    let requestUrl;

    // 店铺ID
    data.shopId = that.globalData.shopId;
    data.openid = that.globalData.openid;
    //if(!this.globalData.notBindXcxAppId){
    data.session_key = this.getSessionKey();
    //}

    if (customSiteUrl) {
      requestUrl = customSiteUrl + param.url;
    } else {
      requestUrl = this.globalData.siteBaseUrl + param.url;
    }

    if (param.method) {
      if (param.method.toLowerCase() == 'post') {
        data = this._modifyPostParam(data);
        header = header || {
          'content-type': 'application/x-www-form-urlencoded;',
          //'Cookie': 'PHPSESSID=' + that.getSessionId()
        }
      }
      param.method = param.method.toUpperCase();
    }

    if (!param.hideLoading) {
      this.showToast({
        title: '请求中...',
        icon: 'loading'
      });
    }

    wx.request({
      url: requestUrl,
      data: data,
      method: param.method || 'GET',
      header: header || {
        'content-type': 'application/json',
        //'Cookie': 'PHPSESSID=' + that.getSessionId()
      },
      success: function (res) {
        if (res.code == 408) {
          that._login(); // session 过期 失效 需要重新登录
          return false;
        }

        if (res.data.code && res.data.code != 200) {
          that.hideToast();
          that.showModal({
            content: '' + res.data.msg
          });
          typeof param.successStatusAbnormal == 'function' && param.successStatusAbnormal(res.data);
          return;
        }
        if (res.data.status) {
          if (res.data.status == 2 || res.data.status == 401) {
            that.goLogin({
              success: function () {
                that.sendRequest(param, customSiteUrl);
              },
              fail: function () {
                typeof param.successStatusAbnormal == 'function' && param.successStatusAbnormal(res.data);
              }
            });
            return;
          }
          if (res.data.status != 0) {
            that.hideToast();
            that.showModal({
              content: '' + res.data.data,
              confirm: function () {
                typeof param.successShowModalConfirm == 'function' && param.successShowModalConfirm(res.data);
              }
            });
            typeof param.successStatusAbnormal == 'function' && param.successStatusAbnormal(res.data);
            return;
          }
        }
        typeof param.success == 'function' && param.success(res.data);
      },
      fail: function (res) {
        that.hideToast();
        switch (res.errMsg) {
          case 'request:fail url not in domain list': res.errMsg = '请配置正确的请求域名'; break;
          default: break;
        }
        that.showModal({
          content: '请求失败 ' + res.errMsg
        })
        typeof param.fail == 'function' && param.fail(res.data);
      },
      complete: function (res) {
        param.hideLoading || that.hideToast();
        typeof param.complete == 'function' && param.complete(res.data);
      }
    });
  },
  _modifyPostParam: function (obj) {
    let query = '';
    let name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this._modifyPostParam(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this._modifyPostParam(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  },
  // 获取sessionid
  getSessionId: function () {
    return wx.getStorageSync('session_id');
  },

  // 设置页面tittle
  setPageTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title
    });
  },

  // 展示弹窗提示
  showToast: function (param) {
    wx.showToast({
      title: param.title,
      icon: param.icon,
      duration: param.duration || 1500,
      success: function (res) {
        typeof param.success == 'function' && param.success(res);
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  hideToast: function () {
    wx.hideToast();
  },
  showModal: function (param) {
    wx.showModal({
      title: param.title || '提示',
      content: param.content,
      showCancel: param.showCancel || false,
      cancelText: param.cancelText || '取消',
      cancelColor: param.cancelColor || '#000000',
      confirmText: param.confirmText || '确定',
      confirmColor: param.confirmColor || '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          typeof param.confirm == 'function' && param.confirm(res);
        } else {
          typeof param.cancel == 'function' && param.cancel(res);
        }
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },

  // 全局设置
  globalData: {
    userInfo: null,
    shopId: 1,
    sessionId:'',
    openid: '',
    wx_query_openid: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx31c29e4d7c15086a&secret=5fafeb1162405ee7ff235e5a0e9a92c3&js_code=',
    siteBaseUrl: 'http://nc.laravel.com/api/',
    sessionKey: '',
    authSetting: 0
  }
})