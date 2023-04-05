// components/base-page.js
let sy: any; //记录手指的y坐标
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 背景颜色
    bgColor: {
      type: String,
      value: '#F4F4F4'
    },
    // 滚动组件配置
    scrollOptions: {
      type: Object,
      value: () => {
        return {
          upperThreshold: 50, // 距顶部/左边多远时（单位px），触发 scrolltoupper 事件
          lowerThreshold: 50 // 距底部/右边多远时（单位px），触发 scrolltolower 事件
        };
      }
    },
    // 背景图片(必须网络地址)
    bgImg: {
      type: String,
      value: ''
    },
    // 是否开启下拉刷新功能
    refreshShow: {
      type: Boolean,
      value: false
    },
    // 加载动画和文案颜色
    backgroundPb: {
      type: String,
      value: '#FFFFFF'
    },
    backgroundrefresh: {
      type: String,
      value: 'transparent'
    },
    showLoading: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    desc: '', //刷新提示语
    hei: 0, //刷新view高度阈值
    scrolltop: 0, //scorll-view滑动离顶部的距离
    isindrag: false, //是否在下拉状态（必须要滑动到顶部才能触发）
    loadingShow: false, //加载动画显示
    isShowToTop: false, // 是否显示回到顶部按钮
    topNum: 0, //滚动顶部
    hasInfo: true, //默认加载画面
    flags: true, //处理下拉刷新节流

  },
  // 组件生命周期
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // 模拟数据加载完成动画清楚
      // setTimeout(() => {
      //   this.setData({
      //     hasInfo: false
      //   })
      // }, 800)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  // 启用插槽
  options: {
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击回到顶部的按钮回调
    toTop(e) {
      this.setData({
        topNum: 0
      });
    },
    // 滚到顶部
    upperFn(e) {
      this.triggerEvent('upperCall', e)
    },
    // 滚到底部
    lowerFn(e) {
      this.triggerEvent('lowerCall', e)
    },
    // 监听滚动
    scrollFn(e) {
      if (parseInt(e.detail.scrollTop) > 500) {
        this.setData({
          isShowToTop: true
        })
      } else {
        this.setData({
          isShowToTop: false
        })
      }
      //未进入下拉状态时，记录scorll-view滑动距离顶部的距离
      var st = e.detail.scrollTop
      if (this.data.isindrag == false) {
        this.setData({
          scrolltop: st
        })
      }
      this.triggerEvent('scrollCall', e)
    },
    start(e) {
      //记录手指触摸是的y坐标
      sy = e.touches[0].clientY
    },
    move(e) {
      if (this.data.flags == false) {
        return
      }
      //计算手指滑动的距离
      var delta = e.touches[0].clientY - sy
      //scorll-view滑动到顶部且继续向上滑动时，走scorll-view滑动流程
      if (this.data.hei <= 0 && delta <= 0) {
        return
      }
      //scorll-view已经滑动到顶部，继续下拉进入下拉状态
      if (this.data.scrolltop <= 0) {
        if (this.data.isindrag == false) {
          this.setData({
            isindrag: true
          })
        }
        var tempdelta = 0
        if (delta > 0) { //手指向下滑动
          if (this.data.hei > 50) { //触发阈值，更改状态
            tempdelta = this.data.hei + delta / (this.data.hei - 50) //增大下拉阻尼感
          } else {
            //手指移动未到阈值，按正常滑动增加高度
            tempdelta = this.data.hei + delta
          }
        } else { //手指向上滑动
          tempdelta = this.data.hei + delta
          //刷新状态view最小为0
          if (tempdelta <= 0) {
            tempdelta = 0
          }
        }
        //滑动完成设置刷新view高度
        this.setData({
          hei: tempdelta
        })
      }
      //每次滑动事件后记录y坐标
      sy = e.touches[0].clientY
    },
    end(e) {
      var that = this
      //手指离开时，如果阈值大于等于50，则触发刷新
      if (this.data.hei >= 50) {
        if (this.data.flags == false) {
          return
        }
        this.setData({
          flags: false,
          hei: 50,
        }, () => {
          this.setData({
            loadingShow: true,
          })
        })
        //模拟耗时操作，1.5秒后恢复正常状态
        setTimeout(function () {
          sy = 0
          that.setData({
            // desc: '',
            hei: 0,
            isindrag: false,
            loadingShow: false,
            scrolltop: 0,
            flags: true
          })
        }, 1500)
        this.triggerEvent('refreshNow', true)
      } else { //未下拉到阈值，松开时则收起刷新view
        sy = 0
        this.setData({
          hei: 0,
          isindrag: false,
          scrolltop: 0
        })
      }
    },
  }
})