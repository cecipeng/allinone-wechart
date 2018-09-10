// pages/tool/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //默认显示“日程”
    modData : "" , //显示模式
    navList: [ // 底部导航项目
      {
        "classname": "",
        "name": "日程",
        "value": 0
      },
      {
        "classname": "",
        "name": "待办",
        "value": 1
      },
      {
        "classname": "",
        "name": "清单",
        "value": 2
      }
    ],
    sortDate: [  //显示模式
      {
        id: 0,
        name: "日"
      },
      {
        id: 1,
        name: "周"
      },
      {
        id: 2,
        name: "月"
      }
    ],
    radiogroupCheckVal: 0, //日，周，月默认项
  },

  // 切换日，周，月显示模式
  radioChange: function (e) {
    this.setData({
      radiogroupCheckVal : e.detail.value,
      modData: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //底部tab切换
  onSwitchResult: function (e) {
    this.setData({
      currentTab: e.detail.currentTab
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