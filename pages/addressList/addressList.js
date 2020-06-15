// pages/addressList/addressList.js
import { post_getAddressList,post_updataAddressID} from '../../utils/config'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({
  data: {
    list: [],
  },
  onLoad(option) {
    console.log(option,"alist");
    this.setData({
      orderId:Number(option.orderId)
    })
    this.getList()
  },

  getList:function () {
    post_getAddressList({
      userId:wx.getStorageSync('UID'),
    }).then(res=>{
      this.setData({
        list:res.data,
      })
    })
  },

  choseAddress:function(e){
    console.log(e.currentTarget.dataset.id,"地址id");
    Dialog.confirm({
      title: '地址信息',
      message: '确认选择当前收货地址',
    }).then(() => {
          // on confirm
      post_updataAddressID({
        AddressId:Number(e.currentTarget.dataset.id),
        oder_id:this.data.orderId,
      }).then(res=>{
        console.log(res,"选择成功");
        wx.navigateTo({
          url: '/pages/success/success'
        })
      })
        }).catch(() => {
          // on cancel
        });
  },

  clickAddress:function () {
    wx.navigateTo({
      url: '/pages/address/address?orderId='+this.data.orderId,
    })
  },



})