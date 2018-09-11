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
    dateList: "", //日历数据
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
    
    //渲染日历数据
    this.getCalendarList();
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    // 选择日期
    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value
      })
      this.getCalendarList();
    },
    // 切换到前N（=this.data.dateNum）天
    changeToPrev: function () {
      const _newDate = moment(this.data.date).subtract(1, 'months').format('YYYY-MM');
      this.setData({
        date: _newDate
      })
      this.getCalendarList();
    },
    // 切换到后N（=this.data.dateNum）天
    changeToNext: function () {
      const _newDate = moment(this.data.date).add(1, 'months').format('YYYY-MM');
      this.setData({
        date: _newDate
      })
      this.getCalendarList();
    },
    // 获取日历数据
    getCalendarList: function(){
      const _currentMonth = this.data.date; // 要获取的月份
      let _list = []; // 结果
      let currentWeekday = moment(_currentMonth).date(1).isoWeekday(); // 获取当月1日为星期几（周一为1...周天为7）
      const lastMonthDays = moment(_currentMonth).subtract(1, 'month').daysInMonth(); // 获取上月天数
      const currentMonthDays = moment(_currentMonth).daysInMonth(); // 获取当月天数
      let _d = currentWeekday == 1 ? 1 : lastMonthDays - currentWeekday + 2; //设置第一个值，需要填补上月天数时显示第一个日期，不需要直接显示1
      let _row = 0; //行数

      // 计算行数
      if ((currentWeekday - 1 + currentMonthDays) > 7*5) { // 上月填补天数+本月天数 是否会超过5行
        _row = 6;
        _list = [[],[],[],[],[],[]]
      }
      else {
        _row = 5;
        _list = [[], [], [], [], []]
      }
      
      for (let i = 0; i < _row; i++) {
        for (let j = 0; j < 7; j++) {
          if (currentWeekday > 1) { //还有上月天数要填补
            currentWeekday--;
          }
          else if (currentWeekday == 1) { //正好填补完上月天数，重置为1
            currentWeekday--;
            _d = 1;
          }
          else {
            if (_d > currentMonthDays) { // 正好填补完本月后，还有剩余，继续填补下个月
              _d = 1;
            }
          }
          _list[i][j] = _d;
          _d++;
        }
      }

      this.setData({
        dataList: _list
      })

    }
  }
})
