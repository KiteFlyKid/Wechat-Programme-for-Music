//home.js
Page({
  onPullDownRefresh: function() { //下拉刷新
    wx.showToast({
      title: '正在为您刷新～',
      icon: 'loading',
      duration: 2000
    });
    console.log('--------下拉刷新-------')
  },

  onLoad: function(options) {
    let that = this;
    wx.request({
      url: 'https://v1.itooi.cn/netease/album/newest', //发送请求到服务器
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data) //服务器响应数据回来
        //将服务器响应的数据绑定到data中，界面就可以显示数据

        that.setData({
          newest: res.data.data
        })
      }
    })
    let thbt = this;
    wx.request({
      url: 'https://v1.itooi.cn/netease/banner', //发送请求到服务器
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data) //服务器响应数据回来
        //将服务器响应的数据绑定到data中，界面就可以显示数据

        thbt.setData({
          banner: res.data.data
        })
      }
    })
    let thct = this;
    wx.request({
      url: 'https://v1.itooi.cn/netease/artist/top?page=0&pageSize=30', //发送请求到服务器
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data) //服务器响应数据回来
        //将服务器响应的数据绑定到data中，界面就可以显示数据

        thct.setData({
          singer: res.data.data
        })
      }
    })
  },

  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo');
    console.log(this.videoContext);
  },
  sendDanmu: function() {
    this.videoContext.sendDanmu({
      text: this.data.danmu,
    })
  },
  seekVideo: function() {
    this.videoContext.seek(100);
  },

  getInput: function(e) {
    console.log(e.detail.value)
    this.setData({
      danmu: e.detail.value
    });
  },
  onShow: function() {},
  data: {
    singer: [],
    banner: [],
    newest: [],
    isRandomColor: true, //默认随机
    src: '',
    numberColor: "#ff0000", //默认黑色

    danmuList: [{
        text: '昔日少年终成王',
        color: '#cd6090',
        time: 1
      },
      {
        text: '好期待联名的游戏啊！！',
        color: '#f08080',
        time: 3
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 3
      },
      {
        text: '冲上来抱走忙内',
        color: '#ffe4e1',
        time: 5
      },
      {
        text: 'jimi好绝一男的',
        color: '#c6e2ff',
        time: 6
      },
      {
        text: 'jimi好绝的一男的',
        color: '#2ba896',
        time: 7
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 29
      },
      {
        text: '南俊南俊南俊',
        color: '#c6e2ff',
        time: 10
      },
      {
        text: '七年，大家都越变越好了～～',
        color: '#cd6090',
        time: 13
      },
      {
        text: '好期待联名的游戏啊！！',
        color: '#f08080',
        time: 16
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 15
      },
      {
        text: '冲上来抱走忙内',
        color: '#ffe4e1',
        time: 17
      },
      {
        text: 'jimi好绝一男的',
        color: '#c6e2ff',
        time: 19
      },
      {
        text: 'jimi好绝的一男的',
        color: '#2ba896',
        time: 23
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 21
      },
      {
        text: '南俊南俊南俊',
        color: '#c6e2ff',
        time: 25
      },
      {
        text: '昔日少年终成王',
        color: '#cd6090',
        time: 30
      },
      {
        text: '好期待联名的游戏啊！！',
        color: '#f08080',
        time: 33
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 29
      },
      {
        text: '冲上来抱走忙内',
        color: '#ffe4e1',
        time: 50
      },
      {
        text: 'jimi好绝一男的',
        color: '#c6e2ff',
        time: 61
      },
      {
        text: 'jimi好绝的一男的',
        color: '#2ba896',
        time: 72
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 49
      },
      {
        text: '南俊南俊南俊',
        color: '#c6e2ff',
        time: 80
      },
      {
        text: '七年，大家都越变越好了～～',
        color: '#cd6090',
        time: 153
      },
      {
        text: '好期待联名的游戏啊！！',
        color: '#f08080',
        time: 160
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 61
      },
      {
        text: '冲上来抱走忙内',
        color: '#ffe4e1',
        time: 67
      },
      {
        text: 'jimi好绝一男的',
        color: '#c6e2ff',
        time: 49
      },
      {
        text: 'jimi好绝的一男的',
        color: '#2ba896',
        time: 63
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 81
      },
      {
        text: '南俊南俊南俊',
        color: '#c6e2ff',
        time: 125
      },
      {
        text: '田柾国声音好苏啊啊啊',
        color: '#c6e2ff',
        time: 51
      },
      {
        text: 'jimi好绝的一男的',
        color: '#2ba896',
        time: 92
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 99
      },
      {
        text: '南俊南俊南俊',
        color: '#c6e2ff',
        time: 55
      },
      {
        text: '七年，大家都越变越好了～～',
        color: '#cd6090',
        time: 153
      },
      {
        text: '好期待联名的游戏啊！！',
        color: '#f08080',
        time: 160
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 161
      },
      {
        text: '冲上来抱走忙内',
        color: '#ffe4e1',
        time: 167
      },
      {
        text: 'jimi好绝一男的',
        color: '#c6e2ff',
        time: 149
      },
      {
        text: 'jimi好绝的一男的',
        color: '#2ba896',
        time: 103
      },
      {
        text: '果果这身很棒',
        color: '#c6e2ff',
        time: 91
      },
      {
        text: '南俊南俊南俊',
        color: '#c6e2ff',
        time: 95
      },
      {
        text: '田柾国声音好苏啊啊啊',
        color: '#c6e2ff',
        time: 71
      },
      {
        text: '田柾国声音好苏啊啊啊',
        color: '#c6e2ff',
        time: 61
      },
      {
        text: '田柾国声音好苏啊啊啊',
        color: '#c6e2ff',
        time: 81
      },
      {
        text: '田柾国声音好苏啊啊啊',
        color: '#c6e2ff',
        time: 91
      },
    ]
  },

})