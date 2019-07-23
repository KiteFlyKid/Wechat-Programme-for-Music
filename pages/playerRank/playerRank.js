// pages/playerRank/playerRank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playerList: [],
    isPlayingMusic: false,
    playpic: "../../images/play3.png"
  },

  startplay: function () {
    wx.navigateTo({
      url: '../play/play',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;

    wx.request({
      url: 'https://v1.itooi.cn/netease/artist/top?page=0&pageSize=30', //发送请求到服务器
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)//服务器相应数据回来
        //将服务器响应的数据绑定到data中，界面可以显示数据
        that.setData({
          playerList: res.data.data
        })
      }
    })


  },

  /*创建一个函数，当点击列表项的时候，会进入到openPlay函数，实现跳转*/
  openPlay: function (e) {
    //console.log(e);
    //哪个被点击：data-id所传递过来的view的索引，对应到data
    var id = e.currentTarget.dataset.id;
    console.log("id" + id);



    //传递数据到play界面：基于缓存，将歌曲的所有信息放入缓存，从缓存中取得所有信息
    wx.setStorage({
      key: 'songInfo',
      data: this.data.songlist[id],
    })

    wx.navigateTo({
      url: '../play/play'
    })

  },

  change: function () {
    if (this.data.isPlayingMusic) {
      this.data.isPlayingMusic = false;
      this.setData({
        playpic: "../../images/images/play3.png"
      })
    } else {
      this.data.isPlayingMusic = true;
      this.setData({
        playpic: "../../images/images/play4.png"
      })
    }

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