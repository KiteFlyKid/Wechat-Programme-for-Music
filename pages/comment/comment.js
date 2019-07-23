// pages/comment/comment.js得到歌曲id 通过id访问评论数据 
Page({

  /**
   * 页面的初始数据
   */
  data: {

    commentData: [],
    mid: ''
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      mid: options.mid,
    });
    let that = this;
    var songId = this.data.mid;
    wx.request({
      url: 'https://v1.itooi.cn/netease/comment/song?&page=0&pageSize=30',
      header: {
        'content-type': 'application/json'
      },
      data: {
        id: songId
      },
      success(res) {
        console.log(res.data)
        that.setData({
          commentData: res.data.data
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