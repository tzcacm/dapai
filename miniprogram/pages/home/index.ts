// pages/home/index.ts
import { post } from '../../api/http'
import { wxLogin, getUserProfile } from '../../utils/tool'
import { centerLetter } from '../../utils/license';

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
    canIUseGetUserProfile: true,
    fadeshow: false,
    isShowRoomNumber: false,
    roomListArr: centerLetter, // 号码列表
    roomNumber: [],
    roomIndex: 0
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

  // 加入房间
  toRoomDetail() {
    this.setData({ isShowRoomNumber: true, fadeshow: true })
  },

  // 输入号码
  getLicenseNumber(e) {
    const { value } = e.currentTarget.dataset || {}
    const { roomIndex, roomNumber } = this.data || {}
    if (roomIndex >= 4) return
    // if (roomIndex == 0) {
    //   this.setData({ cartLicenseArr: FistLetter })
    // } else if (roomIndex >= 1 && roomIndex < minIndex) {
    //   this.setData({ cartLicenseArr: centerLetter })
    // } else {
    //   this.setData({ cartLicenseArr: lastLetter })
    // }
    // this.setData({
    //   roomNumber: roomNumber + value,
    //   roomIndex: roomIndex + 1,
    // })
  },

  // 关闭房间
  cacelRoomDetail() {
    this.setData({ fadeshow: false })
    setTimeout(() => {
      this.setData({ isShowRoomNumber: false })
    }, 250)
  }
})