// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songList: [],
    loadingHidden: true ,
    filePath:"",
    tempFilePath: "",
    percentSongList:'',
    listname:'',
    description:'',
    pic:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var urlll = 'https://api.imjad.cn/cloudmusic/?type=playlist&id='+options.id;

    wx.request({
      url: urlll, //发送请求到服务器
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);//服务器响应数据回来
        //将服务器响应的数据绑定到data中，界面就可以显示数据
          
        var data2 = new Array();
        that.setData({
          listname: res.data.playlist.name,
          description: res.data.playlist.description,
          pic: res.data.playlist.coverImgUrl
        })
        for (var i = 0; i < res.data.playlist.tracks.length;i++){
          var data1 = {
            "url": '',
            "singer": '',
            "name": '',
            "pic": '',
            "id": ''
          }
          var url = "https://v1.itooi.cn/netease/url?id=" + res.data.playlist.tracks[i].id +"&quality=flac";
          data1.url = url;
          for (var j = 0; j < res.data.playlist.tracks[i].ar.length;j++){
            data1.singer = data1.singer+res.data.playlist.tracks[i].ar[j].name+" ";
          }
          data1.name = res.data.playlist.tracks[i].al.name;
          data1.pic = res.data.playlist.tracks[i].al.picUrl;
          data1.id = res.data.playlist.tracks[i].id;
          console.log("-----------------"+data1);
          data2[i] = data1;        
        }
        console.log(data2);
        that.setData({
          songList:data2
        });
        console.log(res.data.name + "======================================" + res.data.description + "------------------------------------" + res.data.coverImgUrl + "============================================="+that.data.songList)
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
      data: this.data.songList[id],
    })

    //传递数据到play里面
    wx.navigateTo({
      url: '../play/play',
    })
  },

  /*创建一个函数，当点击列表项的时候，会进到openPlay1函数，实现跳转*/

  load: function () {
    this.setData({
       loadingHidden: false 
      })   
    let _that = this;
    wx.downloadFile({
      url: 'https://v1.itooi.cn/tencent/topList?id=26&pageSize=200&page=0&format=1', 
     success: function (res) {
      var filePath = res.tempFilePath; 
      console.log(res)        
      //页面显示加载动画    
    
      wx.saveFile({
        tempFilePath: res.tempFilePath,
        success:function(res1){
          var savedFilePath = res1.savedFilePath;
          console.log("下载成功",res1.savedFilePath)
          _that.setData({
            loadingHidden: true
          })    
        }
      })      
      }    
     })  
    },


  openPlay1:function(){
    var app = getApp();
    app.globalData.percentSongList = this.data.songList;
    wx.navigateTo({
      url: '../search/search',
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