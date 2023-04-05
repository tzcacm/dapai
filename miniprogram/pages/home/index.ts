// pages/home/index.ts
import { post } from '../../api/http'
import { wxLogin, getUserProfile } from '../../utils/tool'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [
      { image: '/assets/image/head.png' }
    ],
    userinfo: {
      avatarUrl: '',
      nickName: '未授权'
    },
    hasUserInfo: false,
    canIUseGetUserProfile: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    let res: any = await wxLogin()

    post('getAccetsToken', { code: res?.code }).then(data => {
      console.log(data)
    })
  },

  toOptionDetail() { },

  showBcgImgArea() {

  },
  // 授权用户信息
  getUserProfile() {
    getUserProfile().then((res: any) => {
      console.log(res)
      this.setData({
        userinfo: res.userInfo,
        hasUserInfo: true
      })
      wx.setStorageSync('userinfo', res.userInfo)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})