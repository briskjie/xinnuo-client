const qiniuUploader = require("../../utils/qiniuUploader");
//index.js

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华东区
    // uptokenURL: 'http://localhost:3000/api/qiniu/getQnUploadToken',
    uptoken: 'v9xUQ0SgS3ja0nK_w9e8bd5MpcJ4kN-H6BQIF7G5:TnbQluvd1iAetjP9R4w1uSWeggQ=:eyJzY29wZSI6ImRyZWFtMCIsImRlYWRsaW5lIjoxNTMzMjkzNjI3fQ==',
    domain: 'http://pcu7iznmd.bkt.clouddn.com',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}

//获取应用实例
var app = getApp()
Page({
  data: {
    imageObject: {}
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this;
  },
  didPressChooesImage: function () {
    var that = this;
    didPressChooesImage(that);
  },
  didCancelTask: function () {
    this.data.cancelTask()
  }
});

function didPressChooesImage(that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
    count: 1,
    success: function (res) {
      var filePath = res.tempFilePaths[0];
      // 交给七牛上传
      qiniuUploader.upload(filePath, (res) => {
        that.setData({
          'imageObject': res
        });
      }, (error) => {
        console.error('error: ' + JSON.stringify(error));
      },
        // , {
        //     region: 'NCN', // 华北区
        //     uptokenURL: 'https://[yourserver.com]/api/uptoken',
        //     domain: 'http://[yourBucketId].bkt.clouddn.com',
        //     shouldUseQiniuFileName: false
        //     key: 'testKeyNameLSAKDKASJDHKAS'
        //     uptokenURL: 'myServer.com/api/uptoken'
        // }
        null,// 可以使用上述参数，或者使用 null 作为参数占位符
        (progress) => {
          console.log('上传进度', progress.progress)
          console.log('已经上传的数据长度', progress.totalBytesSent)
          console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }, cancelTask => that.setData({ cancelTask })
      );
    }
  })
}
