// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoInfo: [],
    myid: "",
    commentData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      myid: options.mid,
    });
    let that = this;
    var mvid = this.data.myid;
    //页面一加载
    wx.request({
      url: 'https://v1.itooi.cn/netease/comment/mv?&page=0&pageSize=30',
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: mvid
      },
      success(res) {
        console.log(res.data)
        that.setData({
          commentData: res.data.data
        })
      }

    })
    wx.request({
      url: 'https://v1.itooi.cn/netease/mv', //发送请求到服务器
      data: {
        id: mvid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //将服务器响应的数据绑定到data中
        that.setData({
          videoInfo: res.data.data.data //res.data是传入res的数据data中的dataJSON数组
        })
      }
    })
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