// pages/tool/calendar/allCalendar/allCalendar.js
var moment = require('../../../../../utils/moment.min.js');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    importDate : {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dateNum: 6, //显示的天数
    activeDate: "", //当前显示的日期（某一天）
    countFinish: 0, //统计完成的
    countUnFinish: 0, //统计- 未完成
    countOverdue: 0, // 统计 - 过期
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
    ],
    dayList: [], //显示的日期
    taskList: [ //日程列表
      {
        "date": "2018-09-03",
        "time": "全天",
        "list": [
          {
            "id": 111,
            "name": "xx1",
            "status": 1
          }
        ]
      },
      {
        "date": "2018-09-03",
        "time": "09:00",
        "list": [
          {
            "id": 222,
            "name": "xx2",
            "status": 0
          },
          {
            "id": 333,
            "name": "xx3",
            "status": 0
          }
        ]
      },
      {
        "date": "2018-09-03",
        "time": "14:30",
        "list": [
          {
            "id": 444,
            "name": "xx4",
            "status": 0
          }
        ]
      }
    ]
  },
  attached: function () {
    const _date = moment(this.properties.importDate);
    // 默认显示今日的日程
    this.setData({
      activeDate: _date
    })
    this.getDayList();
    this.countNum();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //生成列表 -- 显示日期列表
    getDayList: function () {
      const that = this;
      var _list = [];
      var _day = '';
      var _week = '';
      var _start = parseInt(this.data.dateNum / 2); //开始时间（指定时间的前几天）
      var _rootDate = that.data.activeDate;
      var _d;

      for (var i = _start; i > (_start - this.data.dateNum); i--) {
        _d = _rootDate.clone();
        _d.subtract(i, 'days');
        _day = _d.format('MM.DD');
        _week = this.formatWeek(_d.format('d'));

        _list.push({ day: _day, week: _week });
      }
      this.setData({
        dayList: _list
      })
    },
    //转换星期
    formatWeek: function (week) {
      var _result = '';

      switch (week - 0) {
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
    // 统计
    countNum: function () {
      const _tasklist = this.data.taskList;
      const _activeDate = this.data.activeDate;
      let _finish = 0, _unfinish = 0, _overdue = 0;
      this.setCount(0, 0, 0);

      _tasklist.forEach(function (item, index) {

        item.list.forEach(function (item2, index2) {

          if (item2.status == 0) {
            _unfinish++;
          }
          else if (item2.status == 1) {
            _finish++;
          }
        })

        if (moment(_activeDate.format('YYYY-MM-DD HH:MM')).isAfter(item.date + ' ' + item.time)) {
          item.list.forEach(function (item2, index2) {
            if (item2.status == 0) {
              _overdue++;
            }
          })
        }
      })
      this.setCount(_finish, _unfinish, _overdue);
    },
    // 统计赋值
    setCount: function (finish, unfinish, overdue) {
      this.setData({
        countFinish: finish,
        countUnFinish: unfinish,
        countOverdue: overdue
      })
    },
    // 切换到前N（=this.data.dateNum）天
    changeToPrev: function () {
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
    },
    // 选中checkbox
    changeListCheck: function (e) {
      const _id = e.currentTarget.dataset.id;  //ID
      const _isCheck = e.detail.value[0] ? true : false;   //是否选中
      const _tasklist = this.data.taskList;

      _tasklist.forEach(function (item, index) {  // 通过id修改状态
        item.list.forEach(function (item2, index2) {
          if (item2.id == _id) {
            _tasklist[index].list[index2].status = _isCheck ? 1 : 0;
          }
        })
      })
      this.setData({
        taskList: _tasklist
      })

      this.countNum();
    }
  }
})
