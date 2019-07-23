// pages/songList/songList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    hotList: [],
    highQuality: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    wx.request({
      url: 'https://v1.itooi.cn/tencent/songList/hot?categoryId=10000000&sortId=5&pageSize=3&page=1',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          songList: res.data.data
        })
      }
    })

    wx.request({
      url: 'https://v1.itooi.cn/netease/songList/hot?cat=全部&pageSize=6&page=0',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          hotList: res.data.data
        })
      }
    })

    wx.request({
      url: 'https://v1.itooi.cn/netease/songList/highQuality?cat=全部&pageSize=6',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          highQuality: res.data.data
        })
      }
    })
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})