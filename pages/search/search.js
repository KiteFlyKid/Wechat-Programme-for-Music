// pages/ceshi/ceshi.js
// pages/ceshi/ceshi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchResult: [],
    isResult: 0     /**isResult为0时为未搜索页面 isResult为1时表示搜索成功  isResult为2时表示搜索失败*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ isResult: 0 });
  },
  //点击搜索确定时触发
  confirm: function (e) {
    var count = 0;
    var result = new Array();
    var app = getApp();
    var songList2 = app.globalData.percentSongList;
    //初始化
    this.setData({
      searchResult: [],
    });
    if (e.detail.value == '') {
      this.setData({
        isResult: 0
      })
      return;
    }
    //遍历每个对象
    for (var i = 0; i < songList2.length; i++) {
      if (this.match(e.detail.value, songList2[i].singer) || this.match(e.detail.value, songList2[i].name)) {
        result = result.concat(songList2[i]);
      };
      if (result.length > 100) {
        break;                                             //结果上限
      }
    }
    //搜索失败
    if (result.length == 0) {
      this.setData({
        isResult: 2
      })
    } else {
      this.setData({
        searchResult: result,
        isResult: 1
      });
    }
  },
  //跳转
  openPlay: function (e) {
    console.log(e);
    //哪个被点击:data-id所传递过来的view的索引，对应到songList的索引
    var id = e.currentTarget.dataset.id;
    console.log("id" + id);
    //传递参数到play界面：基于缓存，将歌曲的所有信息放入缓存，play界面就可以从缓存中取得所有信息
    wx.setStorage({
      key: 'songInfo',
      data: this.data.searchResult[id],
    })

    wx.navigateTo({
      url: '../play/play',
    })
  },

  getNext: function (a) {
    var next = new Array(a.length);
    next[0] = -1;
    var j = 0;
    var k = -1;
    while (j < next.length - 1) {
      if (k == -1 || a.charAt(k) == a.charAt(j)) {
        j++;
        k++;
        if (a.charAt(j) != a.charAt(k))
          next[j] = k;
        else
          next[j] = next[k];
      }
      else {
        k = next[k];
      }
    }
    return next;
  },

  match: function (a, b) {
    if (a.length > b.length) {
      var c = a;
      a = b;
      b = c;
    }
    var next = this.getNext(a);
    var i = 0;
    var j = 0;
    while (i < b.length) {
      if (j == -1 || b.charAt(i) == a.charAt(j)) {
        i++;
        j++;
        if (j == a.length) {
          return true;
        }
      }
      else {
        j = next[j];
      }
    }
    return false;
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