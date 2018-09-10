var moment = require('../../../../utils/moment.min.js');
// pages/tool/calendar/allCalendar/monthCalendar/monthCalendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modData: { // 传入的显示模式，0-日，1-周，2-月
      type: Number,
      value: 0,
      observer: function (newVal, oldVal) {
        this.changeMod(newVal);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultDate: {} //传入子组件：日期
  },
  attached: function () {
    this.changeMod(this.properties.modData);
  },
  /**
   * 组件的方法列表
   */
  methods: {
    changeMod: function(newModData){
      let _defaultDate = {};
      const _current = moment(); // 当前日期

      // 根据显示模式设置默认显示日期
      if (newModData == 0) {
        _defaultDate = _current.format('YYYY-MM-DD');
      }
      else if (newModData == 1) {
        _defaultDate = _current.format('YYYY-MM-DD');
      }
      else if (newModData == 2) {
        _defaultDate = _current.format('YYYY-MM');
      }
      this.setData({
        defaultDate: _defaultDate
      })
      console.log(this.data.defaultDate);
    }
  }
})
