// pages/school/school.js
import {get_studioList} from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      schoolList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolList()

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


  onPullDownRefresh: function () {
      this.getSchoolList()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})