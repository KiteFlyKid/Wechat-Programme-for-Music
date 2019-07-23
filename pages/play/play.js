// pages/play/play.js
Page({

  /**
   * 页面的初始数据
   * 
   * {{murl}}
   * {{array[1].name}}
   */
  data: {
    murl: '',
    mname: '',
    mauthor: '',
    mposter: '',
    mlrc: '',
    play: false,
    isLove: false,
    myMusic: null,
    mPercent: 0,
    animationData: {},
    animationDataRoll: {},
    storageData: null,
    likeSongList:[],
    randomPlay:true,
    hiddenName: true,
    mid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.mu != null) {//首页传参：url
      //将传递过来的参数值赋值给该页面play的页面初始化数据
      this.setData({
        murl: options.mu,
        mname: options.mn,
        mauthor: options.ma,
        mposter: options.mp,
        mlrc: options.ml,
      });

      var myMusic = wx.createInnerAudioContext();
      myMusic.src = this.data.murl;
      myMusic.autoplay = true;

    } else {//列表传参：通过storage
      let that = this;
      wx.getStorage({
        key: 'songInfo',
        success: function (res) {
          console.log("play-storage" + res.data.singer);
          that.setData({
            mid: res.data.id,
            murl: res.data.url,
            mname: res.data.name,
            mauthor: res.data.singer,
            mposter: res.data.pic,
            mlrc: res.data.lrc,
            storageData: res
          });

          //根据歌曲id，wx.request，获得该歌曲的真正的播放地址
          var myMusic = wx.createInnerAudioContext();
          myMusic.src = res.data.url;
          // myMusic.autoplay = true;
          

          //定时器：每隔1000毫秒（1秒钟）,调用一次方法
          setInterval(function () {
            that.clock();
          }, 1000);

          //音乐开始播放,延迟300ms
          setTimeout(function () {
            that.setData({
              play: true,
              myMusic: myMusic
            }) // 在当前同步流程结束后，下一个时间片执行
            that.data.myMusic.play();
          }, 300),
          wx.request({
            url: "https://v1.itooi.cn/netease/lrc?",
            data:{
              id:that.data.mid
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success(res) {
              //打印歌词
              var mediaArray = [],
                lyric;
              lyric = res.data.split('\n').slice(5);
              for (var j = 0; j < lyric.length; j++) {
                var t = lyric[j].substring(lyric[j].indexOf('[') + 1, lyric[j].indexOf(']')),
                  c = lyric[j].substring(lyric[j].indexOf("]") + 1, lyric[j].length);
                if (c != '') {
                  mediaArray.push({
                    t: (parseInt(t.split(":")[0] * 60) + parseFloat(t.split(":")[1])).toFixed(1),
                    c: c,
                    id: 'A' + j,
                  })
                }
              }
              console.log(res.data.split('\n').slice(5)[1])
              that.setData({
                lrc: mediaArray
              })
            }
          })

        },
      })
      wx.getStorage({
        key: 'likeSongList',
        success: function(res) {
          that.setData({
            likeSongList:res.data,
          });
          console.log("数据为")
          console.log(that.data.likeSongList)
        },
      })
      
    }
    

  
    
    

  },

  /**
   * 增加进度条的大小,每隔1秒钟，调用clock方法，实现进度条的增加
   */
  clock: function () {

    this.setData({
      mPercent: parseInt(100 * this.data.myMusic.currentTime / this.data.myMusic.duration)
    })
    
  },
  // 退出
  exitThisPage: function () {

  },
  /**
   * 实现音乐播放和暂停
   */
  playOrPause: function () {
    if (this.data.play) {
      //暂停音乐
      this.setData({
        play: false,
      });
      this.data.myMusic.pause();
      var animationReverse10 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '0% 0% 0%'
      })
      // this.animation = animation
      animationReverse10.rotate(-10).step()
      this.setData({
        animationDataRoll: animationReverse10.export()
      })
    } else {

      
      
      var animation10 = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
        transformOrigin: '0% 0% 0%'
      })
      // this.animation = animation
      animation10.rotate(10).step()
      this.setData({
        animationDataRoll: animation10.export()
      })
      //播放音乐
      let that = this;
      setTimeout(function () {
        that.setData({
          play: true
        }) // 在当前同步流程结束后，下一个时间片执行
        that.data.myMusic.play();
      }, 300)
    }
  },
  dataTrue:function(){
    this.setData({
            play: true,
        })
  },
  //收藏夹
  likeOrNot: function (e) {
    var app = getApp();
    if (!this.data.isLove) {//点击了这个收藏
    let that=this;
      console.log("提取数据")
      wx.getStorage({
        key: 'likeSongList',
        success: function(res) {
          that.setData({
            likeSongList: res.data
          });
          console.log(that.data.likeSongList);
          that.data.likeSongList.push(that.data.storageData);
          console.log("写入数据")
          wx.setStorageSync(
            'likeSongList',
            that.data.likeSongList
          )
          that.data.likeSongList = null;
        },
        fail:function(res){
          that.data.likeSongList.push(that.data.storageData);
          console.log("写入数据")
          wx.setStorageSync(
            'likeSongList',
            that.data.likeSongList
          )
          that.data.likeSongList=null;
        },
      })
      
      app.globalData.storageNumber++;
      this.setData({
        isLove: true,
      })
    } else {
      let that=this;
      wx.getStorage({
        key: 'likeSongList',
        success: function (res) {
          that.setData({
            likeSongList: res.data
          });
          // console.log(that.data.likeSongList);
          console.log("删除数据")
          var i=0;
          var list = that.data.likeSongList;
          for (i = 0; i < list.length;i++){
            if (list[i].data.name===that.data.mname){
              list.splice(i,1);
              break;
            }
          }
          wx.setStorageSync(
            'likeSongList',
            that.data.likeSongList
          )
          that.data.likeSongList = null;
        },
      })
      
      app.globalData.storageNumber--;
      this.setData({
        isLove: false,
      })
    }
  },
  clearAllStorage: function () {
    wx.clearStorage()
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
    var animation = wx.createAnimation({
      duration: 4000000,
      timingFunction: 'ease',
    })
    // this.animation = animation
    animation.rotate(180 * 1000).step()
    this.setData({
      animationData: animation.export()
    })

    var animation10 = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
      transformOrigin:'0% 0% 0%'
    })
    // this.animation = animation
    animation10.rotate(10).step()
    this.setData({
      animationDataRoll: animation10.export()
    })

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

  },
  // 上一首
  beforeOne: function () {
    var i = 0;
    let that=this;
    wx.getStorage({
      key: 'likeSongList',
      success: function(res) {
        that.setData({
          likeSongList: res.data
        })
        var list = that.data.likeSongList;
        for (i = 0; i < list.length; i++) {
          if (list[i].data.name === that.data.mname) {
            break;
          }
        }
        if(i==0){
          i = list.length-1;
        } else {
          i = i - 1;
        }
        that.data.myMusic.destroy();
        wx.setStorage({
          key: 'songInfo',
          // data: this.data.storageData.data,
          data: that.data.likeSongList[i].data,
        })
        wx.navigateTo({
          url: 'play'
        }) 
      },
    })
    
  },
  //下一首
  afterOne: function () {
    var i = 0;
    let that = this;
    wx.getStorage({
      key: 'likeSongList',
      success: function (res) {
        that.setData({
          likeSongList: res.data
        })
        var list = that.data.likeSongList;
        for (i = 0; i < list.length; i++) {
          if (list[i].data.name === that.data.mname) {
            break;
          }
        }
        if (i == (list.length - 1)) {
          i = 0;
        } else {
          i = i + 1;
        }
        that.data.myMusic.destroy();
        wx.setStorage({
          key: 'songInfo',
          // data: this.data.storageData.data,
          data: that.data.likeSongList[i].data,
        })
        wx.navigateTo({
          url: 'play'
        })
      },
    })

  },
  //修改随机播放值并调用播放函数
  randomOrSequence:function(){
    // if(this.data.randomPlay){
    //   this.setData({
    //     randomPlay: false,
    //   });
    // }else{
    //   this.setData({
    //     randomPlay: true,
    //   });
    // }
    this.randomOrSequenceDetail();
  },
  //随机播放或者循环播放
  randomOrSequenceDetail: function () {
    if (this.data.randomPlay) {
      //随机播放
      console.log("随机播放")
      
      let that = this;
      wx.getStorage({
        key: 'likeSongList',
        success: function (res) {
          that.setData({
            likeSongList: res.data
          })
          var list = that.data.likeSongList;
          var i = Math.floor(Math.random() * list.length);
          that.data.myMusic.destroy();
          wx.setStorage({
            key: 'songInfo',
            // data: this.data.storageData.data,
            data: that.data.likeSongList[i].data,
          })
          wx.navigateTo({
            url: 'play'
          })
         }
      })
    } else {
      console.log("顺序播放")
      this.afterOne();
    }
  },
  dataTrue: function () {
    this.setData({
      play: true,
    })
  },
  click: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  
})