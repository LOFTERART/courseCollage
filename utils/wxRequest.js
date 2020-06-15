// let Promise = require('./es6-promise.js');
const regeneratorRuntime = require('./runtime')
function wxPromisify(fn) {

  return function(obj = {}) {

    return new Promise((resolve, reject) => {
      obj.success = function(res) {
        wx.hideToast();
        resolve(res.data)
      }
      obj.fail = function(req) {

         wx.hideToast();
         wx.showLoading({
            title: '出错啦',
         })
         setTimeout(function () {
            wx.hideLoading()
         }, 2000)

        reject(req);
      }
      fn(obj);
    })
  }
}

// Promise.prototype.finally = function(callback) {
//   let P = this.constructor;
//   return this.then(
//     value => P.resolve(callback()).then(() => value),
//     reason => P.resolve(callback()).then(() => {
//       throw reason
//     })
//   );
// };

/**
 * 微信请求，以是否有token传入判断是否走鉴权
 */

function wxRequest(url, token, data, type, noLoading) {

  if (!noLoading) {
    wx.showToast({
      icon: 'loading',
      duration: 10000
    });
  }
  
  let wxtRequest = wxPromisify(wx.request);
  let headers = {
    'Content-Type': 'application/json;charset=UTF-8'
  };
  if (token) { //鉴权
    headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      "Authorization": 'Bearer' + ' ' + token.value
    }
  }

  return wxtRequest({
    url: url,
    method: type,
    data: data,
    dataType: 'json',
    header: headers
  })
}

module.exports = {
  fetch: wxRequest
}

/**
 * 参数定义：
 * url:请求接口, 
 * token:鉴权：{type:'',value:""},非鉴权：null
 * data:参数
 * type:'post'||'get'
 **/