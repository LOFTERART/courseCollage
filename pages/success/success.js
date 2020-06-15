
Page({
  data: {

  },
  onLoad: function (options) {

  },
  go(e) {
    let page = Number(e.currentTarget.dataset.page)
    if (page === 1) {
      wx.redirectTo({
        url: "/pages/index/index"
      })
    } else {
      wx.makePhoneCall({
        phoneNumber: '88888888888' //仅为示例，并非真实的电话号码
      })
    }
  }
})