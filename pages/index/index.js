const App = getApp()

Page({
  data: {
    activeIndex: 0,
    navList: [],
    indicatorDots: true,
    autoplay: true,
    current: 0,
    interval: 3000,
    duration: 1000,
    circular: true,
    goods: {},
    prompt: {
      hidden: true,
    },
  },
  swiperchange(e) {
    // console.log(e.detail.current)
  },
  onLoad() {
    this.banner = App.HttpResource('/banner/:id', {
      id: '@id'
    })
    this.goods = App.HttpResource('/goods/:id', {
      id: '@id'
    })
    this.classify = App.HttpResource('/classify/:id', {
      id: '@id'
    })

    this.getBanners()
    this.getClassify()
  },
  initData() {
    /**
     * JS中以下内容会被当成false处理："" , false , 0 , null , undefined , NaN
     * JS中  || && 的定义:
     * 
     * a || b：如果a是true，那么b不管是true还是false，都返回true。因此不用判断b了，这个时候刚好判断到a，因此返回a。
     *　如果a是false，那么就要判断b，如果b是true，那么返回true，如果b是false，返回false，其实不就是返回b了吗。
     *
     * a && b：如果a是false，那么b不管是true还是false，都返回false，因此不用判断b了，这个时候刚好判断到a，因此返回a。
     * 如果a是true，那么就要在判断b，和刚刚一样，不管b是true是false，都返回b。
     */
    const type = this.data.goods.params && this.data.goods.params.type || ''//如果前两个元素都为false，那么type=''
    const goods = {
      items: [],
      params: {
        page: 1,
        limit: 5,
        type: type,
      },
      paginate: {}
    }

    this.setData({
      goods: goods
    })
  },
  navigateTo(e) {
    console.log(e)
    App.WxService.navigateTo('/pages/goods/detail/index', {
      id: e.currentTarget.dataset.id
    })
  },
  search() {
    App.WxService.navigateTo('/pages/search/index')
  },
  getBanners() {
    // App.HttpService.getBanners({is_show: !0})
    this.banner.queryAsync({
        is_show: !0
      })
      .then(res => {
        const data = res.data
        console.log(data)
        if (data.meta.code == 0) {
          data.data.items.forEach(n => n.path = App.renderImage(n.images[0].path))
          this.setData({
            images: data.data.items
          })
        }
      })
  },
  getClassify() {
    const activeIndex = this.data.activeIndex

    // App.HttpService.getClassify({
    //     page: 1, 
    //     limit: 4, 
    // })
    this.classify.queryAsync({
        page: 1,
        limit: 4,
      })
      .then(res => {
        const data = res.data
        console.log(data)
        if (data.meta.code == 0) {
          this.setData({
            navList: data.data.items,
            'goods.params.type': data.data.items[activeIndex]._id
          })
          this.onPullDownRefresh()
        }
      })
  },
  getList() {
    const goods = this.data.goods
    const params = goods.params

    // App.HttpService.getGoods(params)
    this.goods.queryAsync(params)
      .then(res => {
        const data = res.data
        console.log(data)
        if (data.meta.code == 0) {
          data.data.items.forEach(n => n.thumb_url = App.renderImage(n.images[0] && n.images[0].path))
          //...运算符 将data.data.items拷贝到goods.items中，两者指向的是不同的数组，data发生变化不//影响goods
          goods.items = [...goods.items, ...data.data.items]
          goods.paginate = data.data.paginate
          goods.params.page = data.data.paginate.next
          goods.params.limit = data.data.paginate.perPage
          this.setData({
            goods: goods,
            'prompt.hidden': goods.items.length,
          })
        }
      })
  },
  onPullDownRefresh() {
    console.info('onPullDownRefresh')
    this.initData()
    this.getList()
  },
  onReachBottom() {
    console.info('onReachBottom')
    if (!this.data.goods.paginate.hasNext) return
    this.getList()
  },
  onTapTag(e) {//e中携带点击控件的自定义参数
    const type = e.currentTarget.dataset.type
    const index = e.currentTarget.dataset.index
    const goods = {
      items: [],
      params: {
        page: 1,
        limit: 10,
        type: type,
      },
      paginate: {}
    }
    this.setData({
      activeIndex: index,
      goods: goods,
    })
    this.getList()
  },
})