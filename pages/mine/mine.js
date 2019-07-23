// pages/wode/wode.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicNumber: 0,
    skinStyle: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.getStorage({
      key: 'likeSongList',
      success: function(res) {
        that.setData({
          musicNumber: res.data.length
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  switchChange: function (e) {
    var that = this
    var style
    //如果开启
    if (e.detail.value == true) {
      app.globalData.skin = "dark"
    } else {
      //否则
      app.globalData.skin = ""
    }
    //保存信息
    that.setData({
      skinStyle: app.globalData.skin
    })

    wx.setStorage({
      key: 'skin',
      data: app.globalData.skin,
    })
  },

  openFavorite: function(event){
    console.log(event);

    wx.navigateTo({
      url: '../favorite/favorite',
    })
  },

  openInfo: function (event) {
    console.log(event);

    wx.navigateTo({
      url: '../jieshao/jieshao',
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
    this.onLoad()
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