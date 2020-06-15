// pages/faq/faq.js


import {get_helpList,get_ClassifyArticle} from '../../utils/config'


const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    isActive: true,
    isGoback: true,


    customBarHeight:app.globalData.customBarHeight,
    navBarHeight: app.globalData.navBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    pageStyle: app.globalData.pageStyle,


    postsList:[],
    subName:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //来自分类的文章
    if(options.from==="classify"){
      this.setData({
        subName:options.name
      })
      this.getClassifyArticle(options.classifyId)
    }else {
      this.getList()
    }

  },


  getList:async function(){
    const res=await get_helpList().catch(error=>error)

    if (res.code!==20000){
      return
    }
    this.setData({
      postsList:res.data
    })

  },

  //分类文章id

  getClassifyArticle:async function(id){

    const res=await get_ClassifyArticle({classify_id:Number(id)}).catch(error=>error)

    if (res.code!==20000){
      console.log("获取列表失败");
      return
    }

    this.setData({
      postsList:res.data
    })


  },


  redictDetail:function(e){
    wx.navigateTo({
      url: "/pages/faqdt/faqdt?id="+e.currentTarget.id
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})