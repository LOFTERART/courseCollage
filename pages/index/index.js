
var  SocketTask,time,seTime;

var socketOpen = false;

const url ='wss://order.meishuquanyunxiao.com/v1/ping';
//index.js
//获取应用实例
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import { get_orderList,SubmitAction} from '../../utils/config'
const app = getApp()
Page({
  data: {
    //实时已拼订单显示 ws协议请求
    orderInfo:"",
    //待拼团用户订单 http协议请求
    pingList:[],
    //年级课程
    actions: [],
    homeInfo:[],
    animation:false,
    srcImage:"https://img.huxiucdn.com/article/cover/202004/23/204858345271.jpg",
    show: false,
    showTr:false,

    isShowAni:false,



    isActive: true,
    isSearch: true,
    isScancode: true,


    customBarHeight:app.globalData.customBarHeight,
    navBarHeight: app.globalData.navBarHeight,
    titleBarHeight: app.globalData.titleBarHeight,
    pageStyle: app.globalData.pageStyle,

    html:'',

    PingNum:'' //正在拼单人数

  },

  onLoad: function () {
    this.GetOrderList();
  },

  //未开课时间下边按钮为 订阅 课程订阅
  clickMsg:function(){
    wx.requestSubscribeMessage({
      tmplIds: ['VFXbVwT4JQWYyoEOZDaCsqcv1-9mfTeqfwwSyzI1UP8'],
        success : async  res=> {

        let params={
          id:Number(wx.getStorageSync('UID'))
        }
         const resData = await  SubmitAction(params).catch(error=>error)
         console.log(resData);
          Toast('订阅成功 活动开始会有提醒~');

       },
      fail(){

      }
    })
  },




  //订单列表
  GetOrderList:async function(){
   const {data:res } = await  get_orderList().catch(error=>error)
    wx.stopPullDownRefresh()
    this.setData({
              pingList:res.pingList,
              actions:res.actions,
              homeInfo:res.homeInfo,
              html:res.homeInfo[0].content,
              PingNum:res.PingNum+10
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
      seTime=setTimeout(()=>{
        that.setData({
          isShowAni:false
        })
      },3000)
    })

  },

  onShow:function() {
    this.webSocket()
    SocketTask.onMessage(res=>{
      this.setData({
        orderInfo:res.data.split("LOVE"),
        isShowAni:true
      })
      seTime=setTimeout(()=>{
        this.setData({
          isShowAni:false
        })
      },3000)
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
        console.log('WebSocket连接创建index', res)
      },
      fail:function(err) {
        wx.showToast({
          title:'网络异常！',
        })
      },

    })

  },

  //点击用户中心


  //用户去拼单 传递用户参数

  clickGoPinDan:function(){
    this.setData({ show: true });
  },


  //拼单购买
  clickPin:function(){
    this.setData({ show: true });
  },


  //单独购买

  clickDan:function(){
    Toast('系统已经自动帮你参团~');
    this.setData({ show: true });
  },
  //点击客户的去拼单
  clickItem:function (e) {
    console.log(e.currentTarget.dataset.id);
    this.setData({ show: false });

    if(e.currentTarget.dataset.surplus<=0){
      Toast('已暂无名额~');
      return
    }

    wx.navigateTo({
      url: '/pages/order/order?courseId='+e.currentTarget.dataset.id,
    })
  },

  //发送消息
  sendSocketMessage:function(msg) {
    SocketTask.send({
      data: msg
    }, function (res) {
      console.log('已发送', res)
    })
  },

  onClose:function() {
    this.setData({ show: false });
    clearTimeout(seTime)
  },

  onSelect:function(event) {
    console.log(event.detail);
  },


  onHide:function() {

    SocketTask.close(function (res) {
      console.log(res,"关闭index onHide");
    })
    clearTimeout(seTime)
  },

  /**

   * 生命周期函数--监听页面卸载

   */

  onUnload:function() {
    SocketTask.close(function(res){
      console.log(res,"关闭index onunload");
    })
    clearTimeout(seTime)

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.GetOrderList();
  },







})
