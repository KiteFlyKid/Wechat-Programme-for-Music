// pages/friend/friend.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
   good: false,
   goodImg: "../../image/good.png",
   goodImg2: "../../image/good.png",
   goodImg3: "../../image/good.png",
   guan:false,
   guanImg: "../../image/me.png",
   guanImg2: "../../image/me.png",
   guanImg3: "../../image/me.png",
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

  //不点赞
  goodOrno: function (e) {
    if (this.data.good) {
      this.data.good = false;
      this.setData({
      goodImg:"../../image/good.png"
      })
      //点赞
    } else {
      this.data.good= true;
      this.setData({
      goodImg: "../../image/good2.png"
      })
 
    }
  },
  
  //不关注
  guanOrno: function (e) {
    if (this.data.guan) {
      this.data.guan= false;
      this.setData({
        guanImg: "../../image/me.png"
      })
      //关注
    } else {
      this.data.guan = true;
      this.setData({
        guanImg: "../../image/me2.png"
      })

    }
  },


  //不点赞
  goodOrnotwo: function (e) {
    if (this.data.good) {
      this.data.good = false;
      this.setData({
        goodImg2: "../../image/good.png"
      })
      //点赞
    } else {
      this.data.good = true;
      this.setData({
        goodImg2: "../../image/good2.png"
      })

    }
  },

  //不关注
  guanOrnotwo: function (e) {
    if (this.data.guan) {
      this.data.guan = false;
      this.setData({
        guanImg2: "../../image/me.png"
      })
      //关注
    } else {
      this.data.guan = true;
      this.setData({
        guanImg2: "../../image/me2.png"
      })

    }
  },


  //不点赞
  goodOrnothree: function (e) {
    if (this.data.good) {
      this.data.good = false;
      this.setData({
        goodImg3: "../../image/good.png"
      })
      //点赞
    } else {
      this.data.good = true;
      this.setData({
        goodImg3: "../../image/good2.png"
      })

    }
  },

  //不关注
  guanOrnothree: function (e) {
    if (this.data.guan) {
      this.data.guan = false;
      this.setData({
        guanImg3: "../../image/me.png"
      })
      //关注
    } else {
      this.data.guan = true;
      this.setData({
        guanImg3: "../../image/me2.png"
      })

    }
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