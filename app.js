//app.js
import {UserLoginCode} from "utils/config"
App({
  onLaunch: function () {

    this.setSkinNormalTitle()
    wx.login({
     async success (res) {
        if (res.code) {
          //发起网络请求
            let params={
                code: res.code
            }
            const resP = await UserLoginCode(params).catch(error=>error)

            if (resP.code!==20000){
                console.log('登录失败！' + resP.errMsg)
            }
            console.log(resP.data.id,"-------");
            wx.setStorageSync('UID', resP.data.id)
            wx.setStorageSync('OPENID', resP.data.openId)
            wx.setStorageSync('nick_name', resP.data.nick_name)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
      // 小程序主动更新
    this.updateManager();
      // 获取系统信息
    wx.getSystemInfo({
          success: (t) => {
              this.globalData.navBarHeight = t.statusBarHeight,
                  this.globalData.customBarHeight = t.platform == 'android' ? t.statusBarHeight + 50 : t.statusBarHeight + 45,
                  this.globalData.titleBarHeight = t.platform == 'android' ? 50 : 45;

              var version = t.SDKVersion;
              version = version.replace(/\./g, "")
              if (parseInt(version) > 290) {// 小于230的版本 基础库
                  this.globalData.wrapperhide = 'wrapperhide'
              }
          }
      })

  },


    /*小程序主动更新*/
  updateManager() {
        if (!wx.canIUse('getUpdateManager')) {
            return false;
        }
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function(res) {});
        updateManager.onUpdateReady(function() {
            wx.showModal({
                title: '有新版本',
                content: '新版本已经准备好，即将重启',
                showCancel: false,
                success(res) {
                    if (res.confirm) {
                        updateManager.applyUpdate()
                    }
                }
            });
        });
        updateManager.onUpdateFailed(function() {
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败',
                showCancel: false
            })
        });
    },
    //导航栏标题背景
    setSkinNormalTitle: function() {
        console.log(11);
        wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#ffffff',
        })
        wx.setBackgroundTextStyle({
            textStyle: 'dark'
        })
        wx.setBackgroundColor({
            backgroundColor: '#ffffff',
            backgroundColorTop: '#ffffff',
            backgroundColorBottom: '#ffffff',
        })
    },


  globalData: {
    userInfo: null,
      navBarHeight: '',
      customBarHeight: '',
      titleBarHeight: '',
      pageStyle: 'whitebg', //默认主题风格，whitebg白色风格，blackbg深灰色风格
  }
})