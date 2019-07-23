
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    latest:[],
    skinStyle: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;

    wx.getStorage({
      key: 'likeSongList',
      success: function(res) {
        console.log("读取成功！")

        //将服务器响应的数据绑定到data中，界面就可以显示数据
        that.setData({
          songList: res.data,
          latest: res.data[0]
        })
      },

    })

    wx.getStorage({
      key: 'skin',
      success: function(res) {
        that.setData({
          skinStyle: res.data
        })
      },
    })
  },

  /*创建一个函数，当点击列表项的时候，会进到openPlay函数，实现跳转*/
  openPlay: function (e) {
    console.log(e);
    //哪个被点击：data-id所传递过来的view的索引，对应到songList的索引
    var id = e.currentTarget.dataset.id;
    console.log("id" + id);

    //传递数据到play界面:基于缓存，将歌曲的所有信息放入缓存，play界面就可以从缓存中取得所有信息
    wx.setStorage({
      key: 'songInfo',
      data: this.data.songList[id].data,
    })

    //传递数据到play里面
    wx.navigateTo({
      url: '../play/play',
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