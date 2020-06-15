// pages/address/address.js
import { post_userAddress} from '../../utils/config'
import demo from './area'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //地区信息
    areaList:demo,
    //是否显示地址
    show:false,
    name:"",
    tel:null,
    //省市县地址
    address1:null,
    //详细地址
    address2:null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    

    console.log(options,"000")
    this.setData({
      orderID:options.orderId
    })

  },


  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  //show 地区
  choseAddress:function(){
    this.setData({ show: true });
  },

  addName:function(e){
    this.setData({ name: e.detail });
  },
  addTel:function(e){
    this.setData({ tel: e.detail });
  },

  //点击完成地区
  clickDone:function(e){
    this.setData({ show: false });
    console.log(e.detail.values,"eee");
    this.setData({
      address1: e.detail.values[0].name+"/"+e.detail.values[1].name+"/"+e.detail.values[2].name,
      addressInfo:e.detail.values
    });
  },

  addAddress2:function(e){
    this.setData({ address2: e.detail });
  },

  //立即提交
  clickSubmit:function(){

    let params={
      orderID:Number(this.data.orderID), //订单ID
      id:wx.getStorageSync('UID'),   //用户id
      trueName:this.data.name,
      telPhone:this.data.tel,
      province: this.data.addressInfo[0].name,
      city: this.data.addressInfo[1].name,
      County: this.data.addressInfo[2].name,
      fullAddress:this.data.address2,
    }

    post_userAddress(params).then(res=>{
      console.log(res,"支付后信息");
      wx.navigateTo({
        url: '/pages/success/success'
      })
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
