
const domain = 'http://192.168.1.12:9000/'

export const post = (url, params) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: domain + url, //仅为示例，并非真实的接口地址
            method: 'POST',
            data: params,
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

export const get = (url) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: domain + url, //仅为示例，并非真实的接口地址
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
            },
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}