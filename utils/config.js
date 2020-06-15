import { fetch } from './wxRequest'; //接口请求
const API = require('./api');
const API_PATH = API.API_PATH;

//接口调用
// wxRequest(url, token, data, type) 

//用户code换openid
const UserLoginCode = (params) => {
  let url = `${API_PATH}/user/v1/userInfo`
  return fetch(url, null, params, 'POST');
}


//获取帮助文档
const get_helpList = (params) => {
  let url = `${API_PATH}/admin/help/getArticle`
  return fetch(url, null, params, 'POST');
}

//订阅活动
const SubmitAction = (params) => {
  let url = `${API_PATH}/admin/user/addSubmit`
  return fetch(url, null, params, 'POST');
}

//获取帮助文档详情1个
const get_studioDetail = (params) => {
  let url = `${API_PATH}/studio/getstudioOne`
  return fetch(url, null, params, 'POST');
}

//获取机构详情
const get_helpOne = (params) => {
  let url = `${API_PATH}/admin/help/getArticleone`
  return fetch(url, null, params, 'POST');
}

//获取直播列表
const get_videoList = (params) => {
  let url = `${API_PATH}/video/getRoomList`
  return fetch(url, null, params, 'POST');
}


//获取校区信息
const get_studioList = () => {
  let url = `${API_PATH}/studio/getstudio`
  return fetch(url, null, null, 'POST');
}

//获取校区banner
const get_studioBanner = (params) => {
  let url = `${API_PATH}/banner/getbanner`
  return fetch(url, null, params, 'POST');
}



//获取校区banner
const get_studioBannerOne = (params) => {
  let url = `${API_PATH}/banner/getbannerOne`
  return fetch(url, null, params, 'POST');
}
//获取文章分类
const get_studioClassify = () => {
  let url = `${API_PATH}/classify/getClassify`
  return fetch(url, null, null, 'POST');
}

//获取分类下文章
const get_ClassifyArticle = (params) => {
  let url = `${API_PATH}/classify/getClassifyArticle`
  return fetch(url, null, params, 'POST');
}



/**
 * 获取unionid 非鉴权
 * @param params
 */
const get_orderList = (params) => {
  // let url = `${API_PATH}/api/v1/goods/1`
  let url = `${API_PATH}/api/v1/orders`
  return fetch(url, null, params, 'POST');
}

// 订单详情
const get_orderDetail = (params) => {
  // let url = `${API_PATH}/api/v1/orders/1`
  // return fetch(url, null, params, 'Get');
  let url = `${API_PATH}/api/v1/orders/info`
  return fetch(url, null, params, 'POST');
}




// 订单支付前准备信息
const post_payWechatOrder= (params) => {
  let url = `${API_PATH}/api/v1/orders/createOrder`
  return fetch(url, null, params, 'POST');
}

// 订单支付
const post_payOrder= (params) => {
  let url = `${API_PATH}/api/v1/payorder`
  return fetch(url, null, params, 'POST');
}


//提交用户信息支付完成后
const post_userAddress= (params) => {
  let url = `${API_PATH}/api/v1/address`
  return fetch(url, null, params, 'POST');
}

//获取地址列表
const post_getAddressList= (params) => {
  let url = `${API_PATH}/api/v1/getAddress`
  return fetch(url, null, params, 'POST');
}

//选择地址更新订单的地址id
const post_updataAddressID= (params) => {
  let url = `${API_PATH}/api/v1/upAddressId`
  return fetch(url, null, params, 'POST');
}

module.exports = {
  get_orderList,
  get_orderDetail,
  post_payOrder,
  post_userAddress,
  post_getAddressList,
post_updataAddressID,
  post_payWechatOrder,
  get_helpList,
  get_helpOne,
  get_videoList,
  SubmitAction,
  get_studioList,
  get_studioBanner,
  get_studioClassify,
  get_ClassifyArticle,
  get_studioDetail,
  get_studioBannerOne,
  UserLoginCode
}