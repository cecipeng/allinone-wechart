// pages/components/dropdown/dropdown.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    initDropList: {
      type: Array,
      value: [
        [
          {
            "id": "ID-1",
            "name": "NAME-1",
            "isSelected": false
          },
          {
            "id": "ID-2",
            "name": "NAME-2",
            "isSelected": false
          },
          {
            "id": "ID-3",
            "name": "NAME-3",
            "isSelected": true
          }
        ],
        [
          {
            "id": "ID-1",
            "name": "NAME-1",
            "isSelected": false
          },
          {
            "id": "ID-2",
            "name": "NAME-2",
            "isSelected": false
          },
          {
            "id": "ID-3",
            "name": "NAME-3",
            "isSelected": true
          }
        ]
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
    durTime: 200, //下拉时间
    animationData: [], //动画对象
    dropList : 0, // 下拉列表
    selectData: [ //选中项
      {
        "id": -1,
        "name": "下拉选择"
      }],
    flag: -1, // 标记下拉菜单状态，-1关闭，0打开第一个，1打开第二个,...
  },
  
  attached: function(){
    let _select = [];

    //列表赋值
    this.setData({
      dropList: this.properties.initDropList
    })
   
    //设置各选中值
    this.data.dropList.forEach(function(item, index){
      item.forEach(function(item2,index2){
        if (item2.isSelected) {
          _select[index] = {
            id: item2.id,
            name: item2.name
          }
        }
      })
    })
    this.setData({
      selectData: _select
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击下拉菜单
    tapDropdown: function(e){
      const _idx = e.currentTarget.dataset.index;
      let _flag = this.data.flag;
      let _par = 0;
      const _dur = this.data.durTime;
      const _that = this;
      
      if (_flag == -1) { // 全部收起时
        this._aniDown(1, _idx);
        _flag = _idx;
      }
      else if (_flag == _idx) { // 点击已展开的菜单
        this._aniDown(0, _idx);
        _flag = -1;
      }
      else if (_flag != _idx) { // 点击其他菜单
        this._aniDown(0, _flag); //先收起原来的菜单
        setTimeout(function () { 
          _that._aniDown(1, _idx)
        }, _dur);
        _flag = _idx;
      }
      this.setData({
        flag: _flag
      })
      
    },
    // 下拉动画
    _aniDown: function(par,index){
      const _dur = this.data.durTime;
      let _data = this.data.animationData;
      let _ani = wx.createAnimation({
        duration: _dur,
        timingFunction: 'ease-out',
        transformOrigin: "0 0 0"
      })

      _ani.scaleY(par).step();
      _data[index] = _ani.export();

      this.setData({
        animationData: _data
      })
    },
    //点击菜单
    tapItem : function(e){
      let _dropList = this.data.dropList;
      let _select = this.data.selectData;
      const _id = e.currentTarget.dataset.id;
      const _idx = e.currentTarget.dataset.index;
      const _topindex = e.currentTarget.dataset.topindex;

      _dropList[_topindex].forEach(function (item2, index2) {
        if (_idx == index2) {
          item2.isSelected = true;
          _select[_topindex] = {
            id: item2.id,
            name: item2.name
          }
        }
        else {
          item2.isSelected = false;
        }
      })

      // 收起菜单
      this._aniDown(0, _topindex);
      this.setData({
        flag: -1
      })

      this.setData({
        dropList: _dropList,
        selectData: _select
      })
    }
  }
})
