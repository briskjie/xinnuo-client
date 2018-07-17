const App = getApp()

Page({
    data: {
        indicatorDots: !1,
        autoplay: !1,
        current: 0,
        interval: 3000,
        duration: 1000,
        circular: !1,
    },
    onLoad() {},
    onShow() {},
    bindload(e) {
      setTimeout(App.WxService.getStorageSync('token') ? this.goIndex : this.goLogin, 3000)
    },

    //有token，一登录，跳转到首页
    goIndex() {
        App.WxService.switchTab('/pages/index/index')
    },
    //未登录时跳转到登录页面，没有token
    goLogin() {
        App.WxService.redirectTo('/pages/login/index')
    },
})
