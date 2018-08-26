// pages/tool/calendar/dayCalendar/dayCalendar.js
var moment = require('../../../../utils/moment.min.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    dateNum: 6, //显示的天数
    activeDate: "", //当前显示的日期（某一天）
    dropList: [
      {
        "name": "quanbufenlei ",
        "value": 0
      },
      {
        "name": "分类2",
        "value": 1
      }
    ],
    dayList: [],
    taskList: [
      {
        "time": "全天",
        "list": [
          {
            "name": "xx1",
            "status": 1
          }
        ]
      },
      {
        "time": "09:00",
        "list": [
          {
            "name": "xx2",
            "status": 0
          },
          {
            "name": "xx3",
            "status": 1
          }
        ]
      },
      {
        "time": "14:30",
        "list": [
          {
            "name": "xx4",
            "status": 0
          }
        ]
      }
    ]
  },
  ready: function(){
    this.setData({
      activeDate: moment()
    })
    this.getDayList();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //生成列表 -- 显示日期列表
    getDayList:function(){
      var _list = [];
      var _day = '';
      var _week = '';
      var _start = parseInt(this.data.dateNum / 2); //开始时间（指定时间的前几天）
      var _rootDate = this.data.activeDate;
      var _d;

      for (var i = _start; i > (_start - this.data.dateNum);i--){
        _d = _rootDate.clone();
        _d.subtract(i, 'days');
        _day = _d.format('MM.DD');
        _week = this.formatWeek(_d.format('d'));

        _list.push({day:_day,week:_week});
      }
      this.setData({
        dayList: _list
      })
      
    },
    //转换星期
    formatWeek:function(week){
      var _result = '';
      
      switch(week - 0){
        case 0: 
          _result = '周天';
          break;
        case 1: 
          _result = '周一';
          break;
        case 2: 
          _result = '周二';
          break;
        case 3: 
          _result = '周三';
          break;
        case 4: 
          _result = '周四';
          break;
        case 5: 
          _result = '周五';
          break;
        case 6: 
          _result = '周六';
          break;
        default:
          console.log("default");
        }
      
      return _result;
    },
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    },
    // 切换到前N（=this.data.dateNum）天
    changeToPrev: function() { 
      this.setData({
        activeDate: this.data.activeDate.subtract(this.data.dateNum, 'days')
      })
      this.getDayList();
    },
    // 切换到后N（=this.data.dateNum）天
    changeToNext: function () {
      this.setData({
        activeDate: this.data.activeDate.add(this.data.dateNum, 'days')
      })
      this.getDayList();
    },
    // 切换到指定日期
    changeTo: function (e) {
      var _root = parseInt(this.data.dateNum / 2) - e.currentTarget.dataset.id; //activeDate的index
     
      this.setData({
        activeDate: this.data.activeDate.subtract(_root, 'days')
      })
      this.getDayList();
    }
  }
})
