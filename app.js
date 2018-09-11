//dddddddddd//app.js
App({
  onLaunch: function (options) {
    var that = this;
    wx.login({
      success: res => {
        wx.request({
          url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
          success: res => {
            that.globalData.openid = res.data.openid;
          }
        })
      }
    });

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    console.log("[onLaunch] 场景值:", options.scene)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
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
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../tologin/tologin',
              })
            }
          }
        })
      }
    });
  },
  getSessionKey: function () {
    var sessionKey = this.globalData.sessionKey;
    return sessionKey ? sessionKey : wx.getStorageSync('session_key');
  },
  sendRequest: function (param, customSiteUrl) {
    let that = this;
    let data = param.data || {};
    let header = param.header;
    let requestUrl;

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
          'Cookie': 'PHPSESSID=' + that.getSessionId()
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
        'Cookie': 'PHPSESSID=' + that.getSessionId()
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
  getSessionId: function () {
    return wx.getStorageSync('session_id');
  },
  setPageTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title
    });
  },
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
  pageScrollFunc: function (event) {
    let pageInstance = this.getAppCurrentPage();
    this._pageScrollFunc(event);
  },
  _pageScrollFunc: function (event) {
    let pageInstance = this.getAppCurrentPage();
    let compid = typeof event == 'object' ? event.currentTarget.dataset.compid : event;
    let compData = pageInstance.data[compid];
    let curpage = compData.curpage + 1;
    let newdata = {};
    let param = {};
    let _this = this;
    let customFeature = compData.customFeature;

    if (!compData.is_more && typeof event == 'object' && event.type == 'tap') {
      _this.showModal({
        content: '已经加载到最后了'
      });
      // todo 显示加载到最后
    }
    if (pageInstance.requesting || !compData.is_more) {
      return;
    }
    pageInstance.requesting = true;

    if (pageInstance.list_compids_params) {
      for (let index in pageInstance.list_compids_params) {
        if (pageInstance.list_compids_params[index].compid === compid) {
          param = pageInstance.list_compids_params[index].param;
          break;
        }
      }
    }
    if (pageInstance.dynamicClassifyGroupidsParams.length != 0) {
      param = {
        form: compData.classifyGroupForm,
        idx_arr: {
          idx: 'category',
          idx_value: compData.currentCategory[compData.currentCategory.length - 1]
        }
      }
    }
    if (customFeature.vesselAutoheight == 1 && customFeature.loadingMethod == 1) {
      param.page_size = customFeature.loadingNum || 10;
    }
    param.page = curpage;
    _this.sendRequest({
      url: '/AppData/getFormDataList',
      data: param,
      method: 'post',
      success: function (res) {
        newdata = {};

        for (let j in res.data) {
          for (let k in res.data[j].form_data) {
            if (k == 'category') {
              continue;
            }
            if (/region/.test(k)) {
              continue;
            }

            let description = res.data[j].form_data[k];

            if (_this.needParseRichText(description)) {
              res.data[j].form_data[k] = _this.getWxParseResult(description);
            }
          }
        }

        newdata[compid + '.list_data'] = compData.list_data.concat(res.data);
        newdata[compid + '.is_more'] = res.is_more;
        newdata[compid + '.curpage'] = res.current_page;

        pageInstance.setData(newdata);
      },
      complete: function () {
        setTimeout(function () {
          pageInstance.requesting = false;
        }, 300);
      }
    })
  }, 
  globalData: {
    userInfo: null,
    shopId: 0,
    sessionId:'',
    openid: 0,
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx0844817c7a6d15cc&secret=fe4b64e1f96f38463033927e038e97a1&js_code=',
    wx_url_2: '&grant_type=authorization_code',
    siteBaseUrl: 'http://nc.laravel.com/api/',
    sessionKey: 'aaaaa',
  }
})