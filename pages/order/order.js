var  SocketTask;

var socketOpen = false;

const url ='ws://127.0.0.1:8080/v1/adminSocket';
// pages/order/order.js
import { get_orderDetail,post_payOrder,post_payWechatOrder} from '../../utils/config'
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const regeneratorRuntime = require('../../utils/runtime')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    students:null, //剩余名额
    time: null, //剩余时间
    courseName:"",
    courseTime:"",
    bookList:[],
    coursePrice:null,

    timeData: {},

    //课程详情
    courseInfo:{},
  //  订单id
    orderId:null,
  //  是否已经下单
    isHave:false,

    // html 文档
    html:""


  },

  onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getOrder(options)
    this.setData({
      courseId:Number(options.courseId)
    })
  },

   getOrder:async function(options){
    let params={
      userId:wx.getStorageSync('UID'),
      nickName:wx.getStorageSync('nick_name'),
      courseId:Number(options.courseId),
    }
   const res= await get_orderDetail(params).catch(error=>error)
     this.setData({
       courseInfo:res.data.courseInfo,
       html:res.data.courseInfo.content,
       isHave:res.data.isHave,
       orderId:res.data.orderId,
     })
  },


  //模拟支付
  clickPay: async function(){
    if (this.data.isHave){
      Toast('您已经完成此单购买 不可再次下单~');
    }else {

      //创建支付订单
      let params={
        orderId:Number(this.data.orderId),//订单id
        body:this.data.courseInfo.name,
        open_id:wx.getStorageSync("OPENID"), //获取openid
        total_fee:Number(this.data.courseInfo.coursePrice)
      }
      const {data:res}=await post_payWechatOrder(params).catch(error=>error)

      if (res.code!==20000){
        console.log("获取支付信息失败");
      }
      //根据服务器返回的数据信息进行支付
      wx.requestPayment({
        signType: 'MD5',
        timeStamp: res.timeStamp,
        nonceStr: res.nonceStr,
        package: res.package,
        paySign: res.paySign,
        success: res=> {
          //添加订阅提醒
          wx.requestSubscribeMessage({
            tmplIds: ['3qqtaoWP35ibI14nXz6GJfeVr0V6a8ppUCKE0CeUthg'],
            success (res) { }
          })
          //支付成功后通知服务器更新支付状态
          let params ={
            orderId:this.data.orderId,      //  订单id
            courseId:this.data.courseId,      //  课程id
          }
          post_payOrder(params).then(res=>{
            this.sendSocketMessage(JSON.stringify({
              name:wx.getStorageSync('nick_name')+'下单成功了',
              type:"order"
            }))
            wx.navigateTo({
              url: '/pages/addressList/addressList?orderId='+this.data.orderId,
            })

          })

        },
        fail (res) {
            console.log(res,"取消支付");
        }
      })

    }


  },



  sendSocketMessage:function(msg) {
    SocketTask.send({
      data: msg
    }, function (res) {
      console.log('已发送', res)
    })
  },

  onReady:function(){
    var that =this;
    SocketTask.onOpen(res => {
      console.log('监听 WebSocket 连接打开事件。', res)
    })

    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      socketOpen = false;
    })

    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })

    SocketTask.onMessage(res=>{
      that.setData({
        orderInfo:res.data.split("LOVE"),
        isShowAni:true
      })

    })

  },

  onShow:function() {
    console.log("onshouw-------")
    this.webSocket()
    SocketTask.onMessage(res=>{
      this.setData({
        orderInfo:res.data.split("LOVE"),
        isShowAni:true
      })

    })

  },

  webSocket:function() {
    // 创建Socket
    SocketTask = wx.connectSocket({
      url: url,
      method:'GET',
      header: {
        'content-type':'application/json'
      },
      success:function(res) {
        console.log('WebSocket连接创建', res)
      },
      fail:function(err) {
        wx.showToast({
          title:'网络异常！',
        })
      },

    })

  },

  onHide:function() {
    SocketTask.close(function (res) {
      console.log(res);
    })
  },

  /**

   * 生命周期函数--监听页面卸载

   */
  onUnload:function() {
    SocketTask.close(function(res){
      console.log(res);
    })


  },





})
