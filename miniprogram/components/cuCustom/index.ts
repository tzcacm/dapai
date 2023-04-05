Component({
    /* 组件的属性列表 */
    properties: {
      title: { // 设置标题
        type: String,
        value: ''
      },
      cover_state: { // 控制页面padding-top
        type: Boolean,
        value: false
      },
      my_class: { // 控制样式
        type: Boolean,
        value: false
      },
      color: { //标题颜色
        type: String,
        value: '#000000'
      },
      backgroundbar: { //导航栏颜色
        type: String,
        value: '#FFFFFF'
      },
      bordershow: { //是否显示下划线
        type: Boolean,
        value: false
      },
      showLeftBtn: {
        //是否需要返回按钮
        type: Boolean,
        default: true
      }
    },
    /* 组件的初始数据 */
    data: {
      bar_Height: wx.getSystemInfoSync().statusBarHeight, // 获取手机状态栏高度
      pagesLen: 0,
    },
    /* 组件的方法列表 */
    methods: {
      goBack: function () { // 返回事件
        var len = getCurrentPages().length
        if (len > 1) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }
      }
    },
    // 组件生命周期
    lifetimes: {
      attached: function () {
        // 在组件实例进入页面节点树时执行
        this.setData({
          pagesLen: getCurrentPages().length
        })
      },
      detached: function () {
        // 在组件实例被从页面节点树移除时执行
      },
    }
  })