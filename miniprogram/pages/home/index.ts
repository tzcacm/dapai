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
    this.getInitData()
  },

  // 登录授权
  async getInitData() {
    let res: any = await wxLogin()
    post('getAccetsToken', { code: res?.code }).then(data => {
      console.log(data)
    })
  },

  // 创建房间
  toOptionDetail() {
    wx.navigateTo({ url: `/pages/room/index` })
  },

  // 扫码进房间
  toShareDetail() {

  }
})