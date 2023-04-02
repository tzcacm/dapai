import { post } from '../../api/http'
// 获取应用实例
// const app = getApp<IAppOption>()

Page({
  data: {},
  onLoad() {
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          post('getAccetsToken', { code: res.code })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // post('login')
  },
})
