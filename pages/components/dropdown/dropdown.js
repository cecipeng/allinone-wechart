// pages/components/dropdown/dropdown.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dropList: {
      type: Array,
      value: [
        {
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
        },
        {
          "selectName": "NAME-c",
          "list": [
            {
              "id": "ID-a",
              "name": "NAME-a"
            },
            {
              "id": "ID-b",
              "name": "NAME-b"
            },
            {
              "id": "ID-c",
              "name": "NAME-c"
            }
          ]
        }
      ]
    },
    dropClass: {
      type: String,
      value: ""
    },
    dropWidth: {
      type: String,
      value: ""
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    animationData: [],
    flag: -1, // 标记下拉菜单状态，-1关闭，0打开第一个，1打开第二个,...
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击下拉菜单
    tapDropdown: function(e){
      var _idx = e.currentTarget.dataset.index;
    
      if(this.data.flag == -1) {
        this.setData({
          flag: _idx
        })
      }
      if(this.data.flag == _idx) {
        this.setData({
          flag: _idx
        })
      }
      this.aniDown(_idx);
      
    },
    // 
    // 下拉动画
    aniDown: function(index){
      var _ani = wx.createAnimation({
        duration: 200,
        timingFunction: 'ease-out',
        transformOrigin: "0 0 0"
      })
      var _data = this.data.animationData;
      var _par = this.data.flag == index ? 1 : 0;
      console.log(_par);
      _ani.scaleY(_par).step();
      _data[index] = _ani.export();

      this.setData({
        animationData: _data
      })
    }
  }
})
