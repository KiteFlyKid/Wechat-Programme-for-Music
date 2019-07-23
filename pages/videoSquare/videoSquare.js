//获取音频上下文


Page({

    /**
     * 页面的初始数据
     */
	data: {
		isLoadedAll: false,
		musicIndex: null,
		videoIndex: null,
		currentTabsIndex: 0,
		pageIndex: 1,
		videoList: [],

	},

    /**
     * 生命周期函数--监听页面加载
     */
	onLoad: function (options) {
    let that = this;
    //页面一加载
    wx.request({
      url: 'https://v1.itooi.cn/netease/mv/top?pageSize=40&page=0', //发送请求到服务器
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data); //服务器响应数据回来
        //将服务器响应的数据绑定到data中
        that.setData({
          videoList: res.data.data //res.data是传入res的数据data中的dataJSON数组
        })

      },
    })

    

	},
  reQ:function(id){
    
  },
	//tap切换
	onTabsItemTap: function (event) {
		var index = event.currentTarget.dataset['index'];
		this.setData({
			currentTabsIndex: index
		});
    

		//tab切换时停止视频播放
		var videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex);
		videoContextPrev.stop();

		//将当前播放视频的index设置为空
		this.setData({

			videoIndex: null,
		})
	},
	//展开
	//原本没有upStatus这个字段，所以默认值为false
	nice(event) {
		var index = event.currentTarget.dataset['index'];
    // 点赞数增减
    if (!this.data.videoList[index].upStatus) {
      this.data.videoList[index].score++;
    }
    else {
      this.data.videoList[index].score--;
    }
    // 变换图片
		this.data.videoList[index].upStatus = !this.data.videoList[index].upStatus;
		this.setData({
			videoList: this.data.videoList
		})
    

	},
	// //播放音频
	// musicPlay(event) {
	// 	var src = event.currentTarget.dataset['src'];
	// 	var index = event.currentTarget.dataset['index'];
	// 	this.setData({
	// 		musicIndex: index,
	// 		audioSrc: src
	// 	});
		
	// 	backgroundAudioManager.src = src;
	// 	backgroundAudioManager.play()

	// },
	// //停止音频
	// musicPause(event) {
	// 	this.setData({
	// 		musicIndex: null
	// 	});
	// 	backgroundAudioManager.pause();
	// },
	//播放视频
	videoPlay(event) {
		var length = this.data.videoList.length;
		var index = event.currentTarget.dataset['index'];

		if (!this.data.videoIndex) { // 没有播放时播放视频
			this.setData({
				videoIndex: index
			})
			var videoContext = wx.createVideoContext('video' + index)
			videoContext.play()
		} else {
			//停止正在播放的视频
			var videoContextPrev = wx.createVideoContext('video' + this.data.videoIndex)
			videoContextPrev.stop()
			//将点击视频进行播放
			this.setData({
				videoIndex: index
			})
			var videoContextCurrent = wx.createVideoContext('video' + index)
			videoContextCurrent.play()
		}
	},

	// onReachBottom: function () {
	// 	if (!this.data.isLoadedAll) {
	// 		this.data.pageIndex++;
	// 		this._loadData(this.data.id, this.data.pageIndex);
	// 	}
	// }
})