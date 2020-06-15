// pages/faqdt/faqdt.js
const app = getApp()
import { get_helpOne,get_studioDetail,get_studioBannerOne} from '../../utils/config'
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

    articleInfo:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //来自机构详情信息 单独获取详情
    if(options.from==="studioDetail"){
      this.getStudioDetail(Number(options.id))
    }else  if(options.from==="bannerArticle"){
      this.getBannerDetail(Number(options.id))
    }else {
      this.getArticleDetail(Number(options.id))
    }

  },

  //文章详细
  getArticleDetail:async function(id){
    const res=await get_helpOne({id}).catch(error=>error)
    if (res.code!==20000){
      console.log("获取列表失败");
      return
    }
    this.setData({
      articleInfo:res.data
    })

  },

  //机构详情
  getStudioDetail:async function(id){
    const res=await get_studioDetail({id}).catch(error=>error)
    if (res.code!==20000){
      console.log("获取列表失败");
      return
    }
    this.setData({
      articleInfo:res.data
    })

  },

  //banner详情
  getBannerDetail:async function(id){
    const res=await get_studioBannerOne({id}).catch(error=>error)
    if (res.code!==20000){
      console.log("获取列表失败");
      return
    }
    this.setData({
      articleInfo:res.data
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