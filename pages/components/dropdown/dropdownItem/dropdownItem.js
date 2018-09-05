// pages/components/dropdown/dropdownItem/dropdownItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dropItem: {
      type: Object,
      value: {
        "selectName": "NAME-2",
        "list": [
          {
            "id": "ID-1",
            "name": "NAME-1"
          },
          {
            "id": "ID-2",
            "name": "NAME-2"
          },
          {
            "id": "ID-3",
            "name": "NAME-3"
          }
        ]
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {},
    
  },

  ready: function () {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击 展开下拉菜单
    tapDropdown: function(e){
      this.aniDown(true);
    },
    // 
    // 下拉动画
    aniDown: function(isDown){
      var _ani = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out',
        transformOrigin: "0 0 0"
      })
      var _par = isDown ? 1 : 0;
      _ani.scaleY(_par).step();
      this.setData({
        animationData: _ani.export()
      })
    }
  }
})
