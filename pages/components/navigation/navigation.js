// pages/components/navigation/navigation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab:function(e){
      var myEventDetail = { currentTab: e.currentTarget.dataset.id }
      this.triggerEvent('switchResult', myEventDetail)
     
    }
  }
})
