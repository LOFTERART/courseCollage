// pages/web/web.js
import {get_studioBanner,get_studioClassify,get_videoList,get_studioList} from '../../utils/config'
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


    skeletonShow: true,//骨架屏幕
    current: 0,

    schoolList:[],
    liveRoom:[],
    banners:[],
    KingList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolList()
    this.GetVideoList();
    this.getBanner()
    this.getKing()


  },

  change: function (e) {
    this.setData({
      current: e.detail.current
    })
  },
  detail: function (e) {
    console.log(e.currentTarget.dataset);

    if(e.currentTarget.dataset.link){
      wx.navigateTo({
        url: '/pages/web/web?url='+e.currentTarget.dataset.link
      })
    }else if(e.currentTarget.dataset.localnum){
      wx.navigateTo({
        url: "/pages/faqdt/faqdt?id="+e.currentTarget.dataset.localnum
      })
    }else {
      wx.navigateTo({
        url: "/pages/faqdt/faqdt?id="+e.currentTarget.dataset.id+"&from=bannerArticle"
      })
    }



  },

  //获取校区数据
  getSchoolList:async function(){

    const res=await get_studioList().catch(error=>error)

    if(res.code!==20000){
      return
    }

    this.setData({
      schoolList:res.data
    })



  },

  //拨打电话
  onClickPhone:function(e){
    wx.makePhoneCall({
      phoneNumber:e.currentTarget.dataset.phone+''
    })
  },


  //点击导航
  clickNav:function(e){
    console.log(e.currentTarget.dataset);

    wx.openLocation({
      name:e.currentTarget.dataset.name,
      address:e.currentTarget.dataset.add,
      latitude:e.currentTarget.dataset.lat,
      longitude:e.currentTarget.dataset.lon,
      scale: 18
    })

  },

  //点击去校区详细

  clickStudio:function(e){

    wx.navigateTo({
      url: "/pages/faqdt/faqdt?id="+e.currentTarget.dataset.id+"&from=studioDetail"
    })

  },

  //直播视频列表
  GetVideoList:async function(){

    let params={
      start:0,
      limit:100
    }
    const res = await  get_videoList(params).catch(error=>error)
    this.setData({
      liveRoom:res.room_info
    })

  },

  //进入直播间
  clickLiveVideo:function(e){
    console.log(e);

    wx.navigateTo({
      url:'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+e.currentTarget.dataset.id
    })

  },

  //获取banner数据
  getBanner:async function(){

    const res=await get_studioBanner({status:Number(1)}).catch(error=>error)

    if(res.code!==20000){
      return
    }
    this.setData({
      banners:res.data,
      skeletonShow:false
    })

  },

  //获取校区数据
  getKing:async function(){

    const res=await get_studioClassify().catch(error=>error)

    if(res.code!==20000){
      return
    }
    this.setData({
      KingList:res.data
    })

  },

  //跳转分类获取文章

  clickKing:function(e){
    wx.navigateTo({
      url: "/pages/faq/faq?classifyId="+e.currentTarget.dataset.id+"&name="+e.currentTarget.dataset.name+"&from=classify"
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