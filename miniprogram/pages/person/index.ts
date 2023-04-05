import { post } from '../../api/http'

Page({
  data: {
    showLoading: false,
    showLoginBox: false,
    animation: false,
    userInfo: {}
  },
  onLoad() {

  },
  // 弹出授权窗口
  getUserInfoData() {
    // this.setData({ showLoginBox: true })
  },
  // 拒绝授权
  cancelPush() {
    this.setData({ showLoginBox: false })
  },
  // 接受授权
  surePushTwo() {
    wx.getUserProfile({
      lang: 'zh_CN',
      desc: '用于完善会员资料',
      success: (res) => {
        this.setData({ showLoginBox: false })
        post('saveUserinfo', { ...res.userInfo }).then(() => {
          this.getInitData()
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },
  // 初始化数据-获取用户信息
  getInitData() {
    post('getUserinfo').then(res => {
      console.log(res)
    })
  },
})