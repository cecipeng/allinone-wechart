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
    dayList: []
  },
  ready: function(){
    this.getDayList()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //生成列表
    getDayList:function(){
      var _list = [];
      var _day = '';
      var _week = '';
      for(var i=-3,j=0;i<4;i++,j++){
        _day = moment().subtract(i, 'days').format('MM.DD');
        _week = this.formatWeek(moment().subtract(i, 'days').format('d'));
        _list.push({day:_day,week:_week});
      }
      this.setData({
        dayList: _list.reverse()
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
    }
  }
})
