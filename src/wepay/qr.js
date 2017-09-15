const { we } = require('../../config')
const $ = require('../utils')
const querystring = require('querystring')

// 二维码生成

function qr (cxt) {
  let query = ctx.query  // 获取get查询
  let product_id = query.product_id  // 商品id

  let data = {  // 待签名数据
    appid: we.appid,
    mch_id: we.mch_id,
    time_stamp: $.createTimestamp(),
    nonce_str: $.createNonceStr(),
    product_id,
    sign: '',
  }
  
  let signData = $.signWe(data)



  let url = we.url + querystring.stringify(signData)  // 返回扫码url

  ctx.body = url

}

module.exports = {
  qr,
}