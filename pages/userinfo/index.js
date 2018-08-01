// pages/userinfo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: 1,
    count:6,
    total:6,
    tempFilePaths: ['../../assets/images/add.png'] 
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

  chooseImages(){
   var that=this;
   wx.showActionSheet({
     itemList: ['从相册中选择','拍照'],
     itemColor:'#CED63A',
     success: function(res){
       if(!res.cancel){
         if(res.tapIndex==0){
           that.chooseWxImage('album')
         }else if(res.tapIndex==1){
           that.chooseWxImage('camera')
         }
       }
     }

   })
  },

  chooseWxImage(type){
    var that = this;
    var paths = [];
    var tempCount;
    var flat = true;
    wx.chooseImage({
      count:that.data.count,
      sizeType:['original','compressed'],
      sourceType:[type],
      success: function(res) {
        paths = res.tempFilePaths.concat(that.data.tempFilePaths)
        tempCount = that.data.count-res.tempFilePaths.length;
        // splice(0,total) 0开始，取total个元素
        that.setData({
          count: tempCount,
          tempFilePaths: tempCount === 0 ?  paths.splice(0,that.data.total): paths
        })
      },
    })
  },
  
  //图片点击事件分发，图片预览或添加图片
  dispatchClickEvent (e) {
    const currentIndex = e.currentTarget.dataset.index;
    if(this.data.count>0 && currentIndex== this.data.tempFilePaths.length-1){
      this.chooseWxImage('album')
    }else{
      this.previewImage(currentIndex)
    }
  },

  //预览图片
  previewImage(currentIndex){
    wx.previewImage({
      current: currentIndex, // 当前显示图片的http链接
      urls: this.data.tempFilePaths // 需要预览的图片http链接列表
    })
  },

  deleteImage(e){
    this.setData({
      tempFilePaths: this.data.tempFilePaths.remove(e.currentTarget.dataset.path)
    })
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