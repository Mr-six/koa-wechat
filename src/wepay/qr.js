const { we } = require('../../config')
const $ = require('../utils')
const querystring = require('querystring')

// 二维码生成

function qr (ctx) {
  let query = ctx.query  // 获取get查询
  let product_id = query.product_id  // 商品id
  console.dir(query)

  let data = {  // 待签名数据
    appid: we.appid,
    mch_id: we.mch_id,
    nonce_str: $.createNonceStr(),
    product_id,
    time_stamp: $.createTimestamp(),
    sign: '',
  }
  data.sign = $.signWe(data)
  
  let signData = data



  let url = we.qr_url + querystring.stringify(signData)  // 返回扫码url

  ctx.body = url
}

module.exports = qr