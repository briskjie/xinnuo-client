const App = getApp()

Page({
  data: {
    userInfo: {},
    items: [{
        icon: '../../assets/images/iconfont-order.png',
        text: '我的桃花牌',
        path: '/pages/userinfo/index',
        desc: '编辑'
      },
      {
        icon: '../../assets/images/iconfont-order.png',
        text: '我的桃花券',
        path: '/pages/order/list/index'
      },
      {
        icon: '../../assets/images/iconfont-kefu.png',
        text: '添加到桌面',
        path: '18521708248',
      },
      {
        icon: '../../assets/images/iconfont-kefu.png',
        text: '关于我们',
        path: '18521708248',
      },
      {
        icon: '../../assets/images/iconfont-kefu.png',
        text: '联系客服',
        path: '18521708248',
      },
      {
        icon: '../../assets/images/iconfont-kefu.png',
        text: '设置',
        path: '18521708248',
      },
      {
        icon: '../../assets/images/iconfont-order.png',
        text: '我的订单',
        path: '/pages/order/list/index'
      },
      {
        icon: '../../assets/images/iconfont-addr.png',
        text: '收货地址',
        path: '/pages/address/list/index'
      },
      {
        icon: '../../assets/images/iconfont-kefu.png',
        text: '联系客服',
        path: '18521708248',
      },
      {
        icon: '../../assets/images/iconfont-help.png',
        text: '常见问题',
        path: '/pages/help/list/index',
      },
    ],
    settings: [{
        icon: '../../assets/images/iconfont-clear.png',
        text: '清除缓存',
        path: '0.0KB'
      },
      {
        icon: '../../assets/images/iconfont-about.png',
        text: '关于我们',
        path: '/pages/about/index'
      },
    ]
  },
  onLoad() {
    this.getUserInfo()
    this.getStorageInfo()
  },
  navigateTo(e) {
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path
    App.WxService.navigateTo(path)
    // switch (index) {
    //   case 2:
    //     App.WxService.makePhoneCall({
    //       phoneNumber: path
    //     })
    //     break
    //   default:
    //     App.WxService.navigateTo(path)
    // }
  },
  getUserInfo() {
    const userInfo = App.globalData.userInfo

    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }
    /**
     * 微信能获取到的基本信息
    "avatar:https://wx.qlogo.cn/mmopen/vi_32/uuhdP0YzlSDgr8UFz5P922bbHEJaaQ5kvJInwiarXHEmLqGibMy14PSCSNvAC1xFDyskZA54QNkiaMcd21jVROvcw/132"
    city:"Haidian"
    country:"China"
    gender:1
    language:"zh_CN"
    nickName:"旭仔"
    province:"Beijing"
     */
    App.getUserInfo()
      .then(data => {
        console.log(data)
        this.setData({
          userInfo: data
        })
      })
  },
  getStorageInfo() {
    App.WxService.getStorageInfo()
      .then(data => {
        console.log(data)
        this.setData({
          'settings[0].path': `${data.currentSize}KB`
        })
      })
  },
  bindtap(e) {
    const index = e.currentTarget.dataset.index
    const path = e.currentTarget.dataset.path

    switch (index) {
      case 0:
        App.WxService.showModal({
            title: '友情提示',
            content: '确定要清除缓存吗？',
          })
          .then(data => data.confirm == 1 && App.WxService.clearStorage())
        break
      default:
        App.WxService.navigateTo(path)
    }
  },
  logout() {
    App.WxService.showModal({
        title: '友情提示',
        content: '确定要登出吗？',
      })
      .then(data => data.confirm == 1 && this.signOut())
  },
  signOut() {
    App.HttpService.signOut()
      .then(res => {
        const data = res.data
        console.log(data)
        if (data.meta.code == 0) {
          App.WxService.removeStorageSync('token')
          App.WxService.redirectTo('/pages/login/index')
        }
      })
  },
})