// pages/tool/calendar/allCalendar/monthCalendar/monthCalendar.js
var moment = require('../../../../../utils/moment.min.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    importDate: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: "",
    dropList: [ //分类
      [
        {
          "id": "1",
          "name": "全部",
          "isSelected": false
        },
        {
          "id": "2",
          "name": "分类1",
          "isSelected": false
        },
        {
          "id": "3",
          "name": "分类2",
          "isSelected": true
        }
      ],
      [
        {
          "id": "11",
          "name": "全部a",
          "isSelected": false
        },
        {
          "id": "22",
          "name": "分类b",
          "isSelected": false
        },
        {
          "id": "33",
          "name": "分类c",
          "isSelected": true
        }
      ],
    ]
  },
  ready: function () {
    this.setData({
      date: this.properties.importDate
    })
    console.log(this.properties.importDate);
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    // 选择日期
    bindDateChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        date: e.detail.value
      })
    },
    // 切换到前N（=this.data.dateNum）天
    changeToPrev: function () {
      const _newDate = moment(this.data.date).subtract(1, 'months').format('YYYY-MM');
      this.setData({
        date: _newDate
      })
    },
    // 切换到后N（=this.data.dateNum）天
    changeToNext: function () {
      const _newDate = moment(this.data.date).add(1, 'months').format('YYYY-MM');
      this.setData({
        date: _newDate
      })
    },
  }
})
