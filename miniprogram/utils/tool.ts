export const wxLogin = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        wx.getUserProfile({
            desc: '获取您的微信个人信息',
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}